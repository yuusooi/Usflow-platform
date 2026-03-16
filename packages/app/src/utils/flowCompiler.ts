import type { Node, Edge } from 'reactflow';

// 节点数据的类型定义
interface NodeData {
  label: string;
  type?: 'start' | 'approval' | 'end';
  approverType?: string;
  approverRole?: string;
}

// 流程步骤的类型
type StepType = 'start' | 'approval' | 'end' | 'exclusiveGateway';

// 条件分支，用于排他网关
interface ConditionBranch {
  condition: string; // 条件表达式，比如 "amount >= 5000"
  nextStepId: string; // 满足条件时跳转到的步骤 ID
}

// 后端流程引擎需要的步骤结构
interface ProcessStep {
  stepId: string; // 步骤的唯一标识
  type: StepType; // 步骤类型
  label?: string; // 步骤名称（用于显示）
  approverType?: string; // 审批人类型
  approverRole?: string; // 审批角色
  branches?: ConditionBranch[]; // 条件分支（只有网关节点才有）
  nextStepId?: string; // 下一步的步骤 ID（普通节点用）
}

// 完整的流程定义
interface ProcessDefinition {
  startStepId: string; // 开始步骤的 ID
  steps: ProcessStep[]; // 所有步骤的数组
}

// 连线数据的类型（包含 condition）
interface EdgeData {
  condition?: string;
}

// 主编译函数：将 React Flow 的 nodes 和 edges 转换成后端流程定义
export function compileFlowToProcessDefinition(
  nodes: Node<NodeData>[],
  edges: Edge<EdgeData>[],
): ProcessDefinition {
  // 第一步：找出开始节点
  const startNode = nodes.find((node) => node.data.type === 'start');

  // 如果找不到开始节点，抛出错误
  if (!startNode) {
    throw new Error('流程必须有一个开始节点');
  }

  // 第二步：构建步骤映射表，方便后续查找
  const stepMap = new Map<string, ProcessStep>();

  // 遍历所有节点，创建对应的步骤对象
  nodes.forEach((node) => {
    const step: ProcessStep = {
      stepId: node.id,
      type: node.data.type || 'approval',
      label: node.data.label,
      approverType: node.data.approverType,
      approverRole: node.data.approverRole,
    };

    // 把步骤存到 Map 里，key 是节点 ID
    stepMap.set(node.id, step);
  });

  // 第三步：遍历所有连线，构建步骤之间的连接关系
  edges.forEach((edge) => {
    // 从 Map 中获取源节点对应的步骤
    const sourceStep = stepMap.get(edge.source);

    // 如果源节点不存在（异常情况），跳过
    if (!sourceStep) return;

    // 获取连线数据（条件表达式）
    const edgeData = (edge.data || {}) as EdgeData;

    // 如果连线有条件表达式，说明这是条件分支
    if (edgeData.condition) {
      // 初始化 branches 数组（如果还没有）
      if (!sourceStep.branches) {
        sourceStep.branches = [];
      }

      // 添加条件分支
      sourceStep.branches.push({
        condition: edgeData.condition,
        nextStepId: edge.target,
      });

      // 如果源步骤原本不是网关，现在改成网关类型
      if (sourceStep.type !== 'exclusiveGateway') {
        sourceStep.type = 'exclusiveGateway';
      }
    } else {
      // 没有条件表达式，这是普通连接
      sourceStep.nextStepId = edge.target;
    }
  });

  // 第四步：从 Map 中提取所有步骤，转换成数组
  const steps = Array.from(stepMap.values());

  // 第五步：返回完整的流程定义
  return {
    startStepId: startNode.id,
    steps,
  };
}
