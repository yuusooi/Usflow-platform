import { ReactNode } from 'react'

/**
 * Result 组件的状态类型
 */
export type ResultStatus = '403' | '404' | '500' | 'success' | 'error' | 'warning' | 'info'

/**
 * Result 组件的属性
 */
export interface ResultProps {
  /** 结果状态，决定图标和样式 */
  status?: ResultStatus
  /** 标题 */
  title?: ReactNode
  /** 副标题 */
  subTitle?: ReactNode
  /** 额外内容（通常是按钮） */
  extra?: ReactNode
  /** 子内容 */
  children?: ReactNode
}
