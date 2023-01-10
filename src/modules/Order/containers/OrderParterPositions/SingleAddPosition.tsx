import { Col, Form, FormInstance, Input, InputNumber, Row } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { PositionProductSearch } from '../../components/PositionProductSearch';
import OrderVatSelect from '../../containers/Selects/VatValueSelect';

type Props = { symbolName: string; form: FormInstance };
const OrderSingleAddPosition = ({ symbolName, form }: Props): ReactElement => {
  const { t } = useTranslation();

  const handleProductChange = ({ name, price }: { name: string; price: number }) => {
    form.setFieldsValue({ name, net_price: price });
  };

  return (
    <RelativeContainer isShown={true} isComponent={false}>
      <MainContainer isComponent={false}>
        <Row>
          <Col span={4} className="content">
            <Row className="row_item first" align="top">
              <Form.Item
                name={'quantity'}
                rules={[{ required: true }]}
                label={<strong>{t('Global.Quantity')}</strong>}
              >
                <InputNumber min={1} />
              </Form.Item>
            </Row>
          </Col>

          <Col span={6} className="content">
            <Row className="item" align="top">
              <Col span={24}>
                <Form.Item name={['name']} rules={[{ required: true }]}>
                  <PositionProductSearch onChange={handleProductChange} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item name={['description']} rules={[{ required: true }]}>
                  <Input.TextArea
                    style={{ minHeight: '100px' }}
                    placeholder={t('Global.InputPlaceholder', { title: t('Global.Description') })}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col span={6} className="content">
            <Row className="item" align="top">
              <Col span={24}>
                <Row className="row_item">
                  <Col span={8} className="table_title">
                    <strong>{t('Order.Position.PriceBracketNet')} </strong>
                  </Col>
                  <Col span={8}>
                    <Form.Item name={['net_price']} rules={[{ required: true }]}>
                      <InputNumber min={0} />
                    </Form.Item>
                  </Col>
                  <Col span={1} />
                  <Col span={7} className="table_title">
                    {symbolName}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col span={5} className="content">
            <Row className="item" align="top">
              <Col span={24}>
                <Row className="row_item">
                  <Col span={10} className="table_title">
                    <strong>{t('Order.Position.Vat')}: </strong>
                  </Col>
                  <Col span={14}>
                    <Form.Item name={['vat']} rules={[{ required: true }]}>
                      <OrderVatSelect />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </MainContainer>
    </RelativeContainer>
  );
};

export default OrderSingleAddPosition;

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

  & .delivery-date-container {
    display: flex;
    align-items: flex-start;
  }
`;

const RelativeContainer = styled.div<{ isShown: boolean; isComponent: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.isComponent ? 'none' : 'block')};
  border-bottom: ${(props) => (props.isComponent ? ' 2px dashed #43a047' : '0')};
`;
