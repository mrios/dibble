import React, { useState, useEffect } from 'react';
import { RangeColumn } from '@ant-design/charts';
const RangeColumnGraph: React.FC = () => {
  const data = [
    {
      type: 'Category one',
      values: [76, 100],
    },
    {
      type: 'Category 2',
      values: [56, 108],
    },
    {
      type: 'Category three',
      values: [38, 129],
    },
    {
      type: 'Category 4',
      values: [58, 155],
    },
    {
      type: 'Category five',
      values: [45, 120],
    },
    {
      type: 'Category six',
      values: [23, 99],
    },
    {
      type: 'Category seven',
      values: [18, 56],
    },
    {
      type: 'Category eight',
      values: [18, 34],
    },
  ];
  const config = {
    title: {
      visible: true,
      text: 'Interval histogram',
    },
    data,
    xField: 'type',
    yField: 'values',
  };
  return <RangeColumn {...config} />;
};

export default RangeColumnGraph;
