import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Divider from './index'

const meta: Meta<typeof Divider> = {
  title: '通用与布局/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '分割线文字',
    },
    type: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '分割线方向',
    },
    dashed: {
      control: 'boolean',
      description: '是否虚线',
    },
    orientation: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: '文字位置（仅水平方向有效）',
    },
    orientationMargin: {
      control: 'text',
      description:
        '文字与边缘的距离（如：20px、100px、10%）\n\n注意：仅在 orientation="left" 或 orientation="right" 时有效！',
    },
    className: {
      control: 'text',
      description: '自定义样式类名',
    },
    style: {
      control: 'object',
    },
  },
}

export default meta
type Story = StoryObj<typeof Divider>

/**
 * 基础用法 - 最基础的分割线（可在 Controls 中调整属性）
 */
export const Basic: Story = {
  name: '基础用法',
  args: {
    dashed: false,
    type: 'horizontal',
  },
  render: (args) => (
    <div>
      <p>上方内容</p>
      <Divider {...args} />
      <p>下方内容</p>
    </div>
  ),
}

/**
 * 带文字 - 在分割线上显示文字
 */
export const WithText: Story = {
  name: '带文字',
  render: () => (
    <div>
      <p>这是第一段内容</p>
      <Divider>文字</Divider>
      <p>这是第二段内容</p>
      <Divider>更多内容</Divider>
      <p>这是第三段内容</p>
    </div>
  ),
}

/**
 * 文字位置 - 调整文字在分割线上的位置
 */
export const Orientation: Story = {
  name: '文字位置',
  render: () => (
    <div>
      <Divider orientation="left">左侧文字</Divider>
      <Divider orientation="center">居中文字</Divider>
      <Divider orientation="right">右侧文字</Divider>
    </div>
  ),
}

/**
 * 虚线 - 使用虚线样式
 */
export const Dashed: Story = {
  name: '虚线',
  render: () => (
    <div>
      <p>实线分割线</p>
      <Divider />
      <p>虚线分割线</p>
      <Divider dashed />
      <p>带文字的虚线</p>
      <Divider dashed>文字</Divider>
    </div>
  ),
}

/**
 * 垂直分割线 - 垂直方向的分割线
 */
export const Vertical: Story = {
  name: '垂直分割线',
  render: () => (
    <div>
      <span>文字 1</span>
      <Divider type="vertical" />
      <span>文字 2</span>
      <Divider type="vertical" />
      <span>文字 3</span>
      <Divider type="vertical" dashed />
      <span>文字 4</span>
    </div>
  ),
}

/**
 * 自定义间距 - 调整文字与边缘的距离
 *
 * 分割线中带有文字，可以用orientation指定文字位置。
 */
export const CustomMargin: Story = {
  name: '自定义间距',
  render: () => (
    <div>
      <Divider orientation="left" orientationMargin="100px">
        距离左边 100px
      </Divider>
      <Divider orientation="right" orientationMargin="100px">
        距离右边 100px
      </Divider>
      <Divider orientation="left" orientationMargin="20px">
        距离左边 20px
      </Divider>
    </div>
  ),
}

/**
 * 文章分割 - 在文章中用于分隔不同章节
 */
export const Article: Story = {
  name: '文章分割',
  render: () => (
    <div style={{ padding: '24px', background: 'var(--component-bg)' }}>
      <h2>第一章：组件库介绍</h2>
      <p>这是一个基于 React 的 UI 组件库，提供了丰富的组件供开发者使用。</p>
      <Divider>章节分隔</Divider>
      <h2>第二章：快速开始</h2>
      <p>安装组件库后，您可以直接引入组件并使用，非常简单方便。</p>
      <Divider dashed />
      <h2>第三章：进阶使用</h2>
      <p>通过主题定制、组件配置等方式，您可以轻松实现个性化需求。</p>
    </div>
  ),
}

/**
 * 卡片分隔 - 在卡片中用于分隔不同内容
 */
export const Card: Story = {
  name: '卡片分隔',
  render: () => (
    <div
      style={{
        padding: '24px',
        background: 'var(--component-bg)',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
      }}
    >
      <h3 style={{ marginTop: 0 }}>用户信息</h3>
      <div style={{ marginBottom: '16px' }}>
        <p style={{ margin: 0, color: 'var(--text-color-secondary)' }}>
          用户名：张三
        </p>
        <p style={{ margin: 0, color: 'var(--text-color-secondary)' }}>
          邮箱：zhangsan@example.com
        </p>
      </div>
      <Divider>详细信息</Divider>
      <div style={{ marginTop: '16px' }}>
        <p style={{ margin: 0, color: 'var(--text-color-secondary)' }}>
          电话：138****8888
        </p>
        <p style={{ margin: 0, color: 'var(--text-color-secondary)' }}>
          地址：北京市朝阳区
        </p>
      </div>
    </div>
  ),
}

/**
 * 多条分割线 - 连续使用多条分割线
 */
export const Multiple: Story = {
  name: '多条分割线',
  render: () => (
    <div>
      <p>第一条内容</p>
      <Divider>第一部分</Divider>
      <p>第二条内容</p>
      <Divider dashed>第二部分</Divider>
      <p>第三条内容</p>
      <Divider orientation="left">第三部分</Divider>
      <p>第四条内容</p>
    </div>
  ),
}

/**
 * Playground - 在 Controls 面板中测试所有属性
 */
export const Playground: Story = {
  name: 'Playground',
  args: {
    children: '分割线文字',
    dashed: false,
    type: 'horizontal',
    orientation: 'left',
    orientationMargin: '100px',
    className: '',
  },
  render: (args) => <Divider {...args} />,
}

/**
 * 测试所有属性 - 验证 className、style、orientationMargin 等功能
 *
 * 注意：orientationMargin 仅在 orientation="left" 或 orientation="right" 时有效！
 */
export const TestAllProps: Story = {
  name: '测试所有属性',
  render: () => (
    <div>
      <h3>测试 className</h3>
      <Divider className="custom-divider">带自定义类名</Divider>

      <h3>测试 style</h3>
      <Divider style={{ borderColor: 'red' }}>红色边框</Divider>
      <Divider style={{ '--orientation-margin': '150px' } as any}>
        距离左边 150px（通过 style）
      </Divider>

      <h3>测试 orientationMargin - left</h3>
      <Divider orientation="left" orientationMargin="20px">
        距离左边 20px
      </Divider>
      <Divider orientation="left" orientationMargin="100px">
        距离左边 100px
      </Divider>
      <Divider orientation="left" orientationMargin="200px">
        距离左边 200px
      </Divider>

      <h3>测试 orientationMargin - right</h3>
      <Divider orientation="right" orientationMargin="50px">
        距离右边 50px
      </Divider>
      <Divider orientation="right" orientationMargin="150px">
        距离右边 150px
      </Divider>

      <h3>组合测试</h3>
      <Divider
        orientation="left"
        orientationMargin="80px"
        dashed
        className="custom-divider"
        style={{ color: 'blue' }}
      >
        左侧80px + 虚线 + 自定义类名 + 蓝色文字
      </Divider>
    </div>
  ),
}
