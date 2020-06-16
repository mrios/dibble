import React, { FC } from 'react';
import { Menu } from 'antd';
import { HomeFilled, SettingFilled, FileDoneOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AppMenu: FC = () => {
  const { t } = useTranslation();
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
      <Menu.Item key="1" icon={<HomeFilled />}>
        <Link to="/">{t('menu:home')}</Link>
      </Menu.Item>
      <Menu.SubMenu key="2" icon={<FileDoneOutlined />} title={t('menu:docs')}>
        <Menu.Item key="3">
          <Link to="/docs">{t('menu:docs')}</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/docs/api">{t('menu:api_docs')}</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="5" icon={<SettingFilled />}>
        <Link to="/settings">{t('menu:settings')}</Link>
      </Menu.Item>
    </Menu>
  );
};

export default AppMenu;
