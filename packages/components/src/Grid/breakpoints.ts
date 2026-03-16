// 定义不同设备的屏幕宽度断点
export const breakpoints = {
  xs: 480, //手机竖屏
  sm: 576, //手机横屏
  md: 768, //平板
  lg: 992, //桌面
  xl: 1200, //大桌面
} as const

// 提取断点值的类型，用于后续的类型约束
export type Breakpoint = keyof typeof breakpoints
