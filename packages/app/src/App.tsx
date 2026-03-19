import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import 'antd/dist/reset.css';
import { createDynamicRouter } from '@/router';
import { useThemeStore } from '@/store/useThemeStore';

// 引入主题 CSS
import '@/styles/theme.css';
import '@/styles/theme-bridge.css';

function App() {
  const router = createDynamicRouter();
  const mode = useThemeStore((state) => state.mode);

  // 同步主题到 HTML 根元素，触发组件库的暗黑模式
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  return (
    <ConfigProvider
      theme={{
        // 根据 mode 选择 Antd 算法
        algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,

        token: {
          // 圆角与字体，双主题通用
          borderRadius: 4, // 对应组件库的 --border-radius-md
          fontFamily: `ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif`,

          // 动态色彩注入，备份组件库的variables.css

          // 品牌与强调色系
          colorPrimary: mode === 'dark' ? '#4dabf7' : '#2383e2', // 对应 --color-primary
          colorTextBase: mode === 'dark' ? 'rgba(255, 255, 255, 0.85)' : '#37352f', // 对应 --text-color

          // 页面大背景（对应 --bg-color）
          colorBgLayout: mode === 'dark' ? '#191919' : '#ffffff',

          // 组件背景：卡片、弹窗等（对应 --component-bg）
          colorBgContainer: mode === 'dark' ? '#2f2f2f' : '#ffffff',
          colorBgElevated: mode === 'dark' ? '#2f2f2f' : '#ffffff',
          colorBgSpotlight:
            mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(55, 53, 47, 0.04)',

          // 边框颜色（对应 --border-color）
          colorBorder: mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(55, 53, 47, 0.16)',
          colorBorderSecondary:
            mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(55, 53, 47, 0.16)',

          // 文本颜色
          colorText: mode === 'dark' ? 'rgba(255, 255, 255, 0.85)' : '#37352f',
          colorTextSecondary:
            mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(55, 53, 47, 0.65)',
          colorTextTertiary:
            mode === 'dark' ? 'rgba(255, 255, 255, 0.45)' : 'rgba(55, 53, 47, 0.5)',
          colorTextQuaternary:
            mode === 'dark' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(55, 53, 47, 0.25)',

          // 状态色系（对应组件库的状态色）
          colorError: mode === 'dark' ? '#ea7271' : '#e03e3e',
          colorSuccess: '#0f7b6c',
          colorInfo: '#1890ff',
          colorWarning: '#d9730d',
        },

        // 针对特定组件的精准覆写
        components: {
          Table: {
            headerBg: mode === 'dark' ? '#2f2f2f' : '#ffffff',
            headerColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.85)' : '#37352f',
            colorBgContainer: mode === 'dark' ? '#2f2f2f' : '#ffffff',
          },
          Modal: {
            contentBg: mode === 'dark' ? '#2f2f2f' : '#ffffff',
            headerBg: mode === 'dark' ? '#2f2f2f' : '#ffffff',
          },
          Drawer: {
            colorBgElevated: mode === 'dark' ? '#2f2f2f' : '#ffffff',
          },
          Input: {
            colorBgContainer: mode === 'dark' ? '#2f2f2f' : '#ffffff',
            colorBorder: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(55, 53, 47, 0.4)',
          },
          Select: {
            colorBgContainer: mode === 'dark' ? '#2f2f2f' : '#ffffff',
            colorBorder: mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(55, 53, 47, 0.4)',
          },
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
