import React, { useMemo, isValidElement } from 'react'
import type { SpaceProps, SpaceDirection, SpaceSize, SpaceAlign } from './types'
import './style.css'

/**
 * Space 间距组件
 *
 * 设置组件之间的间距。使用现代 CSS gap 属性实现，避免使用 margin 的常见问题。
 *
 * @example
 * ```tsx
 * // 基础用法
 * <Space>按钮1 按钮2 按钮3</Space>
 *
 * // 垂直排列
 * <Space direction="vertical">内容1 内容2 内容3</Space>
 *
 * // 自定义间距
 * <Space size={16}>按钮1 按钮2</Space>
 * <Space size="large">按钮1 按钮2</Space>
 *
 * // 对齐方式
 * <Space align="start">
 *   <div>短文本</div>
 *   <div>长文本内容</div>
 * </Space>
 *
 * // 自动换行
 * <Space wrap>
 *   {Array.from({ length: 10 }).map((_, i) => (
 *     <button key={i}>按钮{i + 1}</button>
 *   ))}
 * </Space>
 *
 * // 带分隔符
 * <Space split={<span>|</span>}>
 *   <a href="#">链接1</a>
 *   <a href="#">链接2</a>
 *   <a href="#">链接3</a>
 * </Space>
 * ```
 */
const Space: React.FC<SpaceProps> = ({
  children,
  direction = 'horizontal',
  size = 'small',
  align = 'center',
  wrap = false,
  split,
  className,
  style,
}) => {
  // 计算间距大小（将预设值转换为具体像素）
  const gapSize = useMemo(() => {
    // 如果是数字，直接返回像素值
    if (typeof size === 'number') {
      return `${size}px`
    }
    // 如果是字符串，直接返回
    if (typeof size === 'string') {
      // 预设值映射
      const sizeMap: Record<string, string> = {
        small: '8px',
        middle: '16px',
        large: '24px',
      }
      return sizeMap[size] || size
    }
    return '8px'
  }, [size])

  // 构建 class 列表（BEM 规范）
  const classNames = ['my-space']

  // 添加方向类名
  if (direction === 'vertical') {
    classNames.push('my-space-vertical')
  }

  // 添加对齐方式类名
  if (align !== 'center') {
    classNames.push(`my-space-align-${align}`)
  }

  // 添加换行类名
  if (wrap) {
    classNames.push('my-space-wrap')
  }

  // 添加自定义类名
  if (className) {
    classNames.push(className)
  }

  // 将 children 转换为数组，过滤掉 null、undefined、false
  const nodes = React.Children.toArray(children).filter(
    (node) => node !== null && node !== undefined && node !== false
  )

  // 渲染子元素和分隔符
  const renderItems = () => {
    return nodes.map((node, index) => {
      // 如果不是最后一个元素且有分隔符，渲染分隔符
      if (split && isValidElement(split) && index < nodes.length - 1) {
        return (
          <React.Fragment key={index}>
            <div className="my-space-item">{node}</div>
            <div className="my-space-split">{split}</div>
          </React.Fragment>
        )
      }

      // 普通子元素
      return (
        <div key={index} className="my-space-item">
          {node}
        </div>
      )
    })
  }

  return (
    <div
      className={classNames.join(' ')}
      style={{
        // CSS 变量传递间距大小
        '--space-size': gapSize,
        ...style,
      }}
    >
      {renderItems()}
    </div>
  )
}

export default Space
export type { SpaceProps, SpaceDirection, SpaceSize, SpaceAlign }
