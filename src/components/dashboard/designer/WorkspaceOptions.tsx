import React, { FC, useEffect } from 'react';
import { Row, Col, Form, Input, Switch, Slider, Button, Radio } from 'antd';
import { useComponentFacade } from '../components/state/component.hooks';

interface WorkspaceOptionsProps {
  workspace?: {
    theme: 'light' | 'dark';
    justify: 'left' | 'center';
  };
  card?: {
    on: boolean;
    span: number;
    offset: number;
    title: string;
    transparent: boolean;
    hoverable: boolean;
    style?: {
      alignText: 'left' | 'center' | 'right';
    };
  };
  component?: any;
  onUpdate: Function;
}
const WorkspaceOptions: FC<WorkspaceOptionsProps> = (props) => {
  const [{ active }, actions] = useComponentFacade();
  const [form] = Form.useForm();
  // const { t } = useTranslation();

  const onFinish = (values: any) => {
    props.onUpdate(values);
  };

  const updateField = (field: string, value: any) => {
    form.setFieldsValue({ [field]: value });
    props.onUpdate(form.getFieldsValue());
  };

  useEffect(() => {
    if (props.card) {
      form.setFieldsValue(props.card);
    }
  }, [form, active, actions, props.card]);

  const optionsAlignText = [
    { label: 'start', value: 'start' },
    { label: 'center', value: 'center' },
    { label: 'end', value: 'end' },
  ];

  return (
    <Form
      layout="inline"
      form={form}
      onFinish={onFinish}
      style={{ padding: '0 12px' }}
      className="form-options"
    >
      <Row>
        <Col span={24}>
          <h4 className="subsection-header">Card</h4>
          <Form.Item name="on" label="Wrapped in Card">
            <Switch
              defaultChecked={props?.card?.on || true}
              checkedChildren="yes"
              unCheckedChildren="no"
              size="small"
              onChange={(value) => updateField('on', value)}
            />
          </Form.Item>
          <div
            style={{
              visibility: form.getFieldValue('on') ? 'inherit' : 'hidden',
              display: form.getFieldValue('on') ? 'inherit' : 'none',
            }}
          >
            <Form.Item name="span" label={`Width [${props?.card?.span || 18}]`}>
              <Slider
                min={6}
                max={24}
                defaultValue={props?.card?.span || 18}
                onChange={(value: number) => updateField('span', value)}
              />
            </Form.Item>
            <Form.Item
              name="offset"
              label={`Offset [${props?.card?.offset || 0}]`}
            >
              <Slider
                min={0}
                max={6}
                defaultValue={props?.card?.offset || 0}
                onChange={(value: number) => updateField('offset', value)}
              />
            </Form.Item>
            <Form.Item name="title" label="Title">
              <Input
                placeholder="..."
                size="small"
                onChange={(e) => updateField('title', e.target.value)}
              />
            </Form.Item>
            <Form.Item name="transparent" label="Transparent">
              <Switch
                checked={props?.card?.transparent || false}
                checkedChildren="yes"
                unCheckedChildren="no"
                size="small"
                onChange={(value: boolean) => updateField('transparent', value)}
              />
            </Form.Item>
            <Form.Item name="hoverable" label="Hoverable">
              <Switch
                checked={props?.card?.hoverable || false}
                checkedChildren="yes"
                unCheckedChildren="no"
                size="small"
                onChange={(value: boolean) => updateField('hoverable', value)}
              />
            </Form.Item>
            <Form.Item name="style.alignText" label="Align content">
              <Radio.Group
                defaultValue={props?.card?.style?.alignText || 'center'}
                options={optionsAlignText}
                onChange={(el) =>
                  updateField('style', { alignText: el.target.value })
                }
                value={props?.card?.style?.alignText || 'center'}
                optionType="button"
                size="small"
              />
            </Form.Item>
          </div>
        </Col>
        <Col span={24}>
          <h4 className="subsection-header">Component</h4>
          <Form.Item name="name" label="Name">
            <Input placeholder="..." size="small" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default WorkspaceOptions;
