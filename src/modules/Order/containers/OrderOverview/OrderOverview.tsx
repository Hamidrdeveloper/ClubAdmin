import { Loader } from '@src/shared/components';
import { Col, Row } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import OrderInfo from '../../components/OrderOverview/OrderInfo';
import { OrderDetailTabs, OrderModuleType, OrderSaleType } from '../..';
import { OrderOverviewActions } from './OrderOverviewActions';
import OrderOverviewAddresses from './OrderOverviewAddresses';
import { OrderOverviewDetails } from './OrderOverviewDetails';
import OrderOverviewNotes from './OrderOverviewNotes';

type Props = {
  orderSale: OrderSaleType;
  moduleType: OrderModuleType;
  updateTab: (type: OrderDetailTabs) => void;
};
export default function OrderOverview({ orderSale, moduleType, updateTab }: Props): ReactElement {
  const { t } = useTranslation();

  if (!orderSale) return <Loader title={t('Order.Overview.Loader')} />;

  return (
    <>
      <Row gutter={16}>
        <Col span={16}>
          <OrderOverviewDetails orderSale={orderSale} moduleType={moduleType} updateTab={updateTab} />
        </Col>

        {moduleType !== 'partner' && (
          <>
            <Col span={8}>
              <OrderInfo orderSale={orderSale} moduleType={moduleType} />
            </Col>
            <Col span={24}>
              <OrderOverviewActions orderSale={orderSale} moduleType={moduleType} updateTab={updateTab} />
            </Col>
          </>
        )}
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12} style={{ marginTop: moduleType !== 'partner' ? 0 : 32 }}>
          <OrderOverviewAddresses orderSale={orderSale} moduleType={moduleType} updateTab={updateTab} />
        </Col>

        {moduleType !== 'partner' && (
          <Col span={12}>
            <OrderOverviewNotes orderSale={orderSale} moduleType={moduleType} updateTab={updateTab} />
          </Col>
        )}
      </Row>
    </>
  );
}
