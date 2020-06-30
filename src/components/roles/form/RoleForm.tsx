import React, { useEffect } from 'react';
import { Form, Input, Button, Switch, Divider, Typography } from 'antd';
import { Role, useRolesFacade } from '../state';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const RoleForm = (props: any) => {
  const [{ active }, actions] = useRolesFacade();
  const [form] = Form.useForm();
  const { id } = useParams();
  const { t } = useTranslation();

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

  const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 4 },
  };

  const onFinish = (values: any) => {
    actions.saveRole(values as Role);
  };

  useEffect(() => {
    if (id) {
      actions.setActive(id);
    }
    if (active) {
      form.setFieldsValue(active);
    }
  }, [form, id, active, actions]);

  return (
    <Form
      {...formItemLayout}
      layout="horizontal"
      form={form}
      onFinish={onFinish}
      style={{ padding: 24 }}
    >
      <Title level={4}>{t('roles:form.title')}</Title>
      <Divider />
      <Form.Item name="name" label={t('roles:form.name')}>
        <Input placeholder={t('roles:form.name_placeholder')} />
      </Form.Item>
      <Form.Item name="description" label={t('roles:form.description')}>
        <Input placeholder={t('roles:form.description_placeholder')} />
      </Form.Item>
      <Form.Item name="active" label={t('roles:form.active')}>
        <Switch defaultChecked />
      </Form.Item>
      <Form.Item {...buttonItemLayout}>
        <Button type="primary" htmlType="submit">
          {t('roles:form.actions.submit')}
        </Button>
      </Form.Item>
    </Form>
  );
};

RoleForm.propTypes = {};
export default RoleForm;
