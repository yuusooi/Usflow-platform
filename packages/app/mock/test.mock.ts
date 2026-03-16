import { defineMock } from 'vite-plugin-mock-dev-server';

export default defineMock([
  // 模拟 500 错误
  {
    url: '/api/test-500',
    method: 'GET',
    status: 500,
    body: {
      error: '内部服务器错误',
    },
  },

  // 模拟正常请求
  {
    url: '/api/test-normal',
    method: 'GET',
    body: {
      code: 200,
      message: '请求成功',
      data: {
        name: '测试数据',
      },
    },
  },
]);
