import type { CSSProperties, ReactNode } from 'react'

/**
 * Space 组件的排列方向
 */
export type SpaceDirection = 'horizontal' | 'vertical'

/**
 * Space 组件的间距大小
 */
export type SpaceSize = number | string | 'small' | 'middle' | 'large'

/**
 * Space 组件的对齐方式
 */
export type SpaceAlign = 'start' | 'end' | 'center' | 'baseline'

/**
 * Space 组件属性
 */
export interface SpaceProps {
  /**
   * 子元素
   */
  children: ReactNode

  /**
   * 排列方向
   * @default 'horizontal'
   */
  direction?: SpaceDirection

  /**
   * 间距大小
   * - number: 直接指定像素值
   * - string: 自定义值（如 '16px', '1rem'）
   * - 'small': 8px
   * - 'middle': 16px
   * - 'large': 24px
   * @default 'small'
   */
  size?: SpaceSize

  /**
   * 对齐方式（仅当 direction 为 horizontal 时有效）
   * @default 'center'
   */
  align?: SpaceAlign

  /**
   * 是否自动换行
   * @default false
   */
  wrap?: boolean

  /**
   * 分隔符
   */
  split?: ReactNode

  /**
   * 自定义样式类名
   */
  className?: string

  /**
   * 自定义样式
   */
  style?: CSSProperties
}
