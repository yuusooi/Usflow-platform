import { useAccess } from '@/hooks/useAccess';
import type { ReactNode } from 'react';

// 权限控制组件
// 根据权限码控制子元素是否渲染
interface AuthCodeProps {
  //权限码
  code: string;
  //子元素
  children?: ReactNode;
}

export function AuthCode({ code, children }: AuthCodeProps) {
  // 获取权限判断方法
  const { hasPermission } = useAccess();
  // 如果有权限，渲染 children；否则返回 null
  return hasPermission(code) ? <>{children}</> : null;
}
