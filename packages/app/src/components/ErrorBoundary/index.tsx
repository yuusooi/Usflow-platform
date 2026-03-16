import React, { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

// 属性类型
interface Props {
  children: ReactNode;
  fallback?: ReactNode; //用户自定义的错误界面
}

// 状态类型
interface State {
  hasError: boolean;
  errorInfo: string;
}

export class ErrorBoundary extends Component<Props, State> {
  // 构造函数，创建组件实例时会自动调用
  constructor(props: Props) {
    super(props); // 调用父类 Component 的构造函数
    this.state = { hasError: false, errorInfo: '' }; //初始化组件的内部状态
  }

  // 用于更新状态，同步返回
  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorInfo: error.message };
  }

  // 用于副作用操作
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('React Tree Crash:', error, errorInfo);
  }

  // 重试方法
  private handleRetry = () => {
    this.setState({ hasError: false });
  };

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div>
            <h1>组件崩溃</h1>
            <p>{this.state.errorInfo}</p>
            <button onClick={this.handleRetry}>尝试恢复</button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
