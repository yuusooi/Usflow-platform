// import type { CSSProperties, ReactNode } from 'react'
// import React, { useContext } from 'react'
// import { GutterContext } from './context'
// // import type {ColResponsiveProps} from './types'
// import type { ResponsiveConfig } from './types'
// // import { breakpoints } from './breakpoints';
// import './grid.responsive.css'

// export interface ColProps {
//   // 列宽度
//   // 栅格占用的列数:占1-24列，默认24。决定列的宽度
//   span?: number
//   // 左侧偏移
//   // 栅格左侧的间隔列数，默认0，让列向右偏移，留白
//   offset?: number
//   // 向右推/向左拉
//   // 栅格向右/左移动的列数
//   // 改变列的显示顺序，向右/左推
//   // 排序,用于响应式布局/在不同屏幕上改变列的顺序
//   push?: number
//   pull?: number
//   xs?: number | ResponsiveConfig
//   sm?: number | ResponsiveConfig
//   md?: number | ResponsiveConfig
//   lg?: number | ResponsiveConfig
//   xl?: number | ResponsiveConfig
//   // 自定义样式
//   style?: CSSProperties
//   // 自定义类名
//   className?: string
//   // 子元素
//   children?: ReactNode
// }

// const Col: React.FC<ColProps> = (props) => {
//   const {
//     span = 24,
//     offset = 0,
//     push = 0,
//     pull = 0,
//     // 解构响应式属性
//     xs,
//     sm,
//     md,
//     lg,
//     xl,
//     style,
//     className,
//     children, // 子元素内容
//   } = props

//   const gutter = useContext(GutterContext)

//   // 辅助函数：解析响应式属性 统一数据格式为对象
//   // 如果value是数字，转成{span: value}
//   // 如果value已经是对象，直接返回
//   const parseResponsiveProp = (
//     value: number | ResponsiveConfig | undefined
//   ): ResponsiveConfig => {
//     if (typeof value === 'number') {
//       return { span: value }
//     }
//     return value || {}
//   }

//   const xsConfig = parseResponsiveProp(xs)
//   const smConfig = parseResponsiveProp(sm)
//   const mdConfig = parseResponsiveProp(md)
//   const lgConfig = parseResponsiveProp(lg)
//   const xlConfig = parseResponsiveProp(xl)

//   const classNames = ['my-col']
//   classNames.push(`my-col-span-${span}`)

//   if (offset) {
//     classNames.push(`my-col-offset-${offset}`)
//   }
//   if (push) {
//     classNames.push(`my-col-push-${push}`)
//   }
//   if (pull) {
//     classNames.push(`my-col-pull-${pull}`)
//   }
//   // 在 CSS 生成脚本里，把 xs 设为了默认（没有 @media 包裹），
//   // 所以默认的 span={12} 必须生成 .my-col-xs-span-12 才能匹配到样式
//   if (span) classNames.push(`my-col-xs-span-${span}`)

//   // 增加响应式类名
//   const addResponsiveClass = (breakpoint: string, config: ResponsiveConfig) => {
//     if (config.span) {
//       classNames.push(`my-col-${breakpoint}-span-${config.span}`)
//     }
//     if (config.offset) {
//       classNames.push(`my-col-${breakpoint}-offset-${config.offset}`)
//     }
//     if (config.push) {
//       classNames.push(`my-col-${breakpoint}-push-${config.push}`)
//     }
//     if (config.pull) {
//       classNames.push(`my-col-${breakpoint}-pull-${config.pull}`)
//     }

//     // 只有当用户没有专门写 xs={...} 时，才把 span 当作默认的移动端宽度
//     if (xs === undefined) {
//       classNames.push(`my-col-xs-span-${span}`)
//     }
//   }

//   addResponsiveClass('xs', xsConfig)
//   addResponsiveClass('sm', smConfig)
//   addResponsiveClass('md', mdConfig)
//   addResponsiveClass('lg', lgConfig)
//   addResponsiveClass('xl', xlConfig)

//   if (className) {
//     classNames.push(className)
//   }

//   const finalClassName = classNames.join(' ')

