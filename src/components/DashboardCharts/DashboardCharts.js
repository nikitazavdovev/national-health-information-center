import React from "react";
import {Bar, BarChart, Pie, PieChart, Cell, XAxis, Legend, Label, ResponsiveContainer} from "recharts";

import './DashboardCharts.css';

const DashboardCharts = (props) => {
  const firstData = [
    {
      name: 'Stander',
      value: 152
    },
    {
      name: 'Mapped',
      value: 110
    },
  ];
  const secondData = [
    {
      name: 'New',
      value: 17
    },
    {
      name: 'Delayed',
      value: 3
    }
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
  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul style={{listStyle: 'none', margin: 0, padding: 0, textAlign: 'right', marginTop: 40}}>
        {
          payload.map((entry, index) => (
            <li key={`item-${index}`} style={{color: entry.color}}>
              {entry.value}
              <div style={{width: 9, height: 9, backgroundColor: entry.color, display: 'inline-block', marginLeft: 12, borderRadius: '50%'}} />
            </li>
          ))
        }
      </ul>
    );
  };
  const countRequests =() => {
    return secondData.reduce((sum, current) => {
      return sum + current.value;
    }, 0)
  };
  const generatePieChartLabel = (props) => {
    const {viewBox} = props;

    return (
      <>
        <filter id="shadow">
          <feDropShadow
            dx="0"
            dy="0"
            stdDeviation="8"
            floodColor="#000000"
            floodOpacity="0.3"
          />
        </filter>
      <circle cx={viewBox.cx} cy={viewBox.cy} r={70} fill={'#fff'} style={{filter: "url(#shadow)"}}/>
      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" width={100}>
        <tspan fontSize={50} fontWeight={700} fill={colors[0]}>
          {countRequests()}
        </tspan>
        <tspan x={viewBox.cx} y={viewBox.cy + 30} fontSize={19} fontWeight={300} fill={colors[0]}>
          Requests
        </tspan>
      </text>
        </>
    )
  };

  return (
    <div className='charts'>
      <div className='charts__first'>
        <h4 className='charts__title'>ICD10</h4>
        <div className="charts__data">
          <ResponsiveContainer width='100%' height={250}>
            <BarChart data={firstData} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="name" tickLine={false} tick={customizedTick}/>
              <Bar dataKey="value" label={{ position: 'top', fill: '#BABCBE', fontSize: 15, fontWeight: 700}} shape={<RoundedBar />} barSize={40}>
                {
                  firstData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index]}/>
                  ))
                }
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className='charts__last'>
        <h4 className='charts__title'>Number of pending request </h4>
        <div className="charts__data">
          <ResponsiveContainer width='100%' height={200}>
            <PieChart>
              <Legend layout="vertical" align='right' verticalAlign='middle' content={renderLegend}/>

              <Pie data={secondData} dataKey='value' innerRadius='82%' outerRadius='100%' startAngle={90} endAngle={-270}>
                {
                  secondData.map((item, index) =>
                    <Cell fill={colors[index]} key={item.value} stroke={colors[index]}/>
                  )
                }
                <Label position="center" content={generatePieChartLabel}/>
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
};

export default DashboardCharts;