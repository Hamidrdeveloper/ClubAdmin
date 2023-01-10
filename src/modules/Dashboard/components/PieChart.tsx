import { Card } from 'antd';
import React from 'react';
import { VictoryPie } from 'victory';

const PieChart: React.FC = () => {
  const fundColors = ['orange', 'blue', 'tomato', 'green', 'black'];

  const assets = [22, 15, 17, 10, 12, 14, 10].map((item, index) => ({
    name: `Item${index}`,
    x: `${item}%`,
    y: item,
    color: fundColors[index % 4],
  }));

  return (
    <Card bordered={false} style={{ height: '100%' }} title="Percentage of sales category">
      <div>
        <VictoryPie height={320} padAngle={2} data={assets} innerRadius={100} colorScale={fundColors} />
      </div>
    </Card>
  );
};

export default PieChart;
