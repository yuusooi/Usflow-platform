import { useState } from 'react';

function ErrorTest() {
  const [shouldCrash, setShouldCrash] = useState(false);

  if (shouldCrash) {
    throw new Error('这是一个故意的渲染错误');
  }

  const handleAsyncError = () => {
    setTimeout(() => {
      throw new Error('这是一个异步错误，ErrorBoundary 抓不到');
    }, 100);
  };

  const handlePromiseRejection = () => {
    Promise.reject('这是一个 Promise rejection，ErrorBoundary 也抓不到');
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1>错误捕获测试页面</h1>

      <div style={{ marginBottom: '16px' }}>
        <button onClick={() => setShouldCrash(true)} style={{ marginRight: '16px' }}>
          触发渲染错误
        </button>
        <button onClick={handleAsyncError} style={{ marginRight: '16px' }}>
          触发异步错误
        </button>
        <button onClick={handlePromiseRejection}>触发 Promise rejection</button>
      </div>

      <div>
        <h3>测试说明：</h3>
        <ul>
          <li>渲染错误：会被 ErrorBoundary 捕获，页面显示错误 UI</li>
          <li>异步错误：会被全局监控捕获，控制台打印错误</li>
          <li>Promise rejection：会被全局监控捕获，控制台打印错误</li>
        </ul>
      </div>
    </div>
  );
}

export default ErrorTest;
