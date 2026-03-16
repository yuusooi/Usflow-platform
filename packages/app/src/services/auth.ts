import { request } from '@usflow/utils';
import type { LoginParams, LoginResponse } from '@/models/auth';

// 登录接口 返回登录成功后的数据（token、用户信息、菜单树）
export async function login(params: LoginParams): Promise<LoginResponse> {
  return request.post('/api/auth/login', params);
}

// 获取用户信息接口 返回用户信息和菜单权限
export async function getUserInfo(): Promise<LoginResponse> {
  return request.get('/api/auth/user-info');
}

// 退出登录接口
export async function logout(): Promise<void> {
  return request.post('/api/auth/logout');
}
