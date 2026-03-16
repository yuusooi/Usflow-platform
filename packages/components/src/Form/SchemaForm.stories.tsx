import type { Meta, StoryObj } from '@storybook/react'
import { SchemaForm } from './SchemaForm'

// Storybook 的元数据配置
const meta: Meta<typeof SchemaForm> = {
  title: '数据录入/SchemaForm', // 在 Storybook 侧边栏显示的路径
  component: SchemaForm, // 要测试的组件
  tags: ['autodocs'], // 自动生成文档
}

export default meta
type Story = StoryObj<typeof SchemaForm>

/**
 * 基础测试：简单的登录表单
 * 验证点：
 * 1. 能否正确渲染用户名和密码输入框
 * 2. 点击提交后能否收集到数据
 */
export const BasicForm: Story = {
  name: '基础表单', // 在 Storybook 中显示的名字
  args: {
    // schemas 配置：定义表单结构
    schemas: [
      {
        type: 'input', // 组件类型：普通输入框
        name: 'username', // 字段名
        label: '用户名', // 标签文字
        placeholder: '请输入用户名', // 占位符
        initialValue: '', // 初始值
      },
      {
        type: 'password', // 组件类型：密码输入框
        name: 'password', // 字段名
        label: '密码', // 标签文字
        placeholder: '请输入密码',
        initialValue: '',
      },
    ],
    // 提交回调函数：打印收集到的数据
    onSubmit: (values) => {
      console.log('表单提交数据：', values)
      alert(`提交成功！\n用户名：${values.username}\n密码：${values.password}`)
    },
    submitText: '登录', // 提交按钮文字
  },
}

/**
 * 进阶测试：带联动的注册表单
 * 验证点：
 * 1. 当国家选择"中国"时，才显示省份字段
 * 2. 当国家选择其他国家时，省份字段隐藏
 */
export const FormWithLinkage: Story = {
  name: '表单联动',
  args: {
    schemas: [
      {
        type: 'input',
        name: 'username',
        label: '用户名',
        placeholder: '请输入用户名',
      },
      {
        type: 'input', // 先用 input 代替 select（后面你可 以添加真正的 Select 组件）
        name: 'country',
        label: '国家',
        placeholder: '请输入国家（输入"中国"会显示省份字段）',
      },
      {
        type: 'input',
        name: 'province',
        label: '省份',
        placeholder: '请输入省份',
        // 【核心联动逻辑】当 country 不等于"中国"时，隐藏此字段
        hidden: (values) => {
          return values.country !== '中国'
        },
      },
    ],
    onSubmit: (values) => {
      alert(`提交成功！\n${JSON.stringify(values, null, 2)}`)
    },
    submitText: '注册',
  },
}
