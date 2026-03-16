import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import Table from './index'

const meta: Meta<typeof Table> = {
  title: '数据展示/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded', // Table 需要更多空间
  },
  argTypes: {
    bordered: {
      control: 'boolean',
      description: '是否显示边框',
    },
    size: {
      control: 'select',
      options: ['small', 'default', 'large'],
      description: '表格尺寸',
    },
    rowKey: {
      control: 'text',
      description: '行的唯一标识字段',
    },
    sortBy: {
      control: 'text',
      description: '排序字段',
    },
    sortOrder: {
      control: 'select',
      options: ['asc', 'desc'],
      description: '排序方式',
    },
    filterBy: {
      control: 'text',
      description: '筛选字段',
    },
  },
}

export default meta
type Story = StoryObj<typeof Table>

// 准备测试数据
const userData = [
  { key: '1', name: '张三', age: 25, city: '北京' },
  { key: '2', name: '李四', age: 30, city: '上海' },
  { key: '3', name: '王五', age: 28, city: '广州' },
  { key: '4', name: '赵六', age: 22, city: '深圳' },
  { key: '5', name: '钱七', age: 35, city: '杭州' },
]

const userColumns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '城市', key: 'city' },
]

const studentData = [
  { key: '1', name: '张三', age: 18, score: 85, grade: 'A' },
  { key: '2', name: '李四', age: 19, score: 92, grade: 'A' },
  { key: '3', name: '王五', age: 20, score: 78, grade: 'B' },
  { key: '4', name: '赵六', age: 18, score: 65, grade: 'C' },
  { key: '5', name: '钱七', age: 21, score: 88, grade: 'A' },
  { key: '6', name: '孙八', age: 19, score: 72, grade: 'B' },
  { key: '7', name: '周九', age: 20, score: 95, grade: 'A' },
  { key: '8', name: '吴十', age: 18, score: 58, grade: 'D' },
  { key: '9', name: '郑十一', age: 22, score: 81, grade: 'B' },
  { key: '10', name: '王小二', age: 19, score: 76, grade: 'B' },
  { key: '11', name: '李小三', age: 20, score: 89, grade: 'A' },
  { key: '12', name: '张小四', age: 21, score: 67, grade: 'C' },
]

const studentColumns = [
  { title: '姓名', key: 'name' },
  { title: '年龄', key: 'age' },
  { title: '分数', key: 'score' },
  { title: '等级', key: 'grade' },
]

// ============ 基础用法 ============

/**
 * 默认表格 - 最基础的用法
 */
export const Default: Story = {
  args: {
    columns: userColumns,
    dataSource: userData,
  },
}

/**
 * 带边框 - 显示表格边框
 */
export const Bordered: Story = {
  args: {
    columns: userColumns,
    dataSource: userData,
    bordered: true,
  },
}

/**
 * 小尺寸表格 - 紧凑的样式
 */
export const Small: Story = {
  args: {
    columns: userColumns,
    dataSource: userData,
    size: 'small',
  },
}

/**
 * 大尺寸表格 - 更大的行高
 */
export const Large: Story = {
  args: {
    columns: userColumns,
    dataSource: userData,
    size: 'large',
  },
}

// ============ 自定义渲染 ============

/**
 * 自定义单元格渲染 - 使用 render 函数
 */
export const CustomRender: Story = {
  args: {
    columns: [
      {
        title: '姓名',
        key: 'name',
        render: (text: string) => <strong>{text}</strong>,
      },
      {
        title: '年龄',
        key: 'age',
        render: (age: number) => <span style={{ color: age > 25 ? 'red' : 'green' }}>{age}</span>,
      },
      {
        title: '城市',
        key: 'city',
        render: (city: string) => <span>📍 {city}</span>,
      },
    ],
    dataSource: userData,
  },
}

/**
 * 自定义渲染 - 组合多个字段
 */
