import type { CSSProperties, ReactNode, MouseEvent } from 'react'

export interface ButtonProps {
  // 渲染标签
  /**
   * 渲染成什么标签
   * @description 控制组件最终渲染成的 HTML 标签
   * @default 'button'
   * - 'a': 渲染成 <a> 标签
   * - 'button': 渲染成 <button> 标签
   */
  as?: 'a' | 'button'

  // 自定义样式
  style?: CSSProperties
  // 自定义内容
  className?: string
  // 按钮内容（文字或子元素）
  children?: ReactNode
  /**
   * 按钮类型
   * @default 'default'
   * - default: 默认按钮（透明背景）
   * - primary: 主要按钮（蓝色背景）
   * - secondary: 次要按钮（灰色背景）
   * - dashed: 虚线按钮
   * - text: 文字按钮
   * - outline: 线框按钮
   */
  type?: 'default' | 'primary' | 'secondary' | 'dashed' | 'text' | 'outline'

  /** 按钮尺寸
   * @default 'default'
   * - mini: 迷你 (高度 24px)
   * - small: 小型 (高度 28px)
   * - default: 默认 (高度 32px)
   * - large: 大型 (高度 36px)
   */
  size?: 'mini' | 'small' | 'default' | 'large'

  // 交互状态
  /**
   * 是否显示加载状态
   * @description loading 时按钮会显示转圈图标，且无法点击
   * @default false
   */
  loading?: boolean

  /**
   * loading时是都保持宽度不变，防止抖动
   * @default false
   */
  loadingFixedWidth?: boolean

  /**
   * 是否禁用按钮
   * @description 禁用后按钮无法点击，且呈现灰色状态
   * @default false
   */
  disabled?: boolean

  /**
   * 点击事件回调
   * @description 用户点击按钮时触发的函数
   */
  // <HTMLButtonElement | HTMLAnchorElement> 表示事件来源,一个表示<button>一个表示<a>
  // void表示没有返回值
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void

  // 图标相关
  /**
   * 按钮图标
   * @description 显示在按钮文字前面的图标，可以是字符串或者React组件
   */
  icon?: ReactNode

  // 链接属性
  /**
   * 链接地址
   * @description 设置此属性后，按钮渲染为 <a> 标签，支持 链接跳转
   * @example <Button href="https://example.com">跳转</Button>
   */
  href?: string

  /**
   * 链接打开方式
   * @description 仅在 href 存在时生效
   * @default '_self'
   * - _blank: 新窗口
   * - _self: 当前窗口
   * - _parent: 父窗口
   * - _top: 顶层窗口（有嵌套 iframe 时）
   */
  target?: '_blank' | '_self' | '_parent' | '_top'

  // 原生属性
  /**
   * 原生button type属性
   * @description 仅在渲染为 <button> 时生效
   * @default 'button'
   * - button: 默认按钮
   * - submit: 提交表单
   * - reset: 重置表单
   */
  htmlType?: 'button' | 'submit' | 'reset'

  /**
   * 按钮形状
   * @default 'square'
   * - circle: 圆形（宽高相等，完全圆角）
   * - round: 圆角（大圆角）
   * - square: 方形（小圆角）
   */
  shape?: 'circle' | 'round' | 'square'

  /**
   * 按钮状态
   * @description 让按钮传达操作的严重程度
   * @default 'default'
   * - warning: 警告状态（黄色）
   * - danger: 危险状态（红色）
   * - success: 成功状态（绿色）
   * - default: 默认状态
   */
  status?: 'warning' | 'danger' | 'success' | 'default'

  /**
   * 危险按钮
   * @description 设置为 true 时，等同于 status="danger"
   * @default false
   */
  danger?: boolean

  // 布局
  /**
   * 宽度是否自适应容器
   * @description 设置后按钮宽度拉伸至 100%
   * @default false
   */
  long?: boolean
}
