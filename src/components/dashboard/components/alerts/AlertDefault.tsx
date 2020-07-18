import React from 'react';
import { Alert } from 'antd';
import { defaultData, AlertDefaultProps } from './definitions';

const AlertDefault: React.FC<AlertDefaultProps> = (props) => {
  const newProps = Object.assign(defaultData, props);
  return (
    <Alert {...newProps} className={props.contrast ? 'dark-contrast' : ''} />
  );
};

export default AlertDefault;
