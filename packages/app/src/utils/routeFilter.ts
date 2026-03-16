import type { RouteMeta } from '@/router/router.tsx';
import type { RouteObject as ReactRouteObject } from 'react-router-dom';

/**
 * 扩展 React Router 的 RouteObject，添加 meta 字段
 */
interface RouteObject extends Omit<ReactRouteObject, 'children'> {
  meta?: RouteMeta;
  children?: RouteObject[];
}

/**
 * 过滤动态路由
 * @param routes 全量路由表
 * @param permissions 用户权限列表
 * @returns 过滤后的路由表
 */
export function filterDynamicRoutes(routes: RouteObject[], permissions: string[]): RouteObject[] {
  return routes
    .filter((route) => {
      // 公开路由，保留
      if (!route.meta?.authCode) {
        return true;
      }

      // 检查权限
      return permissions.includes(route.meta.authCode);
    })
    .map((route) => {
      // 递归过滤子路由
      if (route.children && route.children.length > 0) {
        return {
          ...route,
          children: filterDynamicRoutes(route.children, permissions),
        };
      }
      return route;
    });
}

/**
 * 根据路径查找路由
 */
export function findRouteByPath(routes: RouteObject[], path: string): RouteObject | undefined {
  for (const route of routes) {
    if (route.path === path) {
      return route;
    }

    if (route.children) {
      const found = findRouteByPath(route.children, path);
      if (found) return found;
    }
  }

  return undefined;
}

/**
 * 拍平路由树
 */
export function flattenRoutes(routes: RouteObject[]): RouteObject[] {
  const result: RouteObject[] = [];

  function traverse(routes: RouteObject[]) {
    for (const route of routes) {
      result.push(route);

      if (route.children) {
        traverse(route.children);
      }
    }
  }

  traverse(routes);
  return result;
}
