import React, { useContext } from 'react';
import { Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import { AppContext, TOGGLE_MENU } from './../components/app/state/AppContext';
import BreadcrumbApp from './BreadcrumbApp';

const { Header } = Layout;

const HeaderApp = () => {
  const { state, dispatch } = useContext(AppContext);
  return (
    <Header className="site-layout-background site-header">
      {React.createElement(
        state.isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          className: 'trigger-menu',
          onClick: () =>
            dispatch({
              type: TOGGLE_MENU,
              payload: !state.isCollapsed,
            }),
        }
      )}
      <BreadcrumbApp />
    </Header>
  );
};

export default HeaderApp;
