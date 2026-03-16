import type { Meta, StoryObj } from '@storybook/react'
import Card from './index'

const meta: Meta<typeof Card> = {
  title: '数据展示/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '卡片标题',
    },
    extra: {
      control: 'text',
      description: '标题右侧的额外内容',
    },
    bordered: {
      control: 'boolean',
      description: '是否显示边框',
    },
    hoverable: {
      control: 'boolean',
      description: '是否可悬停（悬停时添加阴影效果）',
    },
    shadow: {
      control: 'select',
      options: ['base', 'float', 'none'],
      description: '阴影级别',
    },
  },
}

export default meta
type Story = StoryObj<typeof Card>

/**
 * 基础用法 - 最简单的卡片用法
 */
export const Basic: Story = {
  name: '基础用法',
  args: {
    title: '默认标题',
    children: '这是一个基础的卡片组件，包含标题、内容区域。',
  },
}

/**
 * 带 extra - 标题右侧可以添加额外内容
 */
export const WithExtra: Story = {
  name: '带额外内容',
  args: {
    title: '卡片标题',
    extra: <a href="#">查看更多</a>,
    children: `
      卡片标题右侧可以放置操作按钮、链接等额外内容。
      通过设置 extra 属性来实现。
    `,
  },
}

/**
 * 无边框 - 不显示边框的卡片
 */
export const WithoutBorder: Story = {
  name: '无边框',
  args: {
    title: '无边框卡片',
    bordered: false,
    children: '通过设置 bordered={false} 可以移除卡片的边框。',
  },
}

/**
 * 可悬停 - 鼠标悬停时有浮起效果
 */
export const Hoverable: Story = {
  name: '可悬停',
  args: {
    title: '悬停试试',
    hoverable: true,
    children: '鼠标悬停在这个卡片上，会看到浮起的阴影效果。',
  },
}

/**
 * 浮起阴影 - 更明显的阴影效果
 */
export const FloatShadow: Story = {
  name: '浮起阴影',
  args: {
    title: '浮起阴影',
    shadow: 'float',
    children: '使用 shadow="float" 可以获得更明显的阴影效果。',
  },
}

/**
 * 无阴影 - 完全没有阴影
 */
export const NoShadow: Story = {
  name: '无阴影',
  args: {
    title: '无阴影',
    shadow: 'none',
    bordered: true,
    children: '通过设置 shadow="none" 可以完全移除阴影。',
  },
}

/**
 * 灵活的内容 - 可以包含任何 React 元素
 */
export const FlexibleContent: Story = {
  name: '灵活的内容',
  args: {
    title: '文章卡片',
    extra: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <button style={{ padding: '4px 12px', cursor: 'pointer' }}>点赞</button>
        <button style={{ padding: '4px 12px', cursor: 'pointer' }}>分享</button>
      </div>
    ),
    children: (
      <div>
        <p style={{ marginBottom: '12px' }}>
          Card 组件可以包含任何 React 元素，比如：
        </p>
        <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
          <li>文本段落</li>
          <li>图片、图标</li>
          <li>其他组件</li>
          <li>甚至嵌套的 Card</li>
        </ul>
        <img
          src="https://via.placeholder.com/400x200"
          alt="示例图片"
          style={{
            width: '100%',
            marginTop: '12px',
            borderRadius: '4px',
          }}
        />
      </div>
    ),
  },
}

/**
 * 卡片网格 - 多个卡片组成的网格布局
 */
export const CardGrid: Story = {
  name: '卡片网格',
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '24px',
      }}
    >
      <Card
        title="卡片 1"
        extra={<a href="#">更多</a>}
        hoverable
      >
        <p>这是第一个卡片的内容。</p>
      </Card>
      <Card
        title="卡片 2"
        extra={<a href="#">更多</a>}
        hoverable
      >
        <p>这是第二个卡片的内容。</p>
      </Card>
      <Card
        title="卡片 3"
        extra={<a href="#">更多</a>}
        hoverable
      >
        <p>这是第三个卡片的内容。</p>
      </Card>
      <Card
        title="卡片 4"
        extra={<a href="#">更多</a>}
        hoverable
      >
        <p>这是第四个卡片的内容。</p>
      </Card>
    </div>
  ),
}

/**
 * 可点击 - 点击卡片触发回调
 */
export const Clickable: Story = {
  name: '可点击卡片',
  args: {
    title: '点击我',
    hoverable: true,
    children: '点击这个卡片会触发 onClick 回调函数。',
    onClick: () => {
      alert('卡片被点击了！')
    },
  },
}

/**
 * 简洁卡片 - 只有内容，没有标题
 */
export const Simple: Story = {
  name: '简洁卡片',
  args: {
    children: '这是一个没有标题的简洁卡片，只包含内容区域。',
  },
}

/**
 * 自定义样式 - 通过 bodyStyle 和 headStyle 自定义样式
 */
export const CustomStyle: Story = {
  name: '自定义样式',
  args: {
    title: '自定义样式',
    extra: <a href="#">操作</a>,
    bodyStyle: {
      background: 'var(--component-hover-bg)',
      padding: '20px',
      borderRadius: '4px',
    },
    headStyle: {
      borderBottom: '1px solid var(--border-color)',
      paddingBottom: '12px',
      marginBottom: '16px',
    },
    children: `
      通过 bodyStyle 和 headStyle 属性，可以自定义内容区域和头部区域的样式。
    `,
  },
}

/**
 * 暗黑模式演示 - 在暗黑主题下的效果
 */
export const DarkMode: Story = {
  name: '暗黑模式',
  args: {
    title: '暗黑模式卡片',
    extra: <a href="#">更多</a>,
    hoverable: true,
    children: `
      这个卡片支持暗黑模式。
      在 Storybook 顶部切换主题为"dark"，看看效果吧！
    `,
  },
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
