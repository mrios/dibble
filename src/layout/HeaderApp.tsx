import React, { useContext } from 'react';
import { Layout, Dropdown, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

import {
  AppContext,
  TOGGLE_MENU,
  CHANGE_LANG,
} from './../components/app/state/AppContext';
import BreadcrumbApp from './BreadcrumbApp';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Header } = Layout;

const HeaderApp = () => {
  const { state, dispatch } = useContext(AppContext);
  const { t, i18n } = useTranslation();
  const menuLang = (
    <Menu
      onClick={({ key }) => {
        dispatch({
          type: CHANGE_LANG,
          payload: key,
        });
        i18n.changeLanguage(key);
      }}
    >
      <Menu.Item key="en" className={state.appLang === 'en' ? 'active' : ''}>
        English
      </Menu.Item>
      <Menu.Item key="es" className={state.appLang === 'es' ? 'active' : ''}>
        Español
      </Menu.Item>
    </Menu>
  );
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
      <div className="user-controls">
        <Dropdown.Button overlay={menuLang}>
          <Link to="logout">{t('header:sign_out')}</Link>
        </Dropdown.Button>
      </div>
    </Header>
  );
};

export default HeaderApp;