//   const colStyle: CSSProperties = {
//     boxSizing: 'border-box',
//     ...(gutter && {
//       paddingLeft: `${gutter / 2}px`,
//       paddingRight: `${gutter / 2}px`,
//     }),
//     // ...(offset && {
//     //     marginLeft : `${(offset/24)*100}%`
//     // }),
//     // ...(push && {
//     //     marginLeft : `${(push/24)*100}%`
//     // }),
//     // ...(pull && {
//     //     marginRight : `${(pull/24)*100}%`
//     // }),
//     ...style,
//   }

//   return (
//     <div className={finalClassName} style={colStyle}>
//       {children}
//     </div>
//   )
// }

// export default Col

import type { CSSProperties, ReactNode } from 'react'
import React, { useContext } from 'react'
import { GutterContext } from './context'
import type { ResponsiveConfig } from './types'
import './grid.responsive.css'

export interface ColProps {
  span?: number
  offset?: number
  push?: number
  pull?: number
  xs?: number | ResponsiveConfig
  sm?: number | ResponsiveConfig
  md?: number | ResponsiveConfig
  lg?: number | ResponsiveConfig
  xl?: number | ResponsiveConfig
  style?: CSSProperties
  className?: string
  children?: ReactNode
}

const Col: React.FC<ColProps> = (props) => {
  const {
    span, // ❌ 注意：去掉了 "= 24" 的默认赋值
    offset,
    push,
    pull,
    xs,
    sm,
    md,
    lg,
    xl,
    style,
    className,
    children,
  } = props

  const gutter = useContext(GutterContext)

  // 解析响应式属性
  const parseResponsiveProp = (
    value: number | ResponsiveConfig | undefined
  ): ResponsiveConfig => {
    if (typeof value === 'number') {
      return { span: value }
    }
    return value || {}
  }

  const xsConfig = parseResponsiveProp(xs)
  const smConfig = parseResponsiveProp(sm)
  const mdConfig = parseResponsiveProp(md)
  const lgConfig = parseResponsiveProp(lg)
  const xlConfig = parseResponsiveProp(xl)

  const classNames = ['my-col']

  // 增加响应式类名
  const addResponsiveClass = (breakpoint: string, config: ResponsiveConfig) => {
    if (config.span !== undefined)
      classNames.push(`my-col-${breakpoint}-span-${config.span}`)
    if (config.offset !== undefined)
      classNames.push(`my-col-${breakpoint}-offset-${config.offset}`)
    if (config.push !== undefined)
      classNames.push(`my-col-${breakpoint}-push-${config.push}`)
    if (config.pull !== undefined)
      classNames.push(`my-col-${breakpoint}-pull-${config.pull}`)
  }

  addResponsiveClass('xs', xsConfig)
  addResponsiveClass('sm', smConfig)
  addResponsiveClass('md', mdConfig)
  addResponsiveClass('lg', lgConfig)
  addResponsiveClass('xl', xlConfig)

  // ✅ 核心修复：更严谨的兜底逻辑
  const hasResponsive =
    xs !== undefined ||
    sm !== undefined ||
    md !== undefined ||
    lg !== undefined ||
    xl !== undefined

  if (span !== undefined) {
    // 明确传了 span，作为 xs 的默认值（Mobile First）
    if (xsConfig.span === undefined) classNames.push(`my-col-xs-span-${span}`)
  } else if (!hasResponsive) {
    // 既没有传 span，也没有任何响应式断点，才默认占据 24 列
    classNames.push(`my-col-xs-span-24`)
  }

  // 基础偏移量也需要做类似的兜底判断
  if (offset !== undefined && xsConfig.offset === undefined)
    classNames.push(`my-col-xs-offset-${offset}`)
  if (push !== undefined && xsConfig.push === undefined)
    classNames.push(`my-col-xs-push-${push}`)
  if (pull !== undefined && xsConfig.pull === undefined)
    classNames.push(`my-col-xs-pull-${pull}`)

  if (className) {
    classNames.push(className)
  }

  const finalClassName = classNames.join(' ')

  const colStyle: CSSProperties = {
    boxSizing: 'border-box',
    ...(gutter
      ? {
          paddingLeft: `${gutter / 2}px`,
          paddingRight: `${gutter / 2}px`,
        }
      : {}),
    ...style,
  }

  return (
    <div className={finalClassName} style={colStyle}>
      {children}
    </div>
  )
}

export default Col
