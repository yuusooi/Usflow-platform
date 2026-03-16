import { createBrowserRouter } from 'react-router-dom'
import { routes } from './router'

/**
 * 创建路由器
 *
 * 生产环境方案：
 * 1. 不在创建路由时过滤（那是玩具做法）
 * 2. 直接使用全量路由
 * 3. 权限控制由 Guard 组件在运行时检查
 * 4. Store 状态变化实时生效，无需刷新
 */
export function createDynamicRouter() {
  return createBrowserRouter(routes as any)
}
