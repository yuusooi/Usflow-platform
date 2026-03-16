import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import Layout from './index'

const meta: Meta<typeof Layout> = {
  title: '通用与布局/Layout',
  component: Layout,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Layout>

/**
 * 基础用法 - 最简单的上中下布局
 */
export const Basic: Story = {
  name: '基础用法',
  render: () => (
    <Layout style={{ height: '400px' }}>
      <Layout.Header>Header</Layout.Header>
      <Layout.Content>Content</Layout.Content>
      <Layout.Footer>Footer</Layout.Footer>
    </Layout>
  ),
}

/**
 * 顶部-侧边栏-内容 - 典型的后台管理布局
 */
export const TopSidebar: Story = {
  name: '顶部-侧边栏-内容',
  render: () => (
    <Layout style={{ height: '400px' }}>
      <Layout.Header>Header</Layout.Header>
      <Layout>
        <Layout.Sider>Sider</Layout.Sider>
        <Layout.Content>Content</Layout.Content>
      </Layout>
      <Layout.Footer>Footer</Layout.Footer>
    </Layout>
  ),
}

/**
 * 可折叠侧边栏 - 点击底部箭头折叠/展开
 */
export const CollapsibleSider: Story = {
  name: '可折叠侧边栏',
  render: () => {
    const [collapsed, setCollapsed] = React.useState(false)

    return (
      <Layout style={{ height: '400px' }}>
        <Layout.Header>Header</Layout.Header>
        <Layout>
          <Layout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            width={200}
            collapsedWidth={64}
          >
            {collapsed ? '折叠' : '侧边栏内容'}
          </Layout.Sider>
          <Layout.Content>Content</Layout.Content>
        </Layout>
      </Layout>
    )
  },
}

/**
 * 自定义宽度 - 自定义 Sider 宽度
 */
export const CustomWidth: Story = {
  name: '自定义宽度',
  render: () => (
    <Layout style={{ height: '400px' }}>
      <Layout>
        <Layout.Sider width={300}>300px 宽度的侧边栏</Layout.Sider>
        <Layout.Content>Content</Layout.Content>
      </Layout>
    </Layout>
  ),
}

/**
 * 固定侧边栏 - 侧边栏内容固定不滚动
 */
export const FixedSider: Story = {
  name: '固定侧边栏',
  render: () => (
    <Layout style={{ height: '400px' }}>
      <Layout>
        <Layout.Sider>
          <div
            style={{
              height: '200px',
              background: 'rgba(0,0,0,0.05)',
              margin: '8px',
            }}
          >
            固定区域
          </div>
        </Layout.Sider>
        <Layout.Content>
          <div style={{ height: '800px' }}>
            {Array.from({ length: 50 }).map((_, i) => (
              <p key={i}>内容行 {i + 1}</p>
            ))}
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  ),
}

/**
 * 完整后台管理布局 - 实际项目中的典型布局
 */
export const AdminLayout: Story = {
  name: '完整后台管理布局',
  render: () => {
    const [collapsed, setCollapsed] = React.useState(false)

    return (
      <Layout style={{ height: '600px' }}>
        <Layout.Header
          style={{
            background: 'var(--primary-color)',
            color: 'var(--primary-text-color)',
          }}
        >
          <div style={{ fontSize: '20px', fontWeight: 'bold' }}>My UI Lib</div>
        </Layout.Header>
        <Layout>
          <Layout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            width={200}
            collapsedWidth={64}
          >
            <div>
              <div
                style={{
                  padding: '16px',
                  fontWeight: 'bold',
                  borderBottom: '1px solid var(--border-color)',
                }}
              >
                {collapsed ? '菜单' : '导航菜单'}
              </div>
              <div style={{ padding: '16px' }}>
                <div
                  style={{
                    marginBottom: '8px',
                    padding: '8px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  仪表盘
                </div>
                <div
                  style={{
                    marginBottom: '8px',
                    padding: '8px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  用户管理
                </div>
                <div
                  style={{
                    marginBottom: '8px',
                    padding: '8px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  系统设置
                </div>
              </div>
            </div>
          </Layout.Sider>
          <Layout>
            <Layout.Content>
              <div
                style={{
                  padding: '24px',
                  background: 'var(--component-bg)',
                  borderRadius: '8px',
                  minHeight: '380px',
                }}
              >
                <h2>页面标题</h2>
                <p>这是主要内容区域，可以根据需要放置任何内容。</p>
                <p>Layout 组件采用 Flexbox 布局，自动适应父容器高度。</p>
              </div>
            </Layout.Content>
            <Layout.Footer>
              My UI Lib ©{new Date().getFullYear()} Created by Me
            </Layout.Footer>
          </Layout>
        </Layout>
      </Layout>
    )
  },
}

/**
 * 响应式布局 - 在不同屏幕尺寸下自动调整
 */
export const Responsive: Story = {
  name: '响应式布局',
  render: () => {
    const [collapsed, setCollapsed] = React.useState(false)

    return (
      <Layout style={{ height: '400px' }}>
        <Layout.Header>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>响应式布局-</span>
            <span>调整窗口大小查看效果</span>
          </div>
        </Layout.Header>
        <Layout>
          <Layout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
            breakpoint="lg"
            width={200}
          >
            侧边栏
          </Layout.Sider>
          <Layout.Content>
            <p>在小屏幕上，侧边栏会自动折叠。</p>
          </Layout.Content>
        </Layout>
      </Layout>
    )
  },
}

/**
 * 暗黑模式 - 在暗黑主题下的效果
 */
export const DarkMode: Story = {
  name: '暗黑模式',
  render: () => (
    <Layout style={{ height: '400px' }}>
      <Layout.Header>Header</Layout.Header>
      <Layout>
        <Layout.Sider>Sider</Layout.Sider>
        <Layout.Content>Content</Layout.Content>
      </Layout>
      <Layout.Footer>Footer</Layout.Footer>
    </Layout>
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
