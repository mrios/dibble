import React, { FC, useContext } from 'react';
import { AppContext } from './../components/app/state/AppContext';
import { Layout } from 'antd';
import { SwapRightOutlined } from '@ant-design/icons';

import AppMenu from './menu-items/AppMenu';
import { Route, Switch } from 'react-router-dom';

const { Sider } = Layout;

const SiderApp: FC = () => {
  const { state } = useContext(AppContext);
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={state.app.ui.sider.isCollapsed}
      width={state.app.ui.sider.width}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
      <div
        className="brand"
        style={{ backgroundColor: state.app.ui.brand.backgroundColor }}
      >
        {state.app.ui.brand.imageUrl.length > 0 ? (
          <img
            src={state.app.ui.brand.imageUrl}
            alt="Logo"
            width="180"
            height="32"
          />
        ) : (
          <>
            <SwapRightOutlined />
            <div className="name">{state.app.name}</div>
          </>
        )}
      </div>
      <Switch>
        <Route path="/">
          <AppMenu />
        </Route>
      </Switch>
    </Sider>
  );
};

export default SiderApp;
