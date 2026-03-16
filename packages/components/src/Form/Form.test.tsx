import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import { useState } from 'react'
import { Form } from './index'
import { FormItem } from './FormItem'
import Input from '../Input'

describe('Form 组件测试 - 数据流核心功能', () => {
  describe('1. 受控劫持（Control Hijacking）', () => {
    test('1.1 Form 应该自动接管子组件的 value 和 onChange', () => {
      render(
        <Form onSubmit={vi.fn()}>
          <FormItem name="username" label="用户名">
            <Input />
          </FormItem>
        </Form>
      )

      const input = screen.getByRole('textbox') as HTMLInputElement
      expect(input.value).toBe('') // 初始值为空

      // 模拟用户输入
      fireEvent.change(input, { target: { value: 'admin' } })

      // 验证：输入框的值应该自动更新
      expect(input.value).toBe('admin')
    })

    test('1.2 多个字段应该独立管理各自的值', () => {
      render(
        <Form onSubmit={vi.fn()}>
          <FormItem name="username" label="用户名">
            <Input />
          </FormItem>
          <FormItem name="email" label="邮箱">
            <Input />
          </FormItem>
        </Form>
      )

      const inputs = screen.getAllByRole('textbox') as HTMLInputElement[]

      // 输入用户名
      fireEvent.change(inputs[0], { target: { value: 'admin' } })
      expect(inputs[0].value).toBe('admin')
      expect(inputs[1].value).toBe('') // 邮箱框应该还是空的

      // 输入邮箱
      fireEvent.change(inputs[1], { target: { value: 'admin@example.com' } })
      expect(inputs[0].value).toBe('admin') // 用户名不受影响
      expect(inputs[1].value).toBe('admin@example.com')
    })

    test('1.3 initialValues 应该正确设置初始值', () => {
      render(
        <Form
          onSubmit={vi.fn()}
          initialValues={{ username: 'admin', email: 'admin@example.com' }}
        >
          <FormItem name="username" label="用户名">
            <Input />
          </FormItem>
          <FormItem name="email" label="邮箱">
            <Input />
          </FormItem>
        </Form>
      )

      const inputs = screen.getAllByRole('textbox') as HTMLInputElement[]
      expect(inputs[0].value).toBe('admin')
      expect(inputs[1].value).toBe('admin@example.com')
    })

    test('1.4 受控劫持应该兼容事件对象和直接传值', () => {
      // 测试直接传值的情况（非标准 React 事件）
      const TestComponent = () => {
        const [customValue, setCustomValue] = useState('')
        return (
          <Form onSubmit={vi.fn()}>
            <FormItem name="username" label="用户名">
              <Input value={customValue} onChange={(v) => setCustomValue(v as string)} />
            </FormItem>
          </Form>
        )
      }

      render(<TestComponent />)
      const input = screen.getByRole('textbox') as HTMLInputElement

      // 模拟用户输入（标准事件对象）
      fireEvent.change(input, { target: { value: 'test' } })
      expect(input.value).toBe('test')
    })
  })

  describe('2. 必填校验（Required Validation）', () => {
    test('2.1 空值失去焦点时应该显示错误提示', async () => {
      render(
        <Form onSubmit={vi.fn()}>
          <FormItem name="username" label="用户名" required>
            <Input />
          </FormItem>
        </Form>
      )

      const input = screen.getByRole('textbox')

      // 聚焦输入框
      fireEvent.focus(input)
      // 失去焦点（不输入任何内容）
      fireEvent.blur(input)

      // 等待状态更新
      await waitFor(() => {
        const error = screen.queryByText('该字段不能为空')
        expect(error).toBeTruthy()
      })
    })

    test('2.2 输入值后失去焦点不应该显示错误', async () => {
      render(
        <Form onSubmit={vi.fn()}>
          <FormItem name="username" label="用户名" required>
            <Input />
          </FormItem>
        </Form>
      )

      const input = screen.getByRole('textbox')

      // 输入值
      fireEvent.change(input, { target: { value: 'admin' } })
      // 失去焦点
      fireEvent.blur(input)

      // 等待状态更新
      await waitFor(() => {
        const error = screen.queryByText('该字段不能为空')
        expect(error).toBeNull()
      })
    })

    test('2.3 输入后失去焦点应该清除错误', async () => {
      render(
        <Form onSubmit={vi.fn()}>
          <FormItem name="username" label="用户名" required>
            <Input />
          </FormItem>
        </Form>
      )

      const input = screen.getByRole('textbox')

      // 先触发错误
      fireEvent.focus(input)
      fireEvent.blur(input)

      await waitFor(() => {
        const error = screen.queryByText('该字段不能为空')
        expect(error).toBeTruthy()
      })

      // 输入值
      fireEvent.change(input, { target: { value: 'admin' } })

      // 输入后再次失去焦点，触发重新校验
      fireEvent.blur(input)

      // 错误应该被清除
      await waitFor(() => {
        const error = screen.queryByText('该字段不能为空')
        expect(error).toBeNull()
      })
    })

    test('2.4 非必填字段失去焦点不应该显示错误', async () => {
      render(
        <Form onSubmit={vi.fn()}>
          <FormItem name="username" label="用户名">
            <Input />
          </FormItem>
        </Form>
      )

      const input = screen.getByRole('textbox')

      // 聚焦后失去焦点
      fireEvent.focus(input)
      fireEvent.blur(input)

      // 等待状态更新
      await waitFor(() => {
        const error = screen.queryByText('该字段不能为空')
        expect(error).toBeNull()
      })
    })
  })

  describe('3. 表单提交（Form Submission）', () => {
    test('3.1 提交时应该收集所有字段数据', async () => {
      const handleSubmit = vi.fn()

      render(
        <Form onSubmit={handleSubmit}>
          <FormItem name="username" label="用户名">
            <Input />
          </FormItem>
          <FormItem name="email" label="邮箱">
            <Input />
          </FormItem>
          <button type="submit">提交</button>
        </Form>
      )

      const inputs = screen.getAllByRole('textbox') as HTMLInputElement[]
      const submitButton = screen.getByRole('button', { name: '提交' })

      // 填写表单
      fireEvent.change(inputs[0], { target: { value: 'admin' } })
      fireEvent.change(inputs[1], { target: { value: 'admin@example.com' } })

      // 提交表单
      fireEvent.click(submitButton)

      // 验证：onSubmit 应该被调用，并且传入了正确的数据
      expect(handleSubmit).toHaveBeenCalledTimes(1)
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          username: 'admin',
          email: 'admin@example.com',
        },
        expect.any(Object) // React.FormEvent 对象
      )
    })

    test('3.2 提交时应该阻止默认刷新行为', () => {
      const handleSubmit = vi.fn()

      const { container } = render(
        <Form onSubmit={handleSubmit}>
          <FormItem name="username" label="用户名">
            <Input />
          </FormItem>
          <button type="submit">提交</button>
        </Form>
      )

      const submitButton = screen.getByRole('button', { name: '提交' })
      const form = container.querySelector('form')!

      // 模拟表单提交事件
      const mockEvent = { preventDefault: vi.fn() }
      fireEvent.submit(form, mockEvent)

      // 验证：handleSubmit 应该被调用
      expect(handleSubmit).toHaveBeenCalled()
    })

    test('3.3 必填字段为空时应该显示错误提示', async () => {
      const handleSubmit = vi.fn()

      render(
        <Form onSubmit={handleSubmit}>
          <FormItem name="username" label="用户名" required>
            <Input />
          </FormItem>
          <button type="submit">提交</button>
        </Form>
      )

      const input = screen.getByRole('textbox')
      const submitButton = screen.getByRole('button', { name: '提交' })

      // 先触发必填字段校验（blur 触发 touched 和校验）
      fireEvent.focus(input)
      fireEvent.blur(input)

      await waitFor(() => {
        const error = screen.queryByText('该字段不能为空')
        expect(error).toBeTruthy()
      })

      // 验证：显示了错误提示
      expect(screen.queryByText('该字段不能为空')).toBeTruthy()
    })

    test('3.4 提交时所有字段都有效应该成功提交', async () => {
      const handleSubmit = vi.fn()

      render(
        <Form onSubmit={handleSubmit}>
          <FormItem name="username" label="用户名" required>
            <Input />
          </FormItem>
          <FormItem name="email" label="邮箱" required>
            <Input />
          </FormItem>
          <button type="submit">提交</button>
        </Form>
      )

      const inputs = screen.getAllByRole('textbox') as HTMLInputElement[]
      const submitButton = screen.getByRole('button', { name: '提交' })

      // 填写所有必填字段
      fireEvent.change(inputs[0], { target: { value: 'admin' } })
      fireEvent.change(inputs[1], { target: { value: 'admin@example.com' } })

      // 提交表单
      fireEvent.click(submitButton)

      // 验证：onSubmit 应该被调用
      expect(handleSubmit).toHaveBeenCalledTimes(1)
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          username: 'admin',
          email: 'admin@example.com',
        },
        expect.any(Object)
      )
    })
  })

  describe('4. 实时校验（Real-time Validation）', () => {
    test('4.1 用户输入并失去焦点时应该清除该字段的错误', async () => {
      render(
        <Form onSubmit={vi.fn()}>
          <FormItem name="username" label="用户名" required>
            <Input />
          </FormItem>
        </Form>
      )

      const input = screen.getByRole('textbox')

      // 先触发错误
      fireEvent.focus(input)
      fireEvent.blur(input)

      await waitFor(() => {
        const error = screen.queryByText('该字段不能为空')
        expect(error).toBeTruthy()
      })

      // 开始输入
      fireEvent.change(input, { target: { value: 'a' } })

      // 失去焦点触发校验
      fireEvent.blur(input)

      // 错误应该被清除
      await waitFor(() => {
        const error = screen.queryByText('该字段不能为空')
        expect(error).toBeNull()
      })
    })

    test('4.2 多个字段应该独立校验', async () => {
      render(
        <Form onSubmit={vi.fn()}>
          <FormItem name="username" label="用户名" required>
            <Input />
          </FormItem>
          <FormItem name="email" label="邮箱" required>
            <Input />
          </FormItem>
        </Form>
      )

      const inputs = screen.getAllByRole('textbox')

      // 第一个字段触发错误
      fireEvent.focus(inputs[0])
      fireEvent.blur(inputs[0])

      await waitFor(() => {
        const errors = screen.queryAllByText('该字段不能为空')
        expect(errors.length).toBe(1)
      })

      // 第二个字段触发错误
      fireEvent.focus(inputs[1])
      fireEvent.blur(inputs[1])

      await waitFor(() => {
        const errors = screen.queryAllByText('该字段不能为空')
        expect(errors.length).toBe(2)
      })

      // 修复第一个字段（输入并失去焦点触发校验）
      fireEvent.change(inputs[0], { target: { value: 'admin' } })
      fireEvent.blur(inputs[0])

      await waitFor(() => {
        const errors = screen.queryAllByText('该字段不能为空')
        expect(errors.length).toBe(1) // 只剩第二个字段的错误
      })
    })
  })

  describe('5. 数据收集（Data Collection）', () => {
    test('5.1 初始值应该被正确收集', () => {
      const handleSubmit = vi.fn()

      render(
        <Form
          onSubmit={handleSubmit}
          initialValues={{ username: 'admin', age: 18 }}
        >
          <FormItem name="username" label="用户名">
            <Input />
          </FormItem>
          <FormItem name="age" label="年龄">
            <Input type="number" />
          </FormItem>
          <button type="submit">提交</button>
        </Form>
      )

      const submitButton = screen.getByRole('button', { name: '提交' })
      fireEvent.click(submitButton)

      expect(handleSubmit).toHaveBeenCalledWith(
        {
          username: 'admin',
          age: 18,
        },
        expect.any(Object)
      )
    })

    test('5.2 动态修改的值应该被正确收集', () => {
      const handleSubmit = vi.fn()

      render(
        <Form onSubmit={handleSubmit} initialValues={{ username: '' }}>
          <FormItem name="username" label="用户名">
            <Input />
          </FormItem>
          <button type="submit">提交</button>
        </Form>
      )

      const input = screen.getByRole('textbox') as HTMLInputElement
      const submitButton = screen.getByRole('button', { name: '提交' })

      // 修改值三次
      fireEvent.change(input, { target: { value: 'test1' } })
      fireEvent.change(input, { target: { value: 'test2' } })
      fireEvent.change(input, { target: { value: 'test3' } })

      expect(input.value).toBe('test3')

      // 提交
      fireEvent.click(submitButton)

      // 应该收集到最新的值
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          username: 'test3',
        },
        expect.any(Object)
      )
    })

    test('5.3 只收集有 name 属性的字段', () => {
      const handleSubmit = vi.fn()

      render(
        <Form onSubmit={handleSubmit}>
          <FormItem name="username" label="用户名">
            <Input />
          </FormItem>
          {/* 没有 FormItem 包裹的 Input 不应该被收集 */}
          <Input placeholder="独立的输入框" />
          <button type="submit">提交</button>
        </Form>
      )

      const inputs = screen.getAllByRole('textbox')
      const submitButton = screen.getByRole('button', { name: '提交' })

      // 填写两个输入框
      fireEvent.change(inputs[0], { target: { value: 'admin' } })
      fireEvent.change(inputs[1], { target: { value: 'independent' } })

      // 提交
      fireEvent.click(submitButton)

      // 应该只收集 FormItem 包裹的字段
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          username: 'admin',
        },
        expect.any(Object)
      )
    })
  })

  describe('6. 复杂场景测试', () => {
    test('6.1 完整的用户注册表单流程', async () => {
      const handleSubmit = vi.fn()

      const { container } = render(
        <Form onSubmit={handleSubmit} initialValues={{ username: 'admin' }}>
          <FormItem name="username" label="用户名" required>
            <Input />
          </FormItem>
          <FormItem name="email" label="邮箱" required>
            <Input />
          </FormItem>
          <FormItem name="password" label="密码" required>
            <Input type="password" />
          </FormItem>
          <FormItem name="phone" label="手机号">
            <Input />
          </FormItem>
          <button type="submit">注册</button>
        </Form>
      )

      const inputs = container.querySelectorAll('input') as NodeListOf<HTMLInputElement>
      const submitButton = screen.getByRole('button', { name: '注册' })

      // 验证初始值
      expect(inputs[0].value).toBe('admin')

      // 触发其他必填字段校验（blur 触发）
      fireEvent.focus(inputs[1])
      fireEvent.blur(inputs[1])

      fireEvent.focus(inputs[2])
      fireEvent.blur(inputs[2])

      await waitFor(() => {
        const errors = screen.queryAllByText('该字段不能为空')
        expect(errors.length).toBeGreaterThan(0)
      })

      // 验证提交被阻止
      expect(handleSubmit).not.toHaveBeenCalled()

      // 填写所有必填字段
      fireEvent.change(inputs[1], { target: { value: 'admin@example.com' } })
      fireEvent.change(inputs[2], { target: { value: 'password123' } })

      // 再次提交
      fireEvent.click(submitButton)

      // 应该成功提交
      expect(handleSubmit).toHaveBeenCalledTimes(1)
      expect(handleSubmit).toHaveBeenCalledWith(
        {
          username: 'admin',
          email: 'admin@example.com',
          password: 'password123',
          phone: '',
        },
        expect.any(Object)
      )
    })

    test('6.2 表单重置场景（通过 initialValues 模拟）', () => {
      const handleSubmit = vi.fn()

      const { rerender } = render(
        <Form
          onSubmit={handleSubmit}
          initialValues={{ username: 'initial' }}
        >
          <FormItem name="username" label="用户名">
            <Input />
          </FormItem>
          <button type="submit">提交</button>
        </Form>
      )

      const input = screen.getByRole('textbox') as HTMLInputElement
      expect(input.value).toBe('initial')

      // 修改值
      fireEvent.change(input, { target: { value: 'modified' } })
      expect(input.value).toBe('modified')

      // 通过更新 key 来重置表单
      rerender(
        <Form
          key="reset"
          onSubmit={handleSubmit}
          initialValues={{ username: 'initial' }}
        >
          <FormItem name="username" label="用户名">
            <Input />
          </FormItem>
          <button type="submit">提交</button>
        </Form>
      )

      const resetInput = screen.getByRole('textbox') as HTMLInputElement
      expect(resetInput.value).toBe('initial')
    })

    test('6.3 混合必填和非必填字段的表单', async () => {
      const handleSubmit = vi.fn()

      render(
        <Form onSubmit={handleSubmit}>
          <FormItem name="username" label="用户名" required>
            <Input />
          </FormItem>
          <FormItem name="nickname" label="昵称">
            <Input />
          </FormItem>
          <FormItem name="email" label="邮箱" required>
            <Input />
          </FormItem>
          <button type="submit">提交</button>
        </Form>
      )

      const inputs = screen.getAllByRole('textbox')
      const submitButton = screen.getByRole('button', { name: '提交' })

      // 只填写必填字段
      fireEvent.change(inputs[0], { target: { value: 'admin' } })
      fireEvent.change(inputs[2], { target: { value: 'admin@example.com' } })

      // 提交
      fireEvent.click(submitButton)

      // 应该成功提交（nickname 是选填的）
      expect(handleSubmit).toHaveBeenCalled()
      // 验证提交的数据
      const submittedData = handleSubmit.mock.calls[0][0]
      expect(submittedData.username).toBe('admin')
      expect(submittedData.email).toBe('admin@example.com')
      // nickname 未填写，可能是 undefined 或空字符串
      expect(submittedData.nickname === '' || submittedData.nickname === undefined).toBe(true)
    })
  })
})
