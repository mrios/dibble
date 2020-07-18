import React, { useState, useEffect, useRef } from 'react';
import { Area } from '@ant-design/charts';

const AreaGraph: React.FC = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    asyncFetch();
  }, []);
  const asyncFetch = () => {
    fetch(
      'https://gw.alipayobjects.com/os/antfincdn/YdLK%24VvSkW/fireworks-sales.json'
    )
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  const config = {
    title: {
      visible: false,
      text: 'Basic area chart',
    },
    height: 200,
    data,
    xField: 'Date',
    yField: 'scales',
    // xAxis: 'IValueAxis',
  };
  const ref = useRef();
  return <Area {...config} chartRef={ref} />;
};
export default AreaGraph;
