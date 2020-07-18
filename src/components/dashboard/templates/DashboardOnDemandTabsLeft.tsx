import React, { useState } from 'react';
import HeaderContent from '../../../layout/HeaderContent';
import { Row, Tabs, Space } from 'antd';
import LoadComponent from '../LoadComponent';

interface DashboardTemplateProps {
  data: any;
}
const DashboardOnDemandTabsLeft = (props: DashboardTemplateProps) => {
  const [backgroundHeader, setBackgroundHeader] = useState(
    props.data && props.data.datasets[0] && props.data.datasets[0].background
  );
  const onChangeTab = (activeKey: any) => {
    setBackgroundHeader(props.data.datasets[activeKey - 1].background);
  };
  return (
    <>
      <HeaderContent
        title={props && props.data && props.data.title}
        background={backgroundHeader}
      >
        <Space direction="vertical" size="large">
          <p>{props && props.data && props.data.subtitle}</p>
          <Space></Space>
        </Space>
      </HeaderContent>
      <Tabs tabPosition="left" defaultActiveKey="1" onChange={onChangeTab}>
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

DashboardOnDemandTabsLeft.propTypes = {};
export default DashboardOnDemandTabsLeft;
