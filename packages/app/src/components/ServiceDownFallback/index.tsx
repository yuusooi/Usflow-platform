interface Props {
  onRetry?: () => void;
}

export function ServiceDownFallback({ onRetry }: Props) {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f5f5f5',
      }}
    >
      <h1>服务暂时不可用</h1>
      <p style={{ marginTop: '16px', color: '#666' }}>核心服务正在升级或网络异常，请稍后再试</p>
      <button
        onClick={onRetry}
        style={{
          marginTop: '24px',
          padding: '8px 24px',
          fontSize: '14px',
          cursor: 'pointer',
        }}
      >
        刷新重试
      </button>
    </div>
  );
}
