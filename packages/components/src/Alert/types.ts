import type { CSSProperties, MouseEvent, ReactNode } from 'react'

/**
 * Alert 类型
 */
export type AlertType = 'success' | 'info' | 'warning' | 'error'

/**
 * Alert 组件属性
 */
export interface AlertProps {
  /**
   * 警告类型
   * @default 'info'
   */
  type?: AlertType

  /**
   * 主标题（必需）
   */
  message: ReactNode

  /**
   * 辅助详细描述
   */
  description?: ReactNode

  /**
   * 是否显示图标
   * @default true
   */
  showIcon?: boolean

  /**
   * 是否可关闭
   * @default false
   */
  closable?: boolean

  /**
   * 是否显示（受控模式）
   *
   * - 如果传入此属性，组件进入受控模式，由父组件控制显示/隐藏
   * - 如果不传入，组件进入非受控模式，内部维护 visible 状态
   *
   * @default true
   */
  visible?: boolean

  /**
   * 关闭时的回调
   */
  onClose?: (e: MouseEvent<HTMLButtonElement>) => void

  /**
   * 显示状态变化时的回调（受控模式辅助）
   *
   * @param visible 是否显示
   * @param e 关闭事件
   */
  onVisibleChange?: (visible: boolean, e: MouseEvent<HTMLButtonElement>) => void

  /**
   * 自定义类名
   */
  className?: string

  /**
   * 自定义样式
   */
  style?: CSSProperties
}
