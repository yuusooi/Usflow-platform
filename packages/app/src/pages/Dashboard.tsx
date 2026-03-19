import { Card, Row, Col } from '@usflow/ui';

function Dashboard() {
  return (
    <div>
      <h1>控制台</h1>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card>
            <h3>用户总数</h3>
            <p style={{ fontSize: '24px', color: '#1890ff' }}>1,234</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <h3>角色总数</h3>
            <p style={{ fontSize: '24px', color: '#52c41a' }}>56</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <h3>权限总数</h3>
            <p style={{ fontSize: '24px', color: '#faad14' }}>89</p>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <h3>在线用户</h3>
            <p style={{ fontSize: '24px', color: '#f5222d' }}>345</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
