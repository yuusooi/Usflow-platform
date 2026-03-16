import React, { useImperativeHandle, useState } from 'react';
import { Table } from 'antd';
import { useAntdTable } from 'ahooks';
import type { ProTableProps } from './types';

// 定义 ref 暴露的方法类型
export interface ProTableRef {
  // 重新加载数据（重置到第一页）
  reload: () => void;
  // 刷新当前页（保持当前页码）
  refresh: () => void;
}

// ProTable 组件
// 使用 forwardRef 是为了暴露 ref 给父组件使用
// 行数据类型,请求参数类型
export const ProTable = React.forwardRef<ProTableRef, ProTableProps<any>>((props, ref) => {
  // 从 props 中提取属性
  const {
    request, // 数据请求函数
    defaultParams = {} as any, // 默认参数，如果没有传就用空对象
    manualRequest = false, // 是否手动请求，默认 false 表示自动请求
    ...restProps // 剩余属性收集起来，后面传给 Table 组件
  } = props;

  // 用 state 触发重新请求
  const [reloadFlag, setReloadFlag] = useState(0);

  // 调用 useAntdTable，自动管理表格状态
  const { tableProps, pagination } = useAntdTable(
    // 第一个参数 service函数：接收分页参数和表单数据，返回列表数据
    async ({ current, pageSize }, formData) => {
      // 调用外部传入的 request 函数
      const result = await request({
        ...defaultParams,
        ...formData,
        current,
        pageSize,
      });

      // 返回数据
      return {
        list: result.list,
        total: result.total,
      };
    },
    // 配置项
    {
      defaultPageSize: 10, // 默认每页 10 条
      manual: manualRequest, // 是否手动请求
      refreshDeps: [reloadFlag], // 依赖 reloadFlag，变化时重新请求
    },
  );

  const reload = () => {
    // 重置到第 1 页
    tableProps.pagination.current = 1;
    tableProps.pagination.pageSize = 10;
    // 触发重新请求
    setReloadFlag((prev) => prev + 1);
  };

  const refresh = () => {
    // 刷新当前页
    setReloadFlag((prev) => prev + 1);
  };

  // 把方法暴露给父组件
  useImperativeHandle(ref, () => ({
    reload,
    refresh,
  }));

  // 返回 Table 组件
  return (
    <Table
      {...restProps}
      {...tableProps}
      pagination={{
        ...pagination,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total: number) => `共 ${total}  条`,
        pageSizeOptions: ['10', '20', '50', '100'],
      }}
    />
  );
});

// 添加 displayName，方便调试
ProTable.displayName = 'ProTable';
