import { PartnerSalePositionModel } from '@modules/Order';
import { FormSubmit, Loader } from '@src/shared/components';
import { Col, Form, Row, Space } from 'antd';
import React, { Fragment, ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { EditPartnerOrder } from '../..';
import OrderSingleEditPosition from './SingleEditPosition';

type Props = {
  symbolName: string;
  orderPartnerId: number;
  positions: PartnerSalePositionModel[];
  editOrderSalePosition: (
    orderPartnerId: number,
    positions: EditPartnerOrder[],
    onComplete: () => void,
  ) => void;
  removeOrderSalePosition: (order_sale_position_id: number, onComplete: () => void) => void;
};
export const OrderPartnerPositionEdit = ({
  symbolName,
  orderPartnerId,
  positions: _positions,
  editOrderSalePosition,
  removeOrderSalePosition,
}: Props): ReactElement => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const [update, setUpdate] = useState(false);
  const [pending, setPending] = useState<boolean>(false);
  const [positions, setPositions] = useState<PartnerSalePositionModel[]>(_positions);

  useEffect(() => {
    setPositions(_positions);
  }, [_positions]);

  useEffect(() => {
    form.setFieldsValue({
      data: positions.map((position) => ({
        ...position,
        vat: { value: position.vat_value, label: position.vat_value },
      })),
    });
  }, [positions]);

  useEffect(() => {
    setUpdate((v) => !v);
  }, [positions]);

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
            setPending(true);
            const edited = (data as []).map(
              (item) =>
                ({
                  id: item['id'],
                  name: item['name'],
                  unit_id: item['unit_id'],
                  vat_id: item['vat_id'],
                  quantity: item['quantity'],
                  vat_value: item['vat']['value'],
                  description: item['description'],
                  price_value: item['net_price'] ?? 0,
                } as EditPartnerOrder),
            );

            editOrderSalePosition(orderPartnerId, edited, () => setPending(false));
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
                            key={key}
                            name={name}
                            form={form}
                            index={index}
                            version={update}
                            fieldKey={fieldKey}
                            symbolName={symbolName}
                            order={positions[index]}
                            remove={removeOrderSalePosition}
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
