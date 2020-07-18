import React, { ReactNode } from 'react';
import { Statistic } from 'antd';

type StatisticDefaultProps = {
  title: number;
  value: number;
  prefix?: string | ReactNode;
  suffix?: string | ReactNode;
};

const StatisticDefault: React.FC<StatisticDefaultProps> = (props) => {
  return <Statistic {...props} />;
};

export default StatisticDefault;
