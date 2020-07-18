import React, { useState, useEffect, useContext } from 'react';
import HeaderContent from '../../../layout/HeaderContent';
import { useTranslation } from 'react-i18next';
import { Layout, Row, Tabs, Space, Col, Switch } from 'antd';
import LoadComponent from '../LoadComponent';
import {
  AppContext,
  UPDATE_APP_NAME,
  UPDATE_APP_LOGO,
  UPDATE_APP_LOGO_BG,
  CHANGE_LANG,
} from '../../app/state/AppContext';
import { getBackgroundStylesFromJSON as getBackground } from './../../../utils/utils';

const { Content } = Layout;

interface DashboardTemplateProps {
  data: any;
}
const DashboardOnDemand = (props: DashboardTemplateProps) => {
  const { t, i18n } = useTranslation();
  const { state, dispatch } = useContext(AppContext);
  const [backgroundHeader, setBackgroundHeader] = useState(
    props.data?.datasets?.[0]?.meta?.header?.background || 'inherit'
  );
  const [backgroundBody, setBackgroundBody] = useState(
    props.data?.datasets?.[0]?.meta?.body?.background || 'inherit'
  );
  const [theme, setTheme] = useState(props?.data?.theme || 'light');
  const onChangeTab = (activeKey: any) => {
    const dataset = props.data.datasets?.[activeKey - 1];
    setBackgroundHeader(
      dataset?.meta?.header?.background
        ? dataset.meta.header.background
        : 'inherit'
    );
    setBackgroundBody(
      dataset?.meta?.body?.background ? dataset.meta.body.background : 'inherit'
    );
  };

  useEffect(() => {
    // Update name app
    if (props?.data?.meta?.app?.name) {
      dispatch({
        type: UPDATE_APP_NAME,
        payload: props.data.meta.app.name,
      });
    }
    // Update name logo
    if (props?.data?.meta?.app?.logoImage) {
      dispatch({
        type: UPDATE_APP_LOGO,
        payload: props.data.meta.app.logoImage,
      });
      dispatch({
        type: UPDATE_APP_LOGO_BG,
        payload: props?.data?.meta?.app?.logoBackground || 'transparent',
      });
    }
    // Change lang
    if (props?.data?.lang) {
      dispatch({
        type: CHANGE_LANG,
        payload: props.data.lang,
      });
      i18n.changeLanguage(props.data.lang);
    }
  }, [props, dispatch, i18n]);

  return (
    <Content
      className={`template-on-demand ${theme}-theme`}
      style={{ ...getBackground(backgroundBody), margin: -24, padding: 24 }}
    >
      <HeaderContent
        title={props && props.data && props.data.title}
        extraClass={'header-nested-tabs'}
        background={getBackground(backgroundHeader)}
      >
        <Row>
          <Col span={20}>
            <Space direction="vertical" size="large">
              <p>{props && props.data && props.data.subtitle}</p>
              <Space></Space>
            </Space>
          </Col>
          <Col span={4}>
            Theme
            <Switch
              defaultChecked={theme === 'light'}
              checkedChildren="light"
              unCheckedChildren="dark"
              onChange={(value) => setTheme(value ? 'light' : 'dark')}
              style={{ marginLeft: 10 }}
            />
          </Col>
        </Row>
      </HeaderContent>
      <Tabs
        tabPosition="top"
        defaultActiveKey="1"
        className="nested-tabs"
        onChange={onChangeTab}
      >
        {props?.data?.datasets.map((dataset: any, i: number) => (
          <Tabs.TabPane tab={dataset.title} key={i + 1}>
            {dataset.rows &&
              dataset.rows.map((row: any, i: number) => (
                <Row gutter={[16, 16]} key={`row-${i}`}>
                  {row.cols
                    ? row.cols.map((col: any, j: number) => {
                        return LoadComponent({
                          ...col,
                          relativePath: '.',
                          key: `col-${i}-${j}`,
                        });
                      })
                    : LoadComponent({
                        ...row,
                        relativePath: '.',
                        key: `col-${i}`,
                      })}
                </Row>
              ))}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </Content>
  );
};

DashboardOnDemand.propTypes = {};
export default DashboardOnDemand;
