import type { Meta, StoryObj } from '@storybook/react'
import Button from './index'

// 1. 定义元数据（Meta）：告诉 Storybook 这个组件叫什么，有哪些参数
const meta: Meta<typeof Button> = {
  title: '通用与布局/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered', // 在画布中央显示组件
  },
  argTypes: {
    // 按钮类型
    type: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'dashed', 'text', 'outline'],
      description: '按钮类型',
    },
    // 按钮尺寸
    size: {
      control: 'select',
      options: ['mini', 'small', 'default', 'large'],
      description: '按钮尺寸',
    },
    // 按钮状态
    status: {
      control: 'select',
      options: ['default', 'warning', 'danger', 'success'],
      description: '按钮状态',
    },
    // 按钮形状
    shape: {
      control: 'select',
      options: ['square', 'circle', 'round'],
      description: '按钮形状',
    },
    // 渲染标签
    as: {
      control: 'select',
      options: ['button', 'a'],
      description: '渲染标签类型',
    },
    // 布尔值控制
    disabled: {
      control: 'boolean',
      description: '是否禁用',
    },
    loading: {
      control: 'boolean',
      description: '是否加载中',
    },
    loadingFixedWidth: {
      control: 'boolean',
      description: '加载时保持宽度',
    },
    long: {
      control: 'boolean',
      description: '宽度拉伸',
    },
    // 链接属性
    href: {
      control: 'text',
      description: '链接地址',
    },
    target: {
      control: 'select',
      options: ['_self', '_blank', '_parent', '_top'],
      description: '链接打开方式',
    },
    // 原生属性
    htmlType: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: '原生 button type',
    },
    // 事件
    onClick: { action: 'clicked' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

// 2. 定义具体的"故事"（Case）：各种状态下的展示

// ============ 基础类型 ============

/**
 * 默认按钮 - 最基础的按钮样式
 */
export const Default: Story = {
  args: {
    children: '默认按钮',
    type: 'default',
  },
}

/**
 * 主要按钮 - 用于主要操作
 */
export const Primary: Story = {
  args: {
    children: '主要按钮',
    type: 'primary',
  },
}

/**
 * 次要按钮 - 用于次要操作
 */
export const Secondary: Story = {
  args: {
    children: '次要按钮',
    type: 'secondary',
  },
}

/**
 * 虚线按钮 - 用于添加操作
 */
export const Dashed: Story = {
  args: {
    children: '虚线按钮',
    type: 'dashed',
  },
}

/**
 * 文字按钮 - 轻量级的操作
 */
export const Text: Story = {
  args: {
    children: '文字按钮',
    type: 'text',
  },
}

/**
 * 线框按钮 - 边框样式
 */
export const Outline: Story = {
  args: {
    children: '线框按钮',
    type: 'outline',
  },
}

// ============ 状态样式 ============

/**
 * 危险状态 - 用于删除等危险操作
 */
export const Danger: Story = {
  args: {
    children: '删除',
    type: 'primary',
    status: 'danger',
  },
}

/**
 * 警告状态 - 用于警告操作
 */
export const Warning: Story = {
  args: {
    children: '警告操作',
    type: 'primary',
    status: 'warning',
  },
}

/**
 * 成功状态 - 用于成功反馈
 */
export const Success: Story = {
  args: {
    children: '操作成功',
    type: 'primary',
    status: 'success',
  },
}

// ============ 尺寸变体 ============

/**
 * 迷你按钮 - 24px 高度
 */
export const Mini: Story = {
  args: {
    children: '迷你按钮',
    type: 'primary',
    size: 'mini',
  },
}

/**
 * 小型按钮 - 28px 高度
 */
export const Small: Story = {
  args: {
    children: '小型按钮',
    type: 'primary',
    size: 'small',
  },
}

/**
 * 大型按钮 - 36px 高度
 */
export const Large: Story = {
  args: {
    children: '大型按钮',
    type: 'primary',
    size: 'large',
  },
}

// ============ 形状变体 ============

/**
 * 圆形按钮 - 适合图标按钮
 */
export const Circle: Story = {
  args: {
    children: '🔍',
    type: 'primary',
    shape: 'circle',
  },
}

/**
 * 圆角按钮 - 更圆润的边角
 */
export const Round: Story = {
  args: {
    children: '圆角按钮',
    type: 'primary',
    shape: 'round',
  },
}

// ============ 交互状态 ============

/**
 * 禁用状态 - 不可点击
 */
export const Disabled: Story = {
  args: {
    children: '禁用按钮',
    type: 'primary',
    disabled: true,
  },
}

/**
 * 加载状态 - 显示加载动画
 */
export const Loading: Story = {
  args: {
    children: '加载中',
    type: 'default',
    loading: true,
  },
}

/**
 * 加载状态固定宽度 - 防止文字抖动
 */
export const LoadingFixedWidth: Story = {
  args: {
    children: '提交',
    type: 'default',
    loading: true,
    loadingFixedWidth: true,
  },
}

// ============ 特殊用法 ============

/**
 * 按钮组 - 展示多个按钮并排
 */
export const ButtonGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px' }}>
      <Button type="default">取消</Button>
      <Button type="primary">确定</Button>
    </div>
  ),
}

/**
 * 长按钮 - 宽度拉伸至 100%
 */
export const LongButton: Story = {
  args: {
    children: '长按钮',
    type: 'primary',
    long: true,
  },
  parameters: {
    layout: 'padded', // 使用 padded 布局以展示宽度拉伸效果
  },
}

/**
 * 图标按钮 - 带图标
 */
export const IconButton: Story = {
  args: {
    children: '下载',
    type: 'primary',
    icon: <span>⬇️</span>,
  },
}

/**
 * 链接按钮 - 跳转链接
 */
export const LinkButton: Story = {
  args: {
    children: '跳转链接',
    type: 'primary',
    as: 'a',
    href: 'https://example.com',
    target: '_blank',
  },
}

/**
 * 提交按钮 - 用于表单
 */
export const SubmitButton: Story = {
  args: {
    children: '提交表单',
    type: 'primary',
    htmlType: 'submit',
  },
}

/**
 * 类型组合 - 展示所有类型
 */
export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button type="default">默认</Button>
      <Button type="primary">主要</Button>
      <Button type="secondary">次要</Button>
      <Button type="dashed">虚线</Button>
      <Button type="text">文字</Button>
      <Button type="outline">线框</Button>
    </div>
  ),
}

/**
 * 尺寸组合 - 展示所有尺寸
 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Button type="primary" size="mini">
        Mini
      </Button>
      <Button type="primary" size="small">
        Small
      </Button>
      <Button type="primary" size="default">
        Default
      </Button>
      <Button type="primary" size="large">
        Large
      </Button>
    </div>
  ),
}
