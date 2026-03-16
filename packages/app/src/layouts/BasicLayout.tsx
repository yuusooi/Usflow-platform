import { Outlet, useNavigate, Link } from 'react-router-dom';
import { Card } from '@usflow/components';
import { useAuthStore } from '@/store/useAuthStore';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { useEffect } from 'react';
import { useAppStore } from '@/store/useAppStore';
import { ServiceDownFallback } from '@/components/ServiceDownFallback';
import { useMessageStore } from '@/store/useMessageStore';
import { useRequest } from 'ahooks';
import { useTheme } from '@/hooks/useTheme';
import { ThemeToggle } from '@/components/ThemeToggle';

// 基础布局组件 包含侧边栏和顶部栏，用于主要页面
function BasicLayout() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { serviceUnavailable, setServiceUnavailable } = useAppStore();
  const { unreadCount } = useMessageStore();
  const { mode, toggleTheme, isDark } = useTheme();

  // 模拟轮询获取新消息
  useRequest(
    () => {
      // 这里模拟收到新消息
      const mockNewMessage = {
        id: Date.now().toString(),
        title: '新审批',
        content: '您有一条新的待审批申请',
        time: new Date().toLocaleString(),
        isRead: false,
      };

      // 随机模拟：30% 概率收到新消息
      if (Math.random() < 0.3) {
        const { addMessage } = useMessageStore.getState();
        addMessage(mockNewMessage);
      }

      return Promise.resolve();
    },
    {
      pollingInterval: 5000, // 每 5 秒轮询一次
      pollingWhenHidden: false, // 页面隐藏时不轮询，节省性能
    },
  );

  useEffect(() => {
    const handleServiceDown = () => {
      setServiceUnavailable(true);
    };

    const handleServiceUp = () => {
      setServiceUnavailable(false);
    };

    window.addEventListener('SERVICE_DOWN', handleServiceDown);
    window.addEventListener('SERVICE_UP', handleServiceUp);

    return () => {
      window.removeEventListener('SERVICE_DOWN', handleServiceDown);
      window.removeEventListener('SERVICE_UP', handleServiceUp);
    };
  }, [setServiceUnavailable]);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (serviceUnavailable) {
    return <ServiceDownFallback onRetry={() => setServiceUnavailable(false)} />;
  }

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'var(--bg-layout)',
        color: 'var(--text-main)',
      }}
    >
      {/* 侧边栏 */}
      <div
        style={{
          width: '240px',
          background: isDark ? '#202020' : '#001529',
          color: '#fff',
          padding: '24px 0',
          borderRight: isDark ? '1px solid var(--border-line)' : 'none',
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{ padding: '0 24px 24px', fontSize: '18px', fontWeight: 'bold' }}>
          Usflow 系统
        </div>
        <nav>
          {/* 菜单 - 使用 Link 而不是 a 标签 */}
          <div style={{ padding: '0 24px' }}>
            <Link
              to="/"
              style={{ color: '#fff', textDecoration: 'none', display: 'block', padding: '8px 0' }}
            >
              首页
            </Link>
            <Link
              to="/system/user"
              style={{ color: '#fff', textDecoration: 'none', display: 'block', padding: '8px 0' }}
            >
              用户管理
            </Link>
            <Link
              to="/system/role"
              style={{ color: '#fff', textDecoration: 'none', display: 'block', padding: '8px 0' }}
            >
              角色管理
            </Link>
            <Link
              to="/system/test-schema-form"
              style={{
                color: '#ffd700',
                textDecoration: 'none',
                display: 'block',
                padding: '8px 0',
              }}
            >
              SchemaForm 测试
            </Link>
            <Link
              to="/system/test-dependencies"
              style={{
                color: '#00ff00',
                textDecoration: 'none',
                display: 'block',
                padding: '8px 0',
              }}
            >
              Dependencies 测试
            </Link>
            <Link
              to="/system/leave-application"
              style={{
                color: '#00ff00',
                textDecoration: 'none',
                display: 'block',
                padding: '8px 0',
              }}
            >
              leave-application测试
            </Link>
            <Link
              to="/system/test-ProTable"
              style={{
                color: '#00ff00',
                textDecoration: 'none',
                display: 'block',
                padding: '8px 0',
              }}
            >
              ProTable测试
            </Link>
            <Link
              to="/system/user-list"
              style={{
                color: '#00ff00',
                textDecoration: 'none',
                display: 'block',
                padding: '8px 0',
              }}
            >
              user-list测试
            </Link>
            <Link
              to="/system/virtual-list-test"
              style={{
                color: '#00ff00',
                textDecoration: 'none',
                display: 'block',
                padding: '8px 0',
              }}
            >
              virtual-list测试
            </Link>
            <Link
              to="/system/flow-design"
              style={{
                color: '#00ff00',
                textDecoration: 'none',
                display: 'block',
                padding: '8px 0',
              }}
            >
              flow-design测试
            </Link>
            <Link
              to="/system/error-test"
              style={{
                color: '#ff0000',
                textDecoration: 'none',
                display: 'block',
                padding: '8px 0',
              }}
            >
              错误捕获测试
            </Link>
            <Link
              to="/system/service-down-test"
              style={{
                color: '#ff6600',
                textDecoration: 'none',
                display: 'block',
                padding: '8px 0',
              }}
            >
              服务降级测试
            </Link>
            <Link
              to="/system/task-center"
              style={{
                color: '#ff6600',
                textDecoration: 'none',
                display: 'block',
                padding: '8px 0',
              }}
            >
              任务中心测试
            </Link>
          </div>
        </nav>
      </div>

      {/* 主体内容区 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* 顶部栏 */}
        <div
          style={{
            height: '64px',
            background: 'var(--bg-container)',
            borderBottom: '1px solid var(--border-line)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            transition: 'all 0.3s ease',
          }}
        >
          <div style={{ fontSize: '16px', fontWeight: 500 }}>欢迎使用 Usflow 系统</div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* 消息通知角标 */}
            <div
              style={{
                position: 'relative',
                display: 'inline-block',
                cursor: 'pointer',
                padding: '4px',
              }}
            >
              <span style={{ fontSize: '18px' }}>🔔</span>
              {unreadCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    background: 'red',
                    color: '#fff',
                    borderRadius: '10px',
                    padding: '2px 6px',
                    fontSize: '12px',
                    minWidth: '18px',
                    textAlign: 'center',
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </div>

            {/* 主题切换滑块 */}
            <ThemeToggle />

            <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>管理员</span>

            <button
              style={{
                padding: '6px 12px',
                border: '1px solid var(--border-line)',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-container)',
                color: 'var(--text-main)',
                cursor: 'pointer',
                fontSize: '13px',
                transition: 'all 0.3s ease',
              }}
              onClick={handleLogout}
            >
              退出
            </button>
          </div>
        </div>

        {/* 内容区 */}
        <div style={{ flex: 1, padding: '24px', overflow: 'auto' }}>
          <Card>
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default BasicLayout;
