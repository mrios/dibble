import React, { useState, useEffect, useContext, lazy } from 'react';

import { Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { AppContext, TOGGLE_MENU } from '../app/state/AppContext';
import { useComponentFacade } from './components/state/component.hooks';
import ComponentSelector from './designer/ComponentSelector';
import Workspace from './designer/Workspace';

const DashboardDesigner = (props: any) => {
  const { t } = useTranslation();
  const { dispatch } = useContext(AppContext);
  const [components, setComponents] = useState({} as { [key: string]: any });
  const [stateComponent] = useComponentFacade();
  const [activeComponent, setActiveComponent] = useState('');

  useEffect(() => {
    // Toggle sider menu on init
    dispatch({
      type: TOGGLE_MENU,
      payload: true,
    });
  }, []);

  const importView = ({ group, component }: any) =>
    lazy(() =>
      import(`./components/${group}/${component}`).catch(() =>
        import('./NullComponent')
      )
    );

  useEffect(() => {
    // Load all components (Is this convenient?)
    stateComponent?.groups?.forEach((group: any, i: number) => {
      group?.children?.forEach((c: any, j: number) => {
        const newComponent = importView({
          group: group.key,
          component: c.key,
        });
        setComponents(Object.assign(components, { [c.key]: newComponent }));
      });
    });
  }, [components, stateComponent.groups]);

  const onSelect = (keys: any, event: any) => {
    keys.map(setActiveComponent);
  };

  return (
    <>
      <Row style={{ margin: -24 }} className="dashboard-designer">
        <Col span={4}>
          <h3 className="section-header">Components</h3>
          <ComponentSelector onSelect={onSelect} />
        </Col>
        <Col span={20}>
          <Workspace component={components?.[activeComponent]} />
        </Col>
      </Row>
    </>
  );
};

DashboardDesigner.propTypes = {};
export default DashboardDesigner;
