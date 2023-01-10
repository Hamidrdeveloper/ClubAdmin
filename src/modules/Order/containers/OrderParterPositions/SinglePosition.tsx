import { intlCurrency, intlDate } from '@src/shared/utils/engine.service';
import { Col, Row } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { PartnerSalePositionModel } from '../..';

type Props = {
  order: PartnerSalePositionModel;
};
const OrderSinglePosition = ({ order }: Props): ReactElement | null => {
  const { t } = useTranslation();

  return (
    <RelativeContainer isShown isComponent={false}>
      <MainContainer isComponent={false}>
        <Row>
          <Col span={2} className="content">
            <Row className="inner" align="middle">
              <div>
                <p>{order.id}</p>
              </div>
            </Row>
          </Col>

          <Col span={3} className="content">
            <Row className="inner" align="middle">
              <strong>{order.quantity}</strong>
            </Row>
          </Col>

          <Col span={6} className="content">
            <Row className="inner" align="middle">
              <div className="items">
                <div className="alert">{order.description}</div>
                <div className="item">
                  <strong>{t('Order.Titles.Updated')}:</strong>&nbsp;
                  <span>
                    {order.updated_at
                      ? intlDate(new Date(String(order.updated_at).replace(/'-'/g, '/')))
                      : '-'}
                  </span>
                </div>
              </div>
            </Row>
          </Col>

          <Col span={3} className="content">
            <Row className="inner" align="middle">
              <div className="price">
                <strong>{intlCurrency('EUR', order.net_amount ?? 0)}</strong>
              </div>
            </Row>
          </Col>

          <Col span={3} className="content">
            <Row className="inner" align="middle">
              <strong>{order.vat_value ?? '0'}%</strong>
            </Row>
          </Col>

          <Col span={3} className="content">
            <Row className="inner" align="middle">
              <div className="price">
                <strong>{intlCurrency('EUR', order.gross_amount ?? 0)}</strong>
              </div>
            </Row>
          </Col>
        </Row>
      </MainContainer>
    </RelativeContainer>
  );
};

export default OrderSinglePosition;

const MainContainer = styled.div<{ isComponent: boolean }>`
  padding: 16px;
  background-color: ${({ isComponent }) => (isComponent ? '#e8f5e9' : '')};

  & .content {
    padding-left: 8px;
    padding-right: 4px;

    & .inner {
      height: 100%;

      & .action-btn {
        color: #2b7bb2;
      }
    }

    & .items {
      width: 100%;
      & .tag-item {
        margin-top: 20px;
      }

      & .item {
        padding: 4px 0;
      }

      & .alert {
        background: #c9e9ff;
        padding: 8px 12px;
        position: relative;
        margin-bottom: 8px;
        width: 100%;

        &::before {
          position: absolute;
          left: 0;
          top: 0;
          width: 4px;
          height: 100%;
          background: #2b7bb2;
        }
      }
    }

    & .price {
      & .info {
        margin-bottom: 16px;
      }

      & .price {
        color: #2b7bb2;
      }
    }
  }

  & .table_title {
    margin-top: 4px;
  }

  & .row_item {
    padding: 8px 12px;
    border: 1px solid #e4e4eb;
    margin-bottom: 4px;
    min-height: 6vh;
    justify-content: center;
    align-items: center;
  }

  & .row_item .ant-form-item,
  & .row_item .tab_title {
    margin: 0 !important;
  }

  & .row_item.first {
    background: #f2f2f2;
  }

  & .product-variation-id-container {
    display: flex;
    align-items: center;
    justify-content: right;

    & > * {
      color: #1a8a1a;
      font-size: 12px;
    }
  }
`;

const RelativeContainer = styled.div<{ isShown: boolean; isComponent: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  display: ${(props) => (!props.isShown ? 'none' : 'block')};
  border-bottom: ${(props) => (props.isComponent ? ' 2px dashed #43a047' : '0')};
`;
