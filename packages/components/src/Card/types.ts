import type { ReactNode, CSSProperties } from 'react'

/**
 * Card 组件的阴影级别
 */
export type CardShadowType = 'base' | 'float' | 'none'

/**
 * Card 组件的属性接口
 */
export interface CardProps {
  /**
   * 卡片标题
   */
  title?: ReactNode

  /**
   * 标题右侧的额外操作区域（如按钮、链接等）
   */
  extra?: ReactNode

  /**
   * 卡片内容
   */
  children?: ReactNode

  /**
   * 是否显示边框
   * @default true
   */
  bordered?: boolean

  /**
   * 是否可悬停（悬停时添加阴影效果）
   * @default false
   */
  hoverable?: boolean

  /**
   * 阴影级别
   * - `base`: 基础阴影（默认）
   * - `float`: 浮起阴影（更明显的阴影）
   * - `none`: 无阴影
   * @default 'base'
   */
  shadow?: CardShadowType

  /**
   * 自定义样式类名
   */
  className?: string

  /**
   * 自定义样式
   */
  style?: CSSProperties

  /**
   * 点击卡片时的回调函数
   */
  onClick?: () => void

  /**
   * 卡片内容的样式
   */
  bodyStyle?: CSSProperties

  /**
   * 卡片头部区域的样式
   */
  headStyle?: CSSProperties
}
