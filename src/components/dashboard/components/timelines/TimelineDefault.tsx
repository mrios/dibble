import React from 'react';
import { Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

type TimelineModeType = 'alternate' | 'left' | 'right';
type TimelineItemProps = {
  text: string;
  color?: string;
  dot?: boolean;
};
type TimelineProps = {
  mode: TimelineModeType;
  items: TimelineItemProps[];
};

const dotIcon = (
  <ClockCircleOutlined
    style={{ fontSize: '16px', color: 'orange', background: 'transparent' }}
  />
);

const TimelineDefault = (props: TimelineProps) => (
  <Timeline mode={props.mode}>
    {props?.items?.map((item: TimelineItemProps, i: number) => (
      <Timeline.Item
        color={item.color}
        dot={item.dot ? dotIcon : undefined}
        key={`timeline-${i}`}
      >
        {item.text}
      </Timeline.Item>
    ))}
  </Timeline>
);

TimelineDefault.propTypes = {};
export default TimelineDefault;
