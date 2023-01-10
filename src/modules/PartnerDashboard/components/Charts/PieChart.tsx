import React, { ReactElement, useCallback, useState } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';

import { ChartData } from '../TotalCustomers.tsx/model/TotalSales.entity';

type Props = {
  data: ChartData[];
  colors: string[];
  renderer?: (props: any) => ReactElement;
};

const _PieChart = ({ data, colors, renderer }: Props): ReactElement => {
  const noData = data?.every((el) => el.amt === 0);

  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex],
  );

  return (
    <ResponsiveContainer width={'100%'} height={500}>
      <PieChart>
        <Pie
          data={noData ? [{ name: '', amt: 100 }] : data}
          activeIndex={activeIndex}
          activeShape={renderer ?? undefined}
          shapeRendering="auto"
          cx={'50%'}
          cy={'50%'}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="amt"
          onMouseEnter={onPieEnter}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={noData ? '#E0E0E0' : colors[index % colors.length]} />
          ))}
        </Pie>
        <Legend
          verticalAlign="bottom"
          height={36}
          payload={data.map((item, index) => ({
            id: item.name,
            type: 'square',
            value: `${item.name}: ${item.amt}`,
            color: noData ? '#E0E0E0' : colors[index % colors.length],
          }))}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default _PieChart;
