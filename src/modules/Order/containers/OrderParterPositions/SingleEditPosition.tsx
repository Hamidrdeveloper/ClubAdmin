import { MinusCircleOutlined } from '@ant-design/icons';
import { AuthContext } from '@src/core';
import { intlDate } from '@src/shared/utils/engine.service';
import { Button, Col, Form, FormInstance, Input, InputNumber, Row, Space, Tooltip } from 'antd';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { PositionProductSearch } from '../../components/PositionProductSearch';
import OrderVatSelect from '../../containers/Selects/VatValueSelect';
import { PartnerSalePositionModel } from '../..';

type Props = {
  name: number;
  index: number;
  version: boolean;
  fieldKey: number;
  form: FormInstance;
  symbolName: string;
  order: PartnerSalePositionModel;
  remove: (order_sale_position_id: number, onComplete: () => void) => void;
};
const OrderSingleEditPosition = ({
  order,
  symbolName,
  name,
  index,
  version,
  fieldKey,
  form,
  remove,
}: Props): ReactElement => {
  const { t } = useTranslation();
  const { profile } = useContext(AuthContext);

  const [vatValue] = useState<number>(order.vat_value ?? 0);
  const [net, setNet] = useState<number>(order.net_amount ?? 0);
  const [gross, setGross] = useState<number>(order.gross_amount ?? 0);
  const [pending, setPending] = useState<'remove' | 'disconnect' | 'none'>('none');

  useEffect(() => {
    const data = form.getFieldsValue(true)['data'] as PartnerSalePositionModel[];
    form.setFieldsValue({
      data: data.map((order) => {
        return {
          ...order,
          net_price: Number(order.net_amount?.toFixed(2) ?? 0),
          gross_price: Number(order.gross_amount?.toFixed(2) ?? 0),
        };
      }),
    });
  }, [version]);

  useEffect(() => {
    if (net && gross) {
      const data = form.getFieldsValue(true)['data'] as PartnerSalePositionModel[];
      form.setFieldsValue({
        data: data.map((order, _index) => {
          if (_index === index)
            return {
              ...order,
              net_price: Number(net?.toFixed(2) ?? 0),
              gross_price: Number(gross?.toFixed(2) ?? 0),
            };
          return order;
        }),
      });
    }
  }, [gross, net]);

  const handleProductChange = ({ name, price }: { name: string; price: number }) => {
    const data = form.getFieldsValue(true)['data'] as PartnerSalePositionModel[];
    form.setFieldsValue({
      data: data.map((order, _index) => {
        if (_index === index) return { ...order, name };
        return order;
      }),
    });

    setGross(Number((price * (1 + vatValue / 100)).toFixed(2)));
    setNet(price);
  };

  return (
    <RelativeContainer isShown={true} isComponent={false}>
      <MainContainer isComponent={false}>
        <Row>
          <Col span={2} className="content">
            <Row className="inner" align="middle">
              <div>
                <p>{order.id}</p>
              </div>
            </Row>
          </Col>
          <Form.Item name={[name, 'id']} fieldKey={[fieldKey, 'id']} hidden>
            <Input />
          </Form.Item>
          <Form.Item name={[name, 'unit_id']} fieldKey={[fieldKey, 'unit_id']} hidden>
            <Input />
          </Form.Item>
          <Col span={4} className="content">
            <Row className="row_item first" align="top">
              <Form.Item
                name={[name, 'quantity']}
                fieldKey={[fieldKey, 'quantity']}
                label={<strong>{t('Global.Quantity')}</strong>}
                initialValue={order.quantity ?? 1}
                rules={[{ required: true }]}
              >
                <InputNumber min={1} />
              </Form.Item>
            </Row>
          </Col>

          <Col span={6} className="content">
            <Row className="item" align="top">
              <Col span={24}>
                <Form.Item name={[name, 'name']} rules={[{ required: true }]} fieldKey={[fieldKey, 'name']}>
                  <PositionProductSearch onChange={handleProductChange} />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  name={[name, 'description']}
                  rules={[{ required: true }]}
                  fieldKey={[fieldKey, 'description']}
                  initialValue={order.description ?? ''}
                >
                  <Input.TextArea
                    style={{ minHeight: '100px' }}
                    placeholder={t('Global.InputPlaceholder', { title: t('Global.Name') })}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col span={6} className="content">
            <Row className="item" align="top">
              <Col span={24}>
                <Row className="row_item first">
                  <Col span={8} className="table_title">
                    <strong>{t('Order.Position.PriceBracketGross')} </strong>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name={[name, 'gross_price']}
                      rules={[{ required: true }]}
                      fieldKey={[fieldKey, 'gross_price']}
                    >
                      <InputNumber
                        min={0}
                        onChange={(gros) => {
                          const gross = Number(gros);
                          setNet(Number((gross / (1 + vatValue / 100)).toFixed(2)));

                          setGross(gross);
                        }}
                        onStep={(gros) => {
                          const gross = Number(gros);
                          setNet(Number((gross / (1 + vatValue / 100)).toFixed(2)));

                          setGross(gross);
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={1} />
                  <Col span={7} className="table_title">
                    {symbolName}
                  </Col>
                </Row>
              </Col>

              <Col span={24}>
                <Row className="row_item">
                  <Col span={8} className="table_title">
                    <strong>{t('Order.Position.PriceBracketNet')} </strong>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name={[name, 'net_price']}
                      rules={[{ required: true }]}
                      fieldKey={[fieldKey, 'net_price']}
                    >
                      <InputNumber
                        min={0}
                        onChange={(netPrice) => {
                          const net = Number(netPrice);
                          setGross(Number((net * (1 + vatValue / 100)).toFixed(2)));

                          setNet(net);
                        }}
                        onStep={(netPrice) => {
                          const net = Number(netPrice);
                          setGross(Number((net * (1 + vatValue / 100)).toFixed(2)));

                          setNet(net);
                        }}
                      />
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
                    <Form.Item name={[name, 'vat']} fieldKey={[fieldKey, 'vat']} rules={[{ required: true }]}>
                      <OrderVatSelect
                        validFromDate={order.created_at}
                        countryId={
                          profile.roles.some((role) => role.slug === 'partner')
                            ? profile.country.id
                            : undefined
                        }
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>

              <Col span={24}>
                <Row className="row_item">
                  <Col span={10}>
                    <strong className="table_title">{t('Global.UpdatedAt')}: </strong>
                  </Col>
                  <Col span={14}>
                    <UpdatedAtContainer>
                      {order.updated_at ? intlDate(new Date(order.updated_at)) : ' - '}
                    </UpdatedAtContainer>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col span={1} className="content">
            <Space direction="vertical">
              <Tooltip title={t('Order.RemovePosition')}>
                <Button
                  ghost
                  type="primary"
                  icon={<MinusCircleOutlined />}
                  loading={pending === 'remove'}
                  onClick={() => {
                    setPending('remove');
                    remove(order.order_partner_id ?? -1, () => setPending('none'));
                  }}
                />
              </Tooltip>
            </Space>
          </Col>
        </Row>
      </MainContainer>
    </RelativeContainer>
  );
};

export default OrderSingleEditPosition;

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

const UpdatedAtContainer = styled.strong`
  margin-bottom: 4px;
`;
