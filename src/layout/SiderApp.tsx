import React, { FC, useContext } from 'react';
import { AppContext } from './../components/app/state/AppContext';
import { Layout } from 'antd';
import { SwapRightOutlined } from '@ant-design/icons';

import AppMenu from './menu-items/AppMenu';
import { Route, Switch } from 'react-router-dom';

const { Sider } = Layout;
const AppName = 'Dibble';

const SiderApp: FC = () => {
  const { state } = useContext(AppContext);

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={state.isCollapsed}
      width={state.siderWidth}
    >
      <div className="brand">
        {state.hasLogoImage ? <div className="logo" /> : <SwapRightOutlined />}
        <div className="name">{AppName}</div>
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
