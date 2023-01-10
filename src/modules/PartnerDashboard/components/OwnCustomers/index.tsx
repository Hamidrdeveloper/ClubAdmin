import i18n from '@src/core/i18n/config';
import { Loader } from '@src/shared/components';
import { Col, Row } from 'antd';
import Text from 'antd/lib/typography/Text';
import axios, { AxiosResponse } from 'axios';
import { useAtom } from 'jotai';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sector } from 'recharts';
import styled from 'styled-components';

import { partnerCurrencySymbolAtom, selectedDateRangeAtom } from '../../pages/PartnerDashboard';
import PieChart from '../Charts/PieChart';
import { OwnCustomerModel } from './model/OwnCustomer.entity';

const OwnCustomers = ({ id }: { id: number }): ReactElement => {
  const { t } = useTranslation();
  const [data, setData] = useState<OwnCustomerModel>({} as OwnCustomerModel);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [selectedDateRange] = useAtom(selectedDateRangeAtom);
  const currentLanguage = i18n.resolvedLanguage;
  const fromDate = selectedDateRange?.from_date ? new Date(selectedDateRange.from_date) : new Date();
  const monthName = fromDate.toLocaleString(currentLanguage, { month: 'long' });
  const [currencySymbol] = useAtom(partnerCurrencySymbolAtom);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`partner-dashboard/${id}/own-customers`, { params: selectedDateRange })
      .then((resp: AxiosResponse<{ data: OwnCustomerModel }>) => {
        setLoading(false);
        setData(resp.data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [selectedDateRange]);

  return (
    <MainContainer>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PieChart
            data={data.chart_data ?? []}
            colors={['#08D6A1', '#EF476F']}
            renderer={renderActiveShape.bind(this, data, monthName)}
          />

          <Row className="contents" justify="space-around" align="middle">
            <Col span={10}>
              <Text strong>
                {t('Dashboards.Partner.Orders')}: {data.orders}
              </Text>
            </Col>

            <Col span={10}>
              <Text strong>
                {t('Dashboards.Partner.Points')}: {data.points}
              </Text>
            </Col>

            <Col span={10}>
              <Text strong>
                {t('Dashboards.Partner.BFU')}: {data.bfu}
                {currencySymbol}
              </Text>
            </Col>

            <Col span={10}>
              <Text strong>
                {t('Dashboards.Partner.BillAmounts')}: {data.bill_amounts}
                {currencySymbol}
              </Text>
            </Col>
          </Row>
        </>
      )}
    </MainContainer>
  );
};

export default OwnCustomers;

const MainContainer = styled.div`
  .contents {
    & > * {
      margin: 8px;
      min-height: 72px;
      background-color: #f5f5f5;
      display: flex;
      align-items: center;

      padding: 12px;
    }
  }
`;

const renderActiveShape = (data: OwnCustomerModel, monthName: string, props: any): ReactElement => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g>
      <text
        x={cx}
        y={cy - innerRadius / 2}
        textAnchor="middle"
        fill={'black'}
        style={{ fontSize: '1rem', fontWeight: 'bold' }}
      >
        {monthName}
      </text>
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        fill={'black'}
        style={{ fontSize: '0.6rem', fontWeight: 'lighter' }}
      >
        {i18n.t('Global.NumberOfCustomers')}
      </text>
      <text
        x={cx}
        y={cy + innerRadius / 2}
        textAnchor="middle"
        fill={'black'}
        style={{ fontSize: '1rem', fontWeight: 'bold' }}
      >
        {data.number_of_customers}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};
