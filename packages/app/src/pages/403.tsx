import { Button, Result } from '@usflow/components';

function Forbidden() {
  return (
    <Result
      status="403"
      title="403"
      subTitle="抱歉，您无权限访问此页面。"
      extra={<Button type="primary">返回首页</Button>}
    />
  );
}

export default Forbidden;
