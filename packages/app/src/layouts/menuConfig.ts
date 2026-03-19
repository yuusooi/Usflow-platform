/**
 * 菜单项类型定义
 */
export interface MenuItem {
  key: string;
  label: string;
  iconName?: string;
  path?: string;
  children?: MenuItem[];
}

/**
 * UsFlow 企业级流程协作平台 - 左侧菜单配置
 *
 * 菜单结构：
 * - 我的工作台
 *   - 概览 (Dashboard)
 *   - 发起申请 (Leave Application + Dependencies Test)
 *   - 审批中心 (Task Center + ProTable Test)
 * - 流程引擎
 *   - 流程设计器 (Flow Design)
 * - 系统管理
 *   - 组织架构 (User + Role + User List)
 * - 审计与监控
 *   - 审计日志 (Virtual List Test)
 *   - 高可用实验室 (Error Test + Service Down Test)
 */
export const menuConfig: MenuItem[] = [
  {
    key: 'workspace',
    label: '我的工作台',
    iconName: 'HomeOutlined',
    children: [
      {
        key: 'dashboard',
        label: '概览',
        iconName: 'AppstoreOutlined',
        path: '/',
      },
      {
        key: 'initiate',
        label: '发起申请',
        iconName: 'FileTextOutlined',
        path: '/workspace/leave-application',
      },
      {
        key: 'approvals',
        label: '审批中心',
        iconName: 'AuditOutlined',
        path: '/workspace/task-center',
      },
    ],
  },
  {
    key: 'flow-engine',
    label: '流程引擎',
    iconName: 'ThunderboltOutlined',
    children: [
      {
        key: 'flow-design',
        label: '流程设计器',
        iconName: 'AppstoreOutlined',
        path: '/engine/flow-design',
      },
    ],
  },
  {
    key: 'system',
    label: '系统管理',
    iconName: 'SettingOutlined',
    children: [
      {
        key: 'organization',
        label: '组织架构',
        iconName: 'TeamOutlined',
        path: '/system/user-list',
      },
    ],
  },
  {
    key: 'audit',
    label: '审计与监控',
    iconName: 'CheckCircleOutlined',
    children: [
      {
        key: 'operation-logs',
        label: '审计日志',
        iconName: 'HistoryOutlined',
        path: '/audit/operation-logs',
      },
      {
        key: 'reliability-lab',
        label: '高可用实验室',
        iconName: 'ExperimentOutlined',
        path: '/audit/reliability-lab',
      },
    ],
  },
];

/**
 * 路由路径到菜单 key 的映射关系
 * 用于自动高亮当前页面对应的菜单项
 */
export const pathToMenuKey: Record<string, string> = {
  // 工作台
  '/': 'dashboard',
  '/workspace/leave-application': 'initiate',
  '/workspace/task-center': 'approvals',

  // 流程引擎
  '/engine/flow-design': 'flow-design',

  // 系统管理
  '/system/user-list': 'organization',
  '/system/role': 'organization',
  '/system/permission': 'organization',

  // 审计与监控
  '/audit/operation-logs': 'operation-logs',
  '/audit/reliability-lab': 'reliability-lab',

  // 兼容旧路由（可后续删除）
  '/system/leave-application': 'initiate',
  '/system/task-center': 'approvals',
  '/system/flow-design': 'flow-design',
  '/system/virtual-list-test': 'operation-logs',
  '/system/error-test': 'reliability-lab',
  '/system/service-down-test': 'reliability-lab',
};

/**
 * 根据当前路径查找对应的菜单 key
 */
export function getMenuKeyByPath(path: string): string {
  // 精确匹配
  if (pathToMenuKey[path]) {
    return pathToMenuKey[path];
  }

  // 模糊匹配（处理子路由）
  const matchedKey = Object.keys(pathToMenuKey).find((key) => path.startsWith(key));
  return matchedKey ? pathToMenuKey[matchedKey] : '';
}

/**
 * 菜单 key 到路由路径的映射关系
 */
export const menuKeyToPath: Record<string, string> = {
  dashboard: '/',
  initiate: '/workspace/leave-application',
  approvals: '/workspace/task-center',
  'flow-design': '/engine/flow-design',
  organization: '/system/user-list',
  'operation-logs': '/audit/operation-logs',
  'reliability-lab': '/audit/reliability-lab',
};
