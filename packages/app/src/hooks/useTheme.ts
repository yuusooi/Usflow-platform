import { useEffect } from 'react';
import { useThemeStore } from '@/store/useThemeStore';

/**
 * 主题切换 Hook
 *
 * 功能：
 * 1. 自动应用主题到 HTML 根元素（data-theme 属性）
 * 2. 提供主题切换方法
 * 3. 组件挂载时自动恢复已保存的主题
 *
 * 使用示例：
 * ```tsx
 * function App() {
 *   useTheme();
 *   return <div>...</div>;
 * }
 * ```
 */
export function useTheme() {
  const mode = useThemeStore((state) => state.mode);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  useEffect(() => {
    const root = document.documentElement;

    root.setAttribute('data-theme', mode);
  }, [mode]);

  return {
    mode,
    toggleTheme,
    isDark: mode === 'dark',
  };
}
