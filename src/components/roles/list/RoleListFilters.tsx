import React from 'react';
import { Form, Input, Button } from 'antd';
import { SearchOutlined, PlusCircleTwoTone } from '@ant-design/icons';
import { Store } from 'antd/es/form/interface';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

interface FilterProps {
  onSearch: any;
}

const RoleListFilters = (props: FilterProps) => {
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
        <Form.Item name="name" label={t('settings:roles.list.filters.name')}>
          <Input
            placeholder={t('settings:roles.list.filters.name_placeholder')}
          />
        </Form.Item>
        <Form.Item
          name="description"
          label={t('settings:roles.list.filters.description')}
        >
          <Input
            placeholder={t(
              'settings:roles.list.filters.description_placeholder'
            )}
          />
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Button type="primary" htmlType="submit" icon={<SearchOutlined />}>
            {t('settings:roles.list.filters.actions.search')}
          </Button>
        </Form.Item>
        <Form.Item {...buttonItemLayout} className="pull-right">
          <Link to="/settings/roles/new">
            <Button
              type="ghost"
              icon={<PlusCircleTwoTone twoToneColor="#52c41a" />}
            >
              {t('settings:roles.list.filters.actions.add')}
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </>
  );
};

RoleListFilters.propTypes = {};
export default RoleListFilters;
