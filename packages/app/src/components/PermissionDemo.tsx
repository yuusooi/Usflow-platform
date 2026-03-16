import { Button, Space, Alert } from '@usflow/components';
import { hasPermission, hasAnyPermission, hasAllPermissions } from '@/utils/permission';

/**
 * 权限控制演示组件
 * 演示如何使用权限判断工具函数控制按钮显示
 */
export function PermissionDemo() {
  return (
    <div style={{ padding: '24px' }}>
      <h2>权限控制演示</h2>

      {/* 示例1：单个权限判断 */}
      <Alert
        message="示例1：单个权限判断"
        description="只有拥有 sys:user:add 权限的 用户才能看到'新增用户'按钮"
        type="info"
        style={{ marginBottom: '16px' }}
      />

      <Space>
        {hasPermission('sys:user:add') && <Button type="primary">新增用户</Button>}

        {hasPermission('sys:user:edit') && <Button>编辑用户</Button>}

        {hasPermission('sys:user:delete') && <Button danger>删除用户</Button>}
      </Space>

      {/* 示例2：判断是否有任一权限 */}
      <Alert
        message="示例2：判断是否有任一权限"
        description="拥有'新增'或'编辑'权限时，显 示操作栏"
        type="info"
        style={{ marginBottom: '16px', marginTop: '24px' }}
      />

      {hasAnyPermission(['sys:user:add', 'sys:user:edit']) && (
        <Space>
          <Button type="primary">操作栏（有新增或 编辑权限）</Button>
        </Space>
      )}

      {/* 示例3：判断是否有所有权限 */}
      <Alert
        message="示例3：判断是否有所有权限"
        description="同时拥有'查看'和'导出'权限时 ，显示批量操作按钮"
        type="info"
        style={{ marginBottom: '16px', marginTop: '24px' }}
      />

      {hasAllPermissions(['sys:user:view', 'sys:user:export']) && (
        <Button type="primary">批量导出（需要查看 和导出权限）</Button>
      )}

      {/* 示例4：没有权限时的提示 */}
      {!hasPermission('sys:user:add') &&
        !hasPermission('sys:user:edit') &&
        !hasPermission('sys:user:delete') && (
          <Alert
            message="暂无权限"
            description="您没有用户管理相关的操作权 限"
            type="warning"
            style={{ marginTop: '24px' }}
          />
        )}
    </div>
  );
}
