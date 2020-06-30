import React from 'react';
import { Divider } from 'antd';

type DividerType = 'horizontal' | 'vertical';
type OrientationType = 'left' | 'right';

type DividerProps = {
  text?: string;
  type?: DividerType;
  orientation?: OrientationType;
};

const DividerDefault = (props: DividerProps) => {
  return (
    <Divider plain orientation={props.orientation} type={props.type}>
      {props.text}
    </Divider>
  );
};

DividerDefault.propTypes = {};
export default DividerDefault;
