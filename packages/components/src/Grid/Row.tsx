import type { ReactNode, CSSProperties } from 'react'
import React from 'react'
import { GutterContext } from './context'
import './grid.responsive.css'

export interface RowProps {
  // 间距
  gutter?: number | number[] | [number, number]
  // 垂直对齐
  align?: 'top' | 'middle' | 'bottom' | 'stretch'
  // 水平对齐
  justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around'
  // 自定义样式
  style?: CSSProperties
  // 自定义类名
  className?: string
  // 子元素（通常是Col组件）
  children?: ReactNode
}

const Row: React.FC<RowProps> = (props) => {
  const {
    gutter = 0,
    align = 'top',
    justify = 'start',
    style,
    className,
    children,
  } = props

  const gutterX = Array.isArray(gutter) ? gutter[0] : gutter
  const gutterY = Array.isArray(gutter) ? gutter[1] : 0

  // align映射到CSS
  const alignMap = {
    // 顶部、居中、底部对齐
    top: 'flex-start',
    middle: 'center',
    bottom: 'flex-end',
    // 拉伸填充
    stretch: 'stretch',
  }
  const alignItems = alignMap[align]

  // justify映射到CSS
  const justifyMap = {
    start: 'flex-start',
    end: 'flex-end',
    center: 'center',
    'space-between': 'space-between',
    'space-around': 'space-around',
  }
  const justifyContent = justifyMap[justify]

  // 计算className
  const classNames = ['my-row']

  if (align !== 'top') {
    classNames.push(`my-row-align-${align}`)
  }

  if (justify !== 'start') {
    classNames.push(`my-row-justify-${justify}`)
  }

  if (className) {
    classNames.push(className)
  }

  const finalClassName = classNames.join(' ')

  // 计算style
  const rowStyle: CSSProperties = {
    marginLeft: gutterX ? -gutterX / 2 : 0,
    marginRight: gutterX ? -gutterX / 2 : 0,
    rowGap: gutterY ? gutterY : undefined,
    display: 'flex',
    flexWrap: 'wrap',
    alignItems,
    justifyContent,
    ...style,
  }

  // 渲染
  return (
    <GutterContext.Provider value={gutterX}>
      <div className={finalClassName} style={rowStyle}>
        {children}
      </div>
    </GutterContext.Provider>
  )
}

export default Row
