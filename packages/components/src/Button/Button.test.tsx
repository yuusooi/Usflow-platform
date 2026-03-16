import { render, screen, fireEvent } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import Button from './index'

test('1. 应该能正确渲染默认按钮', () => {
  render(<Button>默认按钮</Button>)
  const btnElement = screen.getByText('默认按钮')
  // 断言：按钮应该存在于页面上
  expect(btnElement).toBeTruthy()
})

test('2. 应该能正确触发 onClick 点击事件', () => {
  // 模拟一个假函数
  const handleClick = vi.fn()
  render(<Button onClick={handleClick}>点击我</Button>)

  const btnElement = screen.getByText('点击我')
  // 模拟用户点击
  fireEvent.click(btnElement)

  // 断言：这个假函数应该被调用了一次
  expect(handleClick).toHaveBeenCalledTimes(1)
})

test('3. 传入 type="primary" 时，应该有对应的 CSS 类名', () => {
  // 注意：这里的 'my-btn-primary' 要换成你 Button 组件实际生成的类名！
  render(<Button type="primary">主按钮</Button>)
  const btnElement = screen.getByText('主按钮')

  // 断言：按钮的 class 列表里应该包含 primary 的类名
  // 如果你用的是 BEM，可能是 my-button--primary，根据你实际的代码修改
  expect(btnElement.className).toContain('primary')
})
