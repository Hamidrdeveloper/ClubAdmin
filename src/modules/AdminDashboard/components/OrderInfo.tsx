import ChartCard from '@src/modules/Dashboard/components/ChartCard';
import { BodyField } from '@src/modules/Dashboard/components/Field';
import { Col, Row } from 'antd';
import numeral from 'numeral';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import { RangeDateProps } from '../pages/AdminDashboard';
import { getOrderCards } from '../services';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};
const OrderInfo = ({ dateRange }: { dateRange: RangeDateProps }): ReactElement<{ loading?: boolean }> => {
  const { data, isFetching } = useQuery(
    ['dashboard-order-cards', dateRange],
    () => getOrderCards(dateRange),
    { keepPreviousData: true },
  );

  const { t } = useTranslation();
  return (
    <Row gutter={24}>
      {(() => {
        const container: any[] = [];
        for (const iKey in data) {
          container.push(
            <>
              <Col {...topColResponsiveProps}>
                <ChartCard
                  bordered={false}
                  title={iKey}
                  loading={isFetching}
                  total={
                    <BodyField
                      label1={t('AdminDashboard.Total')}
                      value1={
                        numeral(data[iKey]?.total_price).format('0,0.00') + data[iKey]?.currency?.symbol
                      }
                      label2={t('AdminDashboard.Quantity')}
                      value2={data[iKey]?.quantity}
                    />
                  }
                  contentHeight={46}
                />
              </Col>

              <Col {...topColResponsiveProps}>
                <ChartCard
                  bordered={false}
                  title={iKey}
                  loading={isFetching}
                  total={
                    <BodyField
                      label1={t('AdminDashboard.Payments')}
                      value1={
                        numeral(data[iKey]?.total_payment).format('0,0.00') + data[iKey]?.currency?.symbol
                      }
                    />
                  }
                  contentHeight={46}
                />
              </Col>
            </>,
          );
        }
        return container;
      })()}
    </Row>
  );
};
export default OrderInfo;
