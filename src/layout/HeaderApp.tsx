import React, { useContext } from 'react';
import { Layout, Dropdown, Menu, Tooltip, Button, Badge, Avatar } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  ControlOutlined,
  PoweroffOutlined,
} from '@ant-design/icons';

import {
  AppContext,
  TOGGLE_MENU,
  CHANGE_LANG,
  TOGGLE_MENU_THEME,
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
        i18n.changeLanguage(key as string);
      }}
    >
      <Menu.ItemGroup title="Select Language">
        <Menu.Item key="en" className={state.app.lang === 'en' ? 'active' : ''}>
          English
        </Menu.Item>
        <Menu.Item key="es" className={state.app.lang === 'es' ? 'active' : ''}>
          Español
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  );
  const menuUser = (
    <Menu>
      <Menu.Item key="profile" icon={<ControlOutlined />}>
        <Link to="/profile">{t('header:profile')}</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<PoweroffOutlined />}>
        <Link to="/logout">{t('header:sign_out')}</Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <Header className="site-layout-background site-header">
      {React.createElement(
        state.app.ui.sider.isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
        {
          className: 'trigger-menu',
          onClick: () =>
            dispatch({
              type: TOGGLE_MENU,
              payload: !state.app.ui.sider.isCollapsed,
            }),
        }
      )}
      <BreadcrumbApp />
      <div className="user-controls">
        <Tooltip title="notifications">
          <Badge dot offset={[-10, 10]}>
            <Link to="/notifications">
              <Button type="text" shape="circle" icon={<BellOutlined />} />
            </Link>
          </Badge>
        </Tooltip>
        <Tooltip title="help">
          <Link to="/help">
            <Button
              type="text"
              shape="circle"
              icon={<QuestionCircleOutlined />}
            />
          </Link>
        </Tooltip>

        <Dropdown overlay={menuLang}>
          <Link to="/logout">
            <Button type="text" shape="circle" icon={<SettingOutlined />} />
          </Link>
        </Dropdown>
        <Dropdown overlay={menuUser}>
          <Avatar icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  );
};

export default HeaderApp;
