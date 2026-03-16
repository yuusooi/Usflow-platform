import type { CSSProperties, ReactNode } from 'react'

/**
 * Tag 预设颜色类型
 */
export type TagPresets = 'success' | 'warning' | 'error'

/**
 * Tag 组件属性
 */
export interface TagProps {
  /**
   * 标签内容
   */
  children: ReactNode

  /**
   * 标签颜色（预设类型或自定义颜色）
   */
  color?: TagPresets | string

  /**
   * 是否可关闭
   * @default false
   */
  closable?: boolean

  /**
   * 关闭时的回调
   */
  onClose?: (e: React.MouseEvent) => void

  /**
   * 自定义类名
   */
  className?: string

  /**
   * 自定义样式
   */
  style?: CSSProperties
}
