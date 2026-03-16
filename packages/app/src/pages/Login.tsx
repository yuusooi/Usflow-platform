import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button, Input, Card, Space } from '@usflow/components'
import { useAuthStore } from '@/store/useAuthStore'
import { useAppStore } from '@/store/useAppStore'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuthStore()
  const { setServiceUnavailable } = useAppStore()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      // 调用登录接口
      await login({ username, password })

      // 登录成功后跳转：
      // 1. 如果有来源地址（从 Guard 重定向过来的），跳转回去
      // 2. 否则跳转到首页
      const from = (location.state as any)?.from?.pathname || '/'
      navigate(from, { replace: true })
    } catch (error) {
      console.error('登录失败:', error)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'gray',
      }}
    >
      <Card style={{ width: '500px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '24px' }}>登录</h1>

        {/* 正常登录表单 */}
        <div style={{ marginBottom: '16px' }}>
          <label>用户名：</label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="请输入用户名"
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label>密码：</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="请输入密码"
          />
        </div>

        <Button type="primary" onClick={handleLogin} style={{ width: '100%', marginBottom: '24px' }}>
          登录
        </Button>

        {/* 分隔线 */}
        <div style={{ borderTop: '1px solid #ccc', margin: '24px 0' }}></div>

        {/* 模拟登录（开发测试用） */}
        <div style={{ marginBottom: '16px', fontWeight: 'bold', color: '#666' }}>
          快速模拟登录（开发测试用）：
        </div>

        <Space direction="vertical" style={{ width: '100%' }}>
          <Button
            style={{ width: '100%' }}
            onClick={() => {
              // 重置服务降级状态
              setServiceUnavailable(false);
              useAuthStore.setState({
                token: 'mock_token_admin',
                userInfo: { id: 1, username: 'admin', realName: '管理员' },
                menuTree: [
                  { code: 'dashboard:view', name: '控制台' },
                  { code: 'system:view', name: '系统管理' },
                  { code: 'system:user:view', name: '用户查看' },
                  { code: 'system:user:add', name: '用户新增' },
                  { code: 'system:user:edit', name: '用户编辑' },
                  { code: 'system:user:delete', name: '用户删除' },
                  { code: 'system:role:view', name: '角色管理' },
                  { code: 'system:permission:view', name: '权限管理' },
                ],
                permissions: [
                  'dashboard:view',
                  'system:view',
                  'system:user:view',
                  'system:user:add',
                  'system:user:edit',
                  'system:user:delete',
                  'system:role:view',
                  'system:permission:view',
                ],
                isAuthenticated: true,
              });
              // 延迟跳转，确保状态已更新并保存到 localStorage
              setTimeout(() => navigate('/system/user'), 200);
            }}
          >
            模拟管理员登录（所有权限）
          </Button>

          <Button
            style={{ width: '100%' }}
            onClick={() => {
              useAuthStore.setState({
                token: 'mock_token_editor',
                userInfo: { id: 2, username: 'editor', realName: '编辑员' },
                menuTree: [
                  { code: 'dashboard:view', name: '控制台' },
                  { code: 'system:view', name: '系统管理' },
                  { code: 'system:user:view', name: '用户查看' },
                  { code: 'system:user:edit', name: '用户编辑' },
                ],
                permissions: [
                  'dashboard:view',
                  'system:view',
                  'system:user:view',
                  'system:user:edit',
                ],
                isAuthenticated: true,
              });
              setTimeout(() => navigate('/system/user'), 200);
            }}
          >
            模拟编辑员登录（查看+编辑）
          </Button>

          <Button
            style={{ width: '100%' }}
            onClick={() => {
              useAuthStore.setState({
                token: 'mock_token_viewer',
                userInfo: { id: 3, username: 'viewer', realName: '查看员' },
                menuTree: [
                  { code: 'dashboard:view', name: '控制台' },
                  { code: 'system:view', name: '系统管理' },
                  { code: 'system:user:view', name: '用户查看' },
                ],
                permissions: [
                  'dashboard:view',
                  'system:view',
                  'system:user:view',
                ],
                isAuthenticated: true,
              });
              setTimeout(() => navigate('/system/user'), 200);
            }}
          >
            模拟查看员登录（仅查看）
          </Button>
        </Space>
      </Card>
    </div>
  )
}

export default Login
