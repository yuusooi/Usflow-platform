import React from 'react'
import type { SpinProps, SpinSize } from './types'
import './style.css'

/**
 * Spin 加载中组件
 *
 * 用于页面和区块的加载中状态。
 *
 * @example
 * ```tsx
 * // 基础用法 - 独立使用
 * <Spin />
 *
 * // 带提示文字
 * <Spin tip="加载中..." />
 *
 * // 不同尺寸
 * <Spin size="small" />
 * <Spin size="large" />
 *
 * // 包裹模式 - 加载内容
 * <Spin spinning={true}>
 *   <div>这里是内容</div>
 * </Spin>
 *
 * // 控制加载状态
 * <Spin spinning={isLoading}>
 *   <Table data={data} />
 * </Spin>
 * ```
 */
const Spin: React.FC<SpinProps> = ({
  spinning = true,
  size = 'default',
  tip,
  children,
  className,
  style,
}) => {
  // 判断是否为包裹模式：如果有 children，启用包裹模式
  // 面试重点：为什么需要区分两种模式？
  // 答：独立模式直接渲染加载指示器；包裹模式需要在原有内容上覆盖遮罩层，
  //     两种 DOM 结构完全不同，需要通过 children 是否存在来判断
  const isWrapperMode = children !== undefined

  // 渲染旋转的加载图标
  // 面试重点：为什么使用 Inline SVG 而不是 icon 库？
  // 答：零外部依赖，减小打包体积，完全可控样式，支持 CSS 变量
  const renderSpinner = () => {
    return (
      <div className="my-spinner">
        <svg
          className="my-spinner-icon"
          viewBox="0 0 1024 1024"
          focusable="false"
          aria-hidden="true"
        >
          {/* 使用描边圆圈实现旋转效果 */}
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64z" />
        </svg>
        {/* 提示文字 */}
        {tip && <div className="my-spinner-tip">{tip}</div>}
      </div>
    )
  }

  // ==================== 模式 A：独立使用 ====================
  // 直接渲染加载指示器
  if (!isWrapperMode) {
    // 如果不处于加载状态，返回 null
    if (!spinning) {
      return null
    }

    // 构建 class 列表
    const classNames = ['my-spin', `my-spin-${size}`]

    if (className) {
      classNames.push(className)
    }

    return (
      <div className={classNames.join(' ')} style={style}>
        {renderSpinner()}
      </div>
    )
  }

  // ==================== 模式 B：包裹模式 ====================
  // 渲染遮罩层 + 内容
  // 面试重点：包裹模式的 DOM 结构设计？
  // 答：外层 position: relative，内容正常渲染，遮罩层 position: absolute 覆盖在上方
  //     遮罩层使用 inset: 0 + z-index: 10 确保完全覆盖

  const wrapperClassNames = ['my-spin-nested-wrapper']

  if (className) {
    wrapperClassNames.push(className)
  }

  return (
    <div className={wrapperClassNames.join(' ')} style={style}>
      {/* 1. 先渲染 children 内容 */}
      <div className="my-spin-nested-content">{children}</div>

      {/* 2. 如果 spinning 为 true，渲染遮罩层 */}
      {spinning && (
        <div className="my-spin-nested-loading" aria-busy="true">
          {renderSpinner()}
        </div>
      )}
    </div>
  )
}

export default Spin
export type { SpinProps, SpinSize }
