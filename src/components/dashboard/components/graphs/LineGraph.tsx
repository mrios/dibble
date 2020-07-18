import React, { useRef } from 'react';
import { Line } from '@ant-design/charts';

type LineGraphProps = {
  items?: Array<{
    x: string;
    y: number;
  }>;
  config?: {
    width: number;
    height: number;
    xField: string;
    yField: string;
  };
};

const LineGraph: React.FC<LineGraphProps> = (props) => {
  const data = props?.items || [
    { x: '2011', y: 3 },
    { x: '2012', y: 4 },
    { x: '2013', y: 3.5 },
    { x: '2014', y: 5 },
    { x: '2015', y: 4.9 },
    { x: '2016', y: 6 },
    { x: '2017', y: 7 },
    { x: '2018', y: 9 },
    { x: '2019', y: 13 },
  ];

  const defaultConfig = {
    data,
    title: {
      visible: false,
      text: 'Some text...',
    },
    xField: 'x',
    yField: 'y',
  };

  const config = Object.assign(defaultConfig, props?.config || {});
  const ref = useRef();

  return (
    <div>
      <Line {...config} chartRef={ref} />
    </div>
  );
};
export default LineGraph;
