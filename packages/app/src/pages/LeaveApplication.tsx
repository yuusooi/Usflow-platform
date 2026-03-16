import { useState, useRef, useEffect } from 'react';
import { SchemaForm } from '@usflow/components';
import { extractLeaveInfo } from '../services/aiService';
import { useFormSnapshot } from '../hooks/useFormSnapshot';
import { message } from 'antd';
import ApprovalTimeline from '@/components/ApprovalTimeline';

// 审批日志的数据结构
interface ApprovalLog {
  operator: string; // 操作人
  action: string; // 操作类型：发起、同意、驳回
  time: string; // 操作时间
  comment?: string; // 备注（可选）
}

// 定义请假表单的 Schema
const leaveSchema = [
  {
    type: 'select',
    name: 'leaveType',
    label: '请假类型',
    options: [
      { label: '病假', value: '病假' },
      { label: '事假', value: '事假' },
      { label: '年假', value: '年假' },
    ],
    rules: [{ required: true, message: '请选择请假类型' }],
  },
  {
    type: 'input',
    name: 'days',
    label: '请假天数',
    props: { type: 'number' },
    rules: [{ required: true, message: '请输入请假天数' }],
  },
  {
    type: 'input',
    name: 'reason',
    label: '请假原因',
    rules: [{ required: true, message: '请输入请假原因' }],
  },
];

// 样式定义
const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 24px',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  header: {
    textAlign: 'center' as const,
    marginBottom: '32px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 700,
    color: '#1a1a1a',
    margin: '0 0 8px 0',
  },
  subtitle: {
    fontSize: '16px',
    color: '#666',
    margin: 0,
  },
  aiSection: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '32px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e8e8e8',
    maxWidth: '600px',
    margin: '0 auto 32px auto',
  },
  aiHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
  },
  aiIcon: {
    fontSize: '20px',
    fontWeight: 700,
    background: '#f0f0f0',
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666',
  },
  aiTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#1a1a1a',
    margin: '0 0 4px 0',
  },
  aiDescription: {
    fontSize: '14px',
    color: '#666',
    margin: 0,
  },
  textarea: {
    width: '100%',
    boxSizing: 'border-box' as const,
    minHeight: '100px',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #d9d9d9',
    fontSize: '14px',
    lineHeight: '1.6',
    fontFamily: 'inherit',
    resize: 'vertical' as const,
    marginBottom: '16px',
    background: '#fafafa',
    color: '#1a1a1a',
    outline: 'none',
    transition: 'all 0.2s',
  },
  aiButton: {
    width: '100%',
    padding: '14px 24px',
    background: '#1890ff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  aiButtonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  spinner: {
    fontSize: '18px',
    fontWeight: 600,
    animation: 'spin 1s linear infinite',
    display: 'inline-block',
  },
  errorBox: {
    marginTop: '16px',
    padding: '12px 16px',
    background: '#fff2f0',
    border: '1px solid #ffccc7',
    borderRadius: '8px',
    color: '#ff4d4f',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  errorIcon: {
    fontSize: '14px',
    fontWeight: 600,
  },
  formSection: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
    border: '1px solid #e8e8e8',
    maxWidth: '600px',
    margin: '0 auto',
  },
  formHeader: {
    marginBottom: '24px',
    paddingBottom: '16px',
    borderBottom: '1px solid #f0f0f0',
  },
  formTitle: {
    fontSize: '20px',
    fontWeight: 600,
    color: '#1a1a1a',
    margin: '0 0 8px 0',
  },
  formDescription: {
    fontSize: '14px',
    color: '#666',
    margin: 0,
  },
};

