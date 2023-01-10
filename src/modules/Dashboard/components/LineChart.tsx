import './index.less';

import { Card, Tabs } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';
import { VictoryArea, VictoryBar, VictoryChart, VictoryTheme, VictoryTooltip } from 'victory';

import type { DataItem } from '../model/dashboard';

const { TabPane } = Tabs;

const LineChart: React.FC = () => {
  const theme = useTheme();
  const [sampleData, setSampleData] = useState<DataItem[]>();

  useEffect(() => {
    const tempData = Array.from(new Array(11)).map((item, index) => {
      const salary = (Math.floor(Math.random() * 8) + 1) * 1000;

      return {
        salary,
        salaryName: `${salary}$`,
        date: moment().month(index).format('MMM YYYY'),
      };
    });

    setSampleData(tempData);
  }, []);

  return (
    <Card bordered={false} style={{ height: '100%' }} bodyStyle={{ padding: 0 }}>
      <div className="salesCard">
        <Tabs size="large" tabBarStyle={{ marginBottom: 24 }}>
          <TabPane tab="Percentage of sales category" key="sales">
            <div style={{ padding: '0 32px' }}>
              <VictoryChart width={1500} theme={VictoryTheme.material}>
                <VictoryArea
                  style={{
                    data: {
                      strokeWidth: 3,
                      fillOpacity: 0.7,
                      fill: theme.colors.main,
                    },
                  }}
                  x="date"
                  y="salary"
                  data={sampleData}
                  domain={{ y: [0, 12000] }}
                  labelComponent={<VictoryTooltip flyoutComponent={<div>Product Number</div>} />}
                />
              </VictoryChart>
            </div>
          </TabPane>

          <TabPane tab="Whole Time Sales" key="all">
            <div style={{ padding: '0 32px' }}>
              <VictoryChart width={1300} domainPadding={{ x: 4 }} theme={VictoryTheme.material}>
                <VictoryBar
                  style={{
                    data: { fill: theme.colors.main },
                  }}
                  barRatio={0.3}
                  x="date"
                  y="salary"
                  data={sampleData}
                  alignment="start"
                  padding={{ top: 20, bottom: 60, left: 20 }}
                />
              </VictoryChart>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </Card>
  );
};

export default LineChart;