export const RenderCombined: Story = {
  args: {
    columns: [
      {
        title: '学生信息',
        key: 'name',
        render: (_: unknown, record: any) => (
          <div>
            <div style={{ fontWeight: 'bold' }}>{record.name}</div>
            <div style={{ fontSize: '12px', color: '#999' }}>学号: {record.key}</div>
          </div>
        ),
      },
      { title: '年龄', key: 'age' },
      { title: '分数', key: 'score' },
      { title: '等级', key: 'grade' },
    ],
    dataSource: studentData.slice(0, 5),
  },
}

/**
 * 操作列 - 带按钮的操作列
 */
export const ActionColumn: Story = {
  args: {
    columns: [
      { title: '姓名', key: 'name' },
      { title: '年龄', key: 'age' },
      { title: '城市', key: 'city' },
      {
        title: '操作',
        key: 'action',
        render: (_: unknown, record: any) => (
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => alert(`编辑 ${record.name}`)}>编辑</button>
            <button onClick={() => alert(`删除 ${record.name}`)}>删除</button>
          </div>
        ),
      },
    ],
    dataSource: userData,
  },
}

// ============ 排序功能 ============

/**
 * 按年龄升序排序
 */
export const SortByAgeAsc: Story = {
  args: {
    columns: studentColumns,
    dataSource: studentData,
    sortBy: 'age',
    sortOrder: 'asc',
  },
}

/**
 * 按分数降序排序
 */
export const SortByScoreDesc: Story = {
  args: {
    columns: studentColumns,
    dataSource: studentData,
    sortBy: 'score',
    sortOrder: 'desc',
  },
}

// ============ 筛选功能 ============

/**
 * 筛选年龄大于等于 20 的学生
 */
export const FilterAge: Story = {
  args: {
    columns: studentColumns,
    dataSource: studentData,
    filterBy: 'age',
    filterValue: (age: number) => age >= 20,
  },
}

/**
 * 筛选等级为 A 的学生
 */
export const FilterGrade: Story = {
  args: {
    columns: studentColumns,
    dataSource: studentData,
    filterBy: 'grade',
    filterValue: 'A',
  },
}

/**
 * 筛选分数在 80-90 之间的学生
 */
export const FilterScoreRange: Story = {
  args: {
    columns: studentColumns,
    dataSource: studentData,
    filterBy: 'score',
    filterValue: (score: number) => score >= 80 && score <= 90,
  },
}

// ============ 组合功能 ============

/**
 * 排序 + 筛选组合
 */
export const SortAndFilter: Story = {
  args: {
    columns: studentColumns,
    dataSource: studentData,
    sortBy: 'age',
    sortOrder: 'asc',
    filterBy: 'grade',
    filterValue: 'A',
  },
}

/**
 * 带边框 + 排序
 */
export const BorderedWithSort: Story = {
  args: {
    columns: studentColumns,
    dataSource: studentData,
    bordered: true,
    sortBy: 'score',
    sortOrder: 'desc',
  },
}

// ============ 分页功能 ============

/**
 * 基础分页 - 每页 5 条（可点击翻页）
 */
export const PaginationBasic: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(1)

    return (
      <Table
        columns={studentColumns}
        dataSource={studentData}
        pagination={{
          current: currentPage,
          pageSize: 5,
          onChange: (page) => setCurrentPage(page),
        }}
      />
    )
  },
}

/**
 * 分页 - 显示第 2 页（可点击翻页）
 */
export const PaginationPage2: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(2)

    return (
      <Table
        columns={studentColumns}
        dataSource={studentData}
        pagination={{
          current: currentPage,
          pageSize: 5,
          onChange: (page) => setCurrentPage(page),
        }}
      />
    )
  },
}

/**
 * 分页 - 每页 3 条（可点击翻页）
 */
export const PaginationSmallSize: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(1)

    return (
      <Table
        columns={studentColumns}
        dataSource={studentData}
        pagination={{
          current: currentPage,
          pageSize: 3,
          onChange: (page) => setCurrentPage(page),
        }}
      />
    )
  },
}

