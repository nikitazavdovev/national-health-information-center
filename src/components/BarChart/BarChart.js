// TODO: implement Bar chart component

import React from "react";
import {Bar, Cell, XAxis} from "recharts";

const BarChart = (props) => {
  const firstData = [
    {
      name: 'Standard',
      value: 152
    },
    {
      name: 'Mapped',
      value: 110
    },
  ];
  const colors = ['#2C2F73', '#4EC2C9'];

  const RoundedBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={`M${x} ${y + height} H ${x + width} V ${y + width/2*1.4} C ${x + width} ${y} ${x} ${y} ${x} ${y + width/2*1.4}`} stroke="none" fill={fill}/>;
  };
  const customizedTick = (props) => {
    const { payload, x, y, index, height } = props;
    return (
      <text x={x - 26} y={y + height/2} fill={colors[index]} fontSize={15} fontWeight={700} >
        {payload.value}
      </text>
    );
  };

  return (
    <BarChart width={190} height={250} data={firstData} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
      <XAxis dataKey="name" tickLine={false} tick={customizedTick}/>
      <Bar dataKey="value" label={{ position: 'top', fill: '#BABCBE', fontSize: 15, fontWeight: 700}} shape={<RoundedBar />} barSize={40}>
        {
          firstData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]}/>
          ))
        }
      </Bar>
    </BarChart>
  )
};

export default BarChart;