import { Drawer } from 'antd';
import type { FormItemSchema } from '@usflow/pro-components';
import ApprovalActionBar from './ApprovalActionBar';

// 定义任务详情的类型
export interface TaskDetail {
  id: string;
  taskNo: string;
  initiator: string;
  applicationType: string;
  createTime: string;
  status: string;
  // formData：表单数据，用于展示申请人填写的表单内容
  formData?: Record<string, any>;
  // schema：表单配置，定义表单有哪些字段
  schema?: FormItemSchema[];
}

// 定义 ApprovalDrawer 组件的 Props
interface ApprovalDrawerProps {
  // open：控制抽屉是否打开
  open: boolean;
  // onClose：关闭抽屉的回调函数
  onClose: () => void;
  // taskDetail：任务详情数据
  taskDetail?: TaskDetail;
}

// 定义 ApprovalDrawer 组件
function ApprovalDrawer({ open, onClose, taskDetail }: ApprovalDrawerProps) {
  // 处理审批操作的回调函数
  // actionType：操作类型（同意、驳回、转办、加签）
  // payload：操作携带的数据（比如备注、转办人）
  const handleAction = (actionType: string, payload?: Record<string, any>) => {
    console.log('审批操作:', actionType, payload);
    // TODO: 后续会调用真实的 API
  };

  return (
    // Drawer 组件
    <Drawer
      // title：抽屉标题，显示任务单号
      title={taskDetail ? `任务详情 - ${taskDetail.taskNo}` : '任务详情'}
      // open：控制打开/关闭状态
      open={open}
      // onClose：关闭时的回调
      onClose={onClose}
      // width：抽屉宽度
      width={600}
      // placement：从哪侧滑出，'right' 表示从右侧
      placement="right"
    >
      {/* 如果有任务详情，渲染内容 */}
      {taskDetail && (
        <div>
          {/* 任务基本信息 */}
          <div style={{ marginBottom: '24px' }}>
            <h3>基本信息</h3>
            <p>发起人：{taskDetail.initiator}</p>
            <p>申请类型：{taskDetail.applicationType}</p>
            <p>发起时间：{taskDetail.createTime}</p>
          </div>

          {/* 表单内容区域（只读） */}
          {taskDetail.schema && taskDetail.formData && (
            <div style={{ marginBottom: '24px' }}>
              <h3>表单内容</h3>
              {/* 渲染 SchemaForm，但所有字段都是 disabled */}
              <ReadOnlySchemaForm schema={taskDetail.schema} values={taskDetail.formData} />
            </div>
          )}

          {/* 审批操作栏 */}
          <div>
            <h3>审批操作</h3>
            <ApprovalActionBar onAction={handleAction} />
          </div>
        </div>
      )}
    </Drawer>
  );
}

// 定义只读 SchemaForm 组件，把 SchemaForm 的所有字段设置为 disabled
interface ReadOnlySchemaFormProps {
  schema: FormItemSchema[];
  values: Record<string, any>;
}

function ReadOnlySchemaForm({ schema, values }: ReadOnlySchemaFormProps) {
  // 遍历 schema，给每个字段添加 disabled 属性
  const readonlySchema = schema.map((item) => ({
    ...item,
    // props 中添加 disabled: true，使组件变为只读
    props: {
      ...item.props,
      disabled: true,
    },
  }));

  return (
    // 渲染 SchemaForm
    <div>
      {/* Ant Design 的原生 Form 组件，用于渲染只读字段 */}
      {readonlySchema.map((field) => (
        <div key={field.name} style={{ marginBottom: '16px' }}>
          {/* 字段标签 */}
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            {field.label}
          </label>
          {/* 字段值 */}
          <div
            style={{
              padding: '8px 12px',
              background: 'var(--bg-layout, #f5f5f5)',
              borderRadius: '4px',
              color: 'var(--text-main, rgba(0, 0, 0, 0.88))',
              border: '1px solid var(--border-line, #d9d9d9)'
            }}
          >
            {/* 根据字段类型渲染不同的显示方式 */}
            {field.type === 'select' && field.props && 'options' in field.props && Array.isArray(field.props.options) ? (
              // 如果是下拉框，显示选中的文字
              <span>
                {field.props.options.find((opt: any) => opt.value === values[field.name])
                  ?.label || values[field.name]}
              </span>
            ) : (
              // 其他类型直接显示值
              <span>{values[field.name]}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ApprovalDrawer;
