import React from 'react';
import { VISIBILITY_FILTER } from '../../../roles/state';
import { Row, Col, Select } from 'antd';
import i18n from 'i18next';

export interface RoleAdminFilterProps {
  selectedFilter: VISIBILITY_FILTER;
  onChange: Function;
}

const RoleAdminFilter = (props: RoleAdminFilterProps) => {
  return (
    <Row className="toolbar-min toolbar-top">
      <Col offset="1">
        <span className="toolbar-min-header">
          {i18n.t('roles:admin.list.filters.title')}
        </span>

        <Select
          size="small"
          value={props.selectedFilter}
          style={{ width: 120 }}
          onChange={(value) => props.onChange(value)}
        >
          <Select.Option value="SHOW_ALL">
            {i18n.t('roles:admin.list.filters.all')}
          </Select.Option>
          <Select.Option value="SHOW_ACTIVE">
            {i18n.t('roles:admin.list.filters.active')}
          </Select.Option>
        </Select>
      </Col>
    </Row>
  );
};

RoleAdminFilter.propTypes = {};
export default RoleAdminFilter;
