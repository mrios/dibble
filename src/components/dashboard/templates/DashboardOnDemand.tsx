import React, { useState, useEffect, useContext } from 'react';
import HeaderContent from '../../../layout/HeaderContent';
import { useTranslation } from 'react-i18next';
import { Row, Tabs, Space } from 'antd';
import LoadComponent from '../LoadComponent';
import {
  AppContext,
  UPDATE_APP_NAME,
  CHANGE_LANG,
} from '../../app/state/AppContext';

interface DashboardTemplateProps {
  data: any;
}
const DashboardOnDemand = (props: DashboardTemplateProps) => {
  const { t, i18n } = useTranslation();
  const { state, dispatch } = useContext(AppContext);
  const [backgroundHeader, setBackgroundHeader] = useState(
    props.data && props.data.datasets[0] && props.data.datasets[0].background
  );
  const onChangeTab = (activeKey: any) => {
    setBackgroundHeader(props.data.datasets[activeKey - 1].background);
  };

  useEffect(() => {
    // Update name app
    if (props.data && props.data.appName) {
      dispatch({
        type: UPDATE_APP_NAME,
        payload: props.data.appName,
      });
    }
    // Change lang
    if (props.data && props.data.lang) {
      dispatch({
        type: CHANGE_LANG,
        payload: props.data.lang,
      });
      i18n.changeLanguage(props.data.lang);
    }
  }, [props, dispatch, i18n]);

  return (
    <>
      <HeaderContent
        title={props && props.data && props.data.title}
        extraClass={'header-nested-tabs'}
        background={backgroundHeader}
      >
        <Space direction="vertical" size="large">
          <p>{props && props.data && props.data.subtitle}</p>
          <Space></Space>
        </Space>
      </HeaderContent>
      <Tabs
        tabPosition="top"
        defaultActiveKey="1"
        className="nested-tabs"
        onChange={onChangeTab}
      >
        {props &&
          props.data &&
          props.data.datasets.map((dataset: any, i: number) => (
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
    </>
  );
};

DashboardOnDemand.propTypes = {};
export default DashboardOnDemand;
