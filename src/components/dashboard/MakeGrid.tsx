import React, { lazy, useState } from 'react';
import { Row, Col, Card, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface RenderItemProps {
  groupName: string;
  componentName: string;
  iconName: string;
}

interface MakeGridProps {
  renderItem: RenderItemProps;
  cols: number;
  data: any;
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const importView = ({ groupName, componentName }: RenderItemProps) =>
  lazy(() =>
    import(`./${groupName}/${componentName}`).catch(() =>
      import('./NullComponent')
    )
  );

// const importIcon = (iconName: string) =>
// lazy(() =>
//   import(`'@ant-design/icons/${iconName}'`).catch(() =>
//     import('./common/NullComponent')
//   )
// );

const MakeGrid: React.FC<MakeGridProps> = (props: MakeGridProps) => {
  const [components, setComponents] = useState({} as { [key: string]: any });
  // const [icons, setIcons] = useState({} as { [key: string]: any });
  const addComponent = (renderItem: RenderItemProps) => {
    if (components[renderItem.componentName]) return;

    const Component = importView(renderItem);
    setComponents((c) => ({ ...c, [renderItem.componentName]: Component }));
  };

  addComponent(props.renderItem);

  // const addIcon = (renderItem: RenderItemProps) => {
  //   if (renderItem.iconName && renderItem.iconName.length > 0) {
  //     if (icons[renderItem.iconName]) return;

  //     const Icon = importIcon(renderItem.iconName);
  //     setIcons((icons) => ({ ...icons, [renderItem.iconName]: Icon }));
  //   }
  // };

  const Cols = ({ data, renderItem, cols }: MakeGridProps) => {
    // addIcon(props.renderItem);

    const Component = components[renderItem.componentName];
    // const Icon = renderItem.iconName ? icons[renderItem.iconName] : <>More</>;
    return data.map((item: any, i: number) => (
      <Col span={Math.ceil(24 / cols)} key={i}>
        <Card title={item.title} size="small" extra={<a href="#">More</a>}>
          <React.Suspense fallback={<Spin indicator={antIcon} />}>
            <Component {...item} />
          </React.Suspense>
        </Card>
      </Col>
    ));
  };

  return (
    <Row gutter={[16, 16]}>
      <Cols {...props} />
    </Row>
  );
};

export default MakeGrid;
