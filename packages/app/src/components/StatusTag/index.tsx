import { Tag } from 'antd';

// 定义任务状态类型
type TaskStatus = 'pending' | 'approved' | 'rejected' | 'transferred';

// 定义状态到颜色的映射关系
const statusColorMap: Record<TaskStatus, string> = {
  pending: 'blue', // 待办显示蓝色
  approved: 'success', // 已通过显示绿色
  rejected: 'error', // 已驳回显示红色
  transferred: 'orange', // 已转办显示橙色
};

// 定义状态到中文的映射关系
const statusTextMap: Record<TaskStatus, string> = {
  pending: '待办',
  approved: '已通过',
  rejected: '已驳回',
  transferred: '已转办',
};

// 定义组件的 Props 类型
interface StatusTagProps {
  // status 参数必须是 TaskStatus 类型之一
  status: TaskStatus;
}

// 定义 StatusTag 组件
function StatusTag({ status }: StatusTagProps) {
  // 从映射表中获取对应的颜色和文字
  const color = statusColorMap[status];
  const text = statusTextMap[status];

  // 返回 Tag 组件，传入颜色和文字
  return <Tag color={color}>{text}</Tag>;
}

// 导出组件
export default StatusTag;
