import React, { ReactElement } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { ChartData } from '../TotalCustomers.tsx/model/TotalSales.entity';

type Props = {
  data: ChartData[];
  color?: string;
};

const SimpleHorizontalBarChart = ({ data, color }: Props): ReactElement => {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          layout="vertical"
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey={'name'} type="category" />
          <Tooltip />
          {/* TODO Active index */}
          <Bar dataKey="amt" fill={color ?? '#B2E0F5'} maxBarSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleHorizontalBarChart;
