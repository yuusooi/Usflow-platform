import { useState } from 'react';
import { request } from '@usflow/utils';

function ServiceDownTest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>('');

  const trigger500Error = async () => {
    setLoading(true);
    setResult('');

    try {
      await request.get('/test-500');
      setResult('请求成功，没有触发 500 错误');
    } catch (error) {
      setResult(`捕获到错误: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  const triggerNormalRequest = async () => {
    setLoading(true);
    setResult('');

    try {
      await request.get('/test-normal');
      setResult('请求成功，服务正常');
    } catch (error) {
      setResult(`捕获到错误: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1>服务降级测试页面</h1>

      <div style={{ marginBottom: '16px' }}>
        <button onClick={trigger500Error} disabled={loading} style={{ marginRight: '16px' }}>
          {loading ? '请求中...' : '触发 500 错误'}
        </button>

        <button onClick={triggerNormalRequest} disabled={loading}>
          {loading ? '请求中...' : '发送正常请求'}
        </button>
      </div>

      {result && (
        <div
          style={{
            padding: '12px',
            background: '#f5f5f5',
            borderRadius: '4px',
          }}
        >
          {result}
        </div>
      )}

      <div style={{ marginTop: '24px' }}>
        <h3>测试说明：</h3>
        <ul>
          <li>点击"触发 500 错误"会请求一个不存在的接口，模拟 500 错误</li>
          <li>触发 500 错误后，应该会看到服务降级 UI（全屏提示）</li>
          <li>点击"刷新重试"可以恢复到正常状态</li>
        </ul>
      </div>
    </div>
  );
}

export default ServiceDownTest;
