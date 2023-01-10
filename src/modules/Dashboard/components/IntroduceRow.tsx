import './index.less';

import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';
import numeral from 'numeral';
import React from 'react';

import ChartCard from './ChartCard';
import Field from './Field';
import Trend from './Trend';

const euro = (val: number | string) => `€ ${numeral(val).format('0,0')}`;

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const IntroduceRow: React.FC<{ loading?: boolean }> = ({ loading }) => (
  <Row gutter={24}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="Total Sales"
        action={
          <Tooltip title="Sales Description">
            <InfoCircleOutlined />
          </Tooltip>
        }
        loading={loading}
        total={() => euro(126560)}
        footer={<Field label="Daily sales " value={`€ ${numeral(12423).format('0,0')}`} />}
        contentHeight={46}
      >
        <Trend flag="up" style={{ marginRight: 4 }}>
          Weekly
          <span className="trendText">12%</span>
        </Trend>
        <Trend flag="down">
          Monthly
          <span className="trendText">11%</span>
        </Trend>
      </ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="Total Views"
        action={
          <Tooltip title="Total Views">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={numeral(8846).format('0,0')}
        footer={<Field label="Most Views " value={numeral(1234).format('0,0')} />}
        contentHeight={46}
      >
        <Trend flag="up" style={{ marginRight: 4 }}>
          Weekly
          <span className="trendText">12%</span>
        </Trend>
        <Trend flag="down">
          Monthly
          <span className="trendText">11%</span>
        </Trend>
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="Number of Payments"
        action={
          <Tooltip title="Payments">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={numeral(6560).format('0,0')}
        footer={<Field label="Rate" value="60%" />}
        contentHeight={46}
      >
        <Trend flag="up" style={{ marginRight: 4 }}>
          Weekly
          <span className="trendText">12%</span>
        </Trend>
        <Trend flag="down">
          Monthly
          <span className="trendText">11%</span>
        </Trend>
      </ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        loading={loading}
        bordered={false}
        title="Operational Effect"
        action={
          <Tooltip title="Operational activity effect">
            <InfoCircleOutlined />
          </Tooltip>
        }
        total="78%"
        contentHeight={46}
        footer={
          <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <Trend flag="up" style={{ marginRight: 16 }}>
              Announce
              <span className="trendText">12%</span>
            </Trend>
            <Trend flag="down">
              All
              <span className="trendText">11%</span>
            </Trend>
          </div>
        }
      >
        <Trend flag="up" style={{ marginRight: 4 }}>
          Weekly
          <span className="trendText">12%</span>
        </Trend>
        <Trend flag="down">
          Monthly
          <span className="trendText">11%</span>
        </Trend>
      </ChartCard>
    </Col>
  </Row>
);

export default IntroduceRow;
