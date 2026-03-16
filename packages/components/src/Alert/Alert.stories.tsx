import React, { useState, useEffect } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Alert from './index'

/**
 * Alert 警告提示组件 Storybook
 *
 * 展示 Alert 组件的各种用法和状态
 */
const meta: Meta<typeof Alert> = {
  title: '反馈交互/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    message: {
      control: 'text',
      description: '主标题（必需）',
    },
    type: {
      control: 'select',
      options: ['success', 'info', 'warning', 'error'],
      description: '警告类型',
      table: {
        defaultValue: { summary: 'info' },
      },
    },
    description: {
      control: 'text',
      description: '辅助详细描述',
    },
    showIcon: {
      control: 'boolean',
      description: '是否显示图标',
      table: {
        defaultValue: { summary: true },
      },
    },
    closable: {
      control: false, // 隐藏此控制项
    },
    visible: {
      control: 'boolean',
      description: '是否显示（受控模式，传入后可通过切换重新显示）',
      table: {
        defaultValue: { summary: true },
      },
    },
    onClose: {
      control: false,
      description: '关闭时的回调',
    },
    onVisibleChange: {
      control: false,
      description: '显示状态变化时的回调',
    },
    className: {
      control: 'text',
      description: '自定义类名',
    },
    style: {
      control: false,
      description: '自定义样式（CSSProperties 对象）',
    },
  },
}

export default meta
type Story = StoryObj<typeof Alert>

/**
 * Playground - 在 Controls 面板中测试所有属性
 *
 * 使用受控模式：关闭后可点击"恢复显示"按钮或切换 visible 开关重新显示
 */
export const Playground: Story = {
  name: 'Playground',
  args: {
    message: '这是一条提示信息',
    type: 'info',
    showIcon: true,
    closable: false,
    visible: true,
  },
  render: (args) => {
    // 使用受控模式：内部维护 visible 状态
    // 当用户点击关闭按钮时，更新状态；当用户在 Controls 中切换 visible 时，也能同步更新
    const [visible, setVisible] = useState(args.visible ?? true)

    // 同步 Controls 面板的变化
    useEffect(() => {
      if (args.visible !== undefined) {
        setVisible(args.visible)
      }
    }, [args.visible])

    return (
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <Alert
          {...args}
          visible={visible}
          onVisibleChange={(newVisible) => {
            setVisible(newVisible)
            args.onVisibleChange?.(newVisible, {} as any)
          }}
        />
        {/* 受控模式下隐藏后，显示恢复按钮 */}
        {!visible && (
          <button
            onClick={() => setVisible(true)}
            style={{
              marginTop: '12px',
              padding: '6px 12px',
              fontSize: '14px',
              cursor: 'pointer',
              backgroundColor: 'var(--primary-color, #0f0f0f)',
              color: 'var(--primary-text-color, #fff)',
              border: 'none',
              borderRadius: '2px',
            }}
          >
            恢复显示
          </button>
        )}
      </div>
    )
  },
}

/**
 * 基础用法 - 不同类型的 Alert
 *
 * 展示 4 种不同类型的警告提示
 */
export const Basic: Story = {
  name: '基础用法 - 四种类型',
  render: () => (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <Alert
        message="成功提示"
        type="success"
        style={{ marginBottom: '12px' }}
      />
      <Alert message="信息提示" type="info" style={{ marginBottom: '12px' }} />
      <Alert
        message="警告提示"
        type="warning"
        style={{ marginBottom: '12px' }}
      />
      <Alert message="错误提示" type="error" />
    </div>
  ),
}

/**
 * 带描述 - 包含详细描述信息
 *
 * 当有 description 时，padding 变大，message 字体加粗
 */
