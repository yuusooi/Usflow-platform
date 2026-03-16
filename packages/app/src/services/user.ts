import { request } from '@usflow/utils';
import type { UserDTO, UserVO } from '../models/user';
import { toUserVO } from '../models/user';

export const userService = {
  // 获取用户信息
  fetchUser: async (): Promise<UserVO> => {
    // 调用API，获取后端返回的原始数据UserDTO
    const response = await request.get<UserDTO>('/api/user');

    // 从响应里提取data字段（axios的响应结构是response.data）
    const dto: UserDTO = response.data;

    // 通过防腐层转换函数，把DTO转换为VO
    const vo: UserVO = toUserVO(dto);

    // 返回前端友好的VO数据
    return vo;
  },
};
