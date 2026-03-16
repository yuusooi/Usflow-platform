import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Badge from './index'
import Avatar from '../Avatar'

const meta: Meta<typeof Badge> = {
  title: '数据展示/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    count: {
      control: 'text',
      description: '显示的数字或内容',
    },
    dot: {
      control: 'boolean',
      description: '是否显示为小红点',
      table: {
        defaultValue: { summary: false },
      },
    },
    overflowCount: {
      control: 'number',
      description: '数字封顶值',
      table: {
        defaultValue: { summary: 99 },
      },
    },
    showZero: {
      control: 'boolean',
      description: 'count为0时是否显示',
      table: {
        defaultValue: { summary: false },
      },
    },
    status: {
      control: 'select',
      options: ['success', 'processing', 'default', 'error', 'warning'],
      description: '状态徽标的状态',
    },
    text: {
      control: 'text',
      description: '状态徽标的文字',
    },
    color: {
      control: 'color',
      description: '自定义徽标颜色',
    },
    offset: {
      control: 'object',
      description: '徽标的偏移量 [x, y]',
    },
    title: {
      control: 'text',
      description: '鼠标悬浮时显示的文字',
    },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

/**
 * 基础用法 - 包裹在 Avatar 右上角
 * 个位数显示圆形，多位数显示胶囊形状
 */
export const Basic: Story = {
  name: '基础用法',
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Badge count={5}>
        <Avatar shape="square" style={{ backgroundColor: '#f5f5f5' }}>
          5
        </Avatar>
      </Badge>
      <Badge count={0} showZero>
        <Avatar shape="square" style={{ backgroundColor: '#f5f5f5' }}>
          0
        </Avatar>
      </Badge>
      <Badge count={99}>
        <Avatar
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
          shape="square"
        />
      </Badge>
      <Badge count={100}>
        <Avatar shape="square" style={{ backgroundColor: '#f5f5f5' }}>
          +
        </Avatar>
      </Badge>
    </div>
  ),
}

/**
 * 封顶数字 - 超过 overflowCount 显示 99+
 */
export const OverflowCount: Story = {
  name: '封顶数字',
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Badge count={100} overflowCount={99}>
        <Avatar shape="square" style={{ backgroundColor: '#f5f5f5' }}>
          99+
        </Avatar>
      </Badge>
      <Badge count={1000} overflowCount={999}>
        <Avatar
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka"
          shape="square"
        />
      </Badge>
    </div>
  ),
}

/**
 * 数字位数对比 - 个位数圆形 vs 多位数胶囊
 */
export const NumberCount: Story = {
  name: '数字位数对比',
  render: () => (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <div
          style={{
            fontSize: '14px',
            color: 'var(--text-color-secondary)',
            marginBottom: '12px',
          }}
        >
          个位数（圆形）
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Badge count={0}>
            <Avatar shape="square" style={{ backgroundColor: '#f5f5f5' }}>
              0
            </Avatar>
          </Badge>
          <Badge count={1}>
            <Avatar shape="square" style={{ backgroundColor: '#f5f5f5' }}>
              1
            </Avatar>
          </Badge>
          <Badge count={5}>
            <Avatar shape="square" style={{ backgroundColor: '#f5f5f5' }}>
              5
            </Avatar>
          </Badge>
          <Badge count={9}>
            <Avatar shape="square" style={{ backgroundColor: '#f5f5f5' }}>
              9
            </Avatar>
          </Badge>
        </div>
      </div>

      <div>
        <div
          style={{
            fontSize: '14px',
            color: 'var(--text-color-secondary)',
            marginBottom: '12px',
          }}
        >
          多位数（胶囊形状）
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Badge count={10}>
            <Avatar shape="square" style={{ backgroundColor: '#f5f5f5' }}>
              10
            </Avatar>
          </Badge>
          <Badge count={99}>
            <Avatar shape="square" style={{ backgroundColor: '#f5f5f5' }}>
              99
            </Avatar>
          </Badge>
          <Badge count={100} overflowCount={99}>
            <Avatar shape="square" style={{ backgroundColor: '#f5f5f5' }}>
              99+
            </Avatar>
          </Badge>
        </div>
      </div>
    </div>
  ),
}

/**
 * 独立徽标 - 不包裹元素，仅显示徽标
 */
export const Standalone: Story = {
  name: '独立徽标',
  render: () => (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <div
          style={{
            fontSize: '14px',
            color: 'var(--text-color-secondary)',
            marginBottom: '12px',
          }}
        >
          独立数字徽标
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Badge count={5} />
          <Badge count={10} />
          <Badge count={99} />
          <Badge count={100} overflowCount={99} />
        </div>
      </div>
      <div>
        <div
          style={{
            fontSize: '14px',
            color: 'var(--text-color-secondary)',
            marginBottom: '12px',
          }}
        >
          独立小红点
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Badge dot />
          <Badge dot />
          <Badge dot />
        </div>
      </div>
    </div>
  ),
}

/**
 * 小红点模式 - 使用 dot 属性
 */
