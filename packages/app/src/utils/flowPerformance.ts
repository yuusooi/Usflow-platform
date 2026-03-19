import { useCallback, useRef, useEffect } from 'react';
import type { Node, Edge } from 'reactflow';

// 分片处理大量节点更新
export function useBatchUpdate() {
  const pendingUpdatesRef = useRef<(() => void)[]>([]);
  const rafIdRef = useRef<number | undefined>(undefined);

  const flushUpdates = useCallback(() => {
    const updates = pendingUpdatesRef.current || [];
    pendingUpdatesRef.current = [];

    updates.forEach(update => update());
  }, []);

  const scheduleUpdate = useCallback((update: () => void) => {
    pendingUpdatesRef.current.push(update);

    if (!rafIdRef.current) {
      rafIdRef.current = requestAnimationFrame(() => {
        flushUpdates();
        rafIdRef.current = undefined;
      });
    }
  }, [flushUpdates]);

  useEffect(() => {
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return scheduleUpdate;
}

// 虚拟化节点过滤（只返回可见区域内的节点）
export function filterVisibleNodes(
  nodes: Node[],
  edges: Edge[],
  viewport: { x: number; y: number; zoom: number },
  containerSize: { width: number; height: number }
): { nodes: Node[]; edges: Edge[] } {
  const { x: viewportX, y: viewportY, zoom } = viewport;
  const { width, height } = containerSize;

  // 计算可见区域边界
  const visibleLeft = -viewportX / zoom;
  const visibleTop = -viewportY / zoom;
  const visibleRight = visibleLeft + width / zoom;
  const visibleBottom = visibleTop + height / zoom;

  // 扩大边界以确保边缘节点也能显示
  const padding = 200 / zoom;
  const searchLeft = visibleLeft - padding;
  const searchTop = visibleTop - padding;
  const searchRight = visibleRight + padding;
  const searchBottom = visibleBottom + padding;

  // 过滤可见节点
  const visibleNodes = nodes.filter(node => {
    const { x, y } = node.position;
    const nodeWidth = node.data?.width || 200;
    const nodeHeight = node.data?.height || 80;

    return (
      x + nodeWidth >= searchLeft &&
      x <= searchRight &&
      y + nodeHeight >= searchTop &&
      y <= searchBottom
    );
  });

  // 获取可见节点的 ID 集合
  const visibleNodeIds = new Set(visibleNodes.map(n => n.id));

  // 只保留与可见节点相关的边
  const visibleEdges = edges.filter(edge =>
    visibleNodeIds.has(edge.source) || visibleNodeIds.has(edge.target)
  );

  return { nodes: visibleNodes, edges: visibleEdges };
}

// 节点位置缓存，避免重复计算
export class NodePositionCache {
  private cache = new Map<string, { x: number; y: number }>();

  set(nodeId: string, x: number, y: number) {
    this.cache.set(nodeId, { x, y });
  }

  get(nodeId: string) {
    return this.cache.get(nodeId);
  }

  has(nodeId: string) {
    return this.cache.has(nodeId);
  }

  clear() {
    this.cache.clear();
  }
}

// 检测是否需要启用性能优化模式
export function shouldEnablePerformanceMode(nodeCount: number): boolean {
  // 节点数超过 300 时启用性能优化
  return nodeCount > 300;
}

// 计算两点之间的距离
export function distance(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

// 节点碰撞检测
export function checkCollision(
  node1: Node,
  node2: Node,
  minDistance: number = 50
): boolean {
  const pos1 = node1.position;
  const pos2 = node2.position;

  return distance(pos1.x, pos1.y, pos2.x, pos2.y) < minDistance;
}
