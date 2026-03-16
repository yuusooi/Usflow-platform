import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Avatar from './index'

const meta: Meta<typeof Avatar> = {
  title: '数据展示/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      description: '文字内容（ReactNode）',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
    src: {
      control: 'text',
      description: '图片地址',
    },
    icon: {
      control: false,
      description: '图标元素（ReactNode）',
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
      description: '形状',
      table: {
        defaultValue: { summary: 'circle' },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: '预设尺寸（也支持自定义数字）',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    alt: {
      control: 'text',
      description: '图片 alt 属性',
    },
    onError: {
      control: false,
      description: '图片加载失败时的回调',
      table: {
        type: {
          summary:
            '(event: React.SyntheticEvent<HTMLImageElement, Event>) => boolean | void',
        },
      },
    },
    className: {
      control: 'text',
      description: '自定义类名',
    },
    style: {
      control: 'object',
      description: '自定义样式',
    },
  },
}

export default meta
type Story = StoryObj<typeof Avatar>

/**
 * 基础用法 - 展示不同类型的头像
 */
export const Basic: Story = {
  name: '基础用法',
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
        alt="头像1"
      />
      <Avatar>张三</Avatar>
      <Avatar>
        <span style={{ fontSize: '20px' }}>👤</span>
      </Avatar>
    </div>
  ),
}

/**
 * 图片头像 - 使用图片作为头像
 */
export const Image: Story = {
  name: '图片头像',
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
        alt="Felix"
      />
      <Avatar
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka"
        alt="Aneka"
      />
      <Avatar
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
        alt="John"
      />
    </div>
  ),
}

/**
 * 文字头像 - 自动缩放以适应容器
 */
export const Text: Story = {
  name: '文字头像',
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar>A</Avatar>
      <Avatar>张三</Avatar>
      <Avatar>李四</Avatar>
      <Avatar>Admin</Avatar>
      <Avatar>User</Avatar>
    </div>
  ),
}

/**
 * 形状 - 支持圆形和方形
 */
export const Shape: Story = {
  name: '形状',
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar shape="circle">圆形</Avatar>
      <Avatar shape="square">方形</Avatar>
      <Avatar
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
        shape="circle"
      />
      <Avatar
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka"
        shape="square"
      />
    </div>
  ),
}

/**
 * 尺寸 - 支持预设尺寸和自定义尺寸
 */
export const Size: Story = {
  name: '尺寸',
  render: () => (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
          预设尺寸
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Avatar size="small">S</Avatar>
          <Avatar size="default">M</Avatar>
          <Avatar size="large">L</Avatar>
        </div>
      </div>
      <div>
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
          自定义尺寸
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Avatar size={40}>40</Avatar>
          <Avatar size={60}>60</Avatar>
          <Avatar size={80}>80</Avatar>
          <Avatar size={100}>100</Avatar>
        </div>
      </div>
    </div>
  ),
}

/**
 * 自定义样式 - 自定义背景色和样式
 */
export const CustomStyle: Story = {
  name: '自定义样式',
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Avatar style={{ backgroundColor: '#f56a00', color: '#fff' }}>
        橙色
      </Avatar>
      <Avatar style={{ backgroundColor: '#87d068', color: '#fff' }}>
        绿色
      </Avatar>
      <Avatar style={{ backgroundColor: '#108ee9', color: '#fff' }}>
        蓝色
      </Avatar>
      <Avatar style={{ backgroundColor: '#722ed1', color: '#fff' }}>
        紫色
      </Avatar>
    </div>
  ),
}

/**
 * 组合展示 - 不同类型和样式的组合
 */
export const Combination: Story = {
  name: '组合展示',
  render: () => (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
          图片头像
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
          <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka" />
          <Avatar src="https://api.dicebear.com/7.x/avataaars/svg?seed=John" />
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
          文字头像
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Avatar>A</Avatar>
          <Avatar>张三</Avatar>
          <Avatar>Admin</Avatar>
        </div>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
          不同形状 + 不同尺寸
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Avatar shape="circle" size="small">
            小圆
          </Avatar>
          <Avatar shape="circle" size="default">
            中圆
          </Avatar>
          <Avatar shape="circle" size="large">
            大圆
          </Avatar>
          <Avatar shape="square" size="small">
            小方
          </Avatar>
          <Avatar shape="square" size="default">
            中方
          </Avatar>
          <Avatar shape="square" size="large">
            大方
          </Avatar>
        </div>
      </div>

      <div>
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px' }}>
          自定义样式
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <Avatar style={{ backgroundColor: '#f56a00', color: '#fff' }}>
            橙
          </Avatar>
          <Avatar style={{ backgroundColor: '#87d068', color: '#fff' }}>
            绿
          </Avatar>
          <Avatar style={{ backgroundColor: '#108ee9', color: '#fff' }}>
            蓝
          </Avatar>
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
    src: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    shape: 'circle',
    size: 'default',
    alt: 'Avatar',
  },
  render: (args) => <Avatar {...args} />,
}