// 组件主体
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
  // AI 输入框的文本
  const [aiInput, setAiInput] = useState('');

  // 表单数据（用于 AI 填充）
  const [formData, setFormData] = useState({});

  // 加载状态
  const [loading, setLoading] = useState(false);

  // 错误信息
  const [error, setError] = useState('');

  // 创建 ref，用于获取表单实例
  const formRef = useRef<{
    validateFields: () => Promise<void>;
    form: any;
  }>(null);

  // 用 state 追踪 form 实例
  const [formInstance, setFormInstance] = useState<any>(null);
  // 用 state 追踪表单值（用于快照保存）
  const [formValues, setFormValues] = useState<any>({});

  // 监听 formRef 的变化，更新 state
  useEffect(() => {
    if (formRef.current?.form) {
      setFormInstance(formRef.current.form);
    }
  }, [formRef.current?.form]);

  // 表单值变化时，保存快照（带防抖）
  useEffect(() => {
    console.log('[LeaveApplication] 表单值变化:', formValues);

    // 检查表单是否为空
    const isEmpty = Object.values(formValues).every(
      (value) => value === '' || value === null || value === undefined,
    );

    if (isEmpty) {
      console.log('[LeaveApplication] 表单为空，跳过保存');
      return;
    }

    // 防抖：延迟 1 秒后保存
    const timer = setTimeout(() => {
      const STORAGE_KEY = 'form_snapshot_leave-application';
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formValues));
      console.log('[LeaveApplication] 快照已保存:', formValues);
    }, 1000);

    // 清理函数：组件卸载或 formValues 变化时，清除定时器
    return () => {
      clearTimeout(timer);
    };
  }, [formValues]);

  // 自定义恢复对话框的状态
  const [showRestoreDialog, setShowRestoreDialog] = useState(false);
  const [savedValues, setSavedValues] = useState<any>(null);

  // 使用表单快照 Hook，防止刷新丢失数据（只用于恢复）
  const { clearSnapshot } = useFormSnapshot(formInstance, {
    formId: 'leave-application',
    enabled: true,
    onRestore: (values) => {
      // 显示自定义对话框
      setSavedValues(values);
      setShowRestoreDialog(true);
    },
  });

  // 确认恢复数据
  const handleRestoreConfirm = () => {
    if (savedValues && formRef.current?.form) {
      // 恢复数据到表单
      formRef.current.form.setFieldsValue(savedValues);

      // 更新 formValues state
      setFormValues(savedValues);

      // 显示成功提示
      message.success('表单数据已恢复');
    }

    // 关闭对话框
    setShowRestoreDialog(false);
  };

  // 取消恢复数据
  const handleRestoreCancel = () => {
    // 关闭对话框
    setShowRestoreDialog(false);

    // 清除旧数据
    sessionStorage.removeItem('form_snapshot_leave-application');

    // 清空保存的值
    setSavedValues(null);
  };

  // 事件处理函数
  const handleAIFill = async () => {
    // 清空之前的错误信息
    setError('');

    // 设置加载状态为 true
    setLoading(true);

    try {
      // 调用 AI 服务提取请假信息
      const result = await extractLeaveInfo(aiInput);

      // 打印结果到控制台，方便调试
      console.log('AI 提取结果:', result);

      // 检查 AI 是否提取到了有效数据
      if (!result.leaveType && !result.days && !result.reason) {
        // 如果所有字段都是 null，说明 AI 没有提取到任何信息
        setError('抱歉，我没有从您的描述中提取到请假信息，请重新描述');
        return;
      }

      // 构建要填充到表单的数据对象
      // 只保留 AI 提取到的非空字段
      const newFormData: Record<string, any> = {};

      // 如果 AI 提取到了请假类型，添加到表单数据中
      if (result.leaveType) {
        newFormData.leaveType = result.leaveType;
      }

      // 如果 AI 提取到了天数，添加到表单数据中
      if (result.days !== null && result.days !== undefined) {
        newFormData.days = result.days;
      }

      // 如果 AI 提取到了原因，添加到表单数据中
      if (result.reason) {
        newFormData.reason = result.reason;
      }

      // 更新表单数据，SchemaForm 会自动填充到表单字段
      setFormData(newFormData);

      // 同时更新 formValues，确保快照能保存 AI 填充的数据
      setFormValues(newFormData);

      // 等待表单更新完成，然后触发校验
      // 使用 setTimeout 确保 DOM 已经更新
      setTimeout(async () => {
        try {
          // 触发表单校验，让错误提示显示出来
          await formRef.current?.validateFields();
        } catch (err) {
          // 校验失败是预期行为，不需要处理
          // 表单会自动显示红色错误提示
          console.log('表单校验未通过，需要用户补全信息');
        }
      }, 100);

      // 清空 AI 输入框，让用户知道已经处理完了
      setAiInput('');
    } catch (err) {
      // 捕获错误，AI 调用失败会进入这里
      console.error('AI 调用失败:', err);

      // 判断错误类型，给出具体的提示信息
      if (err instanceof Error) {
        // 如果是 Error 对象，显示错误消息
        setError(err.message);
      } else {
        // 其他未知错误
        setError('AI 填单失败，请稍后重试');
      }
    } finally {
      // 无论成功还是失败，都要关闭加载状态
      // 这样用户才能再次点击按钮
      setLoading(false);
    }
  };

  // 处理表单提交
  const handleSubmit = (values: any) => {
    console.log('表单提交的数据:', values);

    // 提交成功后，清除表单快照
    clearSnapshot();

    alert('请假申请提交成功！');
  };

  return (
    <>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div style={styles.container}>
        {/* 页面头部 */}
        <div style={styles.header}>
          <h1 style={styles.title}>请假申请</h1>
          <p style={styles.subtitle}>AI 智能填单让请假申请更简单</p>
        </div>

        {/* 审批时间轴 */}
        <ApprovalTimeline logs={mockLogs} />

        {/* AI 智能填单区域 */}
        <div style={styles.aiSection}>
          <div style={styles.aiHeader}>
            <div style={styles.aiIcon}>AI</div>
            <div>
              <h3 style={styles.aiTitle}>AI 智能填单</h3>
              <p style={styles.aiDescription}>用自然语言描述你的请假，AI 会自动帮你填表</p>
            </div>
          </div>

          {/* AI 输入框 */}
          <textarea
            value={aiInput}
            onChange={(e) => setAiInput(e.target.value)}
            placeholder="例如：我因为感冒发烧需要请3天病假"
            style={styles.textarea}
            disabled={loading}
          />

          {/* AI 填单按钮 */}
          <button
            type="button"
            disabled={loading || !aiInput.trim()}
            onClick={handleAIFill}
            style={{
              ...styles.aiButton,
              ...(loading || !aiInput.trim() ? styles.aiButtonDisabled : {}),
            }}
          >
            {loading ? (
              <>
                <span style={styles.spinner}>↻</span>
                AI 正在填写中...
              </>
            ) : (
              <>AI 智能填单</>
            )}
          </button>

          {/* 错误提示 */}
          {error && (
            <div style={styles.errorBox}>
              <span style={styles.errorIcon}>!</span>
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* 表单区域 */}
        <div style={styles.formSection}>
          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>请假信息</h2>
            <p style={styles.formDescription}>请填写完整的请假信息</p>
          </div>
          <SchemaForm
            ref={formRef}
            schemas={leaveSchema}
            onSubmit={handleSubmit}
            submitText="提交申请"
            values={formData}
            onValuesChange={(values) => {
              console.log('[SchemaForm] 字段值变化:', values);
              setFormValues(values);
            }}
          />
        </div>
      </div>

      {/* 自定义恢复数据确认对话框 */}
      {showRestoreDialog && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={handleRestoreCancel}
        >
          <div
            style={{
              background: 'white',
              padding: '24px',
              borderRadius: '8px',
              maxWidth: '400px',
              width: '100%',
              margin: '0 24px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              style={{
                margin: '0 0 8px 0',
                fontSize: '18px',
                fontWeight: 600,
                color: '#1a1a1a',
              }}
            >
              恢复表单数据
            </h3>
            <p
              style={{
                margin: '0 0 24px 0',
                fontSize: '14px',
                color: '#666',
                lineHeight: '1.5',
              }}
            >
              检测到您有未提交的表单数据，是否恢复？
            </p>

            {/* 显示要恢复的数据概览 */}
            {savedValues && (
              <div
                style={{
                  marginBottom: '24px',
                  padding: '12px',
                  background: '#f5f5f5',
                  borderRadius: '4px',
                  fontSize: '13px',
                }}
              >
                <div style={{ marginBottom: '4px', color: '#666' }}>将恢复以下数据：</div>
                {Object.entries(savedValues).map(
                  ([key, value]) =>
                    value && (
                      <div key={key} style={{ color: '#1a1a1a' }}>
                        {key}: {value}
                      </div>
                    ),
                )}
              </div>
            )}

            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'flex-end',
              }}
            >
              <button
                onClick={handleRestoreCancel}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #d9d9d9',
                  background: 'white',
                  color: '#666',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#f5f5f5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'white';
                }}
              >
                取消
              </button>
              <button
                onClick={handleRestoreConfirm}
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  background: '#1890ff',
                  color: 'white',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#40a9ff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#1890ff';
                }}
              >
                恢复数据
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LeaveApplication;
