import { PlusOutlined } from '@ant-design/icons';
import { ProductVariation } from '@src/modules/Product/model/ProductVariation.entity';
import { Button, Col, Row } from 'antd';
import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

type Props = {
  vars: ProductVariation;
  add: (product_variation_id: number, onComplete: () => void) => void;
};
const OrderSingleAddPosition = ({ vars, add }: Props): ReactElement => {
  const { t } = useTranslation();

  const [pending, setPending] = useState(false);

  return (
    <MainContainer>
      <Row>
        <Col span={2} className="content">
          <Row className="inner" align="middle">
            <div>
              <p>{vars.id}</p>
            </div>
          </Row>
        </Col>

        <Col span={5} className="content">
          <Row className="inner" align="middle">
            <strong>{vars.name}</strong>
          </Row>
        </Col>

        <Col span={3} className="content">
          <Row className="inner" align="middle">
            <strong>{vars.number}</strong>
          </Row>
        </Col>

        <Col span={2} className="content">
          <Row className="inner" align="middle">
            <strong>{vars.barcodes.map(({ value }) => value).reduce((a, b) => a + ' ' + b, '')}</strong>
          </Row>
        </Col>

        <Col span={4} className="content">
          <Row className="inner" align="middle">
            <strong>-</strong>
          </Row>
        </Col>

        <Col span={4} className="content">
          <Row className="inner" align="middle">
            <strong>-</strong>
          </Row>
        </Col>

        <Col span={2} className="content">
          <Row className="inner" align="middle">
            <strong>{vars.is_active ? t('Global.Active') : t('Global.InActive')}</strong>
          </Row>
        </Col>

        <Col span={2} className="content">
          <Row className="inner" align="middle">
            <Button
              ghost
              type="primary"
              icon={<PlusOutlined />}
              loading={pending}
              onClick={() => {
                setPending(true);
                add(vars.id ?? -1, () => setPending(false));
              }}
            />
          </Row>
        </Col>
      </Row>
    </MainContainer>
  );
};

export default OrderSingleAddPosition;

const MainContainer = styled.div`
  padding: 16px;

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

    & .price-gross {
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
      color: #30e030;
      font-size: 12px;
    }
  }
`;
