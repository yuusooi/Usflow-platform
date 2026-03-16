import { useState, useMemo } from 'react';

// 虚拟列表的配置项
interface VirtualListConfig {
  itemHeight: number; // 每一行的高度（像素）
  containerHeight: number; // 容器的高度（像素）
}

export const useVirtualList = <T>(list: T[], config: VirtualListConfig) => {
  // 存储当前的滚动位置 表示滚动条距离顶部的距离
  const [scrollTop, setScrollTop] = useState(0);

  // 从配置中提取常用的值
  const { itemHeight, containerHeight } = config;

  // 计算列表的总高度（用于撑开滚动条） list.length总行数
  const totalHeight = list.length * itemHeight;

  // 计算一屏能显示多少条（多缓冲 2 条，防止白边 ）
  const limit = Math.ceil(containerHeight / itemHeight) + 2;

  // 计算当前可见的开始索引
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight));

  // 计算当前可见的结束索引
  const endIndex = Math.min(list.length, startIndex + limit);

  // 使用useMemo缓存结果，截取需要真正渲染的数据
  const visibleList = useMemo(() => {
    // 从 startIndex 到 endIndex 切片数组
    return list.slice(startIndex, endIndex);
  }, [list, startIndex, endIndex]);

  // 计算渲染区域的偏移量 把渲染的内容下推到正确的位置
  const offsetY = startIndex * itemHeight;

  // 定义滚动事件处理函数
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    // 更新滚动位置
    setScrollTop(e.currentTarget.scrollTop);
  };

  // 返回计算结果和事件处理函数
  return {
    visibleList, // 需要渲染的数据列表
    totalHeight, // 列表总高度（用于撑开滚动条）
    offsetY, // 偏移量（用于定位渲染内容）
    handleScroll, // 滚动事件处理函数
  };
};
