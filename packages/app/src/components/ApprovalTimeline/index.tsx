import { Timeline } from 'antd';

// 定义审批日志的数据结构
interface ApprovalLog {
  operator: string;
  action: string;
  time: string;
  comment?: string;
}

// 审批时间轴组件
function ApprovalTimeline({ logs }: { logs: ApprovalLog[] }) {
  // 根据操作类型返回对应的颜色
  const getActionColor = (action: string): string => {
    switch (action) {
      case '发起':
        return 'blue';
      case '同意':
        return 'green';
      case '驳回':
        return 'red';
      default:
        return 'gray';
    }
  };

  // 渲染时间轴
  return (
    <Timeline>
      {logs.map((log) => (
        <Timeline.Item key={log.time} color={getActionColor(log.action)}>
          <div>
            <div style={{ fontWeight: 'bold' }}>{log.operator}</div>
            <div style={{ color: '#666' }}>{log.action}</div>
            <div style={{ color: '#999', fontSize: '12px' }}>{log.time}</div>
            {log.comment && <div style={{ color: '#666', marginTop: '4px' }}>{log.comment}</div>}
          </div>
        </Timeline.Item>
      ))}
    </Timeline>
  );
}

export default ApprovalTimeline;
