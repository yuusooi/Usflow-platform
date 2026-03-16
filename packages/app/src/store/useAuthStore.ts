/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login as loginApi, logout as logoutApi } from '@/services/auth';
import type { UserInfo, MenuItem, LoginParams } from '@/models/auth';
import CryptoJS from 'crypto-js';

// 密钥 应该从环境变量读取，这里简化为常量
const SECRET_KEY = 'usflow_secret_key_2026';

// 自定义加密存储引擎
const encryptedStorage = {
  // 读取数据（解密）
  getItem: (name: string): string | null => {
    // 从 localStorage 读取密文
    const encrypted = localStorage.getItem(name);

    // 如果没有数据，返回 null
    if (!encrypted) return null;

    try {
      // 用 AES 解密
      const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
      // 转成 UTF-8 字符串
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      // 如果解密失败（空字符串），返回 null
      if (!decrypted) return null;
      // 解析 JSON 并返回
      return JSON.parse(decrypted);
    } catch (error) {
      // 解密失败（密文被篡改），返回 null
      console.error('解密失败:', error);
      return null;
    }
  },

  // 保存数据（加密）
  setItem: (name: string, value: unknown): void => {
    try {
      // 将 value 转成 JSON 字符串
      const json = JSON.stringify(value);

      // 加密
      const encrypted = CryptoJS.AES.encrypt(json, SECRET_KEY).toString();

      // 存到 localStorage
      localStorage.setItem(name, encrypted);
      console.log('加密并保存成功:', name);
    } catch (error) {
      // 加密失败，打印错误
      console.error('加密失败:', error);
    }
  },

  // 删除数据
  removeItem: (name: string): void => {
    // 直接从 localStorage 删除
    localStorage.removeItem(name);
  },
};

// 权限 Store 的状态定义
interface AuthState {
  // JWT 访问令牌
  token: string;
  // 用户信息
  userInfo: UserInfo | null;
  // 菜单权限树 嵌套结构，用于渲染侧边栏
  menuTree: MenuItem[];
  // 权限码数组 扁平结构，用于按钮级权限控制
  permissions: string[];
  // 是否已登录
  isAuthenticated: boolean;
}

// 权限 Store 的操作方法定义
interface AuthActions {
  // 登录方法
  login: (params: LoginParams) => Promise<void>;
  // 退出登录方法
  logout: () => Promise<void>;
  // 检查是否有某个权限
  hasPermission: (code: string) => boolean;
  // 检查是否有任一权限
  hasAnyPermission: (codes: string[]) => boolean;
}

// 权限 Store 类型（状态 + 操作方法）
type AuthStore = AuthState & AuthActions;

// 初始状态
const initialState: AuthState = {
  token: '',
  userInfo: null,
  menuTree: [],
  permissions: [],
  isAuthenticated: false,
};

// 将树形菜单拍平成权限码数组
// 传入menuTree菜单树，返回权限码数组，如 ['sys:user:add', 'sys:user:edit']
function flattenPermissions(menuTree: MenuItem[]): string[] {
  const permissions: string[] = [];

  function traverse(items: MenuItem[]) {
    for (const item of items) {
      // 提取当前节点的权限码
      if (item.code) {
        permissions.push(item.code);
      }

      // 递归遍历子节点
      if (item.children && item.children.length > 0) {
        traverse(item.children);
      }
    }
  }

  traverse(menuTree);
  return permissions;
}

// 权限 Store
// 使用 zustand + persist 中间件实现持久化存储
export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // 状态
      ...initialState,

      // 登录操作方法
      // 1. 调用登录接口
      // 2. 存储返回的数据到 Store
      login: async (params: LoginParams) => {
        const response = await loginApi(params);

        set({
          token: response.token,
          userInfo: response.userInfo,
          menuTree: response.menuTree,
          permissions: flattenPermissions(response.menuTree),
          isAuthenticated: true,
        });
      },

      // 退出登录
      // 1. 调用退出接口
      // 2. 清空 Store 中的数据
      // 3. 清空 localStorage
      logout: async () => {
        try {
          await logoutApi();
        } finally {
          // 清空状态
          set({
            token: '',
            userInfo: null,
            menuTree: [],
            permissions: [],
            isAuthenticated: false,
          });
        }
      },

      // 检查是否有某个权限
      // 传入code 权限码，如 'sys:user:add'
      hasPermission: (code: string) => {
        const { permissions } = get();
        return permissions.includes(code);
      },

      // 检查是否有任一权限，传入codes权限码数组，如 ['sys:user:add', 'sys:user:edit']
      // 返回是否有至少一个权限
      hasAnyPermission: (codes: string[]) => {
        const { permissions } = get();
        return codes.some((code) => permissions.includes(code));
      },
    }),
    {
      // localStorage 的 key 名称
      name: 'auth-storage',
      storage: encryptedStorage as any, // 使用自定义加密存储
      // 只持久化这些字段（permissions 可以通过 menuTree 计算出来，不需要持久化）
      partialize: (state) => ({
        token: state.token,
        userInfo: state.userInfo,
        menuTree: state.menuTree,
        permissions: state.permissions,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
