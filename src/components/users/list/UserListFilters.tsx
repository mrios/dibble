import React from 'react';
import { Form, Input, Button } from 'antd';
import { SearchOutlined, PlusCircleTwoTone } from '@ant-design/icons';
import { Store } from 'antd/es/form/interface';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface FilterProps {
  onSearch: any;
}

const UserListFilters = (props: FilterProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 4 },
  };
  return (
    <>
      <Form
        className="form-filter-inline"
        layout="inline"
        form={form}
        onFinish={(values: Store) => props.onSearch(values)}
      >
        <Form.Item
          name="username"
          label={t('settings:users.list.filters.username')}
        >
          <Input
            placeholder={t('settings:users.list.filters.username_placeholder')}
          />
        </Form.Item>
        <Form.Item
          name="firstName"
          label={t('settings:users.list.filters.first_name')}
        >
          <Input
            placeholder={t(
              'settings:users.list.filters.first_name_placeholder'
            )}
          />
        </Form.Item>
        <Form.Item
          name="lastName"
          label={t('settings:users.list.filters.last_name')}
        >
          <Input
            placeholder={t('settings:users.list.filters.last_name_placeholder')}
          />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
            {t('settings:users.list.filters.actions.search')}
          </Button>
        </Form.Item>
        <Form.Item {...buttonItemLayout} className="pull-right">
          <Link to="/settings/users/new">
            <Button
              type="ghost"
              icon={<PlusCircleTwoTone twoToneColor="#52c41a" />}
            >
              {t('settings:users.list.filters.actions.add')}
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </>
  );
};

UserListFilters.propTypes = {};
export default UserListFilters;
