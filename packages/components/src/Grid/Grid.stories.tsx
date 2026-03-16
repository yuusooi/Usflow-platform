import type { Meta, StoryObj } from '@storybook/react'
import Row from './Row'
import Col from './Col'

const meta: Meta<typeof Row> = {
  title: '通用与布局/Grid',
  component: Row,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded', // Grid 需要更多空间
  },
  argTypes: {
    gutter: {
      control: 'number',
      description: '列间距（像素）',
    },
    align: {
      control: 'select',
      options: ['top', 'middle', 'bottom', 'stretch'],
      description: '垂直对齐方式',
    },
    justify: {
      control: 'select',
      options: ['start', 'end', 'center', 'space-between', 'space-around'],
      description: '水平对齐方式',
    },
  },
}

export default meta
type Story = StoryObj<typeof Row>

// 通用的列样式
const colStyle = {
  background: '#165dff',
  color: 'white',
  padding: '20px',
  textAlign: 'center' as const,
  borderRadius: '4px',
  minHeight: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

// ============ 基础用法 ============

/**
 * 基础栅格 - 24 栅格系统
 */
export const Basic: Story = {
  render: () => (
    <div>
      <h3>24 栅格系统（1-24 列）</h3>
      <Row style={{ marginBottom: '16px' }}>
        <Col xs={24}>
          <div style={colStyle}>span-24 (100%)</div>
        </Col>
      </Row>

      <Row style={{ marginBottom: '16px' }}>
        <Col xs={12}>
          <div style={{ ...colStyle, background: '#4080ff' }}>span-12 (50%)</div>
        </Col>
        <Col xs={12}>
          <div style={colStyle}>span-12 (50%)</div>
        </Col>
      </Row>

      <Row style={{ marginBottom: '16px' }}>
        <Col xs={8}>
          <div style={{ ...colStyle, background: '#69c0ff' }}>span-8 (33%)</div>
        </Col>
        <Col xs={8}>
          <div style={{ ...colStyle, background: '#4080ff' }}>span-8 (33%)</div>
        </Col>
        <Col xs={8}>
          <div style={colStyle}>span-8 (33%)</div>
        </Col>
      </Row>

      <Row>
        <Col xs={6}>
          <div style={{ ...colStyle, background: '#85a5ff' }}>span-6 (25%)</div>
        </Col>
        <Col xs={6}>
          <div style={{ ...colStyle, background: '#69c0ff' }}>span-6 (25%)</div>
        </Col>
        <Col xs={6}>
          <div style={{ ...colStyle, background: '#4080ff' }}>span-6 (25%)</div>
        </Col>
        <Col xs={6}>
          <div style={colStyle}>span-6 (25%)</div>
        </Col>
      </Row>
    </div>
  ),
}

/**
 * 栅格间隔 - gutter
 */
export const Gutter: Story = {
  render: () => (
    <div>
      <h3>列间距（gutter）</h3>

      <h4>gutter={0}（默认）</h4>
      <Row gutter={0} style={{ marginBottom: '16px' }}>
        <Col xs={8}>
          <div style={colStyle}>列 1</div>
        </Col>
        <Col xs={8}>
          <div style={colStyle}>列 2</div>
        </Col>
        <Col xs={8}>
          <div style={colStyle}>列 3</div>
        </Col>
      </Row>

      <h4>gutter={16}</h4>
      <Row gutter={16} style={{ marginBottom: '16px' }}>
        <Col xs={8}>
          <div style={colStyle}>列 1</div>
        </Col>
        <Col xs={8}>
          <div style={colStyle}>列 2</div>
        </Col>
        <Col xs={8}>
          <div style={colStyle}>列 3</div>
        </Col>
      </Row>

      <h4>gutter={24}</h4>
      <Row gutter={24}>
        <Col xs={8}>
          <div style={colStyle}>列 1</div>
        </Col>
        <Col xs={8}>
          <div style={colStyle}>列 2</div>
        </Col>
        <Col xs={8}>
          <div style={colStyle}>列 3</div>
        </Col>
      </Row>
    </div>
  ),
}

// ============ 对齐方式 ============

/**
 * 垂直对齐 - align
 */
export const Align: Story = {
  render: () => (
    <div>
      <h3>垂直对齐（align）</h3>

      <h4>align="top"（默认）</h4>
      <Row align="top" style={{ marginBottom: '16px', border: '2px solid #e5e6eb', padding: '10px' }}>
        <Col xs={8}>
          <div style={{ ...colStyle, minHeight: '60px' }}>顶部对齐</div>
        </Col>
        <Col xs={8}>
          <div style={{ ...colStyle, background: '#4080ff', minHeight: '100px' }}>
            较高内容
          </div>
        </Col>
        <Col xs={8}>
          <div style={{ ...colStyle, minHeight: '80px' }}>中间内容</div>
        </Col>
      </Row>

      <h4>align="middle"</h4>
      <Row align="middle" style={{ marginBottom: '16px', border: '2px solid #e5e6eb', padding: '10px' }}>
        <Col xs={8}>
          <div style={{ ...colStyle, minHeight: '60px' }}>居中对齐</div>
        </Col>
        <Col xs={8}>
          <div style={{ ...colStyle, background: '#4080ff', minHeight: '100px' }}>
            较高内容
          </div>
        </Col>
        <Col xs={8}>
          <div style={{ ...colStyle, minHeight: '80px' }}>中间内容</div>
        </Col>
      </Row>

      <h4>align="bottom"</h4>
      <Row align="bottom" style={{ marginBottom: '16px', border: '2px solid #e5e6eb', padding: '10px' }}>
        <Col xs={8}>
          <div style={{ ...colStyle, minHeight: '60px' }}>底部对齐</div>
        </Col>
        <Col xs={8}>
          <div style={{ ...colStyle, background: '#4080ff', minHeight: '100px' }}>
            较高内容
          </div>
        </Col>
        <Col xs={8}>
          <div style={{ ...colStyle, minHeight: '80px' }}>中间内容</div>
        </Col>
      </Row>
    </div>
  ),
}

/**
 * 水平对齐 - justify
 */
export const Justify: Story = {
  render: () => (
    <div>
      <h3>水平对齐（justify）</h3>

      <h4>justify="start"（默认）</h4>
      <Row justify="start" style={{ marginBottom: '16px', border: '2px solid #e5e6eb', padding: '10px' }}>
        <Col xs={6}>
          <div style={colStyle}>列 1</div>
        </Col>
        <Col xs={6}>
          <div style={colStyle}>列 2</div>
        </Col>
        <Col xs={6}>
          <div style={colStyle}>列 3</div>
        </Col>
      </Row>

      <h4>justify="center"</h4>
      <Row justify="center" style={{ marginBottom: '16px', border: '2px solid #e5e6eb', padding: '10px' }}>
        <Col xs={6}>
          <div style={colStyle}>列 1</div>
        </Col>
        <Col xs={6}>
          <div style={colStyle}>列 2</div>
        </Col>
        <Col xs={6}>
          <div style={colStyle}>列 3</div>
        </Col>
      </Row>

      <h4>justify="end"</h4>
      <Row justify="end" style={{ marginBottom: '16px', border: '2px solid #e5e6eb', padding: '10px' }}>
        <Col xs={6}>
          <div style={colStyle}>列 1</div>
        </Col>
        <Col xs={6}>
          <div style={colStyle}>列 2</div>
        </Col>
        <Col xs={6}>
          <div style={colStyle}>列 3</div>
        </Col>
      </Row>

      <h4>justify="space-between"</h4>
      <Row justify="space-between" style={{ marginBottom: '16px', border: '2px solid #e5e6eb', padding: '10px' }}>
        <Col xs={6}>
          <div style={colStyle}>列 1</div>
        </Col>
        <Col xs={6}>
          <div style={colStyle}>列 2</div>
        </Col>
        <Col xs={6}>
          <div style={colStyle}>列 3</div>
        </Col>
      </Row>

      <h4>justify="space-around"</h4>
      <Row justify="space-around" style={{ border: '2px solid #e5e6eb', padding: '10px' }}>
        <Col xs={6}>
          <div style={colStyle}>列 1</div>
        </Col>
        <Col xs={6}>
          <div style={colStyle}>列 2</div>
        </Col>
        <Col xs={6}>
          <div style={colStyle}>列 3</div>
        </Col>
      </Row>
    </div>
  ),
}

// ============ 偏移和排序 ============

/**
 * 列偏移 - offset
 */
export const Offset: Story = {
  render: () => (
    <div>
      <h3>列偏移（offset）</h3>

      <Row style={{ marginBottom: '16px' }}>
        <Col xs={8}>
          <div style={colStyle}>列 1 (span=8)</div>
        </Col>
        <Col xs={8} offset={8}>
          <div style={{ ...colStyle, background: '#4080ff' }}>列 2 (span=8, offset=8)</div>
        </Col>
      </Row>

      <Row style={{ marginBottom: '16px' }}>
        <Col xs={6} offset={6}>
          <div style={{ ...colStyle, background: '#4080ff' }}>偏移 6 列</div>
        </Col>
      </Row>

      <Row>
        <Col xs={6}>
          <div style={colStyle}>列 1</div>
        </Col>
        <Col xs={6} offset={6}>
          <div style={{ ...colStyle, background: '#4080ff' }}>列 2 (offset=6)</div>
        </Col>
      </Row>
    </div>
  ),
}

/**
 * 列排序 - push / pull
 */
export const PushPull: Story = {
  render: () => (
    <div>
      <h3>列排序（push/pull）</h3>

      <Row style={{ marginBottom: '16px' }}>
        <Col xs={12} push={12}>
          <div style={{ ...colStyle, background: '#4080ff' }}>
            列 1 (span=12, push=12) - 被推到右边
          </div>
        </Col>
        <Col xs={12} pull={12}>
          <div style={colStyle}>列 2 (span=12, pull=12) - 被拉到左边</div>
        </Col>
      </Row>

      <Row>
        <Col xs={8}>
          <div style={colStyle}>列 1</div>
        </Col>
        <Col xs={8} push={8}>
          <div style={{ ...colStyle, background: '#4080ff' }}>列 2 (push=8)</div>
        </Col>
        <Col xs={8} pull={8}>
          <div style={colStyle}>列 3 (pull=8)</div>
        </Col>
      </Row>
    </div>
  ),
}

// ============ 响应式布局 ============

/**
 * 响应式 - 简单形式
 */
export const ResponsiveSimple: Story = {
  render: () => (
    <div>
      <h3>响应式布局 - 简单形式</h3>
      <p style={{ color: '#666', marginBottom: '16px' }}>
        调整浏览器宽度测试：xs 默认全宽，md 半宽
      </p>

      <Row gutter={16} style={{ border: '2px solid #e5e6eb', padding: '10px' }}>
        <Col xs={24} md={12}>
          <div style={{ ...colStyle, background: '#91d5ff', marginBottom: '10px' }}>
            <strong>xs=24 md=12</strong>
            <br />
            手机全宽，电脑半宽
          </div>
        </Col>
        <Col xs={24} md={12}>
          <div style={{ ...colStyle, background: '#69c0ff', marginBottom: '10px' }}>
            <strong>xs=24 md=12</strong>
            <br />
            手机全宽，电脑半宽
          </div>
        </Col>
      </Row>
    </div>
  ),
}

/**
 * 响应式 - 多断点
 */
export const ResponsiveMultiBreakpoints: Story = {
  render: () => (
    <div>
      <h3>响应式布局 - 多断点</h3>
      <p style={{ color: '#666', marginBottom: '16px' }}>
        测试不同屏幕宽度下的布局变化
      </p>

      <Row gutter={16} style={{ border: '2px solid #52c41a', padding: '10px' }}>
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <div style={{ ...colStyle, background: '#95de64', marginBottom: '10px' }}>
            <strong>列 1</strong>
            <br />
            xs=24 sm=12 md=8 lg=6 xl=4
          </div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <div style={{ ...colStyle, background: '#b7eb8f', marginBottom: '10px' }}>
            <strong>列 2</strong>
            <br />
            xs=24 sm=12 md=8 lg=6 xl=4
          </div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <div style={{ ...colStyle, background: '#95de64', marginBottom: '10px' }}>
            <strong>列 3</strong>
            <br />
            xs=24 sm=12 md=8 lg=6 xl=4
          </div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <div style={{ ...colStyle, background: '#b7eb8f', marginBottom: '10px' }}>
            <strong>列 4</strong>
            <br />
            xs=24 sm=12 md=8 lg=6 xl=4
          </div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <div style={{ ...colStyle, background: '#95de64', marginBottom: '10px' }}>
            <strong>列 5</strong>
            <br />
            xs=24 sm=12 md=8 lg=6 xl=4
          </div>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <div style={{ ...colStyle, background: '#b7eb8f', marginBottom: '10px' }}>
            <strong>列 6</strong>
            <br />
            xs=24 sm=12 md=8 lg=6 xl=4
          </div>
        </Col>
      </Row>
    </div>
  ),
}

/**
 * 响应式 - 对象形式（offset + push/pull）
 */
export const ResponsiveObject: Story = {
  render: () => (
    <div>
      <h3>响应式布局 - 对象形式</h3>
      <p style={{ color: '#666', marginBottom: '16px' }}>
        手机不偏移，电脑偏移
      </p>

      <Row gutter={16} style={{ border: '2px solid #faad14', padding: '10px' }}>
        <Col xs={24} md={{ span: 8, offset: 4 }}>
          <div style={{ ...colStyle, background: '#ffe58f', marginBottom: '10px' }}>
            <strong>偏移列</strong>
            <br />
            xs={24} md={'{ span: 8, offset: 4 }'}
          </div>
        </Col>
        <Col xs={24} md={8}>
          <div style={{ ...colStyle, background: '#ffd666', marginBottom: '10px' }}>
            <strong>普通列</strong>
            <br />
            xs={24} md={8}
          </div>
        </Col>
      </Row>
    </div>
  ),
}

// ============ 实际应用场景 ============

/**
 * 卡片布局 - 经典的 12 列布局
 */
export const CardLayout: Story = {
  render: () => (
    <div>
      <h3>卡片布局（12 列）</h3>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <div
            style={{
              border: '1px solid #e5e6eb',
              borderRadius: '8px',
              padding: '20px',
              background: 'white',
            }}
          >
            <h4 style={{ marginTop: 0 }}>卡片 1</h4>
            <p>这是第一张卡片的内容</p>
          </div>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <div
            style={{
              border: '1px solid #e5e6eb',
              borderRadius: '8px',
              padding: '20px',
              background: 'white',
            }}
          >
            <h4 style={{ marginTop: 0 }}>卡片 2</h4>
            <p>这是第二张卡片的内容</p>
          </div>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <div
            style={{
              border: '1px solid #e5e6eb',
              borderRadius: '8px',
              padding: '20px',
              background: 'white',
            }}
          >
            <h4 style={{ marginTop: 0 }}>卡片 3</h4>
            <p>这是第三张卡片的内容</p>
          </div>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <div
            style={{
              border: '1px solid #e5e6eb',
              borderRadius: '8px',
              padding: '20px',
              background: 'white',
            }}
          >
            <h4 style={{ marginTop: 0 }}>卡片 4</h4>
            <p>这是第四张卡片的内容</p>
          </div>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <div
            style={{
              border: '1px solid #e5e6eb',
              borderRadius: '8px',
              padding: '20px',
              background: 'white',
            }}
          >
            <h4 style={{ marginTop: 0 }}>卡片 5</h4>
            <p>这是第五张卡片的内容</p>
          </div>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <div
            style={{
              border: '1px solid #e5e6eb',
              borderRadius: '8px',
              padding: '20px',
              background: 'white',
            }}
          >
            <h4 style={{ marginTop: 0 }}>卡片 6</h4>
            <p>这是第六张卡片的内容</p>
          </div>
        </Col>
      </Row>
    </div>
  ),
}

/**
 * 表单布局 - 左侧标签，右侧输入框
 */
export const FormLayout: Story = {
  render: () => (
    <div>
      <h3>表单布局</h3>

      <div style={{ maxWidth: '600px' }}>
        <Row gutter={16} style={{ marginBottom: '16px' }} align="middle">
          <Col xs={6}>
            <div style={{ textAlign: 'right', fontWeight: 'bold' }}>用户名：</div>
          </Col>
          <Col xs={18}>
            <input
              type="text"
              placeholder="请输入用户名"
              style={{ width: '100%', padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}
            />
          </Col>
        </Row>

        <Row gutter={16} style={{ marginBottom: '16px' }} align="middle">
          <Col xs={6}>
            <div style={{ textAlign: 'right', fontWeight: 'bold' }}>邮箱：</div>
          </Col>
          <Col xs={18}>
            <input
              type="email"
              placeholder="请输入邮箱"
              style={{ width: '100%', padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}
            />
          </Col>
        </Row>

        <Row gutter={16} align="middle">
          <Col xs={6}>
            <div style={{ textAlign: 'right', fontWeight: 'bold' }}>备注：</div>
          </Col>
          <Col xs={18}>
            <textarea
              placeholder="请输入备注"
              rows={3}
              style={{ width: '100%', padding: '8px', border: '1px solid #d9d9d9', borderRadius: '4px' }}
            />
          </Col>
        </Row>
      </div>
    </div>
  ),
}

/**
 * 页面头部 - 左侧标题，右侧操作
 */
export const PageHeader: Story = {
  render: () => (
    <div>
      <h3>页面头部布局</h3>

      <Row gutter={16} style={{ marginBottom: '16px' }} align="middle">
        <Col xs={12}>
          <h2 style={{ margin: 0 }}>用户管理</h2>
        </Col>
        <Col xs={12}>
          <div style={{ textAlign: 'right' }}>
            <button
              style={{
                padding: '8px 16px',
                background: '#165dff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              新增用户
            </button>
          </div>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24}>
          <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '4px' }}>
            这里是页面内容区域
          </div>
        </Col>
      </Row>
    </div>
  ),
}

/**
 * 不等分布局 - 常见的侧边栏 + 主内容
 */
export const SidebarLayout: Story = {
  render: () => (
    <div>
      <h3>侧边栏布局</h3>
      <p style={{ color: '#666', marginBottom: '16px' }}>
        sm 断点（576px）以上显示左右布局，以下显示上下布局
      </p>

      <Row gutter={16}>
        <Col xs={24} sm={6}>
          <div
            style={{
              background: '#001529',
              color: 'white',
              padding: '20px',
              minHeight: '300px',
              borderRadius: '4px',
            }}
          >
            <h4 style={{ color: 'white', marginTop: 0 }}>侧边栏</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ padding: '8px 0' }}>菜单 1</li>
              <li style={{ padding: '8px 0' }}>菜单 2</li>
              <li style={{ padding: '8px 0' }}>菜单 3</li>
            </ul>
          </div>
        </Col>
        <Col xs={24} sm={18}>
          <div
            style={{
              background: 'white',
              padding: '20px',
              minHeight: '300px',
              border: '1px solid #e5e6eb',
              borderRadius: '4px',
            }}
          >
            <h4 style={{ marginTop: 0 }}>主内容区</h4>
            <p>这里是主要内容区域</p>
          </div>
        </Col>
      </Row>
    </div>
  ),
}
