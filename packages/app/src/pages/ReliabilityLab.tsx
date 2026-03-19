import { useState } from 'react';
import { Button, Space, Alert, Card, Typography } from 'antd';
import { BugOutlined, ThunderboltOutlined, ExperimentOutlined } from '@ant-design/icons';
import { request } from '@usflow/utils';

const { Title, Paragraph, Text } = Typography;

function ReliabilityLab() {
  const [shouldCrash, setShouldCrash] = useState(false);
  const [loading, setLoading] = useState(false);
  const [testResult, setTestResult] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  // 触发渲染错误（会被 ErrorBoundary 捕获）
  const triggerRenderError = () => {
    setShouldCrash(true);
  };

  // 触发异步错误（会被全局监控捕获）
  const triggerAsyncError = () => {
    setTimeout(() => {
      throw new Error('[高可用实验室] 这是一个异步错误，已被全局监控捕获');
    }, 100);
    setTestResult({ type: 'success', message: '已触发异步错误，请查看控制台输出' });
  };

  // 触发 Promise rejection（会被全局监控捕获）
  const triggerPromiseRejection = () => {
    Promise.reject('[高可用实验室] 这是一个 Promise rejection，已被全局监控捕获');
    setTestResult({ type: 'success', message: '已触发 Promise rejection，请查看控制台输出' });
  };

  // 触发 500 错误（测试服务降级）
  const trigger500Error = async () => {
    setLoading(true);
    setTestResult(null);

    try {
      await request.get('/test-500');
      setTestResult({ type: 'error', message: '请求成功，未能触发 500 错误' });
    } catch (error) {
      setTestResult({
        type: 'success',
        message: `已触发 500 错误，错误已被捕获: ${error instanceof Error ? error.message : String(error)}`,
      });
    } finally {
      setLoading(false);
    }
  };

  // 发送正常请求（对比测试）
  const triggerNormalRequest = async () => {
    setLoading(true);
    setTestResult(null);

    try {
      await request.get('/test-normal');
      setTestResult({ type: 'success', message: '请求成功，服务正常响应' });
    } catch (error) {
      setTestResult({
        type: 'error',
        message: `请求失败: ${error instanceof Error ? error.message : String(error)}`,
      });
    } finally {
      setLoading(false);
    }
  };

  // 如果触发渲染错误，抛出异常（会被 ErrorBoundary 捕获）
  if (shouldCrash) {
    throw new Error('[高可用实验室] 这是一个故意的渲染错误，用于测试 ErrorBoundary');
  }

  return (
    <div style={{ padding: 0 }}>
      {/* 页面头部 */}
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0, color: 'var(--text-main)' }}>
          <ExperimentOutlined style={{ marginRight: 8 }} />
          高可用实验室
        </Title>
        <Paragraph style={{ color: 'var(--text-secondary)', marginTop: 8, marginBottom: 0 }}>
          系统稳定性与容错能力测试中心。在此可以模拟各种异常场景，验证系统的错误捕获、服务降级和自动恢复能力。
        </Paragraph>
      </div>

      {/* 测试结果提示 */}
      {testResult && (
        <Alert
          message={testResult.message}
          type={testResult.type}
          showIcon
          closable
          onClose={() => setTestResult(null)}
          style={{ marginBottom: 24 }}
        />
      )}

      {/* 错误捕获测试 */}
      <Card
        title={
          <Space>
            <BugOutlined />
            <Text strong>错误捕获测试</Text>
          </Space>
        }
        style={{ marginBottom: 16 }}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Paragraph style={{ marginBottom: 12 }}>
              模拟前端运行时错误，验证错误边界和全局监控的捕获能力：
            </Paragraph>
            <Space wrap>
              <Button type="primary" danger onClick={triggerRenderError}>
                触发渲染错误
              </Button>
              <Button onClick={triggerAsyncError}>触发异步错误</Button>
              <Button onClick={triggerPromiseRejection}>触发 Promise Rejection</Button>
            </Space>
          </div>

          <Alert
            message="测试说明"
            description={
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>
                  <Text strong>渲染错误：</Text> 会被 ErrorBoundary 捕获，页面显示错误 UI
                </li>
                <li>
                  <Text strong>异步错误：</Text> 会被全局监控捕获，控制台打印错误信息
                </li>
                <li>
                  <Text strong>Promise Rejection：</Text> 会被全局监控捕获，防止未处理的 Promise
                  错误
                </li>
              </ul>
            }
            type="info"
            showIcon
          />
        </Space>
      </Card>

      {/* 服务降级测试 */}
      <Card
        title={
          <Space>
            <ThunderboltOutlined />
            <Text strong>服务降级测试</Text>
          </Space>
        }
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Paragraph style={{ marginBottom: 12 }}>
              模拟后端服务异常，验证请求拦截器和错误处理机制：
            </Paragraph>
            <Space wrap>
              <Button type="primary" danger onClick={trigger500Error} loading={loading}>
                触发 500 错误
              </Button>
              <Button onClick={triggerNormalRequest} loading={loading}>
                发送正常请求
              </Button>
            </Space>
          </div>

          <Alert
            message="测试说明"
            description={
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                <li>
                  <Text strong>触发 500 错误：</Text> 模拟后端服务故障，验证错误处理和用户提示
                </li>
                <li>
                  <Text strong>发送正常请求：</Text> 对比测试，验证正常情况下的请求响应
                </li>
              </ul>
            }
            type="info"
            showIcon
          />
        </Space>
      </Card>

      {/* 使用说明 */}
      <Card style={{ marginTop: 16, background: 'var(--bg-hover)' }}>
        <Paragraph style={{ marginBottom: 0 }}>
          <Text strong>提示：</Text>{' '}
          此页面主要用于开发和测试环境验证系统的容错能力。在生产环境中，建议通过配置开关来控制此页面的访问权限。
        </Paragraph>
      </Card>
    </div>
  );
}

export default ReliabilityLab;
