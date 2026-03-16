import { SchemaForm } from '@usflow/components';
import { extractLeaveInfo } from '@/services/aiService';

const leaveSchema = [
  // 1. 请假类型（被依赖的字段）
  {
    type: 'select',
    name: 'leaveType',
    label: '请假类型',
    options: [
      { label: '病假', value: '病假' },
      { label: '事假', value: '事假' },
      { label: '年假', value: '年假' },
    ],
  },

  // 2. 开始日期（被依赖的字段）
  {
    type: 'date-picker',
    name: 'startDate',
    label: '开始日期',
  },

  // 3. 医院证明（依赖 leaveType）
  {
    type: 'input',
    name: 'hospitalProof',
    label: '医院证明编号',
    placeholder: '请上传病假证明后填写编号',
    dependencies: ['leaveType'],
    hidden: (values) => {
      return values.leaveType !== '病假';
    },
  },

  // 4. 事假原因（依赖 leaveType）
  {
    type: 'textarea',
    name: 'personalReason',
    label: '事假原因',
    placeholder: '请详细说明事假原因',
    dependencies: ['leaveType'],
    hidden: (values) => values.leaveType !== '事假',
  },

  // 5. 年假天数（依赖 leaveType 和 startDate ）
  {
    type: 'input',
    name: 'annualDays',
    label: '扣除年假天数',
    placeholder: '请输入扣除年假天数',
    props: { type: 'number', min: 1, max: 15 },
    dependencies: ['leaveType', 'startDate'],
    hidden: (values) => {
      const isAnnualLeave = values.leaveType === '年假';
      const hasStartDate = !!values.startDate;
      return !(isAnnualLeave && hasStartDate);
    },
  },
];

function LeaveForm() {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '24px' }}>
      <h1>请假申请</h1>

      <SchemaForm
        schemas={leaveSchema}
        submitText="提交申请"
        onSubmit={(values) => {
          console.log('提交数据:', values);
        }}
      />
    </div>
  );
}

export default LeaveForm;
