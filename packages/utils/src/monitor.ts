export const initGlobalErrorMonitor = () => {
  // 捕获常规 JavaScript 运行时错误
  window.addEventListener('error', (event) => {
    console.error('[Global Error Caught]:', event.message);
  });

  // 捕获未处理的Promise rejection错误
  // Promise被reject但没有.catch()处理时触发
  window.addEventListener('unhandledrejection', (event) => {
    console.error('[Promise Rejection Caught]:', event.reason);
    event.preventDefault(); //阻止浏览器显示红色警告条
  });
};
