import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';

/**
 * 极简主布局骨架 (Master Layout)
 *
 * 三大区域：
 * - Sidebar: 侧边栏 240px
 * - Header: 顶部导航 52px
 * - Content: 内容区 居中最大宽度 1200px
 */
export default function MasterLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={masterLayoutStyle}>
      {/* 侧边栏 Sidebar */}
      <aside style={sidebarStyle}>
        <div style={logoStyle}>
          {collapsed ? 'U' : 'Usflow'}
        </div>

        {/* 菜单列表 */}
        <nav style={menuStyle}>
          <MenuItem to="/">首页</MenuItem>
          <MenuItem to="/system/user">用户管理</MenuItem>
          <MenuItem to="/system/role">角色管理</MenuItem>
          <MenuItem to="/system/permission">权限管理</MenuItem>
          <MenuItem to="/system/test-schema-form" color="#ffd700">SchemaForm 测试</MenuItem>
          <MenuItem to="/system/test-dependencies" color="#00ff00">Dependencies 测试</MenuItem>
          <MenuItem to="/system/leave-application" color="#00ff00">Leave Application 测试</MenuItem>
          <MenuItem to="/system/test-protable" color="#00ff00">ProTable 测试</MenuItem>
          <MenuItem to="/system/user-list" color="#00ff00">User List 测试</MenuItem>
          <MenuItem to="/system/virtual-list-test" color="#00ff00">Virtual List 测试</MenuItem>
          <MenuItem to="/system/flow-design" color="#00ff00">Flow Design 测试</MenuItem>
          <MenuItem to="/system/error-test" color="#ff0000">错误捕获测试</MenuItem>
          <MenuItem to="/system/service-down-test" color="#ff6600">服务降级测试</MenuItem>
          <MenuItem to="/system/task-center" color="#ff6600">任务中心测试</MenuItem>
        </nav>
      </aside>

      {/* 主体区域 */}
      <div style={mainStyle}>
        {/* 顶部导航 Header */}
        <header style={headerStyle}>
          <div style={headerLeftStyle}>
            <button
              onClick={() => setCollapsed(!collapsed)}
              style={collapseButtonStyle}
            >
              {collapsed ? '→' : '←'}
            </button>
          </div>

          <div style={headerRightStyle}>
            <ThemeToggle />
            <span style={usernameStyle}>管理员</span>
            <button style={logoutButtonStyle}>退出</button>
          </div>
        </header>

        {/* 内容区 Content */}
        <main style={contentStyle}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

/* 菜单项组件 */
function MenuItem({ to, children, color }: { to: string; children: React.ReactNode; color?: string }) {
  return (
    <a
      href={to}
      style={{
        display: 'block',
        padding: '12px 16px',
        color: color || 'var(--text-main)',
        textDecoration: 'none',
        borderRadius: '6px',
        transition: 'background-color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--bg-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      {children}
    </a>
  );
}

/* ===== 样式定义 ===== */

/* 主容器：固定高度，flex 布局 */
const masterLayoutStyle: React.CSSProperties = {
  display: 'flex',
  height: '100vh',
  overflow: 'hidden',
  backgroundColor: 'var(--bg-layout)',
};

/* 侧边栏：240px 宽度，背景色差区分 */
const sidebarStyle: React.CSSProperties = {
  width: '240px',
  height: '100%',
  backgroundColor: 'var(--bg-layout)',
  borderRight: 'none',
  display: 'flex',
  flexDirection: 'column',
  padding: '16px',
  transition: 'all 0.3s ease',
};

/* Logo 区域 */
const logoStyle: React.CSSProperties = {
  fontSize: '20px',
  fontWeight: 'bold',
  color: 'var(--text-main)',
  marginBottom: '24px',
  padding: '0 8px',
};

/* 菜单容器 */
const menuStyle: React.CSSProperties = {
  flex: 1,
  overflowY: 'auto',
};

/* 主体区域：flex-1 占满剩余空间 */
const mainStyle: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
};

/* 顶部导航：52px 高度，底边框 */
const headerStyle: React.CSSProperties = {
  height: '52px',
  backgroundColor: 'var(--bg-container)',
  borderBottom: '1px solid var(--border-line)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 24px',
  flexShrink: 0,
};

/* Header 左侧 */
const headerLeftStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

/* 折叠按钮 */
const collapseButtonStyle: React.CSSProperties = {
  padding: '6px 12px',
  border: '1px solid var(--border-line)',
  borderRadius: '6px',
  background: 'var(--bg-container)',
  color: 'var(--text-main)',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'all 0.2s ease',
};

/* Header 右侧 */
const headerRightStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

/* 用户名 */
const usernameStyle: React.CSSProperties = {
  fontSize: '14px',
  color: 'var(--text-secondary)',
};

/* 退出按钮 */
const logoutButtonStyle: React.CSSProperties = {
  padding: '6px 16px',
  border: '1px solid var(--border-line)',
  borderRadius: '6px',
  background: 'var(--bg-container)',
  color: 'var(--text-main)',
  cursor: 'pointer',
  fontSize: '13px',
  transition: 'all 0.2s ease',
};

/* 内容区：padding + 最大宽度居中 */
const contentStyle: React.CSSProperties = {
  flex: 1,
  overflowY: 'auto',
  padding: '24px 40px',
  backgroundColor: 'var(--bg-layout)', // 与主背景一致
};
