// 复杂指令的结构：里面可以装 span, offset 等所有属性
export type ResponsiveConfig = {
  span?: number
  offset?: number
  push?: number
  pull?: number
}

export type ColResponsiveProps = {
  // xs (手机): 可以直接给个数字(代表span)，也可以给个配置包(对象)
  xs?: number | ResponsiveConfig
  sm?: number | ResponsiveConfig
  md?: number | ResponsiveConfig
  lg?: number | ResponsiveConfig
  xl?: number | ResponsiveConfig
}
