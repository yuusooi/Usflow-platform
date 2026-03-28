const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(express.json());

// 直接代理到 Vercel 的 Serverless Function
app.use('/api', createProxyMiddleware({
  target: 'https://usflow-platform.vercel.app',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api',
  },
}));

app.listen(PORT, () => {
  console.log(`Dev API proxy running at http://localhost:${PORT}`);
  console.log(`Proxying to: https://usflow-platform.vercel.app`);
});
