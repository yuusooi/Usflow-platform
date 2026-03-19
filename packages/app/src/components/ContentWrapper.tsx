/**
 * 内容包装器组件
 * 用于限制内容最大宽度并居中（大厂极简阅读体验精髓）
 */
import { Card } from '@usflow/ui';
import type { ReactNode } from 'react';

interface ContentWrapperProps {
  children: ReactNode;
}

export function ContentWrapper({ children }: ContentWrapperProps) {
  return (
    <div style={containerStyle}>
      <Card style={cardStyle}>
        {children}
      </Card>
    </div>
  );
}

/* 容器：最大宽度 1200px，水平居中 */
const containerStyle: React.CSSProperties = {
  maxWidth: '1200px',
  margin: '0 auto',
  width: '100%',
};

/* 卡片样式 */
const cardStyle: React.CSSProperties = {
  minHeight: '400px',
};
