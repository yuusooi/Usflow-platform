import { defineMock } from 'vite-plugin-mock-dev-server';

export default defineMock([
  {
    url: '/api/process-definitions',
    method: 'POST',
    body: (req: any) => {
      // 接收编译后的流程定义 DSL
      return {
        code: 200,
        message: '保存成功',
        data: req.body,
      };
    },
  },
]);
