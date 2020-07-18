import React, { FC, useContext } from 'react';
import { Menu } from 'antd';
import {
  HomeFilled,
  SettingFilled,
  FileDoneOutlined,
  BarsOutlined,
  DashboardOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../../components/app/state/AppContext';

const AppMenu: FC = () => {
  const { t } = useTranslation();
  const { state } = useContext(AppContext);
  return (
    <Menu
      theme={state.app.ui.sider.theme}
      mode="inline"
      defaultSelectedKeys={['1']}
      style={{
        height: '84vh',
      }}
    >
      <Menu.Item key="home" icon={<HomeFilled />}>
        <Link to="/">{t('menu:home')}</Link>
      </Menu.Item>

      <Menu.SubMenu
        key="dashboard-submenu"
        icon={<DashboardOutlined />}
        title={t('menu:dashboard.group')}
      >
        <Menu.Item key="dashboard-designer">
          <Link to="/dashboard/designer">{t('menu:dashboard.designer')}</Link>
        </Menu.Item>
        <Menu.Item key="dashboard-demo">
          <Link to="/dashboard/preview/demo">{t('menu:dashboard.demo')}</Link>
        </Menu.Item>
      </Menu.SubMenu>

      <Menu.Item key="reports" icon={<BarsOutlined />}>
        <Link to="/reports">{t('menu:reports')}</Link>
      </Menu.Item>
      <Menu.Item key="notifications" icon={<BellOutlined />}>
        <Link to="/notifications">{t('menu:notifications')}</Link>
      </Menu.Item>
      <Menu.ItemGroup key="admin" title="Admin">
        <Menu.SubMenu
          key="admin1"
          icon={<FileDoneOutlined />}
          title={t('menu:docs.group')}
        >
          <Menu.Item key="admin2">
            <Link to="/docs/app">{t('menu:docs.app')}</Link>
          </Menu.Item>
          <Menu.Item key="admin3">
            <Link to="/docs/api">{t('menu:docs.api')}</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu
          key="admin4"
          icon={<SettingFilled />}
          title={t('menu:settings.group')}
        >
          <Menu.Item key="admin5">
            <Link to="/settings/users">{t('menu:settings.users')}</Link>
          </Menu.Item>
          <Menu.Item key="admin6">
            <Link to="/settings/roles">{t('menu:settings.roles')}</Link>
          </Menu.Item>
        </Menu.SubMenu>
      </Menu.ItemGroup>
    </Menu>
  );
};

export default AppMenu;
