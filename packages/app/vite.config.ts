import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { mockDevServerPlugin } from 'vite-plugin-mock-dev-server';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mockDevServerPlugin(),
    visualizer({ open: true, gzipSize: true, brotliSize: true }),
  ],
  // 拆包
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 只剥离 React 核心底层
            if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
              return 'vendor-react';
            }
            // 剥离reactflow业务库，特定路由使用
            if (id.includes('reactflow')) {
              return 'vendor-reactflow';
            }
          }
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9999', // 不真实请求
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
