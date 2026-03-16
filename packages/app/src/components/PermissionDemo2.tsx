import { Button, Space, Alert, Card } from '@usflow/components';
import { Permission } from '@/components/Permission';

/**
 * 使用 Permission 组件的演示
 */
export function PermissionDemo2() {
  return (
    <div style={{ padding: '24px' }}>
      <h2>Permission 组件演示</h2>

      {/* 示例1：单个权限 */}
      <Card title="示例1：单个权限" style={{ marginBottom: '16px' }}>
        <Permission permission="sys:user:add">
          <Button type="primary">新增用户（需要 sys:user:add 权限）</Button>
        </Permission>

        <Permission permission="sys:user:edit">
          <Button>编辑用户（需要 sys:user:edit 权 限）</Button>
        </Permission>
      </Card>

      {/* 示例2：多个权限（任一即可） */}
      <Card title="示例2：多个权限（有任一权限即可）" style={{ marginBottom: '16px' }}>
        <Permission permission={['sys:user:add', 'sys:user:edit']} type="any">
          <Space>
            <Button type="primary">操作栏（需要新 增或编辑权限）</Button>
            <Button>其他操作</Button>
          </Space>
        </Permission>
      </Card>

      {/* 示例3：多个权限（需要所有） */}
      <Card title="示例3：多个权限（需要所有权限）" style={{ marginBottom: '16px' }}>
        <Permission permission={['sys:user:view', 'sys:user:export']} type="all">
          <Button type="primary" danger>
            批量导出（需要查看和导出权限）
          </Button>
        </Permission>
      </Card>

      {/* 示例4：自定义 fallback */}
      <Card title="示例4：自定义 fallback" style={{ marginBottom: '16px' }}>
        <Permission
          permission="sys:user:delete"
          fallback={<Alert message="您没有删除权限" type="warning" />}
        >
          <Button danger>删除用户</Button>
        </Permission>
      </Card>
    </div>
  );
}
