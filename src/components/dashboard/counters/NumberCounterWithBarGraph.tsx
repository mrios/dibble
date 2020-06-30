import React from 'react';
import BarGraph from '../graphs/BarGraph';

type NumberCounterWithBarGraphProps = {
  count: number;
};

export const NumberCounterWithBarGraph: React.FC<NumberCounterWithBarGraphProps> = (
  props: NumberCounterWithBarGraphProps
) => {
  return (
    <>
      <h1>{props.count} %</h1>
    </>
  );
};

NumberCounterWithBarGraph.propTypes = {};
export default NumberCounterWithBarGraph;
