import React, { useState, useEffect } from 'react'
import type { BadgeProps, BadgeColor, BadgeStatus } from './types'
import './style.css'

/**
 * Badge 徽标数组件
 *
 * 用于展示通知数量、状态标记等。支持数字封顶、小红点、状态展示等模式。
 *
 * @example
 * ```tsx
 * // 数字徽标
 * <Badge count={5}>
 *   <button>消息</button>
 * </Badge>
 *
 * // 封顶数字
 * <Badge count={100} overflowCount={99}>
 *   <button>通知</button>
 * </Badge>
 *
 * // 小红点
 * <Badge dot>
 *   <button>待办</button>
 * </Badge>
 *
 * // 独立状态徽标
 * <Badge status="success" text="成功" />
 * ```
 */
const Badge: React.FC<BadgeProps> = ({
  children,
  count = 0,
  dot = false,
  overflowCount = 99,
  showZero = false,
  status,
  text,
  color,
  offset,
  title,
  className,
  style,
}) => {
  // 计算显示的数字（考虑封顶）
  const displayCount =
    typeof count === 'number' && count > overflowCount ? `${overflowCount}+` : count

  // 是否显示徽标
  // 有 status 时强制显示，否则根据 count/dot/showZero 判断
  const isHidden = !status && !dot && (count === 0 && !showZero)

  // 判断是否为单个数字（0-9），决定徽标形状
  const isSingleNumber = typeof count === 'number' && count >= 0 && count < 10

  // 构建 class 列表（BEM 规范）
  const badgeClassNames = ['my-badge-count']

  // 根据数字位数添加形状类
  if (!dot) {
    if (isSingleNumber) {
      badgeClassNames.push('my-badge-count-single')
    } else {
      badgeClassNames.push('my-badge-count-multiple')
    }
  }

  // 构建 class 列表（BEM 规范）
  const classNames = ['my-badge']

  // 独立状态徽标模式（没有 children）
  const isStatusBadge = !children && status

  if (isStatusBadge) {
    classNames.push('my-badge-status')
  }

  if (className) {
    classNames.push(className)
  }

  // 计算徽标样式
  const badgeStyle: React.CSSProperties = {
    ...style,
  }

  // 自定义颜色
  if (color) {
    badgeStyle.backgroundColor = color
  }

  // 偏移量定位
  if (offset && offset.length === 2) {
    badgeStyle.right = `-${offset[0]}px`
    badgeStyle.marginTop = `${offset[1]}px`
  }

  // 状态徽标颜色映射
  const statusColorMap: Record<BadgeStatus, string> = {
    success: 'var(--color-success)',
    processing: 'var(--color-primary)',
    default: 'var(--color-text-3)',
    error: 'var(--color-danger)',
    warning: 'var(--color-warning)',
  }

  // 独立状态徽标渲染
  if (isStatusBadge) {
    // 如果没有自定义颜色，使用状态颜色映射
    const shouldUseColor = color && color !== 'gray'
    const statusDotStyle: React.CSSProperties = shouldUseColor
      ? { backgroundColor: color }
      : {}

    // 根据状态添加颜色类名
    const statusDotClassName = `my-badge-status-dot my-badge-status-${status}`

    return (
      <span className={classNames.join(' ')}>
        <span
          className={statusDotClassName}
          style={statusDotStyle}
          data-status={status}
        />
        {text && <span className="my-badge-status-text">{text}</span>}
      </span>
    )
  }

  // 包裹元素的徽标渲染
  const badgeNode = (
    <sup
      className={`${badgeClassNames.join(' ')} ${
        dot ? 'my-badge-dot' : ''
      } ${isHidden ? 'my-badge-hidden' : ''} ${
        !children ? 'my-badge-count-standalone' : ''
      }`}
      style={badgeStyle}
      title={title ?? (typeof displayCount === 'number' ? `${displayCount}` : displayCount)}
    >
      {dot ? null : displayCount}
    </sup>
  )

  // 如果没有 children，只显示徽标（用于纯展示）
  if (!children) {
    return badgeNode
  }

  return (
    <span className="my-badge-wrapper">
      {children}
      {badgeNode}
    </span>
  )
}

export default Badge
export type { BadgeProps, BadgeColor, BadgeStatus }
