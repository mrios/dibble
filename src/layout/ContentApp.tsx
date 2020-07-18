import React, { FC, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './../app-config/Routes';
import { Layout } from 'antd';
import HeaderApp from './HeaderApp';
import { AppContext } from '../components/app/state/AppContext';

const { Content } = Layout;

const ContentApp: FC = (props) => {
  const { state } = useContext(AppContext);
  return (
    <Layout
      className="site-layout"
      style={{
        marginLeft: state.app.ui.sider.isCollapsed
          ? 80
          : state.app.ui.sider.width,
      }}
    >
      <HeaderApp />
      <Content
        className="site-layout-background"
        style={{
          padding: 24,
          minHeight: '100vh',
        }}
      >
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              children={<route.component />}
            />
          ))}
        </Switch>
      </Content>
    </Layout>
  );
};

export default ContentApp;
