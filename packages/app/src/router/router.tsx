/* eslint-disable @typescript-eslint/no-explicit-any */
import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Guard } from './Guard';

/**
 * 路由元数据
 */
export interface RouteMeta {
  authCode?: string;
  title?: string;
  icon?: string;
  hidden?: boolean;
}

/**
 * 懒加载辅助函数
 */
export function lazyLoad(
  importFn: () => Promise<{ default: React.ComponentType<any> }>,
): React.ReactElement {
  const Component = lazy(importFn);

  return (
    <Suspense fallback={<div>加载中...</div>}>
      <Component />
    </Suspense>
  );
}

/**
 * 懒加载布局组件
 * 用于包含 <Outlet /> 的布局组件
 */
function lazyLayout(
  importFn: () => Promise<{ default: React.ComponentType<any> }>,
): React.ReactElement {
  const Layout = lazy(importFn);

  return (
    <Suspense fallback={<div>加载中...</div>}>
      <Layout>
        <Outlet />
      </Layout>
    </Suspense>
  );
}

/**
 * 全量路由表
 */
export const routes = [
  // ====== 公开路由 ======
  {
    path: '/login',
    element: lazyLoad(() => import('@/pages/Login')),
    meta: { title: '登录' },
  },
  {
    path: '/403',
    element: lazyLoad(() => import('@/pages/403')),
    meta: { title: '无权限' },
  },
  {
    path: '/404',
    element: lazyLoad(() => import('@/pages/404')),
    meta: { title: '页面不存在' },
  },

  // ====== 首页 ======
  {
    path: '/',
    element: (
      <Guard meta={{ authCode: 'dashboard:view', title: '首页' }}>
        {lazyLayout(() => import('@/layouts'))}
      </Guard>
    ),
    children: [
      {
        index: true,
        element: (
          <Guard meta={{ authCode: 'dashboard:view', title: '控制台' }}>
            {lazyLoad(() => import('@/pages/Dashboard'))}
          </Guard>
        ),
      },
    ],
  },

  // ====== 系统管理模块 ======
  {
    path: '/system',
    element: (
      // <Guard meta={{ authCode: 'system:view', title: '系统管理' }}>
      //   {lazyLayout(() => import('@/layouts/BasicLayout'))}
      // </Guard>
      <Guard>{lazyLayout(() => import('@/layouts'))}</Guard>
    ),
    children: [
      {
        path: 'user',
        element: (
          <Guard meta={{ authCode: 'system:user:view', title: '用户管理' }}>
            {lazyLoad(() => import('@/pages/System/User'))}
          </Guard>
        ),
      },
      {
        path: 'role',
        element: (
          <Guard meta={{ authCode: 'system:role:view', title: '角色管理' }}>
            {lazyLoad(() => import('@/pages/System/Role'))}
          </Guard>
        ),
      },
      {
        path: 'permission',
        element: (
          <Guard meta={{ authCode: 'system:permission:view', title: '权限管理' }}>
            {lazyLoad(() => import('@/pages/System/Permission'))}
          </Guard>
        ),
      },
      {
        path: 'test-schema-form',
        element: lazyLoad(() => import('@/pages/TestSchemaForm')),
      },
      {
        path: 'test-dependencies',
        element: lazyLoad(() => import('@/pages/dependenciesTest')),
      },
      {
        path: 'leave-application',
        element: lazyLoad(() => import('@/pages/LeaveApplication')),
      },
      {
        path: 'test-protable',
        element: lazyLoad(() => import('@/pages/TestProTable')),
      },
      {
        path: 'user-list',
        element: lazyLoad(() => import('@/pages/UserList')),
      },
      {
        path: 'virtual-list-test',
        element: lazyLoad(() => import('@/pages/VirtualListTest')),
      },
      {
        path: 'flow-design',
        element: lazyLoad(() => import('@/pages/FlowDesign')),
      },
      {
        path: 'error-test',
        element: lazyLoad(() => import('@/pages/ErrorTest')),
      },
      {
        path: 'service-down-test',
        element: lazyLoad(() => import('@/pages/ServiceDownTest')),
      },
      {
        path: 'task-center',
        element: lazyLoad(() => import('@/pages/TaskCenter')),
      },
    ],
  },

  // 兜底路由
  {
    path: '*',
    element: lazyLoad(() => import('@/pages/404')),
    meta: { title: '404' },
  },
] as const;
