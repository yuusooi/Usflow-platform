import type { ReactNode } from 'react';
import { hasPermission, hasAnyPermission, hasAllPermissions } from '@/utils/permission';

/**
 * 权限控制组件 Props
 */
interface PermissionProps {
  /** 权限码或权限码数组 */
  permission: string | string[];
  /** 权限判断类型：'any' 表示有任一权限即可，'all' 表示需要所有权限 */
  type?: 'any' | 'all';
  /** 子组件 */
  children: ReactNode;
  /** 没有权限时显示的内容（可选） */
  fallback?: ReactNode;
}

/**
 * 权限控制组件
 * 根据权限控制子组件是否显示
 */
export function Permission({
  permission,
  type = 'any',
  children,
  fallback = null,
}: PermissionProps) {
  // 单个权限
  if (typeof permission === 'string') {
    return hasPermission(permission) ? <>{children}</> : <>{fallback}</>;
  }

  // 多个权限 - 有任一权限即可
  if (type === 'any') {
    return hasAnyPermission(permission) ? <>{children}</> : <>{fallback}</>;
  }

  // 多个权限 - 需要所有权限
  return hasAllPermissions(permission) ? <>{children}</> : <>{fallback}</>;
}

/**
 * 权限控制组件（快捷方式）
 */
export function HasPermission({
  permission,
  children,
}: {
  permission: string;
  children: ReactNode;
}) {
  return <Permission permission={permission}>{children}</Permission>;
}
