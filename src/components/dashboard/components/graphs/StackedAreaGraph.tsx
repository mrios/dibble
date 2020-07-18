import React, { useState, useEffect, useRef } from 'react';
import { StackedArea } from '@ant-design/charts';
import { asyncFetch } from '../../../../utils/utils';

type AxisType = 'linear' | 'pow' | 'log' | undefined;
type LegendPositionType =
  | 'right-top'
  | 'left-top'
  | 'left-center'
  | 'left-bottom'
  | 'right-center'
  | 'right-bottom'
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | undefined;

type StackedAreaGraphProps = {
  items?: Array<{
    x: string;
    y: number;
  }>;
  apiUrl?: string;
  config?: {
    width: number;
    height: number;
    xField: string;
    yField: string;
  };
};

const StackedAreaGraph: React.FC<StackedAreaGraphProps> = (props) => {
  const [data, setData] = useState([{}]);
  console.log('props', props);
  useEffect(() => {
    if (props.items) {
      setData(props.items);
    } else {
      const exampleUrl =
        'https://gw.alipayobjects.com/os/antfincdn/A%26Bp9uKRb2/oil.json';
      asyncFetch(props?.apiUrl || exampleUrl, setData);
    }
  }, []);

  const defaultConfig = {
    title: {
      visible: false,
      text: 'Stacked area chart',
    },
    data,
    xField: 'date',
    yField: 'value',
    stackField: 'country',
    Color: [
      '#6897a7',
      '#8bc0d6',
      '#60d7a7',
      '#dedede',
      '#fedca9',
      '#fab36f',
      '#d96d6f',
    ],
    xAxis: {
      type: 'dateTime' as AxisType,
      tickCount: 5,
    },
    legend: {
      visible: true,
      position: 'right-top' as LegendPositionType,
    },
    responsive: true,
  };

  const config = Object.assign(defaultConfig, props?.config || {});

  const ref = useRef();
  return <StackedArea {...config} chartRef={ref} />;
};

export default StackedAreaGraph;
