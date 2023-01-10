import { PlusOutlined } from '@ant-design/icons';
import { OrderPaymentFormContext, PurchaseSalePure } from '@modules/Order';
import { AuthContext } from '@src/core';
import { Loader } from '@src/shared/components';
import { intlCurrency } from '@src/shared/utils/engine.service';
import { Button, Col, Divider, Row, Space, Table, Typography } from 'antd';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { getCreditPaymentInfo } from '../../controllers/credit.controller';
import { getOrderPaymentInfo } from '../../controllers/order.controller';
import { getPurchasePaymentInfo } from '../../controllers/purchase.controller';
import { OrderPaymentModule } from '../../Order.module';
import {
  CreditSalePure,
  OrderDetailTabs,
  OrderModuleType,
  OrderPaymentModel,
  OrderPaymentType,
  OrderSalePure,
  OrderSaleType,
} from '../..';
import OrderPaymentUpsert from './OrderPaymentUpsert';

interface Props {
  orderSale: OrderSaleType;
  paymentData: OrderPaymentType;
  moduleType: OrderModuleType;
  updateTab: (tab: OrderDetailTabs) => void;
}

const OrderPayments = ({ orderSale, paymentData, moduleType, updateTab }: Props): ReactElement => {
  const { profile } = useContext(AuthContext);
  const { t } = useTranslation();

  const {
    profile: { roles },
  } = useContext(AuthContext);

  const isOrderReadOnly = !!roles.find((role) => role.slug === 'partner');

  const [isModalVisible, setModalVisible] = useState(false);

  const [orderPayment, setOrderPayment] = useState<OrderPaymentModel | null>(null);

  useEffect(() => {
    if (orderSale)
      setOrderPayment(
        moduleType === 'credit'
          ? getCreditPaymentInfo(orderSale as CreditSalePure)
          : moduleType === 'purchase'
          ? getPurchasePaymentInfo(orderSale as PurchaseSalePure)
          : getOrderPaymentInfo(orderSale as OrderSalePure),
      );
  }, [orderSale]);

  if (!orderPayment || !orderSale) return <Loader title={t('Order.Payment.Loader')} />;

  const module = new OrderPaymentModule(orderSale.id, moduleType);

  const { total, pending, paid, payment_method } = orderPayment;
  const initialValues: Partial<OrderPaymentFormContext> = {
    price_value: Number(pending),
    type: 'debit',
    payment_method: payment_method ?? undefined,
    description: `Booked By '${profile.username}'`,
    currency: orderSale?.currency,
  };

  const modalToggleHandler = () => {
    setModalVisible((prev) => !prev);
  };

  const onCallback = () => {
    setModalVisible(false);
    updateTab(OrderDetailTabs.Payment);
  };

  return (
    <MainContainer>
      <div className="content">
        <Row className="select-container" align="middle" gutter={16} wrap={false}>
          <Space>
            <Button type="primary" onClick={modalToggleHandler} disabled={isOrderReadOnly}>
              <PlusOutlined />
              <span>{t('Order.Payment.BookPayment')}</span>
            </Button>
          </Space>

          <Divider type="vertical" />

          <Space>
            <Typography.Text>
              {t('Global.Total')}{' '}
              <Typography.Text type="success">
                {intlCurrency(orderSale?.currency?.iso3 ?? 'EUR', Number(total))}
              </Typography.Text>
            </Typography.Text>
          </Space>

          <Divider type="vertical" />

          <Space>
            <Typography>
              {t('Global.Pending')}{' '}
              <Typography.Text type="danger">
                {intlCurrency(orderSale?.currency?.iso3 ?? 'EUR', Number(pending))}
              </Typography.Text>
            </Typography>
          </Space>

          <Divider type="vertical" />

          <Space>
            <Typography>
              {t('Global.Paid')}{' '}
              <Typography.Text type="danger">
                {intlCurrency(orderSale?.currency?.iso3 ?? 'EUR', Number(paid))}
              </Typography.Text>
            </Typography>
          </Space>
        </Row>

        <Row>
          <Col span={24}>
            <Space direction="vertical" className="table-container">
              <Table dataSource={paymentData} columns={module.tableColumns} />
            </Space>
          </Col>
        </Row>
      </div>
      {isModalVisible && !isOrderReadOnly && (
        <OrderPaymentUpsert
          id={orderSale.id}
          isCredit={moduleType === 'credit'}
          module={module}
          onCallback={onCallback}
          singleData={initialValues}
          isVisible={isModalVisible}
          setVisible={setModalVisible}
        />
      )}
    </MainContainer>
  );
};

export default OrderPayments;

const MainContainer = styled.div`
  & .content {
    border-radius: 4px;
    box-shadow: 0 0 10px #ebede7;
    padding: 12px;
    & .select-container {
      padding: 5px;
      & .ant-select {
        outline: none;
        margin-left: 3px;
      }
    }
    & .ant-table {
      & th.ant-table-cell {
        color: #fff;
        background: #4a5161;
      }

      & tr {
        &:nth-child(odd) {
          & td.ant-table-cell {
            background: #fbfbfb;
          }
        }

        &:nth-child(even) {
          & td.ant-table-cell {
            background: #f2f2f2;
          }
        }
      }
      & .action-btn {
        color: #4474e7;
      }
    }

    & .action-select {
      min-width: 12vw;
    }
  }
  .table-container {
    width: 100%;
  }
`;
