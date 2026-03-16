import React, { useState, useCallback, useMemo } from 'react'
import type {
  LayoutProps,
  HeaderProps,
  SiderProps,
  ContentProps,
  FooterProps,
} from './types'
import './style.css'

// 内部组件标识，用于识别子组件类型
const HeaderPrefix = 'my-layout-header'
const SiderPrefix = 'my-layout-sider'
const ContentPrefix = 'my-layout-content'
const FooterPrefix = 'my-layout-footer'

/**
 * Layout 主容器组件
 * 自动检测是否有 Sider，决定布局方向
 */
const Layout: React.FC<LayoutProps> & {
  Header: typeof Header
  Sider: typeof Sider
  Content: typeof Content
  Footer: typeof Footer
} = ({ className, style, children }) => {
  // 遍历子元素，检测是否存在 Sider 组件
  const hasSider = useMemo(() => {
    return React.Children.toArray(children).some((child) => {
      // 检查 child 的 type 是否为 Sider 组件
      if (!React.isValidElement(child)) return false
      return child.type === Sider
    })
  }, [children])

  // 构建 class 列表
  const classNames = ['my-layout']
  if (hasSider) {
    classNames.push('my-layout-has-sider')
  }
  if (className) {
    classNames.push(className)
  }

  return (
    <div className={classNames.join(' ')} style={style}>
      {children}
    </div>
  )
}

/**
 * Header 顶部栏组件
 */
const Header: React.FC<HeaderProps> = ({ className, style, children }) => {
  const classNames = [HeaderPrefix]
  if (className) {
    classNames.push(className)
  }

  return (
    <div className={classNames.join(' ')} style={style}>
      {children}
    </div>
  )
}

/**
 * Sider 侧边栏组件
 * 支持折叠功能
 */
const Sider: React.FC<SiderProps> = ({
  className,
  style,
  children,
  width = 200,
  collapsible = false,
  collapsed: propsCollapsed,
  onCollapse,
  collapsedWidth = 64,
}) => {
  // 内部状态管理折叠状态（如果外部未控制）
  const [internalCollapsed, setInternalCollapsed] = useState(false)

  // 判断当前是否折叠（外部优先，否则使用内部状态）
  const collapsed = propsCollapsed !== undefined ? propsCollapsed : internalCollapsed

  // 处理折叠切换
  const handleToggle = useCallback(() => {
    const newCollapsed = !collapsed
    // 如果是受控组件，调用外部回调
    if (propsCollapsed === undefined) {
      setInternalCollapsed(newCollapsed)
    }
    // 触发 onCollapse 回调
    onCollapse?.(newCollapsed)
  }, [collapsed, propsCollapsed, onCollapse])

  // 构建 class 列表
  const classNames = [SiderPrefix]
  if (className) {
    classNames.push(className)
  }

  // 完全折叠时（宽度为0），添加特殊 class
  if (collapsed && collapsedWidth === 0) {
    classNames.push('my-layout-sider-zero-width')
  }

  // 计算侧边栏宽度
  const siderWidth = collapsed ? collapsedWidth : width

  return (
    <div
      className={classNames.join(' ')}
      style={{
        width: siderWidth,
        ...style,
      }}
    >
      {/* 侧边栏内容 */}
      {children}

      {/* 如果可折叠且折叠宽度不为0，显示折叠触发器 */}
      {collapsible && collapsedWidth !== 0 && (
        <div className="my-layout-sider-trigger" onClick={handleToggle}>
          {collapsed ? '›' : '‹'}
        </div>
      )}
    </div>
  )
}

/**
 * Content 内容区域组件
 */
const Content: React.FC<ContentProps> = ({ className, style, children }) => {
  const classNames = [ContentPrefix]
  if (className) {
    classNames.push(className)
  }

  return (
    <div className={classNames.join(' ')} style={style}>
      {children}
    </div>
  )
}

/**
 * Footer 底部栏组件
 */
const Footer: React.FC<FooterProps> = ({ className, style, children }) => {
  const classNames = [FooterPrefix]
  if (className) {
    classNames.push(className)
  }

  return (
    <div className={classNames.join(' ')} style={style}>
      {children}
    </div>
  )
}

// 组合组件，支持链式调用
Layout.Header = Header
Layout.Sider = Sider
Layout.Content = Content
Layout.Footer = Footer

export default Layout
export type { LayoutProps, HeaderProps, SiderProps, ContentProps, FooterProps }
// 单独导出子组件，支持解构导入
export { Header, Content, Footer, Sider }
