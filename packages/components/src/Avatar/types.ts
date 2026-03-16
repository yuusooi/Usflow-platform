import type { CSSProperties, ReactNode } from 'react'

/**
 * Avatar 形状
 */
export type AvatarShape = 'circle' | 'square'

/**
 * Avatar 尺寸（预设或自定义）
 */
export type AvatarSize = 'small' | 'default' | 'large' | number

/**
 * Avatar 组件属性
 */
export interface AvatarProps {
  /**
   * 文字内容
   */
  children?: ReactNode

  /**
   * 图片地址
   */
  src?: string

  /**
   * 图标元素
   */
  icon?: ReactNode

  /**
   * 形状
   * @default 'circle'
   */
  shape?: AvatarShape

  /**
   * 尺寸
   * @default 'default'
   */
  size?: AvatarSize

  /**
   * 图片 alt 属性
   */
  alt?: string

  /**
   * 图片加载失败时的回调
   * @return 返回 false 会阻止默认的 fallback 行为
   */
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => boolean | void

  /**
   * 自定义类名
   */
  className?: string

  /**
   * 自定义样式
   */
  style?: CSSProperties
}
