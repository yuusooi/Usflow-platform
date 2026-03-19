import React from 'react'
export type { ResultProps, ResultStatus } from './types'
import type { ResultProps } from './types'
import './style.css'

/**
 * Result 结果组件
 * 用于反馈一系列操作任务的处理结果
 */
const Result: React.FC<ResultProps> = ({
  status = 'info',
  title,
  subTitle,
  extra,
  children,
}) => {
  // 根据状态返回对应的图标
  const getStatusIcon = () => {
    const icons = {
      '403': '🔒',
      '404': '🔍',
      '500': '💥',
      'success': '✅',
      'error': '❌',
      'warning': '⚠️',
      'info': 'ℹ️',
    }
    return icons[status] || icons.info
  }

  return (
    <div className="my-result">
      {/* 图标 */}
      <div className={`my-result-icon my-result-${status}`}>
        {getStatusIcon()}
      </div>

      {/* 标题 */}
      {title && <div className="my-result-title">{title}</div>}

      {/* 副标题 */}
      {subTitle && <div className="my-result-subtitle">{subTitle}</div>}

      {/* 额外内容（按钮等） */}
      {extra && <div className="my-result-extra">{extra}</div>}

      {/* 子内容 */}
      {children && <div className="my-result-content">{children}</div>}
    </div>
  )
}

export default Result
