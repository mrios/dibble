import React from 'react';

import { Role, useRolesFacade } from '../state';
import { Button, Tag } from 'antd';
import { useHistory } from 'react-router-dom';
import { ColumnsType } from 'antd/lib/table';
import ListBasic from '../../common/list/ListBasic';
import { RoleAdminFilter } from '..';
import RoleListFilters from './RoleListFilters';
import { useTranslation } from 'react-i18next';

const RoleList = () => {
  const { t } = useTranslation();
  const [{ roles, filter }, actions] = useRolesFacade();
  let history = useHistory();

  const toggleActive = (role: Role) => {
    actions.toggleActive(role);
  };

  const editRole = (role: Role) => {
    history.push(`/settings/roles/${role.id}`);
  };

  const deleteRole = (role: Role) => {
    actions.deleteRole(role);
  };

  const columns: ColumnsType<{}> = [
    {
      title: t('settings:roles.list.name'),
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: t('settings:roles.list.description'),
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: t('settings:roles.list.active'),
      dataIndex: 'active',
      key: 'active',
      render: (value, record) => [
        value ? (
          <Tag
            color="#87d068"
            key="active"
            onClick={(_) => toggleActive(record as Role)}
          >
            {t('settings:roles.list.status.active')}
          </Tag>
        ) : (
          <Tag key="inactive" onClick={(_) => toggleActive(record as Role)}>
            {t('settings:roles.list.status.inactive')}
          </Tag>
        ),
      ],
    },
    {
      title: t('settings:roles.list.createdAt'),
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: t('settings:roles.list.operations'),
      dataIndex: 'id',
      key: 'id',
      render: (value, record) => [
        <Button
          type="primary"
          size="small"
          key="edit"
          onClick={(_) => editRole(record as Role)}
        >
          {t('settings:roles.list.actions.edit')}
        </Button>,
        <Button
          size="small"
          key="remove"
          onClick={(_) => deleteRole(record as Role)}
        >
          {t('settings:roles.list.actions.remove')}
        </Button>,
      ],
    },
  ];

  return (
    <>
      <RoleAdminFilter
        onChange={actions.updateFilter}
        selectedFilter={filter}
      />
      <RoleListFilters onSearch={actions.applyFilter} />
      <ListBasic data={roles} columns={columns} extraClass="round-borders" />
    </>
  );
};

RoleList.propTypes = {};
export default RoleList;
