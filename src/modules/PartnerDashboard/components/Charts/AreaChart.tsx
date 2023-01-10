import Text from 'antd/lib/typography/Text';
import React, { ReactElement } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import styled from 'styled-components';

import { ChartData } from '../TotalCustomers.tsx/model/TotalSales.entity';

type Props = {
  data: ChartData[];
  horizontalRefLine?: { label: string; y: number | undefined };
};

const _AreaChart = ({ data, horizontalRefLine }: Props): ReactElement => {
  return (
    <div style={{ width: '100%', height: 500 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          {/* ANCHOR: Add Gradient */}
          {/* LINK: https://recharts.org/en-US/api/AreaChart */}
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />

          {horizontalRefLine?.y && (
            <ReferenceLine y={horizontalRefLine.y} stroke="#08D6A1" strokeWidth={2} ifOverflow="extendDomain">
              <Label value={horizontalRefLine.label} />
            </ReferenceLine>
          )}

          <Tooltip
            trigger="click"
            cursor={{ stroke: '#FFD166', strokeWidth: 2, strokeDasharray: '5 5' }}
            content={CustomTooltip}
          />
          <Area
            type="monotone"
            dataKey="amt"
            stroke="#1F5273"
            fill="#F3F5F6"
            strokeWidth={2}
            activeDot={{ r: 8, fill: '#FFD166' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <TooltipContainer>
        <Text type="secondary">{label}</Text>
        <Text>{payload[0].value} Point</Text>
      </TooltipContainer>
    );
  }

  return null;
};

const TooltipContainer = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #fff6c1;
`;

export default _AreaChart;
