import type { CSSProperties, ReactNode } from 'react'

/**
 * Divider 类型
 */
export type DividerType = 'horizontal' | 'vertical'

/**
 * Divider 文字位置（仅水平方向有效）
 */
export type DividerOrientation = 'left' | 'center' | 'right'

/**
 * Divider 组件属性
 */
export interface DividerProps {
  /**
   * 分割线文字
   */
  children?: ReactNode

  /**
   * 分割线类型
   * @default 'horizontal'
   */
  type?: DividerType

  /**
   * 是否虚线
   * @default false
   */
  dashed?: boolean

  /**
   * 文字位置（仅水平方向有效）
   * @default 'center'
   */
  orientation?: DividerOrientation

  /**
   * 文字与边缘的距离
   * @example "20px" | 100 | "10%"
   * @description 注意：仅在 orientation="left" 或 orientation="right" 时有效！
   */
  orientationMargin?: string | number

  /**
   * 自定义样式类名
   */
  className?: string

  style?: CSSProperties

  /**
   * 分割线颜色
   * @example "red" | "#ff0000" | "rgb(255, 0, 0)"
   */
  borderColor?: string
}
