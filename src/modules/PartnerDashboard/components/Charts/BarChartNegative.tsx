import React, { ReactElement } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

import { DblChartData } from '../CareerLevelsChange/model/careerChange.entity';

type Props = {
  data: DblChartData[];
};

const DblValueBarChart = ({ data }: Props): ReactElement => {
  // TODO: active index
  return (
    <div style={{ width: '100%', height: 500 }}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" hide />

          <Tooltip />
          <Bar dataKey="points" fill="#03D7A0" barSize={20} />
          <Bar dataKey="returns" fill="#F0476F" barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
export default DblValueBarChart;
