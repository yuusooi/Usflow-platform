import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Spin from './index'

/**
 * Spin 加载中组件 Storybook
 *
 * 展示 Spin 组件的各种用法和状态
 */
const meta: Meta<typeof Spin> = {
  title: '反馈交互/Spin',
  component: Spin,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    spinning: {
      control: 'boolean',
      description: '是否处于加载中',
      table: {
        defaultValue: { summary: true },
      },
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: '加载指示器尺寸',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
    tip: {
      control: 'text',
      description: '加载提示文字',
    },
    children: {
      control: false,
      description: '包裹的内容（如果有，启用包裹模式）',
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
type Story = StoryObj<typeof Spin>

/**
 * Playground - 在 Controls 面板中测试所有属性
 */
export const Playground: Story = {
  name: 'Playground',
  args: {
    spinning: true,
    size: 'default',
    tip: '加载中...',
  },
  render: (args) => <Spin {...args} />,
}

/**
 * 基础用法 - 独立使用
 *
 * 最简单的用法，展示不同尺寸的加载指示器
 */
export const Basic: Story = {
  name: '基础用法 - 不同尺寸',
  render: () => (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
      <Spin size="small" />
      <Spin size="default" />
      <Spin size="large" />
    </div>
  ),
}

/**
 * 带提示文字
 *
 * 在加载图标下方显示提示文字
 */
export const WithTip: Story = {
  name: '带提示文字',
  render: () => (
    <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
      <div style={{ textAlign: 'center' }}>
        <Spin tip="加载中..." size="small" />
        <div
          style={{
            marginTop: '8px',
            fontSize: '12px',
            color: 'var(--text-color-secondary)',
          }}
        >
          Small
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spin tip="加载中..." size="default" />
        <div
          style={{
            marginTop: '8px',
            fontSize: '12px',
            color: 'var(--text-color-secondary)',
          }}
        >
          Default
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Spin tip="加载中..." size="large" />
        <div
          style={{
            marginTop: '8px',
            fontSize: '12px',
            color: 'var(--text-color-secondary)',
          }}
        >
          Large
        </div>
      </div>
    </div>
  ),
}

/**
 * 包裹模式 - 卡片加载
 *
 * 在内容上方覆盖遮罩层，适用于加载表格、卡片等内容
 */
export const WrapperMode: Story = {
  name: '包裹模式 - 卡片加载',
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      {/* 示例 1：加载中的卡片 */}
      <Spin spinning={true} tip="加载中...">
        <div
          style={{
            width: '200px',
            padding: '24px',
            backgroundColor: 'var(--component-bg, #fff)',
            border: '1px solid var(--border-color, rgba(55, 53, 47, 0.16))',
            borderRadius: '4px',
          }}
        >
          <div
            style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 500 }}
          >
            卡片标题
          </div>
          <div
            style={{ fontSize: '14px', color: 'var(--text-color-secondary)' }}
          >
            这是一段示例内容，用于展示加载中的遮罩效果。
          </div>
        </div>
      </Spin>

      {/* 示例 2：未加载的卡片 */}
      <Spin spinning={false}>
        <div
          style={{
            width: '200px',
            padding: '24px',
            backgroundColor: 'var(--component-bg, #fff)',
            border: '1px solid var(--border-color, rgba(55, 53, 47, 0.16))',
            borderRadius: '4px',
          }}
        >
          <div
            style={{ marginBottom: '12px', fontSize: '16px', fontWeight: 500 }}
          >
            卡片标题
          </div>
          <div
            style={{ fontSize: '14px', color: 'var(--text-color-secondary)' }}
          >
            这是一段示例内容，加载完成后可以正常查看。
          </div>
        </div>
      </Spin>
    </div>
  ),
}

/**
 * 包裹模式 - 表格加载
 *
 * 模拟实际业务中的表格加载场景
 */