export const Dot: Story = {
  name: '小红点',
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Badge dot>
        <Avatar shape="square" style={{ backgroundColor: '#f5f5f5' }}>
          待
        </Avatar>
      </Badge>
      <Badge dot>
        <Avatar
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
          shape="square"
        />
      </Badge>
      <Badge dot>
        <a
          href="#"
          style={{ color: 'var(--color-primary)', textDecoration: 'none' }}
        >
          链接
        </a>
      </Badge>
    </div>
  ),
}

/**
 * 状态徽标 - 使用 status 显示不同状态
 */
export const Status: Story = {
  name: '状态徽标',
  render: () => (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <div
          style={{
            fontSize: '14px',
            color: 'var(--text-color-secondary)',
            marginBottom: '12px',
          }}
        >
          带文字的状态徽标
        </div>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Badge status="success" text="成功" />
          <Badge status="processing" text="进行中" />
          <Badge status="error" text="错误" />
          <Badge status="warning" text="警告" />
          <Badge status="default" text="默认" />
        </div>
      </div>
      <div>
        <div
          style={{
            fontSize: '14px',
            color: 'var(--text-color-secondary)',
            marginBottom: '12px',
          }}
        >
          纯状态点（无文字）
        </div>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Badge status="success" />
          <Badge status="processing" />
          <Badge status="error" />
          <Badge status="warning" />
          <Badge status="default" />
        </div>
      </div>
    </div>
  ),
}

/**
 * 自定义颜色 - 使用 color 属性自定义徽标颜色
 */
export const CustomColor: Story = {
  name: '自定义颜色',
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Badge count={5} color="#52c41a">
        <Avatar shape="square" style={{ backgroundColor: '#f5f5f5' }}>
          成
        </Avatar>
      </Badge>
      <Badge count={10} color="#1890ff">
        <Avatar shape="square" style={{ backgroundColor: '#f5f5f5' }}>
          信
        </Avatar>
      </Badge>
      <Badge count={20} color="#faad14">
        <Avatar shape="square" style={{ backgroundColor: '#f5f5f5' }}>
          警
        </Avatar>
      </Badge>
    </div>
  ),
}

/**
 * 偏移量 - 使用 offset 调整徽标位置
 */
export const Offset: Story = {
  name: '偏移量',
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Badge count={10} offset={[10, 10]}>
        <Avatar shape="square" style={{ backgroundColor: '#f5f5f5' }}>
          偏
        </Avatar>
      </Badge>
      <Badge count={20} offset={[20, 0]}>
        <Avatar shape="square" style={{ backgroundColor: '#f5f5f5' }}>
          移
        </Avatar>
      </Badge>
      <Badge dot offset={[0, 10]}>
        <Avatar shape="square" style={{ backgroundColor: '#f5f5f5' }}>
          点
        </Avatar>
      </Badge>
    </div>
  ),
}

/**
 * 组合展示 - 真实场景演示
 */
export const Combination: Story = {
  name: '组合展示',
  render: () => (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <div
          style={{
            fontSize: '14px',
            color: 'var(--text-color-secondary)',
            marginBottom: '12px',
          }}
        >
          消息通知（数字徽标）
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Badge count={5}>
            <Avatar shape="square" style={{ backgroundColor: '#f5f5f5' }}>
              消
            </Avatar>
          </Badge>
          <Badge count={0} showZero>
            <Avatar shape="square" style={{ backgroundColor: '#f5f5f5' }}>
              通
            </Avatar>
          </Badge>
          <Badge count={99}>
            <Avatar
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              shape="square"
            />
          </Badge>
          <Badge count={100} overflowCount={99}>
            <Avatar shape="square" style={{ backgroundColor: '#f5f5f5' }}>
              99+
            </Avatar>
          </Badge>
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div
          style={{
            fontSize: '14px',
            color: 'var(--text-color-secondary)',
            marginBottom: '12px',
          }}
        >
          待办事项（小红点）
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Badge dot>
            <Avatar
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka"
              shape="square"
            />
          </Badge>
          <Badge dot>
            <Avatar shape="square" style={{ backgroundColor: '#f5f5f5' }}>
              待
            </Avatar>
          </Badge>
          <Badge dot>
            <Avatar shape="square" style={{ backgroundColor: '#f5f5f5' }}>
              办
            </Avatar>
          </Badge>
        </div>
      </div>

      <div>
        <div
          style={{
            fontSize: '14px',
            color: 'var(--text-color-secondary)',
            marginBottom: '12px',
          }}
        >
          状态指示（独立徽标）
        </div>
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Badge status="success" text="成功" />
          <Badge status="processing" text="进行中" />
          <Badge status="error" text="错误" />
          <Badge status="warning" text="警告" />
        </div>
      </div>
    </div>
  ),
}

/**
 * Playground - 在 Controls 面板中测试所有属性
 */
export const Playground: Story = {
  name: 'Playground',
  args: {
    count: 5,
    dot: false,
    overflowCount: 99,
    showZero: false,
  },
  render: (args) => (
    <Badge {...args}>
      <Avatar shape="square" style={{ backgroundColor: '#f5f5f5' }}>
        测试
      </Avatar>
    </Badge>
  ),
}
