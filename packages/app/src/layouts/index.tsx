import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Layout, Menu, Breadcrumb, Avatar, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import {
  HomeOutlined,
  FileTextOutlined,
  AuditOutlined,
  AppstoreOutlined,
  TeamOutlined,
  HistoryOutlined,
  ExperimentOutlined,
  SettingOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import { ThemeToggle } from '@/components/ThemeToggle';
import { menuConfig, getMenuKeyByPath, menuKeyToPath } from './menuConfig';
import { useAuthStore } from '@/store/useAuthStore';

const { Header, Sider, Content } = Layout;

// 图标组件映射
const IconMap = {
  HomeOutlined,
  FileTextOutlined,
  AuditOutlined,
  AppstoreOutlined,
  TeamOutlined,
  HistoryOutlined,
  ExperimentOutlined,
  SettingOutlined,
  ThunderboltOutlined,
  CheckCircleOutlined,
};

// 将配置转换为 Ant Design Menu 需要的格式（带 React 组件图标）
const menuItems: MenuProps['items'] = menuConfig.map((item) => {
  const IconComponent = IconMap[item.iconName as keyof typeof IconMap];
  return {
    key: item.key,
    label: item.label,
    icon: IconComponent ? <IconComponent /> : undefined,
    children: item.children?.map((child) => {
      const ChildIconComponent = IconMap[child.iconName as keyof typeof IconMap];
      return {
        key: child.key,
        label: child.label,
        icon: ChildIconComponent ? <ChildIconComponent /> : undefined,
      };
    }),
  };
});

/**
 * 极简主布局骨架 (Master Layout) - Notion 风格
 *
 * 三大区域：
 * - Sider: 侧边栏 240px，极简风格
 * - Header: 顶部导航 52px，面包屑 + 用户信息
 * - Content: 内容区 max-width 1200px 居中
 */
export default function MasterLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, userInfo } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>(['workspace', 'audit']);

  // 根据当前路由自动高亮菜单
  useEffect(() => {
    const menuKey = getMenuKeyByPath(location.pathname);
    if (menuKey) {
      setSelectedKeys([menuKey]);

      // 自动展开父菜单
      const parentMenu = menuItems?.find((item) =>
        item && 'children' in item && item.children?.some((child) => child && child.key === menuKey)
      );
      if (parentMenu && !openKeys.includes(parentMenu.key as string)) {
        // 使用 setTimeout 避免同步调用 setState
        setTimeout(() => {
          setOpenKeys([...openKeys, parentMenu.key as string]);
        }, 0);
      }
    }
  }, [location.pathname, openKeys]);

  // 菜单点击处理
  const handleMenuSelect: MenuProps['onSelect'] = ({ key }) => {
    const path = menuKeyToPath[key];
    if (path) {
      navigate(path);
    }
  };

  // 子菜单展开/收起处理
  const handleMenuOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys(keys as string[]);
  };

  // 用户下拉菜单
  const userMenuItems: MenuProps['items'] = [
    { key: 'logout', label: '退出登录', danger: true },
  ];

  const handleUserMenuClick: MenuProps['onClick'] = async ({ key }) => {
    if (key === 'logout') {
      try {
        await logout();
      } catch (_error) {
        // API 失败不影响退出，手动清空本地状态
        useAuthStore.setState({
          token: '',
          userInfo: null,
          menuTree: [],
          permissions: [],
          isAuthenticated: false,
        });
      }
      // 强制跳转到登录页
      window.location.href = '/login';
    }
  };

  return (
    <Layout style={{ height: '100vh', overflow: 'hidden' }}>
      {/* 左侧侧边栏 */}
      <Sider
        width={240}
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{
          background: 'var(--bg-container, #ffffff)',
          borderRight: '1px solid var(--border-line, #f0f0f0)',
          overflow: 'auto',
        }}
        trigger={null}
      >
        {/* Logo 区域 */}
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: collapsed ? 'center' : 'flex-start',
            padding: collapsed ? 0 : '0 24px',
            borderBottom: '1px solid var(--border-line, #f0f0f0)',
          }}
        >
          <div
            style={{
              fontSize: collapsed ? 20 : 18,
              fontWeight: 600,
              color: 'var(--text-main, #262626)',
              whiteSpace: 'nowrap',
            }}
          >
            {collapsed ? 'U' : 'UsFlow'}
          </div>
        </div>

        {/* 菜单 */}
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={handleMenuOpenChange}
          onSelect={handleMenuSelect}
          items={menuItems}
          style={{
            background: 'transparent',
            borderRight: 'none',
            paddingTop: 8,
          }}
          // Notion 极简风格主题覆盖
          theme={{
            token: {
              colorBgContainer: 'transparent',
              colorItemBg: 'transparent',
              colorItemBgSelected: 'var(--bg-hover, #f5f5f5)',
              colorItemText: 'var(--text-main, #262626)',
              colorItemTextSelected: 'var(--text-main, #262626)',
              colorItemTextSelectedHorizontal: 'var(--text-main, #262626)',
              fontWeight: 400,
              controlHeightSM: 36,
            },
          } as any}
        />
      </Sider>

      {/* 右侧主体区域 */}
      <Layout>
        {/* 顶部导航栏 */}
        <Header
          style={{
            height: 52,
            background: 'var(--bg-container, #ffffff)',
            borderBottom: '1px solid var(--border-line, #f0f0f0)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
          }}
        >
          {/* 左侧：折叠按钮 + 面包屑 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={() => setCollapsed(!collapsed)}
              style={{
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontSize: 16,
                color: 'var(--text-main, #262626)',
                padding: 4,
              }}
            >
              {collapsed ? '→' : '←'}
            </button>
            <Breadcrumb
              style={{ fontSize: 14 }}
              items={[
                { title: '首页' },
                selectedKeys[0] &&
                  menuItems?.flatMap((item) => 'children' in item ? item.children || [] : [item])
                    .find((item) => item && 'label' in item && item.key === selectedKeys[0])?.label,
              ].filter(Boolean)}
            />
          </div>

          {/* 右侧：主题切换 + 用户头像 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <ThemeToggle />

            <Dropdown
              menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
              placement="bottomRight"
              trigger={['click']}
            >
              <Avatar
                style={{
                  cursor: 'pointer',
                  backgroundColor: 'var(--primary-color, #1890ff)',
                }}
              >
                {userInfo?.realName?.charAt(0) || 'A'}
              </Avatar>
            </Dropdown>
          </div>
        </Header>

        {/* 内容区 */}
        <Content
          style={{
            flex: 1,
            overflow: 'auto',
            background: 'var(--bg-layout, #f5f5f5)',
          }}
        >
          <div className="page-container">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
