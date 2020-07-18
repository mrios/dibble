import React, { FC, useState, useEffect } from 'react';
import { Row, Col, Card, Switch, Radio, Form } from 'antd';
import WorkspaceOptions from './WorkspaceOptions';
import { useTranslation } from 'react-i18next';

interface WorkspaceProps {
  component: any;
  data?: any;
}

const defaultCardProps = {
  on: true,
  title: 'Card title',
  hoverable: false,
  transparent: false,
  span: 18,
  offset: 0,
  extra: undefined,
  style: {
    width: '100%',
    alignText: 'left' as const,
  },
};

const Workspace: FC<WorkspaceProps> = (props) => {
  const { t } = useTranslation();
  const [workspaceTheme, setWorkspaceTheme] = useState(
    props?.data?.theme || 'light'
  );
  const [workspaceJustify, setWorkspaceJustify] = useState(
    props?.data?.justify || 'center'
  );
  const [cardProps, setCardProps] = useState(defaultCardProps);
  const ComponentItem = props?.component;

  useEffect(() => {
    setCardProps(Object.assign(defaultCardProps, props?.data));
  }, []);

  const optionsJustify = [
    { label: 'start', value: 'start' },
    { label: 'center', value: 'center' },
    { label: 'end', value: 'end' },
  ];

  const onUpdate = (values: any) => {
    setCardProps(values);
  };
  return (
    <Row>
      <Col span={19}>
        <h3 className="section-header">
          {t('dashboard:designer.preview.title')}
        </h3>
        <Row className="toolbar-min">
          <Col offset="1">
            <Form layout="inline">
              <h3 className="section-header">
                {t('dashboard:designer.workspace')}
              </h3>
              <Form.Item
                name="workspaceTheme"
                label={t('dashboard:designer.preview.theme')}
              >
                <Switch
                  checked={workspaceTheme === 'light'}
                  checkedChildren="light"
                  unCheckedChildren="dark"
                  onChange={(value) =>
                    setWorkspaceTheme(value ? 'light' : 'dark')
                  }
                  size="small"
                />
              </Form.Item>
              <Form.Item name="workspaceTheme" label="Justify">
                <Radio.Group
                  defaultValue={workspaceJustify || 'center'}
                  options={optionsJustify}
                  onChange={(el) => setWorkspaceJustify(el.target.value)}
                  value={workspaceJustify || 'center'}
                  optionType="button"
                  size="small"
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Row
          className={`component-wrapper ${workspaceTheme}-theme`}
          justify={workspaceJustify}
        >
          <Col
            span={cardProps?.span || defaultCardProps.span}
            offset={cardProps?.offset || defaultCardProps.offset}
          >
            {
              // TODO: redefine next loading ComponentItem supporting Card.Grid, re-use it in LoadComponent
              ComponentItem ? (
                cardProps?.on ? (
                  <Card
                    {...cardProps}
                    size="small"
                    className={cardProps?.transparent ? 'card-transparent' : ''}
                  >
                    <React.Suspense fallback="Loading...">
                      <ComponentItem data={null} />
                    </React.Suspense>
                  </Card>
                ) : (
                  <React.Suspense fallback="Loading...">
                    <ComponentItem data={null} />
                  </React.Suspense>
                )
              ) : (
                <p>Please, select a component from the component gallery</p>
              )
            }
          </Col>
        </Row>
      </Col>
      <Col span={5} className="component-options">
        <h3 className="section-header">Options</h3>
        <WorkspaceOptions card={cardProps} onUpdate={onUpdate} />
      </Col>
    </Row>
  );
};

export default Workspace;
