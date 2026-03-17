import { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  Form,
  Select,
  Timeline,
  Typography,
  Alert,
  Space,
  Modal,
} from 'antd';
import { RobotOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { extractLeaveInfo } from '../services/aiService';
import { useFormSnapshot } from '../hooks/useFormSnapshot';
import { message } from 'antd';

const { TextArea } = Input;
const { Title, Text } = Typography;

// 审批日志的数据结构
interface ApprovalLog {
  operator: string;
  action: string;
  time: string;
  comment?: string;
}

/**
 * 请假申请页面 - 左右布局重构版
 *
 * 布局结构：
 * - 左侧 70%：AI 智能填单区 + 核心表单区
 * - 右侧 30%：审批流程预览 + 温馨提示
 */
function LeaveApplication() {
  // 创建模拟的审批日志数据
  const mockLogs: ApprovalLog[] = [
    {
      operator: '张三',
      action: '发起',
      time: '2026-01-15 09:00:00',
      comment: '申请事假，原因：家里有事',
    },
    {
      operator: '李四（部门经理）',
      action: '同意',
      time: '2026-01-15 10:30:00',
      comment: '同意请假，工作已交接',
    },
    {
      operator: '王五（人事）',
      action: '同意',
      time: '2026-01-15 14:00:00',
    },
  ];

  // 状态管理
  const [aiInput, setAiInput] = useState('');
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form] = Form.useForm();

  // 表单快照恢复相关状态
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);
  const [savedValues, setSavedValues] = useState<any>(null);
  const [formValues, setFormValues] = useState<any>({});

  // 使用表单快照 Hook
  const { clearSnapshot } = useFormSnapshot(form, {
    formId: 'leave-application',
    enabled: true,
    onRestore: (values) => {
      setSavedValues(values);
      setShowRestoreDialog(true);
    },
  });

  // 表单值变化时，保存快照（带防抖）
  useEffect(() => {
    const isEmpty = Object.values(formValues).every(
      (value) => value === '' || value === null || value === undefined,
    );

    if (isEmpty) {
      return;
    }

    const timer = setTimeout(() => {
      const STORAGE_KEY = 'form_snapshot_leave-application';
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formValues));
      console.log('[LeaveApplication] 快照已保存:', formValues);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [formValues]);

  // AI 智能填单处理
  const handleAiGenerate = async (value: string) => {
    setError('');
    setLoading(true);

    try {
      const result = await extractLeaveInfo(value);
      console.log('AI 提取结果:', result);

      if (!result.leaveType && !result.days && !result.reason) {
        setError('抱歉，我没有从您的描述中提取到请假信息，请重新描述');
        return;
      }

      const newFormData: Record<string, any> = {};

      if (result.leaveType) {
        newFormData.leaveType = result.leaveType;
      }

      if (result.days !== null && result.days !== undefined) {
        newFormData.days = result.days;
      }

      if (result.reason) {
        newFormData.reason = result.reason;
      }

      // 填充表单
      form.setFieldsValue(newFormData);
      setFormData(newFormData);
      setFormValues(newFormData);

      // 触发校验
      setTimeout(async () => {
        try {
          await form.validateFields();
        } catch (err) {
          console.log('表单校验未通过，需要用户补全信息');
        }
      }, 100);

      setAiInput('');
      message.success('AI 已自动填单，请确认信息');
    } catch (err) {
      console.error('AI 调用失败:', err);
      setError(err instanceof Error ? err.message : 'AI 填单失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 表单提交处理
  const handleSubmit = (values: any) => {
    console.log('表单提交的数据:', values);
    clearSnapshot();
    message.success('请假申请提交成功！');
  };

  // 确认恢复数据
  const handleRestoreConfirm = () => {
    if (savedValues) {
      form.setFieldsValue(savedValues);
      setFormValues(savedValues);
      message.success('表单数据已恢复');
    }
    setShowRestoreDialog(false);
  };

  // 取消恢复数据
  const handleRestoreCancel = () => {
    setShowRestoreDialog(false);
    sessionStorage.removeItem('form_snapshot_leave-application');
    setSavedValues(null);
  };

  return (
    <>
      {/* 主容器 - 浅灰背景 */}
      <div style={{ padding: '24px', minHeight: '100vh', background: 'var(--bg-layout, #f5f7fa)' }}>
        {/* 顶部标题区 */}
        <div style={{ marginBottom: 24 }}>
          <Title level={3} style={{ margin: 0, color: 'var(--text-main, #262626)' }}>
            请假申请
          </Title>
          <Text type="secondary">AI 智能填单，帮您填写请假申请</Text>
        </div>

        {/* 左右两列 */}
        <Row gutter={[24, 24]}>
          {/* 左侧主操作区 (66%) */}
          <Col xs={24} lg={16}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {/* AI填单区 */}
              <Card
                bodyStyle={{ padding: '16px 24px', background: 'var(--bg-hover, #f0f5ff)' }}
                bordered={false}
                style={{ borderRadius: 8, background: 'var(--bg-container, #ffffff)' }}
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <RobotOutlined
                      style={{ fontSize: 20, color: 'var(--color-primary, #2383e2)' }}
                    />
                    <strong style={{ fontSize: 16, color: 'var(--color-primary, #2383e2)' }}>
                      AI 智能填单助手
                    </strong>
                  </div>
                  <Input.Search
                    placeholder="例如：我因为重感冒发烧，需要请明后天两天的病假"
                    enterButton={
                      <Button type="primary" icon={<RobotOutlined />} loading={loading}>
                        一键生成表单
                      </Button>
                    }
                    size="large"
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    onSearch={handleAiGenerate}
                    disabled={loading}
                  />
                  {error && (
                    <Alert
                      message={error}
                      type="error"
                      showIcon
                      closable
                      onClose={() => setError('')}
                    />
                  )}
                </Space>
              </Card>

              {/* 核心表单区 */}
              <Card
                title="请假详细信息"
                bordered={false}
                style={{ borderRadius: 8, background: 'var(--bg-container, #ffffff)' }}
              >
                <Form
                  form={form}
                  layout="vertical"
                  size="large"
                  onFinish={handleSubmit}
                  onValuesChange={(values) => {
                    console.log('[Form] 字段值变化:', values);
                    setFormValues({ ...formValues, ...values });
                  }}
                >
                  <Form.Item
                    label="请假类型"
                    name="leaveType"
                    rules={[{ required: true, message: '请选择请假类型' }]}
                  >
                    <Select placeholder="请选择请假类型">
                      <Select.Option value="病假">病假</Select.Option>
                      <Select.Option value="事假">事假</Select.Option>
                      <Select.Option value="年假">年假</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="请假天数"
                    name="days"
                    rules={[{ required: true, message: '请输入请假天数' }]}
                  >
                    <Input placeholder="请输入请假天数 (如: 1, 0.5)" type="number" />
                  </Form.Item>

                  <Form.Item
                    label="请假原因"
                    name="reason"
                    rules={[{ required: true, message: '请输入请假原因' }]}
                  >
                    <TextArea rows={4} placeholder="请输入详细的请假原因" />
                  </Form.Item>

                  <Form.Item style={{ marginTop: 32, marginBottom: 0 }}>
                    <Button type="primary" size="large" htmlType="submit" style={{ width: 120 }}>
                      提交申请
                    </Button>
                  </Form.Item>
                </Form>
              </Card>
            </Space>
          </Col>

          {/* 右侧辅助信息区 (33%) */}
          <Col xs={24} lg={8}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {/* 1. 审批流程预览 */}
              <Card
                title="审批流程预览"
                bordered={false}
                style={{ borderRadius: 8, background: 'var(--bg-container, #ffffff)' }}
              >
                <Timeline
                  items={[
                    {
                      color: 'blue',
                      dot: <UserOutlined style={{ fontSize: '16px' }} />,
                      children: (
                        <>
                          <div style={{ fontWeight: 500 }}>发起申请</div>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            本人 (张三)
                          </Text>
                        </>
                      ),
                    },
                    {
                      color: 'gray',
                      dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                      children: (
                        <>
                          <div style={{ fontWeight: 500 }}>部门经理审批</div>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            预计处理人：李四
                          </Text>
                        </>
                      ),
                    },
                    {
                      color: 'gray',
                      dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                      children: (
                        <>
                          <div style={{ fontWeight: 500 }}>HR 归档记录</div>
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            预计处理人：王五
                          </Text>
                        </>
                      ),
                    },
                  ]}
                />
              </Card>

              {/* 2. 温馨提示/规则说明 */}
              <Alert
                message="请假制度说明"
                description={
                  <ul
                    style={{
                      paddingLeft: 16,
                      margin: 0,
                      color: 'var(--text-secondary, #595959)',
                      fontSize: 13,
                    }}
                  >
                    <li>请假半天按 0.5 天计算。</li>
                    <li>连续请病假超过 3 天，销假时需提供三甲医院就诊证明。</li>
                    <li>
                      当前您的可用年假余额为：<strong>5 天</strong>。
                    </li>
                  </ul>
                }
                type="info"
                showIcon
                style={{ borderRadius: 8 }}
              />
            </Space>
          </Col>
        </Row>
      </div>

      {/* 恢复数据确认对话框 */}
      <Modal
        title="恢复表单数据"
        open={showRestoreDialog}
        onOk={handleRestoreConfirm}
        onCancel={handleRestoreCancel}
        okText="恢复数据"
        cancelText="取消"
      >
        <p>检测到您有未提交的表单数据，是否恢复？</p>

        {savedValues && (
          <div
            style={{
              marginBottom: 16,
              padding: 12,
              background: 'var(--bg-hover, #f5f5f5)',
              borderRadius: 4,
              fontSize: 13,
            }}
          >
            <div style={{ marginBottom: 4, color: 'var(--text-secondary, #666)' }}>
              将恢复以下数据：
            </div>
            {Object.entries(savedValues).map(
              ([key, value]) =>
                value && (
                  <div key={key} style={{ color: 'var(--text-main, #1a1a1a)' }}>
                    {key}: {value}
                  </div>
                ),
            )}
          </div>
        )}
      </Modal>
    </>
  );
}

export default LeaveApplication;
