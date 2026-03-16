// Data Transfer Object数据传输对象 后端返回的数据结构
export interface UserDTO {
  // 后端用的字段名模拟
  usr_id: number; // 用户ID
  usr_name: string; // 用户名
  status_code: 0 | 1; // 状态：0=禁用，1=激活
  crt_time: number; // 创建时间（时间戳）
  up_time: number | null; // 更新时间（时间戳，可能为null）
}

// View Object视图对象 前端业务层使用的数据结构
export interface UserVO {
  // 前端用的字段名
  id: number; // 用户ID
  name: string; // 用户名
  isActive: boolean; // 是否激活（布尔值，更直观）
  createdAt: string; // 创建时间（格式化后的日期字符串）
  updatedAt: string | null; // 更新时间（格式化 后的日期字符串，可能为空）
}

// 数据转换函数
export const toUserVO = (dto: UserDTO): UserVO => {
  return {
    // 字段映射 + 数据清洗
    id: dto.usr_id, // usr_id → id
    name: dto.usr_name, // usr_name → name
    isActive: dto.status_code === 1, // 0|1 → boolean

    // 时间戳格式化
    createdAt: formatTimestamp(dto.crt_time),
    updatedAt: dto.up_time ? formatTimestamp(dto.up_time) : null,
  };
};

// 格式化时间戳 将时间戳转换为日期字符串
const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp * 1000); // 后端给秒，JS需要毫秒
  return date.toLocaleString('zh-CN', {
    year: 'numeric', //数字年份 2026
    month: '2-digit', //两位月份 03
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, // 使用24小时制
  });
};
