import { ProTable } from '@/components/ProTable';
import type { ProTableRef } from '@/components/ProTable';
import type { PageResult } from '@/components/ProTable';
import { Tag, Button, Space } from '@usflow/components';
import { message } from 'antd';
import React, { useRef } from 'react';

// 定义用户数据类型
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  status: number;
  role: string;
}

// 模拟 API 请求函数
const fetchUserList = async (params: {
  current: number;
  pageSize: number;
}): Promise<PageResult<User>> => {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 500));

  // 生成模拟数据
  const total = 100;
  const start = (params.current - 1) * params.pageSize;
  const end = start + params.pageSize;

  const list: User[] = [];
  for (let i = start; i < end && i < total; i++) {
    list.push({
      id: i + 1,
      name: `用户${i + 1}`,
      email: `user${i + 1}@example.com`,
      age: 20 + (i % 40),
      status: i % 3 === 0 ? 1 : 0,
      role: i % 3 === 0 ? '管理员' : i % 3 === 1 ? '编辑' : '访客',
    });
  }

  return {
    list,
    total,
  };
};

// 定义表格列配置
const columns = [
  {
    title: 'ID',
    dataIndex: 'id', // 直接写字符串
    width: 80,
  },
  {
    title: '姓名',
    dataIndex: 'name', // 直接写字符串
    width: 120,
  },
  {
    title: '邮箱',
    dataIndex: 'email', // 直接写字符串
    width: 200,
  },
  {
    title: '年龄',
    dataIndex: 'age', // 直接写字符串
    width: 80,
  },
  {
    title: '状态',
    dataIndex: 'status', // 直接写字符串
    width: 100,
    render: (status: number) => {
      if (status === 1) {
        return <Tag color="success">活跃</Tag>;
      }
      return <Tag color="warning">禁用</Tag>;
    },
  },
  {
    title: '角色',
    dataIndex: 'role',
    width: 100,
  },
  {
    title: '操作',
    width: 200,
    render: (_: any, record: User) => (
      <Space>
        <Button type="primary" size="small" onClick={() => console.log('编辑', record.id)}>
          编辑
        </Button>
        <Button status="danger" size="small" onClick={() => console.log('删除', record.id)}>
          删除
        </Button>
      </Space>
    ),
  },
];

// 用户列表组件
function UserList() {
  const tableRef = useRef<ProTableRef>(null);

  return (
    <div style={{ padding: '24px' }}>
      <h1>用户列表</h1>
      <ProTable ref={tableRef} request={fetchUserList} columns={columns} rowKey="id" />
    </div>
  );
}

export default UserList;
