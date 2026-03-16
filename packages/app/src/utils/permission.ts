import { useAuthStore } from '@/store/useAuthStore';

// 权限工具类
// 提供常用的权限判断方法
export class PermissionHelper {
  // 判断是否有某个权限
  static hasPermission(code: string): boolean {
    const { permissions, isAuthenticated } = useAuthStore.getState();

    // 未登录，无权限
    if (!isAuthenticated) {
      return false;
    }

    // 超级管理员拥有所有权限
    const { userInfo } = useAuthStore.getState();
    if (userInfo?.username === 'admin') {
      return true;
    }

    return permissions.includes(code);
  }

  // 判断是否有任一权限
  static hasAnyPermission(codes: string[]): boolean {
    const { permissions, isAuthenticated } = useAuthStore.getState();

    if (!isAuthenticated) {
      return false;
    }

    return codes.some((code) => permissions.includes(code));
  }

  // 判断是否有所有权限
  static hasAllPermissions(codes: string[]): boolean {
    const { permissions, isAuthenticated } = useAuthStore.getState();

    if (!isAuthenticated) {
      return false;
    }

    return codes.every((code) => permissions.includes(code)); //有一个 false 就返回 false
  }

  // 获取当前用户的权限列表 返回权限码数组
  static getPermissions(): string[] {
    const { permissions } = useAuthStore.getState();
    return permissions;
  }
}

// 快捷函数 判断是否有某个权限
export function hasPermission(code: string): boolean {
  return PermissionHelper.hasPermission(code);
}

// 快捷函数 判断是否有任一权限
export function hasAnyPermission(codes: string[]): boolean {
  return PermissionHelper.hasAnyPermission(codes);
}

// 快捷函数 判断是否有所有权限
export function hasAllPermissions(codes: string[]): boolean {
  return PermissionHelper.hasAllPermissions(codes);
}
