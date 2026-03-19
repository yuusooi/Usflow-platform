import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';
import type {
  Node, //节点的数据结构
  Edge, //连线的数据结构，连线包含 source、target等属性
  Connection, //描述连接时的数据
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useState, useEffect, useMemo } from 'react';
import { Modal, Input, message, Alert } from 'antd';
import ConfigDrawer from './ConfigDrawer';
import CustomEdge from './CustomEdge';
import { compileFlowToProcessDefinition } from '@/utils/flowCompiler';
import { saveProcessDefinition } from '@/services/process';
import { validateFlow } from '@/utils/flowValidator';
import { shouldEnablePerformanceMode } from '@/utils/flowPerformance';

// 定义节点数据的类型
export interface NodeData {
  label: string; //节点显示的文本
  type?: 'start' | 'approval' | 'end';
  approverRole?: string;
  approverType?: 'specified' | 'self' | 'role' | 'leader';
}

// 选中的节点数据结构
interface SelectedNode {
  id: string; // 节点的唯一标识
  data: NodeData; // 节点携带的业务数据
}

// 选中的连线数据结构
interface SelectedEdge {
  id: string; // 连线的唯一标识
  source: string; // 连线起点的节点ID
  target: string; // 连线终点的节点ID
}

// 定义完整的节点类型 包含ReactFlow的字段与自定义数据类型
type FlowNode = Node<NodeData>;

// 定义初始节点 流程图上的方块
const initialNodes: FlowNode[] = [
  {
    id: '1',
    type: 'input',
    data: { label: '开始', type: 'start' },
    position: { x: 100, y: 100 },
  },
  {
    id: '2',
    data: { label: '部门经理审批', type: 'approval', approverRole: '部门经理' },
    position: { x: 400, y: 100 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: '结束', type: 'end' },
    position: { x: 700, y: 100 },
  },
];

// 定义初始连线 节点之间的箭头
const initialEdges: Edge[] = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'custom', // 使用自定义连线类型
    data: { condition: '' }, // 初始条件为空
  },
  {
    id: 'e2-3',
    source: '2',
    target: '3',
    type: 'custom',
    data: { condition: '' },
  },
];