/**
 * 分页 + 排序 + 筛选组合（可点击翻页）
 */
export const PaginationWithSortAndFilter: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(1)

    return (
      <Table
        columns={studentColumns}
        dataSource={studentData}
        sortBy="age"
        sortOrder="asc"
        filterBy="grade"
        filterValue="A"
        pagination={{
          current: currentPage,
          pageSize: 3,
          onChange: (page) => setCurrentPage(page),
        }}
      />
    )
  },
}

// ============ 特殊场景 ============

/**
 * 空数据 - 显示暂无数据
 */
export const EmptyData: Story = {
  args: {
    columns: userColumns,
    dataSource: [],
  },
}

/**
 * 大数据量 - 模拟真实场景（可点击翻页）
 */
export const LargeData: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(1)

    const largeData = Array.from({ length: 100 }, (_, i) => ({
      key: `${i + 1}`,
      id: i + 1,
      name: `用户${i + 1}`,
      email: `user${i + 1}@example.com`,
      status: i % 3 === 0 ? '活跃' : '离线',
    }))

    return (
      <Table
        columns={[
          { title: 'ID', key: 'id' },
          { title: '姓名', key: 'name' },
          { title: '邮箱', key: 'email' },
          { title: '状态', key: 'status' },
        ]}
        dataSource={largeData}
        pagination={{
          current: currentPage,
          pageSize: 10,
          onChange: (page) => setCurrentPage(page),
        }}
      />
    )
  },
}

/**
 * 完整功能展示
 */
export const FullFeatured: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(1)

    const columns = [
      {
        title: '学生',
        key: 'name',
        render: (_: unknown, record: any) => (
          <div>
            <strong>{record.name}</strong>
            <div style={{ fontSize: '12px', color: '#999' }}>{record.age} 岁</div>
          </div>
        ),
      },
      {
        title: '分数',
        key: 'score',
        render: (score: number) => (
          <span
            style={{
              color: score >= 90 ? 'green' : score >= 60 ? 'orange' : 'red',
              fontWeight: 'bold',
            }}
          >
            {score}
          </span>
        ),
      },
      { title: '等级', key: 'grade' },
      {
        title: '操作',
        key: 'action',
        render: (_: unknown, record: any) => (
          <button onClick={() => alert(`查看 ${record.name} 的详细信息`)}>
            查看详情
          </button>
        ),
      },
    ]

    return (
      <Table
        columns={columns}
        dataSource={studentData}
        bordered
        size="default"
        sortBy="score"
        sortOrder="desc"
        pagination={{
          current: currentPage,
          pageSize: 5,
          onChange: (page) => setCurrentPage(page),
        }}
      />
    )
  },
}

/**
 * 响应式表格示例
 */
export const Responsive: Story = {
  render: () => {
    const [currentPage, setCurrentPage] = React.useState(1)

    return (
      <div style={{ padding: '20px' }}>
        <h2>用户管理表格</h2>
        <Table
          columns={[
            { title: '姓名', key: 'name' },
            { title: '年龄', key: 'age' },
            { title: '城市', key: 'city' },
            {
              title: '操作',
              key: 'action',
              render: (_: unknown, record: any) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    style={{
                      padding: '4px 12px',
                      border: '1px solid #165dff',
                      background: '#165dff',
                      color: 'white',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                    onClick={() => alert(`编辑 ${record.name}`)}
                  >
                    编辑
                  </button>
                  <button
                    style={{
                      padding: '4px 12px',
                      border: '1px solid #ff4d4f',
                      background: '#ff4d4f',
                      color: 'white',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                    onClick={() => alert(`删除 ${record.name}`)}
                  >
                    删除
                  </button>
                </div>
              ),
            },
          ]}
          dataSource={userData}
          bordered
          pagination={{
            current: currentPage,
            pageSize: 10,
            onChange: (page) => setCurrentPage(page),
          }}
        />
      </div>
    )
  },
}
