import type { Meta, StoryObj } from '@storybook/react'
import Input from './index'

const meta: Meta<typeof Input> = {
  title: '数据录入/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['mini', 'small', 'default', 'large'],
      description: '输入框尺寸',
    },
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    error: {
      control: 'boolean',
      description: '是否错误状态',
    },
    allowClear: {
      control: 'boolean',
      description: '是否显示清除按钮',
    },
    showCount: {
      control: 'boolean',
      description: '是否显示字数统计',
    },
    maxLength: {
      control: 'number',
      description: '最大长度',
    },
    visibilityToggle: {
      control: 'boolean',
      description: '是否显示密码切换按钮',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'number', 'email'],
      description: '输入框类型',
    },
    placeholder: {
      control: 'text',
      description: '占位文本',
    },
    onChange: { action: 'changed' },
  },
}

export default meta
type Story = StoryObj<typeof Input>

// ============ 基础用法 ============

/**
 * 默认输入框
 */
export const Default: Story = {
  args: {
    placeholder: '请输入内容',
  },
}

/**
 * 带前缀图标
 */
export const WithPrefix: Story = {
  args: {
    prefix: '🔍',
    placeholder: '搜索',
  },
}

/**
 * 带后缀图标
 */
export const WithSuffix: Story = {
  args: {
    suffix: '📌',
    placeholder: '标记',
  },
}

/**
 * 同时带前后缀
 */
export const WithPrefixAndSuffix: Story = {
  args: {
    prefix: '🔍',
    suffix: '📌',
    placeholder: '搜索并标记',
  },
}

// ============ 尺寸变体 ============

/**
 * 迷你输入框
 */
export const Mini: Story = {
  args: {
    size: 'mini',
    placeholder: 'Mini 输入框',
  },
}

/**
 * 小型输入框
 */
export const Small: Story = {
  args: {
    size: 'small',
    placeholder: 'Small 输入框',
  },
}

/**
 * 大型输入框
 */
export const Large: Story = {
  args: {
    size: 'large',
    placeholder: 'Large 输入框',
  },
}

/**
 * 所有尺寸对比
 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Input size="mini" placeholder="Mini" />
      <Input size="small" placeholder="Small" />
      <Input size="default" placeholder="Default" />
      <Input size="large" placeholder="Large" />
    </div>
  ),
}

// ============ 状态样式 ============

/**
 * 禁用状态
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '禁用的输入框',
    defaultValue: '不可编辑',
  },
}

/**
 * 错误状态
 */
export const Error: Story = {
  args: {
    error: true,
    placeholder: '请输入正确的内容',
    defaultValue: '错误的输入',
  },
}

// ============ 功能特性 ============

/**
 * 带清除按钮 - 输入内容后显示清除图标
 */
export const WithClear: Story = {
  args: {
    allowClear: true,
    placeholder: '输入内容后可清除',
    defaultValue: '可清除的内容',
  },
}

/**
 * 字数统计 - 显示当前输入字数
 */
export const WithCount: Story = {
  args: {
    showCount: true,
    placeholder: '输入内容会显示字数',
    maxLength: 100,
    defaultValue: 'Hello',
  },
}

/**
 * 字数统计 + 最大长度
 */
export const WithCountAndMaxLength: Story = {
  args: {
    showCount: true,
    maxLength: 50,
    placeholder: '最多输入50字',
    defaultValue: '已输入字数统计',
  },
}

/**
 * 密码输入框 - 带显示/隐藏切换
 */
export const PasswordInput: Story = {
  args: {
    type: 'password',
    visibilityToggle: true,
    placeholder: '请输入密码',
  },
}

/**
 * 数字输入框
 */
export const NumberInput: Story = {
  args: {
    type: 'number',
    placeholder: '请输入数字',
  },
}

/**
 * 邮箱输入框
 */
export const EmailInput: Story = {
  args: {
    type: 'email',
    placeholder: '请输入邮箱',
  },
}

// ============ 组合用法 ============

/**
 * 前缀 + 清除 + 字数统计
 */
export const CombinedFeatures: Story = {
  args: {
    prefix: '🔍',
    allowClear: true,
    showCount: true,
    maxLength: 50,
    placeholder: '搜索内容（最多50字）',
    defaultValue: '示例内容',
  },
}

/**
 * 错误 + 前缀 + 清除
 */
export const ErrorWithFeatures: Story = {
  args: {
    error: true,
    prefix: '⚠️',
    allowClear: true,
    placeholder: '输入有误',
    defaultValue: '错误的输入',
  },
}

// ============ TextArea 组件测试 ============

/**
 * TextArea - 基础用法
 */
export const TextAreaBasic: Story = {
  render: () => (
    <Input.TextArea
      placeholder="请输入多行文本"
      style={{ width: '400px' }}
    />
  ),
}

