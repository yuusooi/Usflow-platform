import React from 'react'
import type { CardProps, CardShadowType } from './types'
import './index.css'

/**
 * Card 卡片组件
 *
 * 通用卡片容器，可包含标题、额外操作和内容。支持双主题、多种阴影级别和悬停效果。
 *
 * @example
 * ```tsx
 * // 基础用法
 * <Card title="卡片标题">卡片内容</Card>
 *
 * // 带 extra
 * <Card
 *   title="卡片标题"
 *   extra={<a href="#">更多</a>}
 * >
 *   卡片内容
 * </Card>
 *
 * // 可悬停
 * <Card hoverable title="悬停试试">悬停会有阴影效果</Card>
 *
 * // 自定义阴影
 * <Card shadow="float" title="浮起阴影">更明显的阴影</Card>
 *
 * // 无边框
 * <Card bordered={false} title="无边框">没有边框的卡片</Card>
 *
 * // 只有内容
 * <Card>纯内容卡片</Card>
 * ```
 */
const Card: React.FC<CardProps> = ({
  title,
  extra,
  children,
  bordered = true,
  hoverable = false,
  shadow = 'base',
  className,
  style,
  onClick,
  bodyStyle,
  headStyle,
}) => {
  // 计算卡片的类名
  const classNames = ['my-card']

  // 添加无边框类名
  if (!bordered) {
    classNames.push('my-card-bordered')
  }

  // 添加可悬停类名
  if (hoverable) {
    classNames.push('my-card-hoverable')
  }

  // 添加阴影类名（如果 hoverable 为 false，才应用指定的阴影类）
  if (!hoverable && shadow !== 'base') {
    classNames.push(`my-card-shadow-${shadow}`)
  }

  // 添加自定义类名
  if (className) {
    classNames.push(className)
  }

  // 渲染头部（如果 title 或 extra 存在）
  const renderHeader = () => {
    if (!title && !extra) {
      return null
    }

    return (
      <div className="my-card-head" style={headStyle}>
        {title && <div className="my-card-head-title">{title}</div>}
        {extra && <div className="my-card-head-extra">{extra}</div>}
      </div>
    )
  }

  return (
    <div
      className={classNames.join(' ')}
      style={style}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onClick()
              }
            }
          : undefined
      }
    >
      {renderHeader()}
      {children && <div className="my-card-body" style={bodyStyle}>{children}</div>}
    </div>
  )
}

export default Card
export type { CardProps, CardShadowType }
