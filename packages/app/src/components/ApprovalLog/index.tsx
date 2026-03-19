import { useVirtualList } from '@/hooks/useVirtualList';

// 审批日志的数据结构
interface ApprovalLogItem {
  id: number; // 日志编号
  content: string; // 审批意见
  approver: string; // 审批人
  time: string; // 审批时间
}

// 审批日志组件
function ApprovalLog() {
  // 生成 1000 条模拟数据
  const mockData: ApprovalLogItem[] = Array.from({ length: 1000 }, (_, index) => ({
    id: index + 1,
    content: `审批意见 ${index + 1}`,
    approver: `审批人 ${index + 1}`,
    time: `2026-01-${String((index % 30) + 1).padStart(2, '0')} 12:00:00`,
  }));

  // 调用虚拟列表 Hook，计算出需要渲染的数据
  const { visibleList, totalHeight, offsetY, handleScroll } = useVirtualList(mockData, {
    itemHeight: 50, // 每行高度 50px，必须和下面渲染的实际高度一致
    containerHeight: 400, // 容器高度 400px
  });

  return (
    <div
      style={{
        width: '800px',
        height: '500px', // 和配置中的 containerHeight 一致
        border: '1px solid #ccc',
        overflow: 'auto',
        margin: '20px auto',
        position: 'relative', // 让内部的 absolute 元素相对于这个容器定位
      }}
      onScroll={handleScroll}
    >
      {/* 透明幽灵占位元素 撑开滚动条 */}
      <div
        style={{
          height: `${totalHeight}px`,
          position: 'absolute', //脱离文档流 自由控制位置
          left: 0,
          top: 0,
          right: 0,
          pointerEvents: 'none',
        }}
      />
      {/* 渲染列表 显示实际内容 */}
      <div
        style={{
          transform: `translateY(${offsetY}px)`,
          position: 'absolute',
          left: 0,
          top: 0,
          right: 0,
        }}
      >
        {/* 循环渲染 visibleList 中的数据 */}
        {visibleList.map((item) => (
          <div
            key={item.id}
            style={{
              height: '50px',
              borderBottom: '1px solid #eee',
              display: 'flex',
              alignItems: 'center',
              padding: '0 16px',
              boxSizing: 'border-box',
            }}
          >
            <div style={{ flex: 1 }}>{item.content}</div>
            <div style={{ width: '150px' }}>{item.approver}</div>
            <div style={{ width: '200px' }}>{item.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApprovalLog;
