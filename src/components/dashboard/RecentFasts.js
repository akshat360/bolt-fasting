import React, { PureComponent } from 'react';

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function RecentFasts() {
  const data = [
    {
      date: 'Feb 9',
      hour: '0',
    },
    {
      date: 'Feb 10',
      hour: 6,
    },
    {
      date: 'Feb 11',
      hour: '15',
    },
    {
      date: 'Feb 12',
      hour: 12,
    },
    {
      date: 'Feb 13',
      hour: '16',
    },
    {
      date: 'Feb 16',
      hour: '12',
    },
    {
      date: 'Feb 15',
      hour: '4',
    },
  ];

  return (
    <div className="c-recent-fasts card">
      <div className="c-recent-fasts__title">Recent fasts</div>
      <div className="c-recent-fasts__head">
        <div className="c-recent-fasts__head-time">Average 15.6</div>
        <div className="c-recent-fasts__head-dates">Feb 9 - Feb 15</div>
      </div>
      <ResponsiveContainer width="95%" height="80%">
        <BarChart
          width={100}
          height={200}
          data={data}
          margin={
            {
              // top: 20,
              // right: 30,
              // left: '-5px',
              // bottom: 5,
            }
          }
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <CartesianGrid
            // horizontalPoints={[6, 18]}
            // verticalPoints={[3, 5]}
            horizontal={false}
            stroke="#F0F0F0"
          />

          <XAxis
            enableBackground={false}
            dataKey="date"
            stroke="#fff"
            fontSize={12}
            tick={{ fill: '#A3A3A3' }}
            markerWidth={0}
          />
          <YAxis
            unit="h"
            domain={[0, 16]}
            stroke="#F0F0F0"
            fontSize={12}
            orientation={'left'}
            tick={{ fill: '#A3A3A3' }}

            // ticks={['4', '7']}
          />
          {/* <YAxis /> */}
          {/* <ReferenceLine y={0} position="60" stroke="#000" /> */}
          <Tooltip />
          <Bar
            dataKey="hour"
            // fill="#8884d8"
            // shape={<TriangleBar />}
            // label={{ position: 'top' }}
            radius={[10, 10, 10, 10]}
            width={10}
          >
            {data.map((entry, index) => {
              console.log('entry', entry);
              return (
                <Cell
                  width={10}
                  cursor="pointer"
                  fill={
                    entry.hour === '16'
                      ? '#5DD362'
                      : parseInt(entry.hour) >= 14
                      ? '#EDB98A'
                      : '#A3A3A3'
                  }
                  key={`cell-${entry.date}`}
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
