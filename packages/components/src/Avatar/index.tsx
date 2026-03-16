import React, { useMemo, useState, useRef, useEffect } from 'react'
import type { AvatarProps, AvatarShape, AvatarSize } from './types'
import './style.css'

/**
 * Avatar 头像组件
 *
 * 用于展示用户头像、图标或文字。支持图片加载失败回退、自适应文字缩放。
 *
 * @example
 * ```tsx
 * // 图片头像
 * <Avatar src="https://example.com/avatar.png" />
 *
 * // 文字头像（自动缩放）
 * <Avatar>张三</Avatar>
 *
 * // 图标头像
 * <Avatar icon={<UserIcon />} />
 *
 * // 形状和尺寸
 * <Avatar shape="square" size="large" />
 *
 * // 加载失败回退
 * <Avatar src="invalid.png" alt="默认头像">备</Avatar>
 * ```
 */
const Avatar: React.FC<AvatarProps> = ({
  children,
  src,
  icon,
  shape = 'circle',
  size = 'default',
  alt,
  onError,
  className,
  style,
}) => {
  // 图片加载失败状态
  const [isImgLoadFailed, setIsImgLoadFailed] = useState(false)

  // 文字内容 ref（用于测量并计算缩放）
  const textRef = useRef<HTMLSpanElement>(null)

  // 计算后的文字缩放比例
  const [scale, setScale] = useState(1)

  /**
   * 计算文字缩放比例
   * 当文字宽度超过容器宽度时，自动缩放文字以适应容器
   */
  const calcScale = () => {
    if (!textRef.current) return

    const textNode = textRef.current
    const parentNode = textNode.parentElement

    if (!parentNode) return

    // 获取文字实际宽度（scrollWidth 包含溢出的内容）
    const textWidth = textNode.scrollWidth
    // 获取容器宽度
    const containerWidth = parentNode.offsetWidth

    if (textWidth && containerWidth) {
      // 计算缩放比例，留出约 4px 的内边距（左右各 2px）
      const newScale = (containerWidth - 4) / textWidth
      setScale(newScale < 1 ? newScale : 1) // 只缩放，不放大
    }
  }

  // 组件挂载和窗口大小变化时重新计算缩放
  useEffect(() => {
    // 延迟计算，确保 DOM 完全渲染后再测量
    const timer = setTimeout(() => {
      calcScale()
    }, 0)

    return () => clearTimeout(timer)
  }, [children])

  /**
   * 图片加载失败处理
   * 优先调用自定义 onError，否则切换到失败状态显示 fallback
   */
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (onError) {
      const result = onError(e)
      if (result !== false) {
        setIsImgLoadFailed(true)
      }
    } else {
      setIsImgLoadFailed(true)
    }
  }

  // 构建 class 列表（BEM 规范）
  const classNames = ['my-avatar']

  // 添加形状类名
  if (shape === 'square') {
    classNames.push('my-avatar-square')
  } else {
    classNames.push('my-avatar-circle')
  }

  // 添加尺寸类名
  if (typeof size === 'string') {
    classNames.push(`my-avatar-${size}`)
  }

  // 添加自定义类名
  if (className) {
    classNames.push(className)
  }

  // 计算自定义样式（支持自定义尺寸）
  const avatarStyle = useMemo(() => {
    const styles: React.CSSProperties = { ...style }

    // 如果 size 是数字，直接设置为宽高
    if (typeof size === 'number') {
      styles.width = `${size}px`
      styles.height = `${size}px`
      styles.lineHeight = `${size}px`
      styles.fontSize = `${size / 2}px`
    }

    return styles
  }, [size, style])

  // 优先渲染图片
  if (src && !isImgLoadFailed) {
    return (
      <span className={classNames.join(' ')} style={avatarStyle}>
        <img
          src={src}
          alt={alt}
          onError={handleImgError}
          className="my-avatar-image"
        />
      </span>
    )
  }

  // 其次渲染图标
  if (icon) {
    return (
      <span className={classNames.join(' ')} style={avatarStyle}>
        {icon}
      </span>
    )
  }

  // 最后渲染文字
  if (children) {
    return (
      <span className={classNames.join(' ')} style={avatarStyle}>
        <span
          ref={textRef}
          className="my-avatar-string"
          style={{
            transform: `scale(${scale})`,
            // 需要设置 transformOrigin 确保文字居中缩放
            transformOrigin: 'center center',
          }}
        >
          {children}
        </span>
      </span>
    )
  }

  // 兜底：空头像
  return <span className={classNames.join(' ')} style={avatarStyle} />
}

export default Avatar
export type { AvatarProps, AvatarShape, AvatarSize }