/**
 * TextArea - 带字数统计
 */
export const TextAreaWithCount: Story = {
  render: () => (
    <Input.TextArea
      placeholder="请输入内容（最多200字）"
      showCount
      maxLength={200}
      style={{ width: '400px' }}
      defaultValue="这是一段示例文本"
    />
  ),
}

/**
 * TextArea - 自适应高度（简单模式）
 */
export const TextAreaAutoSize: Story = {
  render: () => (
    <Input.TextArea
      placeholder="输入内容会自动调整高度"
      autoSize
      style={{ width: '400px' }}
      defaultValue="这是一段会自动调整高度的文本内容"
    />
  ),
}

/**
 * TextArea - 自适应高度（限制行数）
 */
export const TextAreaAutoSizeWithLimit: Story = {
  render: () => (
    <Input.TextArea
      placeholder="最小2行，最大6行"
      autoSize={{ minRows: 2, maxRows: 6 }}
      style={{ width: '400px' }}
      defaultValue="这是一个限制行数的自适应文本框。输入更多内容时会自动扩展高度，但不会低于2行，也不会超过6行。"
    />
  ),
}

/**
 * TextArea - 禁用状态
 */
export const TextAreaDisabled: Story = {
  render: () => (
    <Input.TextArea
      placeholder="禁用的多行输入框"
      disabled
      style={{ width: '400px' }}
      defaultValue="这是一段不可编辑的文本"
    />
  ),
}

/**
 * TextArea - 错误状态
 */
export const TextAreaError: Story = {
  render: () => (
    <Input.TextArea
      placeholder="输入有误"
      error
      style={{ width: '400px' }}
      defaultValue="这是一段错误的文本"
    />
  ),
}

/**
 * TextArea - 带清除按钮
 */
export const TextAreaWithClear: Story = {
  render: () => (
    <Input.TextArea
      placeholder="可清除内容的多行输入框"
      allowClear
      style={{ width: '400px' }}
      defaultValue="这是一段可以清除的文本内容"
    />
  ),
}

// ============ Input.Group 测试 ============

/**
 * Input.Group - 基础用法
 */
export const InputGroupBasic: Story = {
  render: () => (
    <Input.Group>
      <Input defaultValue="https://" style={{ width: '100px' }} />
      <Input defaultValue="example.com" style={{ width: '200px' }} />
    </Input.Group>
  ),
}

/**
 * Input.Group - 紧凑模式
 */
export const InputGroupCompact: Story = {
  render: () => (
    <Input.Group compact>
      <Input defaultValue="0571" style={{ width: '80px' }} />
      <Input defaultValue="88888888" style={{ width: '150px' }} />
      <Input defaultValue="#" style={{ width: '40px' }} />
    </Input.Group>
  ),
}

/**
 * Input.Group - 带前后缀组合
 */
export const InputGroupWithPrefixSuffix: Story = {
  render: () => (
    <Input.Group compact>
      <Input prefix="¥" defaultValue="100" style={{ width: '120px' }} />
      <Input suffix="元" defaultValue="00" style={{ width: '80px' }} />
    </Input.Group>
  ),
}

/**
 * Input.Group - 搜索框组合
 */
export const SearchInputGroup: Story = {
  render: () => (
    <Input.Group compact>
      <Input
        prefix="🔍"
        placeholder="搜索关键词"
        style={{ width: '200px' }}
      />
      <Input
        suffix="▼"
        defaultValue="全部"
        style={{ width: '80px' }}
      />
    </Input.Group>
  ),
}

// ============ 特殊场景 ============

/**
 * 受控组件示例
 */
export const ControlledInput: Story = {
  render: () => {
    // 注意：这只是展示，实际使用时需要配合 React state
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Input placeholder="受控组件（示例）" defaultValue="受控组件的值" />
        <p style={{ color: '#666', fontSize: '14px' }}>
          💡 在实际项目中，使用 value + onChange 来实现受控组件
        </p>
      </div>
    )
  },
}

/**
 * 表单场景示例
 */
export const FormExample: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px',
        border: '1px solid #e5e6eb',
        borderRadius: '8px',
        width: '400px',
      }}
    >
      <h3 style={{ margin: 0 }}>用户信息表单</h3>

      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
          用户名
        </label>
        <Input prefix="👤" placeholder="请输入用户名" />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
          邮箱
        </label>
        <Input type="email" prefix="📧" placeholder="请输入邮箱" />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
          密码
        </label>
        <Input type="password" visibilityToggle placeholder="请输入密码" />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
          个人简介（最多200字）
        </label>
        <Input.TextArea
          placeholder="请输入个人简介"
          showCount
          maxLength={200}
          autoSize={{ minRows: 3, maxRows: 6 }}
        />
      </div>
    </div>
  ),
}
