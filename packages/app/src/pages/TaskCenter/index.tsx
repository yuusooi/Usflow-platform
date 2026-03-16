import React, { useState, useCallback } from 'react';
import { Tabs } from 'antd'; //创建标签页
import { ProTable } from '@/components/ProTable';
import type { PageResult } from '@/components/ProTable';
import StatusTag from '@/components/StatusTag';
import ApprovalDrawer from './components/ApprovalDrawer';
import type { TaskDetail } from './components/ApprovalDrawer';

// 定义任务数据的类型接口
// 这个接口定义了一个任务包含哪些字段
interface Task {
  id: string; // 任务 ID
  taskNo: string; // 任务单号
  initiator: string; // 发起人
  applicationType: string; // 申请类型
  createTime: string; // 发起时间
  status: string; // 当前状态
}

// 定义页面组件
function TaskCenter() {
  // 使用 useState 管理当前激活的 Tab
  const [activeTab, setActiveTab] = useState<string>('pending');
  const [selectedTask, setSelectedTask] = useState<TaskDetail | undefined>(undefined);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // 使用 useCallback 缓存待办任务的请求函数
  // useCallback 的作用是：只有当依赖数组（第二个参数）变化时，才重新创建函数
  const fetchPendingTasks = useCallback(
    async (params: { current: number; pageSize: number }): Promise<PageResult<Task>> => {
      // 后续替换为真实的 API 调用
      // params.current 是当前页码，params.pageSize 是每页条数

      // 返回模拟数据
      return {
        list: [
          {
            id: '1',
            taskNo: 'TK202603140001',
            initiator: '张三',
            applicationType: '请假申请',
            createTime: '2026-03-14 10:30:00',
            status: 'pending',
          },
        ],
        total: 100,
      };
    },
    [],
  );

  // 已办任务请求函数
  const fetchProcessedTasks = useCallback(
    async (params: { current: number; pageSize: number }): Promise<PageResult<Task>> => {
      // 返回模拟的已办数据
      return {
        list: [
          {
            id: '2',
            taskNo: 'TK202603130001',
            initiator: '李四',
            applicationType: '报销申请',
            createTime: '2026-03-13 15:20:00',
            status: 'approved', // 已通过
          },
        ],
        total: 50,
      };
    },
    [],
  );

  // 抄送任务请求函数
  const fetchCCTasks = useCallback(
    async (params: { current: number; pageSize: number }): Promise<PageResult<Task>> => {
      // 返回模拟的抄送数据
      return {
        list: [
          {
            id: '3',
            taskNo: 'TK202603120001',
            initiator: '王五',
            applicationType: '采购申请',
            createTime: '2026-03-12 09:10:00',
            status: 'approved',
          },
        ],
        total: 30,
      };
    },
    [],
  );

  const handleRowClick = (record: Task) => {
    // 将 Task 转换为 TaskDetail（添加 schema 和 formData）
    const taskDetail: TaskDetail = {
      ...record,
      formData: {
        // 模拟表单数据
        leaveType: '年假',
        startDate: '2024-03-15',
        endDate: '2024-03-17',
        reason: '家里有事',
      },
      schema: [
        // 模拟表单配置
        {
          type: 'select',
          name: 'leaveType',
          label: '请假类型',
          options: [
            { label: '年假', value: '年假' },
            { label: '事假', value: '事假' },
            { label: '病假', value: '病假' },
          ],
        },
        {
          type: 'input',
          name: 'startDate',
          label: '开始日期',
        },
        {
          type: 'input',
          name: 'endDate',
          label: '结束日期',
        },
        {
          type: 'textarea',
          name: 'reason',
          label: '请假原因',
        },
      ],
    };

    setSelectedTask(taskDetail);
    setDrawerOpen(true);
  };

  // 定义表格列配置
  // columns 数组定义了表格有哪些列，每列如何显示
  const columns = [
    {
      title: '单号', // 列标题
      dataIndex: 'taskNo', // 对应数据中的字段名
      width: 180, // 列宽度
    },
    {
      title: '发起人',
      dataIndex: 'initiator',
      width: 120,
    },
    {
      title: '申请类型',
      dataIndex: 'applicationType',
      width: 150,
    },
    {
      title: '发起时间',
      dataIndex: 'createTime',
      width: 180,
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      width: 120,
      // render 自定义渲染函数
      // value 当前单元格的值（也就是 status 字段的值）
      render: (value: string) => {
        // 根据 status 值返回对应的 StatusTag 组件
        // 但是需要处理 value 类型，因为 value 可能是任意字符串
        const statusMap: Record<string, 'pending' | 'approved' | 'rejected' | 'transferred'> = {
          pending: 'pending',
          approved: 'approved',
          rejected: 'rejected',
          transferred: 'transferred',
        };

        // 如果 value 在映射表中存在，就返回 StatusTag，否则返回原值
        const statusType = statusMap[value];
        return statusType ? <StatusTag status={statusType} /> : value;
      },
    },
  ];

  const tableColumns = [
    ...columns,
    {
      title: '操作',
      width: 100,
      render: () => <a>查看</a>,
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      {/* Tabs 组件：创建标签页切换 */}
      <Tabs
        // activeKey：当前激活的 Tab 的 key
        activeKey={activeTab}
        // onChange：Tab 切换时的回调函数，更新
        activeTab
        状态
        onChange={(key) => setActiveTab(key)}
        // items：定义所有 Tab
        items={[
          {
            key: 'pending',
            label: '待办',
            children: (
              <ProTable
                request={fetchPendingTasks}
                columns={tableColumns} // 改成 tableColumns（带操作列）
                rowKey="id"
                onRow={(record) => ({
                  onClick: () => handleRowClick(record),
                  style: { cursor: 'pointer' },
                })}
              />
            ),
          },
          {
            key: 'processed',
            label: '已办',
            children: (
              <ProTable
                request={fetchProcessedTasks}
                columns={tableColumns} // 改成 tableColumns
                rowKey="id"
                onRow={(record) => ({
                  onClick: () => handleRowClick(record),
                  style: { cursor: 'pointer' },
                })}
              />
            ),
          },
          {
            key: 'cc',
            label: '抄送',
            children: (
              <ProTable
                request={fetchCCTasks}
                columns={tableColumns} // 改成 tableColumns
                rowKey="id"
                onRow={(record) => ({
                  onClick: () => handleRowClick(record),
                  style: { cursor: 'pointer' },
                })}
              />
            ),
          },
        ]}
      />
      <ApprovalDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        taskDetail={selectedTask}
      />
    </div>
  );
}

export default TaskCenter;
