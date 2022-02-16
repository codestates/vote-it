import React from 'react';
import BubbleChart from '@weknow/react-bubble-chart-d3';

const Bubbles = () => {
  return (
    <div>
      {/* <BubbleChart
        graph={{
          zoom: 1.1,
          // offsetX: -0.05,
          // offsetY: -0.01
        }}
        width={200}
        height={300}
        padding={0}
        showLegend={true}
        legendPercentage={20}
        data={[
          { label: 'torrentqq55', value: 1 },
          { label: 'torrentdia', value: 1 },
          { label: 'torrentsee37', value: 1 },
          { label: 'torrentmax5', value: 1 },
          { label: 'torrenttip9', value: 3 },
        ]}
      /> */}
      <BubbleChart></BubbleChart>
    </div>
  );
};

export default Bubbles;
