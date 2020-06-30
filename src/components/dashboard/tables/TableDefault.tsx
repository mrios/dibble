import React from 'react';
import ListBasic from '../../common/list/ListBasic';
import { useUsersFacade } from '../../users/state';
import { useTranslation } from 'react-i18next';
import { ColumnsType } from 'antd/lib/table';
import { Tag } from 'antd';

const TableDefault = (props: any) => {
  const { t } = useTranslation();
  const [{ users }] = useUsersFacade();
  const columns: ColumnsType<{}> = [
    {
      title: t('users:list.username'),
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: t('users:list.first_name'),
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: t('users:list.last_name'),
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: t('users:list.active'),
      dataIndex: 'active',
      key: 'active',
      render: (value, record) => [
        value ? (
          <Tag color="#87d068" key="active">
            {t('users:list.status.active')}
          </Tag>
        ) : (
          <Tag key="inactive">{t('users:list.status.inactive')}</Tag>
        ),
      ],
    },
  ];
  return <ListBasic data={users} columns={columns} />;
};

TableDefault.propTypes = {};
export default TableDefault;
