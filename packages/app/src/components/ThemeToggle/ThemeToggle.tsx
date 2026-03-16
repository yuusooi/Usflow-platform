import { useTheme } from '@/hooks/useTheme';

/**
 * 滑动式主题切换开关
 * 类似 iOS 风格的滑动按钮
 */
export function ThemeToggle() {
  const { mode, toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: 'relative',
        width: '68px',
        height: '34px',
        padding: '2px',
        border: 'none',
        borderRadius: '34px',
        background: isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        display: 'flex',
        alignItems: 'center',
      }}
      title={isDark ? '切换到亮色模式' : '切换到暗黑模式'}
    >
      {/* 太阳图标（左侧） */}
      <span
        style={{
          position: 'absolute',
          left: '8px',
          fontSize: '16px',
          opacity: isDark ? '0.3' : '1',
          transition: 'opacity 0.3s ease',
          zIndex: 1,
        }}
      >
        ☀️
      </span>

      {/* 月亮图标（右侧） */}
      <span
        style={{
          position: 'absolute',
          right: '8px',
          fontSize: '16px',
          opacity: isDark ? '1' : '0.3',
          transition: 'opacity 0.3s ease',
          zIndex: 1,
        }}
      >
        🌙
      </span>

      {/* 滑块 */}
      <div
        style={{
          position: 'absolute',
          left: isDark ? '36px' : '2px',
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          background: isDark ? '#4dabf7' : '#fff',
          boxShadow: isDark
            ? '0 2px 8px rgba(0, 0, 0, 0.4)'
            : '0 2px 8px rgba(0, 0, 0, 0.15)',
          transition: 'left 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* 滑块上的图标（可选） */}
        <span style={{ fontSize: '14px' }}>{isDark ? '🌙' : '☀️'}</span>
      </div>
    </button>
  );
}
