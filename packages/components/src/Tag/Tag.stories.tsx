import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Tag from './index'

const meta: Meta<typeof Tag> = {
  title: '数据展示/Tag',
  component: Tag,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'text',
      description: '标签内容',
    },
    color: {
      control: 'select',
      options: ['success', 'warning', 'error', '#108ee9', '#f50', '#87d068'],
      description: '标签颜色',
    },
    closable: {
      control: 'boolean',
      description: '是否可关闭',
      table: {
        defaultValue: { summary: false },
      },
    },
    onClose: {
      control: false,
      description: '关闭时的回调',
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
type Story = StoryObj<typeof Tag>

/**
 * Playground - 在 Controls 面板中测试所有属性
 */
export const Playground: Story = {
  name: 'Playground',
  args: {
    children: '测试标签',
    color: 'success',
    closable: false,
  },
  render: (args) => <Tag {...args} />,
}

/**
 * 基础用法 - 最简单的用法
 */
export const Basic: Story = {
  name: '基础用法',
  render: () => (
    <div>
      <Tag>默认标签</Tag>
      <Tag color="success">成功</Tag>
      <Tag color="warning">警告</Tag>
      <Tag color="error">错误</Tag>
      <Tag color="#108ee9">自定义颜色</Tag>
    </div>
  ),
}

/**
 * 可关闭 - 带 closable 属性，点击关闭图标触发事件
 */
export const Closable: Story = {
  name: '可关闭',
  render: () => {
    const [tags, setTags] = useState<string[]>(['标签1', '标签2', '标签3'])

    const handleClose = (tagToRemove: string) => {
      setTags(tags.filter((tag) => tag !== tagToRemove))
    }

    return (
      <div>
        {tags.map((tag) => (
          <Tag
            key={tag}
            color="success"
            closable
            onClose={() => handleClose(tag)}
          >
            {tag}
          </Tag>
        ))}
        <Tag color="#108ee9" closable>
          新标签
        </Tag>
      </div>
    )
  },
}

/**
 * 预设颜色 - 使用 success/warning/error
 */
export const PresetColors: Story = {
  name: '预设颜色',
  render: () => (
    <div>
      <div style={{ marginBottom: '12px' }}>
        <Tag color="success">成功</Tag>
        <Tag color="warning">警告</Tag>
        <Tag color="error">错误</Tag>
      </div>
      <div>
        <Tag color="success" closable>
          可关闭
        </Tag>
        <Tag color="warning" closable>
          可关闭
        </Tag>
        <Tag color="error" closable>
          可关闭
        </Tag>
      </div>
    </div>
  ),
}

/**
 * 自定义颜色 - 使用任意 HEX 颜色值
 */
export const CustomColors: Story = {
  name: '自定义颜色',
  render: () => (
    <div>
      <Tag color="#f50">#f50</Tag>
      <Tag color="#2db7f5">#2db7f5</Tag>
      <Tag color="#87d068">#87d068</Tag>
      <Tag color="#108ee9">#108ee9</Tag>
    </div>
  ),
}

/**
 * 组合展示 - 不同类型的标签组合
 */
export const Combination: Story = {
  name: '组合展示',
  render: () => {
    const [tags, setTags] = useState([
      { text: '待处理', color: 'warning' as const },
      { text: '进行中', color: '#108ee9' },
      { text: '已完成', color: 'success' as const },
      { text: '失败', color: 'error' as const },
    ])

    const handleClose = (index: number) => {
      setTags(tags.filter((_, i) => i !== index))
    }

    return (
      <div>
        <div style={{ marginBottom: '16px' }}>
          <div
            style={{
              fontSize: '14px',
              color: 'var(--text-color-secondary)',
              marginBottom: '12px',
            }}
          >
            静态标签
          </div>
          <div>
            <Tag>默认</Tag>
            <Tag color="success">成功</Tag>
            <Tag color="warning">警告</Tag>
            <Tag color="error">错误</Tag>
            <Tag color="#f50">自定义</Tag>
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
            动态标签（可关闭）
          </div>
          <div>
            {tags.map((tag, index) => (
              <Tag
                key={index}
                color={tag.color}
                closable
                onClose={() => handleClose(index)}
              >
                {tag.text}
              </Tag>
            ))}
            <Tag
              color="success"
              closable
              onClose={() => {
                setTags([...tags, { text: `新标签${tags.length + 1}`, color: 'success' }])
              }}
            >
              + 添加标签
            </Tag>
          </div>
        </div>
      </div>
    )
  },
}
