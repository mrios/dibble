import React from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnsType } from 'antd/lib/table';
import { Tag } from 'antd';
import { useUsersFacade } from '../../../users/state';
import ListBasic from '../../../common/list/ListBasic';

const TableDefault = () => {
  const { t } = useTranslation();
  const [{ users }] = useUsersFacade();
  const columns: ColumnsType<{}> = [
    {
      title: t('settings:users.list.username'),
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: t('settings:users.list.first_name'),
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: t('settings:users.list.last_name'),
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: t('settings:users.list.active'),
      dataIndex: 'active',
      key: 'active',
      render: (value, record) => [
        value ? (
          <Tag color="#87d068" key="active">
            {t('settings:users.list.status.active')}
          </Tag>
        ) : (
          <Tag key="inactive">{t('settings:users.list.status.inactive')}</Tag>
        ),
      ],
    },
  ];
  return <ListBasic data={users} columns={columns} />;
};

TableDefault.propTypes = {};
export default TableDefault;
