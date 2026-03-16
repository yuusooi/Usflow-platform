import React, { useState, MouseEvent } from 'react'
import type { AlertProps, AlertType } from './types'
import './style.css'

/**
 * Alert 警告提示组件
 *
 * 用于页面中展示重要的提示信息。支持多种类型、图标、关闭功能。
 *
 * @example
 * ```tsx
 * // 基础用法
 * <Alert message="成功提示" type="success" />
 *
 * // 带描述
 * <Alert
 *   message="警告"
 *   description="这是一个警告提示的详细描述"
 *   type="warning"
 * />
 *
 * // 可关闭
 * <Alert
 *   message="错误"
 *   type="error"
 *   closable
 *   onClose={() => console.log('关闭')}
 * />
 * ```
 */
const Alert: React.FC<AlertProps> = ({
  type = 'info',
  message,
  description,
  showIcon = true,
  closable = false,
  visible: propVisible, // 外部传入的 visible（受控模式）
  onClose,
  onVisibleChange,
  className,
  style,
}) => {
  // 内部维护可见状态（非受控模式）
  // 面试重点：为什么要同时支持受控和非受控模式？
  // 答：受控模式适合 Playground、表单等需要外部控制的场景；
  //     非控模式适合简单的"关闭后无需恢复"的场景（如通知提示）
  const [internalVisible, setInternalVisible] = useState(true)

  // 判断是否为受控模式：如果传入了 visible 属性，则进入受控模式
  const isControlled = propVisible !== undefined

  // 实际的可见状态：受控模式使用外部值，非受控模式使用内部值
  const visible = isControlled ? propVisible : internalVisible

  // 处理关闭事件
  // 1. 先触发外部回调（让父组件能感知关闭事件）
  // 2. 触发显示状态变化回调
  // 3. 如果是非受控模式，更新内部状态
  const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
    onClose?.(e)
    onVisibleChange?.(false, e)

    // 仅在非受控模式下更新内部状态
    if (!isControlled) {
      setInternalVisible(false)
    }
  }

  // 如果已关闭，返回 null 而不是隐藏的 div，优化性能
  if (!visible) {
    return null
  }

  // 获取对应类型的 Inline SVG 图标
  // 面试重点：为什么使用 Inline SVG 而不是 icon 库？
  // 答：零外部依赖，减小打包体积，完全可控样式，支持 CSS 变量
  const getIcon = () => {
    const iconStyle = {
      width: '16px',
      height: '16px',
      fill: 'currentColor',
    }

    switch (type) {
      case 'success':
        // 成功图标：圆形背景 + 对勾
        return (
          <svg viewBox="64 64 896 896" focusable="false" {...iconStyle}>
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z"></path>
          </svg>
        )

      case 'info':
        // 信息图标：圆形背景 + i 标记
        return (
          <svg viewBox="64 64 896 896" focusable="false" {...iconStyle}>
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm36-442c0 4.4-3.6 8-8 8h-64c-4.4 0-8-3.6-8-8v-64c0-4.4 3.6-8 8-8h64c4.4 0 8 3.6 8 8v64zm0 204c0 4.4-3.6 8-8 8h-64c-4.4 0-8-3.6-8-8v-96c0-4.4 3.6-8 8-8h64c4.4 0 8 3.6 8 8v96z"></path>
          </svg>
        )

      case 'warning':
        // 警告图标：圆形背景 + 感叹号
        return (
          <svg viewBox="64 64 896 896" focusable="false" {...iconStyle}>
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z"></path>
          </svg>
        )

      case 'error':
        // 错误图标：圆形背景 + X
        return (
          <svg viewBox="64 64 896 896" focusable="false" {...iconStyle}>
            <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l41.7-46.4L291 584.5c-2-2.2-3.1-5.2-3.1-8.3s1.1-6.1 3.1-8.3l89-100c1.3-1.5 3.2-2.3 5.2-2.3l66.1.3 99.3-118.4 99.3 118.5 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2zM464 368h48c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8z"></path>
          </svg>
        )

      default:
        return null
    }
  }

  // 构建 class 列表（BEM 规范）
  // 面试重点：为什么使用 className 数组拼接而不是 classnames 库？
  // 答：减小依赖，提高性能，逻辑简单可读性强
  const classNames = ['my-alert', `my-alert-${type}`]

  // 根据不同属性添加对应的 modifier class
  if (showIcon) {
    classNames.push('my-alert-with-icon')
  }

  if (closable) {
    classNames.push('my-alert-closable')
  }

  if (description) {
    classNames.push('my-alert-with-description')
  }

  // 支持用户自定义 className（用于覆盖样式）
  if (className) {
    classNames.push(className)
  }

  return (
    <div className={classNames.join(' ')} style={style}>
      {/* 图标区域 - 使用 flex 布局实现左侧图标 */}
      {showIcon && <div className="my-alert-icon">{getIcon()}</div>}

      {/* 内容区 - flex: 1 占据剩余空间 */}
      <div className="my-alert-content">
        {/* 主标题 */}
        <div className="my-alert-message">{message}</div>
        {/* 描述文字 - 只有存在时才渲染 */}
        {description && <div className="my-alert-description">{description}</div>}
      </div>

      {/* 关闭按钮 - 绝对定位在右上角 */}
      {/* 使用 Inline SVG 而不是 icon 库，零依赖 */}
      {closable && (
        <button
          className="my-alert-close"
          onClick={handleClose}
          type="button"
          aria-label="关闭"
        >
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M567.4 511.4 768 310.8c6.2-6.2 6.2-16.4 0-22.6l-52.4-52.4c-6.2-6.2-16.4-6.2-22.6 0L492.6 436.4 292 235.8c-6.2-6.2-16.4-6.2-22.6 0l-52.4 52.4c-6.2 6.2-6.2 16.4 0 22.6L417.8 511.4 216.8 712.4c-6.2 6.2-6.2 16.4 0 22.6l52.4 52.4c6.2 6.2 16.4 6.2 22.6 0L492.6 586.4l200.6 200.6c6.2 6.2 16.4 6.2 22.6 0l52.4-52.4c6.2-6.2 6.2-16.4 0-22.6L567.4 511.4z"></path>
          </svg>
        </button>
      )}
    </div>
  )
}

export default Alert
export type { AlertProps, AlertType }
