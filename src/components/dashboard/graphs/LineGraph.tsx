import React, { useRef } from 'react';
import { Line } from '@ant-design/charts';
type LineGraphProps = {
  config?: {
    width: number;
    height: number;
  };
};

const LineGraph: React.FC<LineGraphProps> = (props) => {
  const data = [
    { year: '2011', value: 3 },
    { year: '2012', value: 4 },
    { year: '2013', value: 3.5 },
    { year: '2014', value: 5 },
    { year: '2015', value: 4.9 },
    { year: '2016', value: 6 },
    { year: '2017', value: 7 },
    { year: '2018', value: 9 },
    { year: '2019', value: 13 },
  ];

  const config = {
    ...(props && props.config ? props.config : {}),
    data,
    title: {
      visible: false,
      text: 'Some text...',
    },
    xField: 'year',
    yField: 'value',
  };

  const ref = useRef();

  // // 导出图片
  // const downloadImage = () => {
  //   ref.current?.downloadImage();
  // };

  // // 获取图表 base64 数据
  // const toDataURL = () => {
  //   console.log(ref.current?.toDataURL());
  // };

  return (
    <div>
      {/* <button type="button" onClick={downloadImage} style={{ marginRight: 24 }}>
        Download image
      </button>
      <button type="button" onClick={toDataURL}>
        Convert to data url
      </button> */}
      <Line {...config} chartRef={ref} />
    </div>
  );
};
export default LineGraph;
