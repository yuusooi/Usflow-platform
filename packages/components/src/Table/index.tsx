import type { ReactNode } from 'react'
import './index.css'

// 列定义接口
export interface Column {
  title: string //列标题
  key: string //数据字段名
  render?: (text: any, record: any, index: number) => ReactNode //需要转换的数据
}

// 定义TableProps接口
export interface TableProps<T = any> {
  columns: Column[] //列定义数组，定义列的配置，顺序是列的显示顺序
  dataSource: T[] //数据源数组，每行是一个数据对象，顺序是行的显示顺序
  rowKey?: string //行的标识字段名,每个元素都有唯一key,rowKey给table具体字段
  bordered?: boolean //表格表框
  size?: 'small' | 'default' | 'large'
  style?: React.CSSProperties
  className?: string
  sortBy?: string //要按照哪一列的字段排序
  sortOrder?: 'asc' | 'desc' //升序/降序
  filterBy?: string //要按照哪个字段筛选(对应column.key)
  filterValue?: any //筛选条件 可以是字符串、数字或者函数
  pagination?: {
    //用对象包裹分页配置
    current?: number //当前页码 从1开始
    pageSize?: number //每页显示多少数据
    onChange?: (page: number, pageSize: number) => void //没有返回值
  }
}

function Table(props: TableProps) {
  // 解构props提取需要的数据
  const {
    columns,
    dataSource,
    rowKey = 'key', //默认用'key'字段作为唯一标识
    bordered = false,
    size = 'default',
    style,
    className,
    sortBy,
    sortOrder,
    filterBy,
    filterValue,
    pagination,
  } = props

  // 创建数组的副本，不修改原始dataSource
  let processedData = [...dataSource]

  // 如果有排序配置就进行排序
  if (sortBy) {
    // a 和 b 是数组中的两个元素（代表两行数据）
    // a[sortBy] 和 b[sortBy] 是要比较的字段值
    processedData.sort((a: any, b: any) => {
      const valueA = a[sortBy]
      const valueB = b[sortBy]

      if (sortOrder === 'asc') {
        // 返回负数表示 a < b，a 排在前面
        // 返回正数表示 a > b，b 排在前面
        // 返回 0 表示相等
        if (valueA < valueB) return -1
        if (valueA > valueB) return 1
        return 0
      } else {
        if (valueA > valueB) return -1
        if (valueA < valueB) return 1
        return 0
      }
    })
  }

  if (filterBy && filterValue !== undefined) {
    // item是数组中的每一行数据
    processedData = processedData.filter((item: any) => {
      const fieldValue = item[filterBy] //取出要筛选的字段值

      if (typeof filterValue === 'function') {
        // 如果是函数，调用函数来判断是否保留
        // 函数返回 true = 保留这一行
        // 函数返回 false = 过滤掉这一行
        return filterValue(fieldValue)
      } else {
        // 如果不是函数，直接比较是否相等
        return fieldValue === filterValue
      }
    })
  }

  // 分页参数提取
  // 可选链操作符：如果 pagination 是 null 或 undefined，直接返回 undefined
  // 空值合并操作符?? 只针对 null 和 undefined
  // 如果左边是 null 或 undefined，返回右边的值
  // 如果左边有值，返回左边的值
  const currentPage = pagination?.current ?? 1 //默认第一页
  const pageSize = pagination?.pageSize ?? 10 //默认每页10条
  const total = processedData.length //总条数(经过排序筛选后的)
  const onChange = pagination?.onChange //提取回调函数

  const startIndex = (currentPage - 1) * pageSize //起始索引从0开始 起始索引 = (页码 - 1) × 每页条数
  const endIndex = startIndex + pageSize //结束索引(不包含endIndex) 结束索引 = 起始索引 + 每页条数

  // 使用slice切片数组，只保留当前页的数据
  const paginatedData = processedData.slice(startIndex, endIndex)

  // 计算总页数
  const totalPages = Math.ceil(total / pageSize)

  const tableClassNames = ['my-table']

  if (bordered) {
    tableClassNames.push('my-table-bordered')
  }

  if (size !== 'default') {
    tableClassNames.push(`my-table-${size}`)
  }

  if (className) {
    tableClassNames.push(className)
  }

  // 判断是否为空数据
  const isEmpty = paginatedData.length === 0

  if (isEmpty) {
    return (
      <div className="my-table-wrapper" style={style}>
        <table className={tableClassNames.join(' ')}>
          <tbody>
            <tr>
              {/* 跨列显示 */}
              <td colSpan={columns.length}>
                <div className="my-table-empty">暂无数据</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  return (
    // div原因：包一层wrapper限制宽度，table默认宽度是100%
    // wrapper可以设置overflow:auto显示滚动条
    // 样式隔离，避免样式影响其他元素
    <div className="my-table-wrapper">
      <table className={tableClassNames.join(' ')}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.title}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {/* record: 当前行的数据对象 */}
          {/* rowIndex: 当前行的索引（从 0 开始） */}
          {paginatedData.map((record, rowIndex) => (
            // record[rowKey]是动态配置，让用户自己指定rowKey
            <tr key={record[rowKey] || rowIndex}>
              {columns.map((column) => (
                <td key={column.key}>
                  {/* 如果有自定义 render 就用 render，否则直接显示值 */}
                  {column.render
                    ? // 当前字段的值,整行数据(提供其他字段),行索引(显示行号、判断奇偶行 斑马纹)
                      column.render(record[column.key], record, rowIndex)
                    : record[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 分页控制器 */}
      {pagination && ( //设置了分页才显示
        <div className="my-table-pagination">
          <button
            className="my-table-pagination-prev"
            disabled={currentPage === 1} //第一页禁用
            onClick={() => {
              if (onChange) {
                onChange(currentPage - 1, pageSize)
              }
            }}
          >
            &lt; {/* HTML 实体，显示 < 符号 */}
          </button>

          {/* 页码列表 */}
          <div className="my-table-pagination-pages">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`my-table-pagination-page${page === currentPage ? 'my-table-pagination-page-active' : ''}`}
                onClick={() => {
                  // 点击的不是当前页才触发onChange
                  if (page !== currentPage && onChange) {
                    onChange(page, pageSize)
                  }
                }}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className="my-table-pagination-prev"
            disabled={currentPage === totalPages} //最后页禁用
            onClick={() => {
              if (onChange) {
                onChange(currentPage + 1, pageSize)
              }
            }}
          >
            &gt;
          </button>

          {/* 信息显示 */}
          <span className="my-table-pagination-info">
            第 {currentPage} / {totalPages} 页，共 {total} 条
          </span>
        </div>
      )}
    </div>
  )
}

export default Table
