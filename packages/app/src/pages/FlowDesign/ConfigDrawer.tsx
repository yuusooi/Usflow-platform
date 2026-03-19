import { Drawer, Form, Input, Select } from 'antd';
import { useEffect } from 'react';
import type { NodeData } from './index';

// 从 FlowDesign 传递过来的属性
interface ConfigDrawerProps {
  // 控制抽屉打开/关闭状态
  open: boolean;
  // 当前选中的节点数据，没有选中时为 null
  selectedNode: { id: string; data: NodeData } | null;
  // 当前选中的连线数据，没有选中时为 null
  selectedEdge: { id: string; source: string; target: string } | null;
  // 关闭抽屉的回调函数
  onClose: () => void;
  // 保存节点配置的回调函数，参数是节点 ID 和新的节点数据
  onSaveNode: (nodeId: string, newData: NodeData) => void;
  // 保存连线配置的回调函数
  onSaveEdge: (edgeId: string, newData: { condition?: string }) => void;
}

// 配置抽屉组件
function ConfigDrawer({
  open,
  selectedNode,
  selectedEdge,
  onClose,
  onSaveNode,
  onSaveEdge,
}: ConfigDrawerProps) {
  // 使用 Ant Design 的 Form Hook，form 实例用于操作表单
  const [form] = Form.useForm();

  // 定义审批角色的选项列表
  const roleOptions = [
    { label: '财务 BP', value: '财务BP' },
    { label: 'HR', value: 'HR' },
    { label: '部门总监', value: '部门总监' },
  ];

  // 监听表单中 审批人类型 字段的变化
  const approverTypeValue = Form.useWatch('approverType', form);

  // 当 selectedNode 或 selectedEdge 变化时，重置表单
  useEffect(() => {
    if (selectedNode) {
      // 如果选中了节点，把节点的数据填充到表单里
      form.setFieldsValue(selectedNode.data);
    } else if (selectedEdge) {
      // 如果选中了连线，从 edge.data 中读取 condition 字段
      const edgeData = (selectedEdge as any).data || {};
      form.setFieldsValue({
        condition: edgeData.condition || '',
      });
    } else {
      // 如果什么都没选中，清空表单
      form.resetFields();
    }
  }, [selectedNode, selectedEdge, form]);

  // 抽屉标题：根据选中的是节点还是连线，显示不同的标题
  const title = selectedNode ? '配置节点' : '配置连线';

  return (
    <Drawer title={title} placement="right" width={400} open={open} onClose={onClose}>
      <Form form={form} layout="vertical">
        {selectedNode ? (
          // 如果选中了节点，显示节点配置表单
          <>
            <Form.Item
              label="节点名称"
              name="label"
              rules={[{ required: true, message: '请输入节点名称' }]}
            >
              <Input placeholder="请输入节点名称" />
            </Form.Item>

            <Form.Item
              label="审批人类型"
              name="approverType"
              rules={[{ required: true, message: '请选择审批人类型' }]}
            >
              <Select
                placeholder="请选择审批人类型"
                options={[
                  { label: '指定人员', value: 'specified' },
                  { label: '动态角色', value: 'role' },
                  { label: '发起人主管', value: 'manager' },
                ]}
              />
            </Form.Item>

            {approverTypeValue === 'role' && (
              <Form.Item
                label="选择角色"
                name="approverRole"
                rules={[{ required: true, message: '请选择角色' }]}
              >
                <Select placeholder="请选择角色" options={roleOptions} />
              </Form.Item>
            )}
          </>
        ) : (
          // 连线配置表单
          <>
            <Form.Item
              label="条件表达式"
              name="condition"
              rules={[{ required: true, message: '请输入条件表达式' }]}
              extra="例如：amount >= 5000"
            >
              <Input.TextArea
                placeholder="请输入条件表达式，例如：amount >= 5000"
                autoSize={{ minRows: 3, maxRows: 6 }}
              />
            </Form.Item>
          </>
        )}
      </Form>
      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <button
          onClick={() => {
            form
              .validateFields()
              .then((values) => {
                if (selectedNode) {
                  // 保存节点配置
                  onSaveNode(selectedNode.id, values);
                } else if (selectedEdge) {
                  // 保存连线配置
                  onSaveEdge(selectedEdge.id, values);
                }
              })
              .catch((errorInfo) => {
                console.log('验证失败：', errorInfo);
              });
          }}
          style={{
            padding: '8px 16px',
            background: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          保存
        </button>
      </div>
    </Drawer>
  );
}

export default ConfigDrawer;
