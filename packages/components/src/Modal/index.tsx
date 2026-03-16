import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import './index.css'

export interface ModalProps {
  // 是否显示弹窗
  visible?: boolean
  // 关闭弹窗的回调函数
  onCancel?: () => void
  // 确认按钮的回调函数
  onOk?: () => void
  // 弹窗标题
  title?: React.ReactNode
  // 弹窗内容
  children?: React.ReactNode
  // 底部按钮配置
  footer?: React.ReactNode
  // 点击遮罩层是否关闭弹窗
  maskClosable?: boolean
  // 是否显示关闭图标（右上角的 X）
  closable?: boolean
  // 宽度
  width?: number | string
  // 允许自定义挂载点
  getContainer?: HTMLElement | (() => HTMLElement)
}

const Modal: React.FC<ModalProps> = (props) => {
  // 解构 props，提取需要的属性
  const {
    visible = false, // 默认不显示
    onCancel, // 关闭回调
    onOk, // 确认回调
    title, // 标题
    children, // 内容
    footer, // 底部
    maskClosable = true, // 默认点击遮罩可以关闭
    closable = true, // 默认显示关闭按钮
    width = 520, // 默认宽度 520px
    getContainer,
  } = props

  // 键盘事件处理函数
  // 处理 ESC 键关闭弹窗
  const handleKeyDown = (event: KeyboardEvent) => {
    // 检查按下的键是否是 ESC
    if (event.key === 'Escape') {
      // 调用关闭回调
      onCancel?.()
    }
  }

  // 使用 useEffect 管理事件监听
  useEffect(() => {
    // 1. 添加键盘监听器
    document.addEventListener('keydown', handleKeyDown)

    // 2. 返回清理函数：组件卸载时执行
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, []) // 3. 空依赖数组：只在挂载时执行一次

  // 滚动锁定
  useEffect(() => {
    // 1. 如果不可见，直接返回
    if (!visible) return

    // 2. 锁定
    document.body.style.overflow = 'hidden'

    // 3. 返回清理函数
    return () => {
      // 4. 解锁,清空 inline 样式
      document.body.style.overflow = ''
    }
  }, [visible])

  if (!visible) {
    return null
  }

  // 动态计算挂载点，默认回退到 document.body
  const container =
    typeof getContainer === 'function'
      ? getContainer()
      : getContainer || document.body

  return createPortal(
    <>
      {/* 遮罩层 半透明黑色背景 */}
      <div className="my-modal-mask" />

      {/* 弹窗容器 */}
      <div
        className="my-modal-root"
        // 绑定点击事件到最外层容器
        onClick={(e) => {
          // 判断点击的是否是“容器本身” (e.target)
          // 如果点击的是弹窗里面的按钮 (e.target 就会是按钮)，不相等，就不关闭
          if (maskClosable && e.target === e.currentTarget) {
            onCancel?.()
          }
        }}
      >
        {/* 弹窗内容 */}
        <div
          className="my-modal"
          style={{ width: typeof width === 'number' ? `${width}px` : width }}
          // 阻止点击弹窗内部时的事件冒泡
          onClick={(e) => e.stopPropagation()}
        >
          {/* 顶部 标题与关闭按钮 */}
          {(title || closable) && (
            <div className="my-modal-header">
              {title && <div>{title}</div>}
              {closable && (
                <button className="my-modal-close" onClick={onCancel}>
                  ✕
                </button>
              )}
            </div>
          )}

          {/* 内容区域 */}
          <div className="my-modal-body">{children}</div>

          {/* 底部 默认有取消和确定按钮 */}
          {footer !== null && ( //如果footer是undefined则是没传，默认显示按钮
            <div className="my-modal-footer">
              {footer || (
                <>
                  <button onClick={onCancel}>取消</button>
                  <button onClick={onOk}>确定</button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>,
    // 目标容器 把弹窗渲染到document.body下，可以避免被父容器的overflow或者z-index限制
    container
  )
}

export default Modal
