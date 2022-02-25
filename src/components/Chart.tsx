//import { indexOf } from 'core-js/es6/array';
import React, { useCallback, useState } from 'react';
import { ResponsiveContainer, PieChart, Pie, Sector, Cell } from 'recharts';

const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
  } = props;

  return (
    <g>
      <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill="var(--font)">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />

      <text x={cx - 10} y={cy} dy={18} fill="#999">
        {`${parseInt((percent * 100).toFixed(2))}%`}
      </text>
    </g>
  );
};

interface Ioptions {
  id: number;
  name: string;
  value: number;
}

interface IProps {
  options: Ioptions[];
}
function Chart({ options }: IProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex],
  );
  const colorList = [
    '#b39eb5',
    '#bdb0d0',
    '#89cff0',
    '#99c5c4',
    '#c1c6fc',
    '#c6a4a4',
    '#cb99c9',
    '#cef0cc',
    '#cfcfc4',
    '#d8a1c4',
    '#dfd8e1',
    '#9adedb',
    '#bee7a5',
    '#befd73',
    '#e5d9d3',
    '#e9d1bf',
    '#77dd77',
    '#836953',
    '#aa9499',
    '#94b873',
    '#b2fba5',
  ];

  return (
    <ResponsiveContainer width="100%" height={500}>
      <PieChart>
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={options}
          innerRadius="55%"
          outerRadius="95%"
          dataKey="value"
          onMouseEnter={onPieEnter}
        >
          {options.map((entry, index) => (
            <Cell key={index} fill={colorList[index % colorList.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
export default Chart;
