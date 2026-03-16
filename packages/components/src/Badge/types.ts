import type { CSSProperties, ReactNode } from 'react'

/**
 * Badge 状态类型
 */
export type BadgeStatus = 'success' | 'processing' | 'default' | 'error' | 'warning'

/**
 * Badge 颜色类型
 */
export type BadgeColor = string

/**
 * Badge 组件属性
 */
export interface BadgeProps {
  /**
   * 包裹的子元素
   */
  children?: ReactNode

  /**
   * 显示的数字或内容
   * @default 0
   */
  count?: ReactNode

  /**
   * 是否显示为小红点
   * @default false
   */
  dot?: boolean

  /**
   * 数字封顶值（超过显示 `${overflowCount}+`）
   * @default 99
   */
  overflowCount?: number

  /**
   * 当 count 为 0 时是否显示徽标
   * @default false
   */
  showZero?: boolean

  /**
   * 状态徽标的状态（独立使用，不包裹 children）
   */
  status?: BadgeStatus

  /**
   * 状态徽标的文字
   */
  text?: ReactNode

  /**
   * 自定义徽标颜色
   */
  color?: string

  /**
   * 设置徽标的偏移量 [x, y]，单位 px
   */
  offset?: [number, number]

  /**
   * 鼠标悬浮时显示的文字
   */
  title?: string

  /**
   * 自定义类名
   */
  className?: string

  /**
   * 自定义样式
   */
  style?: CSSProperties
}
