import type { CSSProperties, ReactNode } from 'react'

/**
 * Spin 尺寸类型
 */
export type SpinSize = 'small' | 'default' | 'large'

/**
 * Spin 组件属性
 */
export interface SpinProps {
  /**
   * 是否处于加载中
   * @default true
   */
  spinning?: boolean

  /**
   * 加载指示器尺寸
   * @default 'default'
   */
  size?: SpinSize

  /**
   * 加载提示文字（显示在加载图标下方）
   */
  tip?: string

  /**
   * 包裹的内容（如果有此属性，启用包裹模式，渲染遮罩层）
   */
  children?: ReactNode

  /**
   * 自定义类名
   */
  className?: string

  /**
   * 自定义样式
   */
  style?: CSSProperties
}
