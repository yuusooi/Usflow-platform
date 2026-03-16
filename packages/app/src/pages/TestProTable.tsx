import React, { useRef, useState, useCallback } from 'react';
// 导入 ProTable 组件
import { ProTable } from '@/components/ProTable';
// 导入 ProTable 的类型
import type { ProTableRef } from '@/components/ProTable';
// 导入 Ant Design 的组件（用于按钮等）
import { Button, Space, message } from 'antd';
// 导入 ProTable 的类型定义
import type { PageResult } from '@/components/ProTable';

// 定义用户数据的类型
interface User {
  id: number;
  name: string;
  age: number;
  email: string;
  role: string;
}

// 测试页面组件
function TestProTable() {
  // 创建 ref，用于调用 ProTable 的方法
  const tableRef = useRef<ProTableRef>(null);

  // 定义表格列配置
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '年龄',
      dataIndex: 'age',
      width: 80,
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 200,
    },
    {
      title: '角色',
      dataIndex: 'role',
      width: 120,
    },
  ];

  // 定义数据请求函数
  // 用 useCallback 缓存 request 函数，避免每次渲染 都重新创建
  const request = useCallback(
    async (params: { current: number; pageSize: number }): Promise<PageResult<User>> => {
      // 模拟网络延迟（500毫秒）
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 生成模拟数据
      const total = 100;
      const start = (params.current - 1) * params.pageSize;
      const end = start + params.pageSize;

      // 创建模拟数据
      const list: User[] = [];
      for (let i = start; i < end && i < total; i++) {
        list.push({
          id: i + 1,
          name: `用户${i + 1}`,
          age: 20 + (i % 40),
          email: `user${i + 1}@example.com`,
          role: i % 3 === 0 ? '管理员' : i % 3 === 1 ? '编辑' : '访客',
        });
      }

      // 返回数据
      return {
        list,
        total,
      };
    },
    [],
  ); // 空依赖数组，这个函数永远不会重新创建

  const handleReload = () => {
    tableRef.current?.reload();
    message.success('已重新加载');
  };

  const handleRefresh = () => {
    tableRef.current?.refresh();
    message.success('已刷新当前页');
  };

  return (
    <div style={{ padding: '24px' }}>
      <h1>ProTable 测试页面</h1>

      <Space style={{ marginBottom: '16px' }}>
        <Button type="primary" onClick={handleReload}>
          重新加载（回到第 1 页）
        </Button>
        <Button onClick={handleRefresh}>刷新当前页</Button>
      </Space>

      <ProTable ref={tableRef} request={request} columns={columns} rowKey="id" />
    </div>
  );
}

export default TestProTable;
