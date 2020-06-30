import React, { lazy, CSSProperties } from 'react';
import { Col, Card, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface RenderItemProps {
  relativePath: string;
  group: string;
  component: string;
  title: string;
  span: number;
  offset?: number;
  iterable?: boolean;
  data: any;
  key: string;
  card?: {
    title: string;
    extra?: string;
    hoverable?: boolean;
    style?: CSSProperties;
    transparent?: boolean;
  };
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const importView = ({ relativePath, group, component }: RenderItemProps) =>
  lazy(() =>
    import(`${relativePath}/${group}/${component}`).catch(() =>
      import('./NullComponent')
    )
  );

const LoadComponent: React.FC<RenderItemProps> = (props: RenderItemProps) => {
  const Component = importView(props);
  const ToRender =
    props.iterable && props.data && Array.isArray(props.data) ? (
      <>
        {props.data.map((item: any, i: number) => (
          <Component {...item} key={`subcomponent-${i}`} />
        ))}
      </>
    ) : (
      <Component {...props.data} />
    );
  return (
    <Col span={props.span} offset={props.offset} key={props.key}>
      {props.card ? (
        props.card.style ? (
          <Card
            className={props.card.transparent ? 'card-transparent' : ''}
            title={props.card.title}
            size="small"
            extra={
              <a href="#">{props.card.extra ? props.card.extra : undefined}</a>
            }
          >
            <Card.Grid
              style={props.card.style}
              hoverable={props.card.hoverable}
            >
              <React.Suspense fallback={<Spin indicator={antIcon} />}>
                {ToRender}
              </React.Suspense>
            </Card.Grid>
          </Card>
        ) : (
          <Card
            className={props.card.transparent ? 'card-transparent' : ''}
            style={props.card.style}
            title={props.card.title}
            size="small"
            extra={
              <a href="#">{props.card.extra ? props.card.extra : undefined}</a>
            }
          >
            <React.Suspense fallback={<Spin indicator={antIcon} />}>
              {ToRender}
            </React.Suspense>
          </Card>
        )
      ) : (
        <React.Suspense fallback={<Spin indicator={antIcon} />}>
          {ToRender}
        </React.Suspense>
      )}
    </Col>
  );
};

export default LoadComponent;
