import { getBezierPath, EdgeLabelRenderer } from 'reactflow';
import type { EdgeProps } from 'reactflow';

// 自定义连线组件
function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}: EdgeProps) {
  // 计算连线的路径，贝塞尔曲线
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      {/* 连线路径 */}
      <path
        id={id}
        style={{
          stroke: 'var(--text-main, #000)',
          strokeWidth: 2,
        }}
        className="react-flow__edge-path"
        d={edgePath}
      />

      {/* 连线标签（条件表达式） */}
      {data?.condition && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${(sourceX + targetX) / 2}px, ${
                (sourceY + targetY) / 2
              }px)`,
              background: 'var(--bg-container, #fff)',
              border: '1px solid var(--border-strong, #777)',
              borderRadius: '4px',
              padding: '4px 8px',
              fontSize: '12px',
              color: 'var(--text-main, #000)',
              pointerEvents: 'none',
            }}
          >
            {data.condition}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

export default CustomEdge;
