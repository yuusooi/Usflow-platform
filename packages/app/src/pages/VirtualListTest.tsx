// 导入虚拟列表组件
import ApprovalLog from '@/components/ApprovalLog';

// 测试页面组件
function VirtualListTest() {
  return (
    <div style={{ padding: '24px' }}>
      <h1>审计日志</h1>
      <p style={{ color: '#767676ed', fontSize: '16px' }}>
        虚拟列表测试：当前展示了 10000 条数据，但实际只渲染约 10 条（一屏可见数量）
      </p>

      {/* 渲染虚拟列表组件 */}
      <ApprovalLog />
    </div>
  );
}

// 导出页面组件
export default VirtualListTest;
