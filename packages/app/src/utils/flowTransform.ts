import type { Node, Edge } from 'reactflow';

// 定义后端流程引擎需要的数据结构
interface BackendStep {
  stepId: string; // 步骤编号
  type: 'start' | 'approval' | 'end'; // 步骤类型
  approverRole?: string; // 审批角色
  nextStepIds: string[]; // 下一步的步骤编号列表
}

// 把前端的节点和连线转换成后端的执行逻辑
export const transformFlowToJSON = (nodes: Node[], edges: Edge[]): BackendStep[] => {
  // 遍历所有节点，把每个节点转换成后端步骤
  return nodes.map((node) => {
    // 找出当前节点作为源头的所有连线
    const outEdges = edges.filter((edge) => edge.source === node.id);

    // 从出边中提取目标节点的id（下一步的步骤编号）
    const nextStepIds = outEdges.map((edge) => edge.target);

    // 返回后端步骤对象
    return {
      stepId: node.id,
      type: node.data.type || 'approval',
      approverRole: node.data.approverRole,
      nextStepIds,
    };
  });
};
