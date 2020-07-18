import React from 'react';
import { Progress, Tooltip } from 'antd';

type ProgressType = 'circle' | 'line' | 'dashboard' | undefined;

type ProgressCounterProps = {
  percent: number;
  successPercent: number;
  type?: ProgressType;
  label?: string;
  tooltip?: boolean;
  verticalSpace?: number;
};

export const ProgressCounter: React.FC<ProgressCounterProps> = ({
  percent,
  successPercent,
  type = 'circle',
  label,
  tooltip = false,
  verticalSpace = 0,
}: ProgressCounterProps) => {
  const style = { marginBottom: verticalSpace };
  return (
    <>
      {label && tooltip ? (
        <Tooltip title={label}>
          <Progress
            percent={percent}
            successPercent={successPercent}
            type={type}
            style={style}
          />
        </Tooltip>
      ) : (
        <>
          <small>{label}</small>
          <Progress
            percent={percent}
            successPercent={successPercent}
            type={type}
            style={style}
          />
        </>
      )}
    </>
  );
};

ProgressCounter.propTypes = {};
export default ProgressCounter;
