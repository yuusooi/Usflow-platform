import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import type { RouteMeta } from './router';

interface GuardProps {
  children: React.ReactElement;
  meta?: RouteMeta;
}

/**
 * 路由守卫组件 - 生产环境级别
 *
 * 职责：
 * 1. 检查是否登录
 * 2. 检查是否有权限访问当前路由
 * 3. 无权限时重定向
 */
export function Guard({ children, meta }: GuardProps) {
  const location = useLocation();
  const { isAuthenticated, hasPermission } = useAuthStore();

  // 1. 未登录 -> 跳转登录页（记录原地址，登录后返回）
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. 无权限码 -> 公开路由，直接渲染
  if (!meta?.authCode) {
    return children;
  }

  // 3. 有权限码 -> 检查权限
  if (!hasPermission(meta.authCode)) {
    // 无权限 -> 跳转 403
    return <Navigate to="/403" replace />;
  }

  // 4. 有权限 -> 渲染组件
  return children;
}
