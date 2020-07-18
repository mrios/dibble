import React from 'react';

import { User, useUsersFacade } from '../state';
import { Button, Tag } from 'antd';
import { useHistory } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import ListBasic from '../../common/list/ListBasic';
//import { RoleAdminFilter } from '..';
import UserListFilters from './UserListFilters';
import { useTranslation } from 'react-i18next';

const UserList = () => {
  const { t } = useTranslation();
  const [{ users }, actions] = useUsersFacade();
  let history = useHistory();

  const toggleActive = (user: User) => {
    actions.toggleActive(user);
  };

  const editUser = (user: User) => {
    history.push(`/settings/users/${user.id}`);
  };

  const deleteUser = (user: User) => {
    actions.deleteUser(user);
  };

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
          <Tag
            color="#87d068"
            key="active"
            onClick={(_) => toggleActive(record as User)}
          >
            {t('settings:users.list.status.active')}
          </Tag>
        ) : (
          <Tag key="inactive" onClick={(_) => toggleActive(record as User)}>
            {t('settings:users.list.status.inactive')}
          </Tag>
        ),
      ],
    },
    {
      title: t('settings:users.list.createdAt'),
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: t('settings:users.list.operations'),
      dataIndex: 'id',
      key: 'id',
      render: (value, record) => [
        <Button
          type="primary"
          size="small"
          key="edit"
          onClick={(_) => editUser(record as User)}
        >
          {t('settings:users.list.actions.edit')}
        </Button>,
        <Button
          size="small"
          key="remove"
          onClick={(_) => deleteUser(record as User)}
        >
          {t('settings:users.list.actions.remove')}
        </Button>,
      ],
    },
  ];

  return (
    <>
      {/* <RoleAdminFilter
        onChange={actions.updateFilter}
        selectedFilter={filter}
      /> */}
      <UserListFilters onSearch={actions.applyFilter} />
      <ListBasic data={users} columns={columns} extraClass="round-borders" />
    </>
  );
};

UserList.propTypes = {};
export default UserList;
