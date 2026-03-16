import React, { useState } from 'react';
// 2. 导入 Ant Design 组件
import { Button, Modal, Form, Select, Input, Space } from 'antd';

// 3. 定义操作类型的联合类型
// 只能是这四个字符串之一
type ActionType = 'approve' | 'reject' | 'transfer' | 'addSigner';

// 4. 定义组件 Props
interface ApprovalActionBarProps {
  // onAction：操作回调函数，参数是操作类型和携带的数据
  onAction: (actionType: ActionType, payload?: Record<string, any>) => void;
  // loading：操作中的加载状态（用于调用 API 时禁用按钮）
  loading?: boolean;
}

// 5. 定义组件
function ApprovalActionBar({ onAction, loading = false }: ApprovalActionBarProps) {
  // 6. 用 useState 控制转办 Modal 的显示
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  // 7. 用 useState 控制加签 Modal 的显示
  const [addSignerModalOpen, setAddSignerModalOpen] = useState(false);

  // 8. 创建 Form 实例，用于获取表单数据
  const [transferForm] = Form.useForm();
  const [addSignerForm] = Form.useForm();

  // 9. 处理同意按钮点击
  const handleApprove = () => {
    onAction('approve');
  };

  // 10. 处理驳回按钮点击
  const handleReject = () => {
    onAction('reject');
  };

  // 11. 处理转办按钮点击
  const handleTransferClick = () => {
    setTransferModalOpen(true);
  };

  // 12. 处理转办 Modal 确认
  const handleTransferConfirm = async () => {
    try {
      // 13. 获取表单值（会触发校验）
      const values = await transferForm.validateFields();
      // 14. 调用回调，传递操作类型和表单数据
      onAction('transfer', values);
      // 15. 关闭 Modal 并重置表单
      setTransferModalOpen(false);
      transferForm.resetFields();
    } catch (error) {
      // 表单校验失败，不关闭 Modal
      console.error('表单校验失败:', error);
    }
  };

  // 16. 处理加签按钮点击
  const handleAddSignerClick = () => {
    setAddSignerModalOpen(true);
  };

  // 17. 处理加签 Modal 确认
  const handleAddSignerConfirm = async () => {
    try {
      const values = await addSignerForm.validateFields();
      onAction('addSigner', values);
      setAddSignerModalOpen(false);
      addSignerForm.resetFields();
    } catch (error) {
      console.error('表单校验失败:', error);
    }
  };

  // 18. 模拟用户数据（后续会从 API 获取）
  const mockUsers = [
    { label: '张三', value: 'user1' },
    { label: '李四', value: 'user2' },
    { label: '王五', value: 'user3' },
  ];

  return (
    <div>
      {/* 19. 四个操作按钮 */}
      <Space>
        {/* 同意按钮：type="primary" 是 Ant Design 的主要按钮样式（蓝色） */}
        <Button type="primary" onClick={handleApprove} loading={loading}>
          同意
        </Button>

        {/* 驳回按钮：danger 是 Ant Design 的危险按钮样式（红色） */}
        <Button danger onClick={handleReject} loading={loading}>
          驳回
        </Button>

        {/* 转办按钮：默认样式 */}
        <Button onClick={handleTransferClick} loading={loading}>
          转办
        </Button>

        {/* 加签按钮：默认样式 */}
        <Button onClick={handleAddSignerClick} loading={loading}>
          加签
        </Button>
      </Space>

      {/* 20. 转办 Modal */}
      <Modal
        title="转办任务"
        open={transferModalOpen}
        onOk={handleTransferConfirm}
        onCancel={() => setTransferModalOpen(false)}
        okText="确认转办"
        cancelText="取消"
      >
        <Form form={transferForm} layout="vertical">
          {/* 21. 转办人选择器 */}
          <Form.Item
            name="assignee"
            label="转办给"
            // rules：校验规则
            rules={[{ required: true, message: '请 选择转办人' }]}
          >
            <Select placeholder="请选择转办人" options={mockUsers} />
          </Form.Item>

          {/* 22. 备注输入框 */}
          <Form.Item
            name="remark"
            label="备注"
            rules={[{ required: true, message: '请 填写备注' }]}
          >
            <Input.TextArea placeholder="请填写转办备注" rows={3} maxLength={200} showCount />
          </Form.Item>
        </Form>
      </Modal>

      {/* 23. 加签 Modal */}
      <Modal
        title="加签"
        open={addSignerModalOpen}
        onOk={handleAddSignerConfirm}
        onCancel={() => setAddSignerModalOpen(false)}
        okText="确认加签"
        cancelText="取消"
      >
        <Form form={addSignerForm} layout="vertical">
          {/* 24. 加签人选择器（支持多选） */}
          <Form.Item
            name="signers"
            label="加签给"
            rules={[{ required: true, message: '请 选择加签人' }]}
          >
            <Select
              mode="multiple" // mode="multiple"  表示支持多选
              placeholder="请选择加签人"
              options={mockUsers}
            />
          </Form.Item>

          {/* 25. 备注输入框 */}
          <Form.Item
            name="remark"
            label="备注"
            rules={[{ required: true, message: '请 填写备注' }]}
          >
            <Input.TextArea placeholder="请填写加签备注" rows={3} maxLength={200} showCount />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

// 26. 导出组件
export default ApprovalActionBar;
