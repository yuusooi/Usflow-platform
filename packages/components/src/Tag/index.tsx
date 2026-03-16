import React, { useState, MouseEvent } from 'react'
import type { TagProps, TagPresets } from './types'
import './style.css'

/**
 * Tag 标签组件
 *
 * 用于标记、分类和选择。支持关闭、自定义颜色等特性。
 *
 * @example
 * ```tsx
 * // 基础用法
 * <Tag>默认标签</Tag>
 *
 * // 预设颜色
 * <Tag color="success">成功</Tag>
 * <Tag color="warning">警告</Tag>
 * <Tag color="error">错误</Tag>
 *
 * // 自定义颜色
 * <Tag color="#f50">自定义颜色</Tag>
 *
 * // 可关闭
 * <Tag closable onClose={(e) => console.log('关闭', e)}>
 *   可关闭标签
 * </Tag>
 * ```
 */
const Tag: React.FC<TagProps> = ({
  children,
  color,
  closable = false,
  onClose,
  className,
  style,
}) => {
  // 内部维护可见状态
  const [visible, setVisible] = useState(true)

  // 处理关闭事件
  const handleClose = (e: MouseEvent<HTMLSpanElement>) => {
    // 先触发外部回调
    onClose?.(e)
    // 再隐藏自己
    setVisible(false)
  }

  // 如果已关闭，返回 null
  if (!visible) {
    return null
  }

  // 计算颜色样式
  const getTagStyle = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = { ...style }

    if (!color) {
      return baseStyle
    }

    // 预设颜色映射
    const presetColorMap: Record<TagPresets, string> = {
      success: 'var(--success-color)',
      warning: 'var(--warning-color)',
      error: 'var(--error-color)',
    }

    // 判断是否为预设颜色
    if (['success', 'warning', 'error'].includes(color)) {
      const presetColor = color as TagPresets
      baseStyle.backgroundColor = presetColorMap[presetColor]
      baseStyle.color = '#fff'
      baseStyle.borderColor = presetColorMap[presetColor]
    } else {
      // 自定义颜色（HEX 或其他）
      baseStyle.backgroundColor = color
      baseStyle.color = '#fff'
      baseStyle.borderColor = color
    }

    return baseStyle
  }

  // 构建 class 列表
  const classNames = ['my-tag']

  // 可关闭标签添加特定 class
  if (closable) {
    classNames.push('my-tag-closable')
  }

  if (className) {
    classNames.push(className)
  }

  return (
    <span className={classNames.join(' ')} style={getTagStyle()}>
      <span className="my-tag-content">{children}</span>
      {closable && (
        <span className="my-tag-close" onClick={handleClose}>
          {/* 关闭图标 - Inline SVG */}
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M567.4 511.4 768 310.8c6.2-6.2 6.2-16.4 0-22.6l-52.4-52.4c-6.2-6.2-16.4-6.2-22.6 0L492.6 436.4 292 235.8c-6.2-6.2-16.4-6.2-22.6 0l-52.4 52.4c-6.2 6.2-6.2 16.4 0 22.6L417.8 511.4 216.8 712.4c-6.2 6.2-6.2 16.4 0 22.6l52.4 52.4c6.2 6.2 16.4 6.2 22.6 0L492.6 586.4l200.6 200.6c6.2 6.2 16.4 6.2 22.6 0l52.4-52.4c6.2-6.2 6.2-16.4 0-22.6L567.4 511.4z"></path>
          </svg>
        </span>
      )}
    </span>
  )
}

export default Tag
export type { TagProps, TagPresets }
