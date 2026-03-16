import React, { useMemo } from 'react'
import type { DividerProps, DividerType, DividerOrientation } from './types'
import './style.css'

/**
 * Divider 分割线组件
 *
 * 用于划分内容的区域，提供视觉分隔。支持水平/垂直方向、虚线样式、文字内容。
 *
 * @example
 * ```tsx
 * // 基础用法
 * <Divider />
 *
 * // 带文字
 * <Divider>文字</Divider>
 *
 * // 虚线
 * <Divider dashed />
 *
 * // 垂直分割线
 * <Divider type="vertical" />
 *
 * // 文字位置
 * <Divider orientation="left">左侧文字</Divider>
 * <Divider orientation="right">右侧文字</Divider>
 *
 * // 自定义文字间距（注意：仅在 left 或 right 时有效）
 * <Divider orientation="left" orientationMargin="100px">文字</Divider>
 * ```
 */
const Divider: React.FC<DividerProps> = ({
  children,
  type = 'horizontal',
  dashed = false,
  orientation = 'center',
  orientationMargin,
  className,
  style,
  borderColor,
}) => {
  // 判断是否有文字内容
  const hasText = children !== undefined && children !== null

  // 构建 class 列表（BEM 规范）
  const classNames = ['my-divider']

  // 添加方向类名
  if (type === 'vertical') {
    classNames.push('my-divider-vertical')
  } else {
    classNames.push('my-divider-horizontal')
  }

  // 添加虚线类名
  if (dashed) {
    classNames.push('my-divider-dashed')
  }

  // 添加带文字类名
  if (hasText) {
    classNames.push('my-divider-with-text')

    // 水平方向时添加位置类名
    if (type === 'horizontal' && orientation !== 'center') {
      classNames.push(`my-divider-with-text-${orientation}`)
    }
  }

  // 添加自定义类名
  if (className) {
    classNames.push(className)
  }

  // 计算自定义样式
  const dividerStyle = useMemo(() => {
    const styles: React.CSSProperties = { ...style }

    // 如果有 orientationMargin，通过 CSS 变量传递给伪元素
    if (orientationMargin !== undefined) {
      const marginValue =
        typeof orientationMargin === 'number'
          ? `${orientationMargin}px`
          : orientationMargin
      // 设置 CSS 变量（CSS 自定义属性可以直接作为 style 属性）
      ;(styles as any)['--orientation-margin'] = marginValue
    }

    // 如果有 borderColor，通过 CSS 变量传递给伪元素
    if (borderColor !== undefined) {
      ;(styles as any)['--border-color'] = borderColor
    }

    return styles
  }, [orientationMargin, borderColor, style])

  // 如果没有文字，返回简单分割线
  if (!hasText) {
    return <div className={classNames.join(' ')} style={dividerStyle} />
  }

  // 有文字时，返回带文字的分割线
  return (
    <div className={classNames.join(' ')} style={dividerStyle}>
      <span className="my-divider-text">{children}</span>
    </div>
  )
}

export default Divider
export type { DividerProps, DividerType, DividerOrientation }