// 流程设计器组件
function FlowDesign() {
  // 使用 ReactFlow 提供的 Hook 管理节点状态
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  // 使用 ReactFlow 提供的 Hook 管理连线状态
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // 注册自定义连线类型
  const edgeTypes = {
    custom: CustomEdge,
  };

  // 记录当前选中的节点，null 表示没有选中任何节点
  const [selectedNode, setSelectedNode] = useState<SelectedNode | null>(null);

  // 记录当前选中的连线，null 表示没有选中任何连线
  const [selectedEdge, setSelectedEdge] = useState<SelectedEdge | null>(null);

  // 控制抽屉的打开状态
  const [drawerOpen, setDrawerOpen] = useState(false);

  // 流程验证结果
  const validationErrors = useMemo(() => {
    return validateFlow(nodes, edges).errors;
  }, [nodes, edges]);

  // 是否启用性能优化模式
  const performanceMode = useMemo(() => {
    return shouldEnablePerformanceMode(nodes.length);
  }, [nodes.length]);

  // 处理新连线，当用户从一个节点拖拽到另一个节点时触发
  const onConnect = (connection: Connection) => {
    setEdges((eds) =>
      addEdge(
        {
          ...connection,
          type: 'custom', // 新建的连线也使用自定义类型
          data: { condition: '' }, // 初始数据
        },
        eds,
      ),
    );
  };

  // 当用户点击节点时触发 - 只选中，不弹抽屉
  const onNodeClick = (_event: React.MouseEvent, node: FlowNode) => {
    setSelectedNode({
      id: node.id,
      data: node.data,
    });
    // 点击节点时，清空连线的选中状态（因为只能选中一样东西）
    setSelectedEdge(null);
    // 关闭抽屉
    setDrawerOpen(false);
  };

  // 打开配置抽屉
  const handleConfig = () => {
    if (selectedNode || selectedEdge) {
      setDrawerOpen(true);
    }
  };

  // 当用户点击连线时触发
  const onEdgeClick = (_event: React.MouseEvent, edge: Edge) => {
    setSelectedEdge({
      id: edge.id,
      source: edge.source,
      target: edge.target,
    });
    // 点击连线时，清空节点的选中状态
    setSelectedNode(null);
    // 关闭抽屉
    setDrawerOpen(false);
  };

  // 关闭抽屉，清空选中状态
  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedNode(null);
    setSelectedEdge(null);
  };

  // 保存节点配置
  const handleSaveNode = (nodeId: string, newData: NodeData) => {
    // 更新 nodes 数组中指定 ID 的节点数据
    setNodes((prevNodes) =>
      prevNodes.map(
        (node) =>
          node.id === nodeId
            ? { ...node, data: newData } // 找到目标节点，更新它的data
            : node, // 其他节点保持不变
      ),
    );
    // 保存后关闭抽屉
    handleCloseDrawer();
  };

  // 保存连线配置
  const handleSaveEdge = (edgeId: string, newData: { condition?: string }) => {
    setEdges((prevEdges) =>
      prevEdges.map((edge) =>
        edge.id === edgeId
          ? { ...edge, data: { ...edge.data, ...newData } } // 把 newData 合并到 data 属性
          : edge,
      ),
    );
    handleCloseDrawer();
  };

  // 保存函数，把流程图转换成 JSON 并发送给后端
  const handleSave = () => {
    // 先检查是否有错误（warning 可以忽略）
    const errors = validationErrors.filter((e) => e.type === 'error');

    if (errors.length > 0) {
      Modal.error({
        title: '流程验证失败',
        content: (
          <div>
            <p>请先修复以下错误后再保存：</p>
            <ul style={{ paddingLeft: 20 }}>
              {errors.map((error, index) => (
                <li key={index}>{error.message}</li>
              ))}
            </ul>
          </div>
        ),
      });
      return;
    }

    // 先检查流程图是否有效
    if (nodes.length === 0) {
      message.error('请先添加节点');
      return;
    }

    // 弹出输入框让用户输入流程名称
    let processName = '';
    Modal.confirm({
      title: '保存流程',
      content: (
        <div>
          <p>请输入流程名称：</p>
          <Input
            placeholder="例如：请假审批流程"
            onChange={(e) => {
              processName = e.target.value;
            }}
          />
        </div>
      ),
      onOk: async () => {
        if (!processName || processName.trim() === '') {
          message.error('请输入流程名称');
          return;
        }

        try {
          // 编译成后端可执行的 DSL
          const compiledDefinition = compileFlowToProcessDefinition(nodes, edges);

          // 构建符合 API 要求的 ProcessDefinition
          const processDefinition = {
            name: processName,
            nodes,
            edges,
          };

          // 直接发送编译后的 JSON 给后端
          await saveProcessDefinition(processDefinition);

          message.success('流程保存成功');
        } catch (error) {
          message.error(error instanceof Error ? error.message : '保存失败，请稍后重试');
        }
      },
    });
  };

  // 生成唯一 ID
  const generateId = () => {
    return `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // 添加新节点
  const handleAddNode = (nodeType: 'start' | 'approval' | 'end') => {
    const newNode: FlowNode = {
      id: generateId(),
      type: nodeType === 'start' ? 'input' : nodeType === 'end' ? 'output' : 'default',
      data: {
        label: nodeType === 'start' ? '开始' : nodeType === 'end' ? '结束' : '新审批节点',
        type: nodeType,
        approverType: 'specified',
      },
      position: {
        x: 100 + Math.random() * 200,
        y: 100 + Math.random() * 200,
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  // 删除选中的节点
  const handleDeleteSelected = () => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id),
      );
      setSelectedNode(null);
    } else if (selectedEdge) {
      setEdges((eds) => eds.filter((edge) => edge.id !== selectedEdge.id));
      setSelectedEdge(null);
    }
  };

  // 清空画布
  const handleClear = () => {
    if (window.confirm('确定要清空所有节点和连线吗？')) {
      setNodes([]);
      setEdges([]);
      setSelectedNode(null);
      setSelectedEdge(null);
    }
  };

  // 键盘事件：Delete/Backspace 键删除选中项
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // 检查是否按下了 Delete 或 Backspace 键
      if (event.key === 'Delete' || event.key === 'Backspace') {
        // 如果有选中的节点或连线，执行删除
        if (selectedNode || selectedEdge) {
          // 阻止默认行为（比如 Backspace 可能触发浏览器后退）
          event.preventDefault();
          handleDeleteSelected();
        }
      }
    };

    // 添加键盘事件监听
    window.addEventListener('keydown', handleKeyDown);

    // 清理函数：组件卸载时移除监听
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedNode, selectedEdge, handleDeleteSelected]); // 依赖选中状态，确保删除最新的选中项

  // 渲染流程图
  return (
    <>
      {/* 顶部操作栏 */}
      <div
        style={{
          marginBottom: '16px',
          padding: '12px 16px',
          background: 'var(--bg-container, #fff)',
          border: '1px solid var(--border-line, #e8e8e8)',
          borderRadius: '4px',
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
        }}
      >
        <button
          onClick={() => handleAddNode('start')}
          style={{
            padding: '8px 16px',
            background: '#52c41a',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          + 开始节点
        </button>

        <button
          onClick={() => handleAddNode('approval')}
          style={{
            padding: '8px 16px',
            background: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          + 审批节点
        </button>

        <button
          onClick={() => handleAddNode('end')}
          style={{
            padding: '8px 16px',
            background: '#ff4d4f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          + 结束节点
        </button>

        <div
          style={{ width: '1px', background: 'var(--border-line, #e8e8e8)', margin: '0 8px' }}
        ></div>

        <button
          onClick={handleDeleteSelected}
          disabled={!selectedNode && !selectedEdge}
          style={{
            padding: '8px 16px',
            background:
              selectedNode || selectedEdge
                ? 'var(--color-warning, #faad14)'
                : 'var(--bg-active, #e3e2de)',
            color:
              selectedNode || selectedEdge
                ? '#fff'
                : 'var(--text-secondary, rgba(55, 53, 47, 0.65))',
            border: 'none',
            borderRadius: '4px',
            cursor: selectedNode || selectedEdge ? 'pointer' : 'not-allowed',
            fontSize: '14px',
          }}
          title="快捷键: Delete 或 Backspace"
        >
          删除选中
        </button>

        <button
          onClick={handleConfig}
          disabled={!selectedNode && !selectedEdge}
          style={{
            padding: '8px 16px',
            background:
              selectedNode || selectedEdge
                ? 'var(--color-info, #1890ff)'
                : 'var(--bg-active, #e3e2de)',
            color:
              selectedNode || selectedEdge
                ? '#fff'
                : 'var(--text-secondary, rgba(55, 53, 47, 0.65))',
            border: 'none',
            borderRadius: '4px',
            cursor: selectedNode || selectedEdge ? 'pointer' : 'not-allowed',
            fontSize: '14px',
          }}
          title="配置选中的节点或连线"
        >
          配置选中
        </button>

        <button
          onClick={handleClear}
          style={{
            padding: '8px 16px',
            background: '#ff4d4f',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          清空
        </button>

        <div style={{ flex: 1, minWidth: '20px' }}></div>

        <button
          onClick={handleSave}
          style={{
            padding: '8px 24px',
            background: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          保存并发布
        </button>
      </div>

      {/* 验证错误和性能提示 */}
      {validationErrors.length > 0 && (
        <Alert
          type="error"
          message={
            <div>
              <strong>流程验证失败：</strong>
              <ul style={{ margin: '8px 0 0 0', paddingLeft: 20 }}>
                {validationErrors.slice(0, 3).map((error, index) => (
                  <li key={index}>{error.message}</li>
                ))}
                {validationErrors.length > 3 && (
                  <li>...还有 {validationErrors.length - 3} 个错误</li>
                )}
              </ul>
            </div>
          }
          style={{ marginBottom: 12 }}
          closable
        />
      )}

      {performanceMode && (
        <Alert
          type="warning"
          message={
            <div>
              <strong>性能优化模式已启用</strong>
              <p style={{ margin: '4px 0 0 0', fontSize: 13 }}>
                当前节点数超过 300，已自动启用性能优化模式以提升流畅度。
              </p>
            </div>
          }
          style={{ marginBottom: 12 }}
          showIcon
        />
      )}

      {/* 流程图画布 */}
      <div
        style={{
          position: 'relative',
          height: '400px',
          background: 'var(--bg-container, #ffffff)',
          border: '1px solid var(--border-line, #e8e8e8)',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onEdgeClick={onEdgeClick}
          edgeTypes={edgeTypes}
          fitView
          connectionLineType={'smoothstep' as any}
          defaultEdgeOptions={{
            type: 'custom',
            data: { condition: '' },
          }}
        />

        <ConfigDrawer
          open={drawerOpen}
          selectedNode={selectedNode}
          selectedEdge={selectedEdge}
          onClose={handleCloseDrawer}
          onSaveNode={handleSaveNode}
          onSaveEdge={handleSaveEdge}
        />
      </div>

      {/* 操作提示 */}
      <div
        style={{
          marginTop: '12px',
          padding: '12px',
          background: 'var(--bg-hover, #f5f5f5)',
          border: '1px solid var(--border-line, #e8e8e8)',
          borderRadius: '4px',
          fontSize: '13px',
          color: 'var(--text-main, #333)',
        }}
      >
        <strong>操作提示：</strong>
        <br />• <strong>添加节点</strong>：点击上方按钮添加不同类型的节点
        <br />• <strong>建立连线</strong>
        ：鼠标悬停在节点上，会看到节点边缘的小圆点，从圆点拖拽到另一个节点即可建立连线
        <br />• <strong>移动节点</strong>：直接拖拽节点可以移动位置
        <br />• <strong>选中节点/连线</strong>：点击节点或连线即可选中（高亮显示）
        <br />• <strong>配置节点/连线</strong>：选中后，点击"配置选中"按钮，右侧会弹出配置面板
        <br />• <strong>删除</strong>：选中节点或连线后，按 <kbd>Delete</kbd> 或{' '}
        <kbd>Backspace</kbd> 键删除，或点击"删除选中"按钮
      </div>
    </>
  );
}

export default FlowDesign;
