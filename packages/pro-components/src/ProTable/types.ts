import type { TableProps } from 'antd';

// 定义统一的接口返回结构
// 这是一个泛型接口，T 是列表项的类型
export interface PageResult<T> {
  // 列表数据，数组类型，元素类型是 T
  list: T[];
  // 总条数，用于计算总页数
  total: number;
}

// ProTable 组件的属性接口
// RecordType: 表格行数据的类型
// Params: 请求参数的类型
export interface ProTableProps<RecordType extends Record<string, any>, Params = any>
  // extends Omit：从antd的TableProps类型中排除'dataSource' | 'pagination' | 'loading'
  extends Omit<TableProps<RecordType>, 'dataSource' | 'pagination' | 'loading'> {
  // 核心功能：动态请求数据的函数
  // params: 请求参数，包含 current（当前页）和 pageSize（每页条数）
  // 返回值：Promise<PageResult<RecordType>>，返回列表数据和总条数
  request: (
    params: Params & { current: number; pageSize: number },
  ) => Promise<PageResult<RecordType>>;

  // 默认请求参数
  // 比如：{ status: 'active' } 表示默认只查询活跃数据
  defaultParams?: Params;

  // 是否手动触发请求
  // false: 组件挂载时自动请求数据（默认）
  // true: 需要手动调用 ref 的 fetch 方法请求数据
  manualRequest?: boolean;
}

// ProTable 组件 ref 暴露的方法类型
export interface ProTableRef {
  // 重新加载数据（重置到第一页）
  reload: () => void;
  // 刷新当前页（保持当前页码）
  refresh: () => void;
}
