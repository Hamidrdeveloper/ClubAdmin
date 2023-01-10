import {
  CreditSalePositionModel,
  PurchaseSalePositionModel,
  SubscriptionSalePositionModel,
} from '@modules/Order';
import { FormSubmit, Loader } from '@src/shared/components';
import { Col, Form, Row, Space, message } from 'antd';
import moment from 'moment';
import React, { Fragment, ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import OrderSingleEditPosition from '../../components/OrderPositions/OrderSingleEditPosition';
import { EditOrder, OrderModuleType, OrderPositionsModelType, OrderSalePositionModel } from '../..';

type Props = {
  symbolName: string;
  orderSaleId: number;
  moduleType: OrderModuleType;
  positions: OrderPositionsModelType;
  editOrderSalePosition: (orderSaleId: number, positions: EditOrder[], onComplete: () => void) => void;
  removeOrderSalePosition: (order_sale_position_id: number, onComplete: () => void) => void;
  disconnectOrderSalePosition: (order_sale_position_id: number, onComplete: () => void) => void;
};
export const OrderSalePositionEdit = ({
  symbolName,
  orderSaleId,
  moduleType,
  positions: _positions,
  editOrderSalePosition,
  removeOrderSalePosition,
  disconnectOrderSalePosition,
}: Props): ReactElement => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const [update, setUpdate] = useState(false);
  // FIXME: Pending Errors
  const [pending, setPending] = useState<boolean>(false);
  // const [positionsWithChild, setPositionsWithChild] = useState<
  //   { position: OrderSalePositionModel; child: OrderSalePositionModel[] | null }[]
  // >([]);

  const [positions, setPositions] = useState<
    | OrderSalePositionModel[]
    | CreditSalePositionModel[]
    | SubscriptionSalePositionModel[]
    | PurchaseSalePositionModel[]
    | OrderSalePositionModel
  >(_positions);

  useEffect(() => {
    if (moduleType === 'credit') {
      setPositions(
        ([..._positions] as CreditSalePositionModel[]).map((pos) => ({
          ...pos,
          estimate_delivery_date: pos.productVariation.deliveryDate
            ? moment(pos.productVariation.deliveryDate)
            : undefined,
        })),
      );
    } else {
      setPositions(
        ([..._positions] as OrderSalePositionModel[])
          .map((pos) => ({
            ...pos,
            estimate_delivery_date: pos.estimatedDeliveryDate ? moment(pos.estimatedDeliveryDate) : undefined,
          }))
          .filter((pos) => moduleType === 'purchase' || pos.orderPositionType?.id !== 3),
      );
    }
    // else
    //   setPositionsWithChild(
    //     (_positions as OrderSalePositionModel[])
    //       .filter((pos) => pos.orderPositionType && pos.orderPositionType?.id !== 3)
    //       .map((pos) => ({ position: { ...pos }, child: null })),
    //   );
  }, [_positions]);

  useEffect(() => {
    form.setFieldsValue({ data: positions });
  }, [positions]);

  // useEffect(() => {
  //   if (positionsWithChild) {
  //     const result: OrderSalePositionModel[] = [];
  //     positionsWithChild.forEach((pos) => {
  //       result.push(pos.position);
  //       pos.child?.forEach((child) => result.push(child));
  //     });
  //     setPositions(result);
  //   }
  // }, [positionsWithChild]);

  useEffect(() => {
    setUpdate((v) => !v);
  }, [positions]);

  // const onShowMoreClicked = (id: number) => {
  //   setPositionsWithChild((positionsWithChild) =>
  //     positionsWithChild.map((pos) => {
  //       if (pos.position.orderId === id) {
  //         return {
  //           position: pos.position,
  //           child: pos.child
  //             ? null
  //             : (_positions as OrderSalePositionModel[]).filter(
  //                 (pos) => pos.orderPositionType?.id === 3 && pos.parentId === id,
  //               ),
  //         };
  //       }
  //       return pos;
  //     }),
  //   );
  // };

  return (
    <>
      <Row className="header">
        <Col span={2} className="title">
          <Row align="middle">
            <span>{t('Global.ID')}</span>
          </Row>
        </Col>

        <Col span={4} className="title">
          <Row align="middle">
            <span>{t('Global.Quantity')}</span>
          </Row>
        </Col>

        <Col span={6} className="title">
          <Row align="middle">
            <span>{t('Global.Details')} </span>
          </Row>
        </Col>

        <Col span={6} className="title">
          <Row align="middle">
            <span>{t('Order.Position.Price_Discount')}</span>
          </Row>
        </Col>

        <Col span={5} className="title">
          <Row align="middle">
            <span>{t('Order.Position.Vat')}</span>
          </Row>
        </Col>

        <Col span={1} className="title">
          <Row align="middle">
            <span>{t('Global.Action')}</span>
          </Row>
        </Col>
      </Row>

      <Space direction="vertical" className="positions" style={{ paddingRight: '16px' }}>
        <Form
          form={form}
          layout="horizontal"
          onFinish={({ data }) => {
            const dateWrong = (data as []).find(
              (item) =>
                new Date(item['estimate_delivery_date']) <
                new Date(
                  (positions as any).filter(
                    (position) => position.orderId === item['orderId'],
                  )?.[0].createdAt,
                ),
            );

            if (!dateWrong) {
              setPending(true);
              if (moduleType === 'credit' || moduleType === 'purchase') {
                const edited = (data as []).map(
                  (item) =>
                    ({
                      id: item['orderId'],
                      name: item['productVariation']?.['name'],
                      vat_value: item['vat']['value'],
                      vat_id: item['vat']['id'],
                      quantity: item['quantity'],
                      price_value: item['net_price'] ?? 0,
                      estimate_delivery_date: item['estimate_delivery_date'],
                      storage_variation_id: item['storageVariation']?.['id'] ?? undefined,
                    } as EditOrder),
                );

                editOrderSalePosition(orderSaleId, edited, () => setPending(false));
              } else {
                const edited = (data as [])
                  .filter((pos) => (pos as OrderSalePositionModel).orderPositionType?.id !== 3)
                  .map(
                    (item) =>
                      ({
                        id: item['orderId'],
                        name: item['productVariation']?.['name'],
                        vat_value: item['vat']['value'],
                        vat_id: item['vat']['id'],
                        quantity: item['quantity'],
                        price_value: item['net_price'] ?? 0,
                        estimate_delivery_date: item['estimate_delivery_date'],
                        storage_variation_id: item['storageVariation']
                          ? item['storageVariation']['id']
                          : undefined,
                      } as EditOrder),
                  );

                editOrderSalePosition(orderSaleId, edited, () => setPending(false));
              }
            } else {
              message.error(t('Order.Position.EditDateError'));
            }
          }}
        >
          {pending ? (
            <Loader />
          ) : (
            <Form.List name={'data'}>
              {(fields, {}) => {
                return (
                  <div className="form-list">
                    {fields.map(({ key, name, fieldKey }, index) => {
                      if (!positions[index]) return null;
                      return (
                        <Fragment key={key}>
                          <OrderSingleEditPosition
                            moduleType={moduleType}
                            version={update}
                            key={key}
                            name={name}
                            fieldKey={fieldKey}
                            symbolName={symbolName}
                            order={positions[index]}
                            remove={removeOrderSalePosition}
                            disconnect={disconnectOrderSalePosition}
                            form={form}
                            isComponent={
                              moduleType === 'purchase'
                                ? false
                                : moduleType !== 'credit' &&
                                  (positions[index] as OrderSalePositionModel).orderPositionType?.id === 3
                            }
                            index={index}
                            isBundle={
                              moduleType === 'credit'
                                ? false
                                : moduleType === 'purchase'
                                ? true
                                : (positions[index] as OrderSalePositionModel).orderPositionType?.id === 2
                            }
                          />
                        </Fragment>
                      );
                    })}
                  </div>
                );
              }}
            </Form.List>
          )}

          <FormSubmit title={t('Global.Save')} isPending={pending} />
        </Form>
      </Space>
    </>
  );
};
