import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Space from './index'

const meta: Meta<typeof Space> = {
  title: '通用与布局/Space',
  component: Space,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '排列方向',
    },
    size: {
      control: 'select',
      options: ['small', 'middle', 'large', '8', '16', '24'],
      description: '间距大小',
    },
    align: {
      control: 'select',
      options: ['start', 'end', 'center', 'baseline'],
      description: '对齐方式',
    },
    wrap: {
      control: 'boolean',
      description: '是否自动换行',
    },
  },
}

export default meta
type Story = StoryObj<typeof Space>

/**
 * 基础用法 - 设置组件之间的间距
 */
export const Basic: Story = {
  name: '基础用法',
  render: () => (
    <Space>
      <button>按钮1</button>
      <button>按钮2</button>
      <button>按钮3</button>
    </Space>
  ),
}

/**
 * 垂直间距 - 垂直排列子元素
 */
export const Vertical: Story = {
  name: '垂直间距',
  render: () => (
    <Space direction="vertical">
      <div>第一行内容</div>
      <div>第二行内容</div>
      <div>第三行内容</div>
    </Space>
  ),
}

/**
 * 间距大小 - 使用预设的间距大小
 */
export const Size: Story = {
  name: '间距大小',
  render: () => (
    <Space direction="vertical" size="large">
      <Space>
        <button>Small (8px)</button>
        <button>按钮</button>
      </Space>
      <Space size="middle">
        <button>Middle (16px)</button>
        <button>按钮</button>
      </Space>
      <Space size="large">
        <button>Large (24px)</button>
        <button>按钮</button>
      </Space>
      <Space size={32}>
        <button>Custom (32px)</button>
        <button>按钮</button>
      </Space>
    </Space>
  ),
}

/**
 * 对齐方式 - 设置子元素的对齐方式
 */
export const Align: Story = {
  name: '对齐方式',
  render: () => (
    <Space direction="vertical" size="large">
      <Space align="start">
        <button>Start 对齐</button>
        <div style={{ padding: '8px 16px', background: 'var(--component-hover-bg)' }}>
          较高的内容块
        </div>
      </Space>
      <Space align="center">
        <button>Center 对齐</button>
        <div style={{ padding: '8px 16px', background: 'var(--component-hover-bg)' }}>
          较高的内容块
        </div>
      </Space>
      <Space align="end">
        <button>End 对齐</button>
        <div style={{ padding: '8px 16px', background: 'var(--component-hover-bg)' }}>
          较高的内容块
        </div>
      </Space>
      <Space align="baseline">
        <button style={{ fontSize: '14px' }}>Baseline 对齐</button>
        <div style={{ padding: '8px 16px', background: 'var(--component-hover-bg)', fontSize: '20px' }}>
          较大的字体
        </div>
      </Space>
    </Space>
  ),
}

/**
 * 自动换行 - 超出宽度时自动换行
 */
export const Wrap: Story = {
  name: '自动换行',
  render: () => (
    <Space wrap>
      {Array.from({ length: 27 }).map((_, i) => (
        <button key={i}>按钮 {i + 1}</button>
      ))}
    </Space>
  ),
}

/**
 * 带分隔符 - 在子元素之间添加分隔符
 */
export const WithSplit: Story = {
  name: '带分隔符',
  render: () => (
    <Space split={<span style={{ color: 'var(--text-color-secondary)' }}>|</span>}>
      <a href="#">首页</a>
      <a href="#">产品</a>
      <a href="#">关于</a>
      <a href="#">联系</a>
    </Space>
  ),
}

/**
 * 垂直分隔符 - 垂直排列时分隔符的使用
 */
export const VerticalSplit: Story = {
  name: '垂直分隔符',
  render: () => (
    <Space
      direction="vertical"
      split={
        <hr
          style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: 0 }}
        />
      }
    >
      <div>第一条内容</div>
      <div>第二条内容</div>
      <div>第三条内容</div>
    </Space>
  ),
}

/**
 * 混合使用 - 各种属性的组合使用
 */
export const Combined: Story = {
  name: '混合使用',
  render: () => (
    <div
      style={{
        padding: '24px',
        background: 'var(--component-bg, #fff)',
        borderRadius: '8px',
      }}
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Space align="start">
          <div
            style={{
              width: '50px',
              height: '50px',
              background: 'var(--component-hover-bg)',
              borderRadius: '4px',
            }}
          />
          <div>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>标题</div>
            <div style={{ color: 'var(--text-color-secondary)', fontSize: '12px' }}>描述文本</div>
          </div>
        </Space>
        <Space align="start">
          <div
            style={{
              width: '50px',
              height: '50px',
              background: 'var(--component-hover-bg)',
              borderRadius: '4px',
            }}
          />
          <div>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>标题</div>
            <div style={{ color: 'var(--text-color-secondary)', fontSize: '12px' }}>描述文本</div>
          </div>
        </Space>
        <Space align="start">
          <div
            style={{
              width: '50px',
              height: '50px',
              background: 'var(--component-hover-bg)',
              borderRadius: '4px',
            }}
          />
          <div>
            <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>标题</div>
            <div style={{ color: 'var(--text-color-secondary)', fontSize: '12px' }}>描述文本</div>
          </div>
        </Space>
      </Space>
    </div>
  ),
}

/**
 * 紧凑布局 - 在表单中的实际应用
 */
export const FormLayout: Story = {
  name: '紧凑布局',
  render: () => (
    <Space direction="vertical" size="large" style={{ width: '300px' }}>
      <div>
        <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>用户登录</div>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <input
            type="text"
            placeholder="用户名"
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid var(--border-color)',
            }}
          />
          <input
            type="password"
            placeholder="密码"
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid var(--border-color)',
            }}
          />
          <Space style={{ width: '100%' }}>
            <button
              style={{
                flex: 1,
                padding: '8px',
                background: 'var(--primary-color)',
                color: 'var(--primary-text-color)',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              登录
            </button>
            <button
              style={{
                flex: 1,
                padding: '8px',
                background: 'var(--component-bg)',
                color: 'var(--text-color)',
                border: '1px solid var(--border-color)',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              注册
            </button>
          </Space>
        </Space>
      </div>
    </Space>
  ),
}

/**
 * 暗黑模式 - 在暗黑主题下的效果
 */
export const DarkMode: Story = {
  name: '暗黑模式',
  render: () => (
    <Space direction="vertical" size="middle">
      <Space>
        <button>按钮1</button>
        <button>按钮2</button>
        <button>按钮3</button>
      </Space>
      <Space direction="vertical">
        <div>第一行内容</div>
        <div>第二行内容</div>
        <div>第三行内容</div>
      </Space>
    </Space>
  ),
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#191919' },
      ],
    },
  },
}
