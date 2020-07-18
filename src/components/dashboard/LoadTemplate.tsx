import React, { lazy } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface RenderItemProps {
  template: string;
  data: any;
  onChange: Function;
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const importView = ({ template }: RenderItemProps) =>
  lazy(() =>
    import(`./templates/${template}`).catch(() => import('./NullComponent'))
  );

const LoadTemplate: React.FC<RenderItemProps> = (props: RenderItemProps) => {
  const Template = importView(props);

  return (
    <React.Suspense fallback={<Spin indicator={antIcon} />}>
      <Template {...props} />
    </React.Suspense>
  );
};

export default LoadTemplate;
