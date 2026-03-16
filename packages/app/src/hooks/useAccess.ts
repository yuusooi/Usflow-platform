import { useAuthStore } from '@/store/useAuthStore';

// 权限访问 Hook
// 用于判断当前用户是否有某个权限
export function useAccess() {
  // 从 Zustand store 获取权限数组
  const { permissions } = useAuthStore();

  // 判断是否有单个权限 code权限码
  const hasPermission = (code: string): boolean => {
    return permissions.includes(code);
  };

  // 判断是否有任一权限 codes 权限码数组，如 ['user:add', 'user:edit']
  const hasAnyPermission = (codes: string[]): boolean => {
    return codes.some((code) => permissions.includes(code));
  };

  //  判断是否拥有所有权限;
  const hasAllPermissions = (codes: string[]): boolean => {
    return codes.every((code) => permissions.includes(code));
  };

  // 返回权限判断方法
  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
  };
}
