import React, { useState } from 'react';
import moment from 'moment';

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

const groupBy = (items, key) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  );

export default function RecentFasts({ user }) {
  const grouped = user?.fasts ? groupBy(user?.fasts, 'date') : {};
  //
  let data = [];
  let todayValue;
  Object.keys(grouped).forEach((date) => {
    let hour = Math.max.apply(
      Math,
      grouped[date].map((o) => parseFloat(o.fastingTime))
    );
    data.push({
      hour,
      date: moment(date).format('MMM DD'),
    });
  });
  console.log('hour', grouped, data);
  const xDomains = [
    moment().format('MMM DD'),
    moment().add(1, 'day').format('MMM DD'),
    moment().add(2, 'day').format('MMM DD'),
    moment().add(3, 'day').format('MMM DD'),
    moment().add(4, 'day').format('MMM DD'),
    moment().add(5, 'day').format('MMM DD'),
    moment().add(6, 'day').format('MMM DD'),
  ];

  return (
    <div className="c-recent-fasts card">
      <div className="c-recent-fasts__title">Recent fasts</div>
      <div className="c-recent-fasts__head">
        <div className="c-recent-fasts__head-time">
          Average {parseFloat(data[0]?.hour.toFixed(2) || 0)}
        </div>
        <div className="c-recent-fasts__head-dates">
          {xDomains[0]} - {xDomains[6]}
        </div>
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
            dataKey="date"
            stroke="#fff"
            fontSize={12}
            tick={{ fill: '#A3A3A3' }}
            markerWidth={0}
            domain={xDomains}
          />
          <YAxis
            unit="h"
            domain={[0, 1]}
            // domain={[0, 'auto']}
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
