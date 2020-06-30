import React from 'react';
import BarGroupGraph from '../graphs/BarGroupGraph';

type NumberCounterWithGroupBarGraphProps = {
  count: number;
};

export const NumberCounterWithGroupBarGraph: React.FC<NumberCounterWithGroupBarGraphProps> = (
  props: NumberCounterWithGroupBarGraphProps
) => {
  return (
    <>
      <h1>{props.count} %</h1>
    </>
  );
};

NumberCounterWithGroupBarGraph.propTypes = {};
export default NumberCounterWithGroupBarGraph;