export const WithDescription: Story = {
  name: '带描述',
  render: () => (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <Alert
        message="成功提示"
        description="这是一条成功提示的详细描述，可以包含更多的信息内容。操作已成功完成。"
        type="success"
        style={{ marginBottom: '12px' }}
      />
      <Alert
        message="信息提示"
        description="这是一条信息提示的详细描述，用于提供额外的上下文信息和说明。"
        type="info"
        style={{ marginBottom: '12px' }}
      />
      <Alert
        message="警告提示"
        description="这是一条警告提示的详细描述，提醒用户注意某些潜在问题或风险。"
        type="warning"
        style={{ marginBottom: '12px' }}
      />
      <Alert
        message="错误提示"
        description="这是一条错误提示的详细描述，告诉用户发生了什么错误以及如何解决。"
        type="error"
      />
    </div>
  ),
}

/**
 * 可关闭 - 带关闭按钮
 *
 * 点击关闭按钮可以隐藏 Alert，内部维护 visible 状态
 */
export const Closable: Story = {
  name: '可关闭',
  render: () => (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <Alert
        message="成功提示"
        description="点击关闭按钮可以关闭这条提示"
        type="success"
        closable
        showIcon
        style={{ marginBottom: '12px' }}
      />
      <Alert
        message="警告提示"
        description="这是一条可关闭的警告信息"
        type="warning"
        closable
        showIcon
      />
    </div>
  ),
}

/**
 * 无图标 - 不显示辅助图标
 *
 * 设置 showIcon={false} 可以隐藏左侧的图标
 */
export const WithoutIcon: Story = {
  name: '无图标',
  render: () => (
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <Alert
        message="不带图标的提示信息"
        type="info"
        showIcon={false}
        style={{ marginBottom: '12px' }}
      />
      <Alert
        message="不带图标的警告"
        description="这是一个不带图标的警告提示，通过边框颜色区分类型"
        type="warning"
        showIcon={false}
      />
    </div>
  ),
}

/**
 * 组合展示 - 多种 Alert 组合使用
 *
 * 展示实际业务场景中的常见组合
 */
export const Combination: Story = {
  name: '组合展示 - 业务场景',
  render: () => (
    <div style={{ width: '100%', maxWidth: '800px' }}>
      {/* 场景 1：表单提交成功 */}
      <div style={{ marginBottom: '24px' }}>
        <div
          style={{
            fontSize: '14px',
            color: 'var(--text-color-secondary)',
            marginBottom: '12px',
            fontWeight: 500,
          }}
        >
          场景 1：表单提交成功
        </div>
        <Alert
          message="提交成功"
          description="您的表单已成功提交，我们将在 3 个工作日内处理完成。"
          type="success"
          showIcon
          closable
        />
      </div>

      {/* 场景 2：系统维护通知 */}
      <div style={{ marginBottom: '24px' }}>
        <div
          style={{
            fontSize: '14px',
            color: 'var(--text-color-secondary)',
            marginBottom: '12px',
            fontWeight: 500,
          }}
        >
          场景 2：系统维护通知
        </div>
        <Alert
          message="系统维护通知"
          description="系统将于 2024 年 1 月 15 日 02:00-06:00 进行维护，届时部分功能可能无法使用。"
          type="warning"
          showIcon
          closable
        />
      </div>

      {/* 场景 3：操作失败提示 */}
      <div style={{ marginBottom: '24px' }}>
        <div
          style={{
            fontSize: '14px',
            color: 'var(--text-color-secondary)',
            marginBottom: '12px',
            fontWeight: 500,
          }}
        >
          场景 3：操作失败提示
        </div>
        <Alert
          message="操作失败"
          description="网络连接失败，请检查您的网络设置后重试。如果问题持续，请联系客服。"
          type="error"
          showIcon
          closable
        />
      </div>

      {/* 场景 4：简洁提示 */}
      <div>
        <div
          style={{
            fontSize: '14px',
            color: 'var(--text-color-secondary)',
            marginBottom: '12px',
            fontWeight: 500,
          }}
        >
          场景 4：简洁提示（无描述）
        </div>
        <Alert
          message="数据已保存"
          type="success"
          showIcon
          style={{ marginBottom: '8px' }}
        />
        <Alert
          message="请检查输入内容"
          type="warning"
          showIcon
          style={{ marginBottom: '8px' }}
        />
        <Alert message="加载中..." type="info" showIcon />
      </div>
    </div>
  ),
}
