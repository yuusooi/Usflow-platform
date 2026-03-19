import type { Node, Edge } from 'reactflow';

// 验证错误类型
export interface ValidationError {
  type: 'error' | 'warning';
  message: string;
  nodeIds?: string[];
}

// 验证结果
export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

// 检测死循环（环状引用）
function detectCycles(nodes: Node[], edges: Edge[]): ValidationError[] {
  const errors: ValidationError[] = [];
  const visited = new Set<string>();
  const recursionStack = new Set<string>();
  const cycles: string[][] = [];

  // DFS 检测环
  function dfs(nodeId: string, path: string[]) {
    visited.add(nodeId);
    recursionStack.add(nodeId);
    path.push(nodeId);

    // 找到所有出边
    const outgoingEdges = edges.filter((edge) => edge.source === nodeId);

    for (const edge of outgoingEdges) {
      const nextNodeId = edge.target;

      if (!visited.has(nextNodeId)) {
        dfs(nextNodeId, [...path]);
      } else if (recursionStack.has(nextNodeId)) {
        // 发现环
        const cycleStart = path.indexOf(nextNodeId);
        const cycle = path.slice(cycleStart);
        cycle.push(nextNodeId);
        cycles.push(cycle);
      }
    }

    recursionStack.delete(nodeId);
  }

  // 从每个节点开始检测
  nodes.forEach((node) => {
    if (!visited.has(node.id)) {
      dfs(node.id, []);
    }
  });

  // 生成错误信息
  cycles.forEach((cycle) => {
    errors.push({
      type: 'error',
      message: `检测到死循环: ${cycle.map(id => {
        const node = nodes.find(n => n.id === id);
        return node?.data?.label || id;
      }).join(' → ')}`,
      nodeIds: cycle,
    });
  });

  return errors;
}

// 检测孤立节点（没有入边或出边的节点，除了开始和结束节点）
function detectIsolatedNodes(nodes: Node[], edges: Edge[]): ValidationError[] {
  const errors: ValidationError[] = [];

  // 计算每个节点的入度和出度
  const inDegree = new Map<string, number>();
  const outDegree = new Map<string, number>();

  nodes.forEach(node => {
    inDegree.set(node.id, 0);
    outDegree.set(node.id, 0);
  });

  edges.forEach(edge => {
    inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1);
    outDegree.set(edge.source, (outDegree.get(edge.source) || 0) + 1);
  });

  // 检查孤立节点
  nodes.forEach(node => {
    const isIn = inDegree.get(node.id) || 0;
    const isOut = outDegree.get(node.id) || 0;
    const type = node.data?.type;

    // 开始节点：必须有出边，不能有入边
    if (type === 'start') {
      if (isOut === 0) {
        errors.push({
          type: 'error',
          message: `开始节点"${node.data?.label || node.id}"没有连线到其他节点`,
          nodeIds: [node.id],
        });
      }
      if (isIn > 0) {
        errors.push({
          type: 'error',
          message: `开始节点"${node.data?.label || node.id}"不应该有输入连线`,
          nodeIds: [node.id],
        });
      }
    }
    // 结束节点：必须有入边，不能有出边
    else if (type === 'end') {
      if (isIn === 0) {
        errors.push({
          type: 'error',
          message: `结束节点"${node.data?.label || node.id}"没有输入连线`,
          nodeIds: [node.id],
        });
      }
      if (isOut > 0) {
        errors.push({
          type: 'warning',
          message: `结束节点"${node.data?.label || node.id}"连接到其他节点，这通常是设计错误`,
          nodeIds: [node.id],
        });
      }
    }
    // 普通节点：既要有入边，也要有出边
    else {
      if (isIn === 0 && isOut === 0) {
        errors.push({
          type: 'error',
          message: `节点"${node.data?.label || node.id}"是孤立节点，没有任何连线`,
          nodeIds: [node.id],
        });
      } else if (isIn === 0) {
        errors.push({
          type: 'error',
          message: `节点"${node.data?.label || node.id}"没有输入连线，流程无法到达此节点`,
          nodeIds: [node.id],
        });
      } else if (isOut === 0) {
        errors.push({
          type: 'warning',
          message: `节点"${node.data?.label || node.id}"没有输出连线，流程会在此终止`,
          nodeIds: [node.id],
        });
      }
    }
  });

  return errors;
}

// 检查排他网关的条件表达式完整性
function validateExclusiveGateways(nodes: Node[], edges: Edge[]): ValidationError[] {
  const errors: ValidationError[] = [];

  // 找出所有有多条出边的节点（排他网关）
  const nodesWithMultipleOutgoing = nodes.filter(node => {
    const outgoingEdges = edges.filter(edge => edge.source === node.id);
    return outgoingEdges.length > 1;
  });

  nodesWithMultipleOutgoing.forEach(node => {
    const outgoingEdges = edges.filter(edge => edge.source === node.id);

    // 检查是否所有出边都有条件表达式
    const edgesWithoutCondition = outgoingEdges.filter(edge => !edge.data?.condition);

    if (edgesWithoutCondition.length > 1) {
      errors.push({
        type: 'error',
        message: `节点"${node.data?.label || node.id}"有${outgoingEdges.length}个分支，但${edgesWithoutCondition.length}个分支缺少条件表达式`,
        nodeIds: [node.id],
      });
    }

    // 检查是否有默认分支（else）
    const hasDefaultBranch = outgoingEdges.some(edge => {
      const condition = edge.data?.condition;
      return condition === 'else' || condition === 'true' || condition === '*';
    });

    if (!hasDefaultBranch && outgoingEdges.length > 0) {
      errors.push({
        type: 'warning',
        message: `节点"${node.data?.label || node.id}"没有默认分支（else），当所有条件都不满足时流程会中断`,
        nodeIds: [node.id],
      });
    }
  });

  return errors;
}

// 检查开始和结束节点的数量
function validateStartAndEndNodes(nodes: Node[]): ValidationError[] {
  const errors: ValidationError[] = [];

  const startNodes = nodes.filter(node => node.data?.type === 'start');
  const endNodes = nodes.filter(node => node.data?.type === 'end');

  if (startNodes.length === 0) {
    errors.push({
      type: 'error',
      message: '流程必须有一个开始节点',
    });
  } else if (startNodes.length > 1) {
    errors.push({
      type: 'error',
      message: `流程有${startNodes.length}个开始节点，只能有一个`,
      nodeIds: startNodes.map(n => n.id),
    });
  }

  if (endNodes.length === 0) {
    errors.push({
      type: 'warning',
      message: '流程没有结束节点，建议添加一个结束节点',
    });
  }

  return errors;
}

// 主验证函数
export function validateFlow(nodes: Node[], edges: Edge[]): ValidationResult {
  const errors: ValidationError[] = [];

  // 1. 检查开始和结束节点
  errors.push(...validateStartAndEndNodes(nodes));

  // 2. 检查孤立节点
  errors.push(...detectIsolatedNodes(nodes, edges));

  // 3. 检查死循环
  errors.push(...detectCycles(nodes, edges));

  // 4. 检查排他网关
  errors.push(...validateExclusiveGateways(nodes, edges));

  // 判断是否有错误（warning 不算）
  const hasErrors = errors.some(e => e.type === 'error');

  return {
    valid: !hasErrors,
    errors,
  };
}
