import React, { FC } from 'react';
import { Menu } from 'antd';
import { HomeFilled, SettingFilled, FileDoneOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const AppMenu: FC = () => {
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1" icon={<HomeFilled />}>
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.SubMenu key="2" icon={<FileDoneOutlined />} title="Docs">
        <Menu.Item key="3">
          <Link to="/docs">App</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/docs/api">API-Doc</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="5" icon={<SettingFilled />}>
        <Link to="/settings">Settings</Link>
      </Menu.Item>
    </Menu>
  );
};

export default AppMenu;
