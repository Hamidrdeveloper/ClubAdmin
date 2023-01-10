import { BranchesOutlined, CopyOutlined, MinusCircleOutlined } from '@ant-design/icons';
import StorageVariationSuperSelect from '@src/modules/Stock/containers/StorageVariationSuperSelect';
import FallbackSelect from '@src/shared/components/FallbackSelect/FallbackSelect';
import { intlDate, intlDateFormat } from '@src/shared/utils/engine.service';
import { Button, Col, DatePicker, Form, FormInstance, Input, InputNumber, Row, Space, Tooltip } from 'antd';
import React, { ReactElement, Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import OrderVatSelect from '../../containers/Selects/VatValueSelect';
import { OrderModuleType, OrderPositionModelType, OrderSalePositionModel } from '../..';

type Props = {
  order: OrderPositionModelType;
  moduleType: OrderModuleType;
  symbolName: string;
  name: number;
  isComponent: boolean;
  isBundle: boolean;
  index: number;
  // This is for force Re rendering
  version: boolean;
  fieldKey: number;
  form: FormInstance;
  remove: (order_sale_position_id: number, onComplete: () => void) => void;
  disconnect: (order_sale_position_id: number, onComplete: () => void) => void;
};
const OrderSingleEditPosition = ({
  order,
  symbolName,
  name,
  index,
  moduleType,
  isBundle,
  version,
  isComponent,
  fieldKey,
  form,
  remove,
  disconnect,
}: Props): ReactElement => {
  const { t } = useTranslation();

  const [discount] = useState<number>(order.discount ?? 0);
  const [net, setNet] = useState<number>(order.singleNetPrice ?? 0);
  const [gross, setGross] = useState<number>(order.singleGrossPrice ?? 0);
  const [vatValue] = useState<number>(order.vat?.value ?? 0);
  const [pending, setPending] = useState<'remove' | 'disconnect' | 'none'>('none');
  const removeDiscount = true;

  useEffect(() => {
    const data = form.getFieldsValue(true)['data'] as OrderSalePositionModel[];
    form.setFieldsValue({
      data: data.map((order) => {
        return {
          ...order,
          net_price: Number(order.singleNetPrice?.toFixed(2) ?? 0),
          gross_price: Number(order.singleGrossPrice?.toFixed(2) ?? 0),
        };
      }),
    });
  }, [version]);

  useEffect(() => {
    if (net && gross) {
      const data = form.getFieldsValue(true)['data'] as OrderSalePositionModel[];
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

  // const ShowComponentsButton = () => {
  //   return (
  //     <Row align="bottom" justify="end">
  //       <AccordionButton isOpened={isOpened} onClick={() => showComponents?.(order.orderId, index)}>
  //         Show Components {2 === order.orderId ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
  //       </AccordionButton>
  //     </Row>
  //   );
  // };

  return (
    <RelativeContainer isShown={true} isComponent={isComponent}>
      <MainContainer isComponent={isComponent}>
        <Row>
          <Col span={2} className="content">
            <Row className="inner" align="middle">
              <div>
                <p>{order.orderId}</p>
              </div>
            </Row>
          </Col>
          <Form.Item name={[name, 'orderId']} fieldKey={[fieldKey, 'orderId']} hidden>
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
                <InputNumber
                  min={1}
                  disabled={
                    isComponent ||
                    ('orderPositionType' in order &&
                      (order?.orderPositionType?.name === 'Promotional Article' ? true : false))
                  }
                />
              </Form.Item>
            </Row>
          </Col>

          <Col span={6} className="content">
            <Row className="item" align="top">
              <Col span={24}>
                <Form.Item
                  name={[name, 'productVariation', 'name']}
                  fieldKey={[fieldKey, 'productVariation', 'name']}
                  rules={[{ required: true }]}
                  initialValue={order.productVariation?.name ?? ''}
                >
                  <Input.TextArea
                    disabled={isComponent}
                    style={{ minHeight: '100px' }}
                    placeholder={t('Global.InputPlaceholder', { title: t('Global.Name') })}
                  />
                </Form.Item>
              </Col>

              <Col span={12} className="delivery-date-container">
                <strong className="table_title">{t('Order.Field.DeliveryDate')}: </strong>
              </Col>
              <Col span={12}>
                {moduleType === 'credit' ? (
                  <Form.Item
                    name={[name, 'estimate_delivery_date']}
                    fieldKey={[fieldKey, 'estimate_delivery_date']}
                    style={{ marginBottom: '2px' }}
                    rules={[{ required: true }]}
                  >
                    <DatePicker format={intlDateFormat()} />
                  </Form.Item>
                ) : (
                  <Form.Item
                    name={[name, 'estimate_delivery_date']}
                    fieldKey={[fieldKey, 'estimate_delivery_date']}
                    style={{ marginBottom: '2px' }}
                    rules={[{ required: moduleType !== 'subscription' }]}
                  >
                    <DatePicker format={intlDateFormat()} disabled={moduleType === 'subscription'} />
                  </Form.Item>
                )}
              </Col>

              <br />
              {moduleType !== 'credit' && moduleType !== 'subscription' && (
                <>
                  <Col span={12}>
                    <strong className="table_title">{t('Order.Field.StorageVariation')}: </strong>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      style={{ marginBottom: '2px' }}
                      name={[name, 'storageVariation']}
                      fieldKey={[fieldKey, 'storageVariation']}
                    >
                      <StorageVariationSuperSelect
                        menuPlacement="top"
                        productVariationId={order?.productVariation?.id}
                      />
                    </Form.Item>
                  </Col>
                </>
              )}

              {moduleType !== 'subscription' && (
                <Col span={24} className="product-variation-id-container">
                  <span>
                    {t('Order.Position.VariationId')}: <span>{order.productVariation.id}</span>
                  </span>
                </Col>
              )}
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
                      fieldKey={[fieldKey, 'gross_price']}
                      rules={[{ required: true }]}
                    >
                      <InputNumber
                        min={0}
                        disabled={isComponent}
                        onChange={(gros) => {
                          const gross = Number(gros);
                          setNet(Number((gross / (1 + discount / 100) / (1 + vatValue / 100)).toFixed(2)));

                          setGross(gross);
                        }}
                        onStep={(gros) => {
                          const gross = Number(gros);
                          setNet(Number((gross / (1 + discount / 100) / (1 + vatValue / 100)).toFixed(2)));

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
                      fieldKey={[fieldKey, 'net_price']}
                      rules={[{ required: true }]}
                    >
                      <InputNumber
                        min={0}
                        disabled={isComponent}
                        onChange={(netPrice) => {
                          const net = Number(netPrice);
                          setGross(Number((net * (1 + discount / 100) * (1 + vatValue / 100)).toFixed(2)));

                          setNet(net);
                        }}
                        onStep={(netPrice) => {
                          const net = Number(netPrice);
                          setGross(Number((net * (1 + discount / 100) * (1 + vatValue / 100)).toFixed(2)));

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

              {!removeDiscount && (
                <Col span={24}>
                  <Row className="row_item">
                    <Col span={8} className="table_title">
                      <strong>{t('Order.Position.DiscountPercent')} </strong>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name={[name, 'discount']}
                        fieldKey={[fieldKey, 'discount']}
                        initialValue={(order.discount ?? 0).toFixed(2)}
                      >
                        <InputNumber disabled min={0} />
                      </Form.Item>
                    </Col>
                    <Col span={1} />
                    <Col span={7} className="table_title">
                      ({((net * discount) / 100).toFixed(2)} {symbolName})
                    </Col>
                  </Row>
                </Col>
              )}
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
                    <Suspense fallback={FallbackSelect('vat')}>
                      <Form.Item
                        name={[name, 'vat']}
                        fieldKey={[fieldKey, 'vat']}
                        rules={[{ required: true }]}
                      >
                        {/* <SuperSelect
                        disabled={isComponent}
                        module={new OrderVatChildModule()}
                        hasNew={false}
                        optionSelector={{ label: 'value', value: 'id' }}
                        query={{ validFromLessThan: order.createdAt }}
                        onChange={(vat) => {
                          const vat_value = (vat as OrderVat).value;
                          setGross(Number((net * (1 - discount / 100) * (1 + vat_value / 100)).toFixed(2)));

                          setVatValue(vat_value);
                        }}
                      /> */}
                        <OrderVatSelect module={moduleType} validFromDate={order.createdAt} />
                      </Form.Item>
                    </Suspense>
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
                      {order.updatedAt ? intlDate(new Date(order.updatedAt)) : ' - '}
                    </UpdatedAtContainer>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>

          {!isComponent && (
            <Col span={1} className="content">
              <Space direction="vertical">
                <Tooltip title={t('Order.CopyPosition')}>
                  <Button
                    ghost
                    type="primary"
                    icon={<CopyOutlined />}
                    disabled
                    // onClick={() => add(order.orderId ?? -1, order.productVariation.id ?? -1, quantity)}
                  />
                </Tooltip>
                <Tooltip title={t('Order.RemovePosition')}>
                  <Button
                    ghost
                    type="primary"
                    icon={<MinusCircleOutlined />}
                    onClick={() => {
                      setPending('remove');
                      remove(order.orderId ?? -1, () => setPending('none'));
                    }}
                    loading={pending === 'remove'}
                  />
                </Tooltip>
                {isBundle && moduleType !== 'purchase' && (
                  <Tooltip title={t('Order.Position.Disconnect')}>
                    <Button
                      ghost
                      type="primary"
                      icon={<BranchesOutlined />}
                      onClick={() => {
                        setPending('disconnect');
                        disconnect(order.orderId ?? -1, () => setPending('none'));
                      }}
                      loading={pending === 'disconnect'}
                    />
                  </Tooltip>
                )}
              </Space>
            </Col>
          )}
        </Row>
        {/* {moduleType !== 'credit' && isBundle && ShowComponentsButton()} */}
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

// const AccordionButton = styled.div<{ isOpened: boolean }>`
//   background-color: #e8f5e9;
//   border: 2px solid;
//   border-bottom-style: dashed;
//   border-bottom-color: ${(props) => (props.isOpened ? '#e8f5e9' : '#43a047')};
//   border-top-left-radius: 4px;
//   position: absolute;
//   bottom: 0;
//   right: 0;
//   width: 164px;
//   height: 32px;
//   display: flex;
//   align-items: center;
//   justify-content: space-around;
//   font-size: 12px;
//   color: #1a8a1a;
//   cursor: pointer;
// `;

const UpdatedAtContainer = styled.strong`
  margin-bottom: 4px;
`;
