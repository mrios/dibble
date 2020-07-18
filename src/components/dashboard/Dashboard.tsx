import React, { useState, useEffect } from 'react';
import { useDashboardFacade } from './state/dashboard.hooks';
import LoadTemplate from './LoadTemplate';
import { Row, Col, Select } from 'antd';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type ObjectStringType = {
  [key: string]: string;
};

const templates: ObjectStringType = {
  'on-demand': 'DashboardOnDemand',
  'on-demand-tabs-left': 'DashboardOnDemandTabsLeft',
};

const Dashboard = (props: any) => {
  const { id } = useParams();
  const [stateDashboard] = useDashboardFacade({ id: id });

  const { t } = useTranslation();
  const [template, setTemplate] = useState('on-demand');
  const [templateDashboardView, setTemplateDashboardView] = useState(
    LoadTemplate({
      template: templates[template],
      data: stateDashboard.data,
      onChange: () => {},
    })
  );

  useEffect(() => {
    setTemplateDashboardView(
      LoadTemplate({
        template: templates[template],
        data: stateDashboard.data,
        onChange: () => {},
      })
    );
  }, [stateDashboard, template]);

  const changeTemplate = (tpl: string) => {
    setTemplate(tpl);
    setTemplateDashboardView(
      LoadTemplate({
        template: templates[tpl],
        data: stateDashboard.data,
        onChange: setTemplate,
      })
    );
  };

  return (
    <>
      <Row className="toolbar-min toolbar-top">
        <Col offset="1">
          <span className="toolbar-min-header">
            {t('dashboard:admin.select_template')}
          </span>

          <Select
            size="small"
            value={template}
            style={{ width: 220 }}
            onChange={(value) => changeTemplate(value)}
          >
            <Select.Option value="on-demand">On demand</Select.Option>
            <Select.Option value="on-demand-tabs-left">
              On demand Tabs on the left
            </Select.Option>
          </Select>
        </Col>
      </Row>
      {templateDashboardView}
    </>
  );
};

Dashboard.propTypes = {};
export default Dashboard;
