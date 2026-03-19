import { Tag } from 'antd';

// 定义任务状态类型
type TaskStatus = 'pending' | 'approved' | 'rejected' | 'transferred';

// 定义状态到样式的映射关系
const statusStyleMap: Record<TaskStatus, { backgroundColor: string; color: string }> = {
  pending: {
    backgroundColor: 'var(--color-info, #1890ff)',
    color: '#fff',
  },
  approved: {
    backgroundColor: 'var(--color-success, #0f7b6c)',
    color: '#fff',
  },
  rejected: {
    backgroundColor: 'var(--color-error, #e03e3e)',
    color: '#fff',
  },
  transferred: {
    backgroundColor: 'var(--color-warning, #d9730d)',
    color: '#fff',
  },
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
  // 从映射表中获取对应的样式和文字
  const style = statusStyleMap[status];
  const text = statusTextMap[status];

  // 返回自定义样式的 Tag 组件
  return (
    <Tag
      style={{
        backgroundColor: style.backgroundColor,
        color: style.color,
        border: 'none',
        fontWeight: 500,
      }}
    >
      {text}
    </Tag>
  );
}

// 导出组件
export default StatusTag;
