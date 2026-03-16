import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * 主题模式类型
 */
export type ThemeMode = 'light' | 'dark';

/**
 * 主题状态接口
 */
interface ThemeState {
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

/**
 * 主题状态管理 Store
 *
 * 功能：
 * 1. 管理当前主题模式（light/dark）
 * 2. 提供切换主题的方法
 * 3. 使用 localStorage 持久化主题偏好
 * 4. 页面刷新后自动恢复上次选择的主题
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'light',

      toggleTheme: () =>
        set((state) => {
          const newMode: ThemeMode = state.mode === 'light' ? 'dark' : 'light';
          return { mode: newMode };
        }),

      setTheme: (mode: ThemeMode) => set({ mode }),
    }),
    {
      name: 'usflow-theme-storage',
      version: 1,
    }
  )
);
