import type { CSSProperties, ReactNode } from 'react'

/**
 * Layout 组件的基础属性
 */
export interface LayoutProps {
  className?: string
  style?: CSSProperties
  children: ReactNode
}

/**
 * Header 组件属性
 */
export interface HeaderProps {
  className?: string
  style?: CSSProperties
  children: ReactNode
}

/**
 * Sider 组件属性
 */
export interface SiderProps {
  className?: string
  style?: CSSProperties
  children: ReactNode
  /**
   * 侧边栏宽度，默认 200px
   */
  width?: string | number
  /**
   * 是否可折叠
   */
  collapsible?: boolean
  /**
   * 是否折叠
   */
  collapsed?: boolean
  /**
   * 折叠状态变化回调
   */
  onCollapse?: (collapsed: boolean) => void
  /**
   * 折叠时的宽度，默认 64px
   */
  collapsedWidth?: number
}

/**
 * Content 组件属性
 */
export interface ContentProps {
  className?: string
  style?: CSSProperties
  children: ReactNode
}

/**
 * Footer 组件属性
 */
export interface FooterProps {
  className?: string
  style?: CSSProperties
  children: ReactNode
}