export const TableLoading: Story = {
  name: '包裹模式 - 表格加载',
  render: () => {
    const [loading, setLoading] = useState(true)

    return (
      <div style={{ width: '100%', maxWidth: '800px' }}>
        <div style={{ marginBottom: '16px', display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setLoading(true)}
            style={{
              padding: '6px 16px',
              fontSize: '14px',
              cursor: 'pointer',
              backgroundColor: 'var(--primary-color, #0f0f0f)',
              color: 'var(--primary-text-color, #fff)',
              border: 'none',
              borderRadius: '2px',
            }}
          >
            开始加载
          </button>
          <button
            onClick={() => setLoading(false)}
            style={{
              padding: '6px 16px',
              fontSize: '14px',
              cursor: 'pointer',
              backgroundColor: 'var(--component-bg, #fff)',
              color: 'var(--text-color, #37352f)',
              border: '1px solid var(--border-color, rgba(55, 53, 47, 0.16))',
              borderRadius: '2px',
            }}
          >
            加载完成
          </button>
        </div>

        <Spin spinning={loading} tip="正在加载数据...">
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              backgroundColor: 'var(--component-bg, #fff)',
              border: '1px solid var(--border-color, rgba(55, 53, 47, 0.16))',
              borderRadius: '4px',
              overflow: 'hidden',
            }}
          >
            <thead>
              <tr
                style={{
                  borderBottom:
                    '1px solid var(--border-color, rgba(55, 53, 47, 0.16))',
                  backgroundColor:
                    'var(--component-hover-bg, rgba(55, 53, 47, 0.04))',
                }}
              >
                <th
                  style={{
                    padding: '12px',
                    textAlign: 'left',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  姓名
                </th>
                <th
                  style={{
                    padding: '12px',
                    textAlign: 'left',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  年龄
                </th>
                <th
                  style={{
                    padding: '12px',
                    textAlign: 'left',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  职业
                </th>
                <th
                  style={{
                    padding: '12px',
                    textAlign: 'left',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  邮箱
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom:
                      '1px solid var(--border-color, rgba(55, 53, 47, 0.16))',
                  }}
                >
                  <td style={{ padding: '12px', fontSize: '14px' }}>
                    用户 {i}
                  </td>
                  <td style={{ padding: '12px', fontSize: '14px' }}>
                    {20 + i}
                  </td>
                  <td style={{ padding: '12px', fontSize: '14px' }}>
                    前端工程师
                  </td>
                  <td style={{ padding: '12px', fontSize: '14px' }}>
                    user{i}@example.com
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Spin>
      </div>
    )
  },
}

/**
 * 自定义提示文字
 *
 * 展示不同场景下的提示文字
 */
export const CustomTip: Story = {
  name: '自定义提示文字',
  render: () => (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      <Spin tip="正在提交表单..." size="default" />
      <Spin tip="正在上传文件..." size="default" />
      <Spin tip="请稍候，正在处理..." size="large" />
      <Spin tip="数据同步中..." size="large" />
    </div>
  ),
}

/**
 * 组合展示 - 业务场景
 *
 * 展示实际业务场景中的常见用法
 */
export const Combination: Story = {
  name: '组合展示 - 业务场景',
  render: () => (
    <div style={{ width: '100%', maxWidth: '900px' }}>
      {/* 场景 1：按钮加载 */}
      <div style={{ marginBottom: '24px' }}>
        <div
          style={{
            fontSize: '14px',
            color: 'var(--text-color-secondary)',
            marginBottom: '12px',
            fontWeight: 500,
          }}
        >
          场景 1：按钮加载
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Spin tip="提交中..." size="small" />
          <span
            style={{ fontSize: '14px', color: 'var(--text-color-secondary)' }}
          >
            正在提交表单...
          </span>
        </div>
      </div>

      {/* 场景 2：内容区域加载 */}
      <div style={{ marginBottom: '24px' }}>
        <div
          style={{
            fontSize: '14px',
            color: 'var(--text-color-secondary)',
            marginBottom: '12px',
            fontWeight: 500,
          }}
        >
          场景 2：内容区域加载
        </div>
        <Spin spinning={true} tip="正在加载内容...">
          <div
            style={{
              minHeight: '200px',
              padding: '24px',
              backgroundColor: 'var(--component-bg, #fff)',
              border: '1px solid var(--border-color, rgba(55, 53, 47, 0.16))',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{ fontSize: '14px', color: 'var(--text-color-secondary)' }}
            >
              这是内容区域，加载时会被遮罩层覆盖
            </div>
          </div>
        </Spin>
      </div>

      {/* 场景 3：图片加载 */}
      <div style={{ marginBottom: '24px' }}>
        <div
          style={{
            fontSize: '14px',
            color: 'var(--text-color-secondary)',
            marginBottom: '12px',
            fontWeight: 500,
          }}
        >
          场景 3：图片加载
        </div>
        <Spin spinning={true} size="large">
          <div
            style={{
              width: '200px',
              height: '150px',
              backgroundColor:
                'var(--component-hover-bg, rgba(55, 53, 47, 0.04))',
              border: '1px solid var(--border-color, rgba(55, 53, 47, 0.16))',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              color: 'var(--text-color-secondary)',
            }}
          >
            图片区域
          </div>
        </Spin>
      </div>
    </div>
  ),
}
