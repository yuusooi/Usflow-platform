import { request } from '@usflow/utils';
import type { Node, Edge } from 'reactflow';

// 流程定义数据结构
export interface ProcessDefinition {
  name: string;
  nodes: Node[];
  edges: Edge[];
  version?: string;
  status?: 'draft' | 'published';
}

// 保存流程定义
export async function saveProcessDefinition(data: ProcessDefinition) {
  return request.post('/process-definitions', data);
}

// 获取流程定义列表
export async function getProcessDefinitions() {
  return request.get('/process-definitions');
}

// 获取单个流程定义详情
export async function getProcessDefinition(id: string) {
  return request.get(`/process-definitions/${id}`);
}

// 更新流程定义
export async function updateProcessDefinition(id: string, data: ProcessDefinition) {
  return request.put(`/process-definitions/${id}`, data);
}

// 删除流程定义
export async function deleteProcessDefinition(id: string) {
  return request.delete(`/process-definitions/${id}`);
}
