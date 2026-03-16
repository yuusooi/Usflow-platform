import { SchemaForm } from '@usflow/components';

// 测试 Schema：选择国家后动态显示省份
const testSchema = [
  {
    type: 'input',
    name: 'username',
    label: '用户名',
    props: { maxLength: 20 },
  },

  {
    type: 'select',
    name: 'country',
    label: '国家',
    options: [
      { label: '中国', value: '中国' },
      { label: '美国', value: '美国' },
      { label: '日本', value: '日本' },
    ],
  },

  {
    type: 'select',
    name: 'province',
    label: '省份',
    // 只有选择中国才显示省份
    hidden: (values) => values.country !== '中国',
    // 省份选项（静态数组，后续改成函数）
    options: [
      { label: '北京', value: '北京' },
      { label: '上海', value: '上海' },
      { label: '广东', value: '广东' },
    ],
  },

  {
    type: 'input',
    name: 'city',
    label: '城市',
    // 只有选择省份后才显示城市
    hidden: (values) => !values.province,
  },
];

function TestSchemaForm() {
  const handleSubmit = (values: any) => {
    console.log('=== 表单提交 ===');
    console.log('提交的数据:', values);
    alert('提交成功！请查看控制台输出');
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px' }}>
      <h1>SchemaForm 测试页面</h1>

      <div
        style={{
          padding: '16px',
          background: '#f0f0f0',
          borderRadius: '4px',
          marginBottom: '24px',
        }}
      >
        <h3>测试说明：</h3>
        <ol>
          <li>输入用户名</li>
          <li>选择"中国" → 应该显示"省份"下拉框</li>
          <li>选择"美国"或"日本" → "省份"应该隐藏</li>
          <li>选择省份后 → 应该显示"城市"输入框</li>
          <li>点击提交 → 查看控制台输出</li>
        </ol>
      </div>

      <SchemaForm schemas={testSchema} submitText="提交" onSubmit={handleSubmit} />
    </div>
  );
}

export default TestSchemaForm;
