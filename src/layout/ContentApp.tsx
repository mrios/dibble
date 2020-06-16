import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './../app-config/Routes';
import { Layout } from 'antd';
import HeaderApp from './HeaderApp';

const { Content } = Layout;

const ContentApp: FC = (props) => {
  return (
    <Layout className="site-layout">
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
