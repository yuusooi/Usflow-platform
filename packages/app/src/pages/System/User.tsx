import { Button, Table, Space } from '@usflow/components';
import { AuthCode } from '@/components/AuthCode';
import { useAuthStore } from '@/store/useAuthStore';

function User() {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: '用户名', dataIndex: 'username', key: 'username' },
    { title: '真实姓名', dataIndex: 'realName', key: 'realName' },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space>
          <AuthCode code="system:user:edit">
            <Button type="link">编辑</Button>
          </AuthCode>

          <AuthCode code="system:user:delete">
            <Button type="link" danger>
              删除
            </Button>
          </AuthCode>
        </Space>
      ),
    },
  ];

  const data = [
    { id: 1, username: 'admin', realName: '管理员', key: '1' },
    { id: 2, username: 'user1', realName: '用户1', key: '2' },
    { id: 3, username: 'user2', realName: '用户2', key: '3' },
  ];

  return (
    <div>
      {/* 测试按钮区域 */}
      <div
        style={{
          marginBottom: '16px',
          padding: '16px',
          background: '#f0f0f0',
          borderRadius: '4px',
        }}
      >
        <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>权限测试（开发用）：</div>
        <Space>
          <Button
            size="small"
            onClick={() => {
              useAuthStore.setState({
                token: 'mock_token_admin',
                userInfo: { id: 1, username: 'admin', realName: '管理员' },
                menuTree: [
                  { code: 'dashboard:view', name: '控制台' },
                  { code: 'system:user:view', name: '用户查看' },
                  { code: 'system:user:add', name: '用户新增' },
                  { code: 'system:user:edit', name: '用户编辑' },
                  { code: 'system:user:delete', name: '用户删除' },
                  { code: 'system:role:view', name: '角色查看' },
                  { code: 'system:role:add', name: '角色新增' },
                  { code: 'system:role:edit', name: '角色编辑' },
                  { code: 'system:role:delete', name: '角色删除' },
                ],
                permissions: [
                  'dashboard:view',
                  'system:user:view',
                  'system:user:add',
                  'system:user:edit',
                  'system:user:delete',
                  'system:role:view',
                  'system:role:add',
                  'system:role:edit',
                  'system:role:delete',
                ],
                isAuthenticated: true,
              });
            }}
          >
            模拟管理员登录
          </Button>

          <Button
            size="small"
            onClick={() => {
              useAuthStore.setState({
                token: 'mock_token_editor',
                userInfo: { id: 2, username: 'editor', realName: '编辑员' },
                menuTree: [
                  { code: 'system:user:view', name: '用户查看' },
                  { code: 'system:user:edit', name: '用户编辑' },
                ],
                permissions: ['system:user:view', 'system:user:edit'],
                isAuthenticated: true,
              });
            }}
          >
            模拟编辑员登录
          </Button>

          <Button
            size="small"
            onClick={() => {
              useAuthStore.setState({
                token: 'mock_token_viewer',
                userInfo: { id: 3, username: 'viewer', realName: '查看员' },
                menuTree: [{ code: 'system:user:view', name: '用户查看' }],
                permissions: ['system:user:view'],
                isAuthenticated: true,
              });
            }}
          >
            模拟查看员登录
          </Button>

          <Button
            size="small"
            danger
            onClick={() =>
              useAuthStore.setState({
                token: '',
                userInfo: null,
                menuTree: [],
                permissions: [],
                isAuthenticated: false,
              })
            }
          >
            退出登录
          </Button>
        </Space>
      </div>

      {/* 新增用户按钮 */}
      <div style={{ marginBottom: '16px' }}>
        <AuthCode code="system:user:add">
          <Button type="primary">新增用户</Button>
        </AuthCode>
      </div>

      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default User;
