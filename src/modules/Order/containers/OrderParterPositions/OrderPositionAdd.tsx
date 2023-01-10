import { FormSubmit, Loader } from '@src/shared/components';
import { Col, Form, Row, Space } from 'antd';
import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { EditPartnerOrder } from '../../model/partner.entity';
import SingleAddPosition from './SingleAddPosition';

type Props = {
  symbolName: string;
  addOrderPosition: (position: EditPartnerOrder, onComplete: () => void) => void;
};
export const OrderParterAddPosition = ({ symbolName, addOrderPosition }: Props): ReactElement => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const [pending, setPending] = useState<boolean>(false);

  return (
    <>
      <Row className="header">
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
      </Row>

      <Space direction="vertical" className="positions" style={{ paddingRight: '16px' }}>
        <Form
          form={form}
          layout="horizontal"
          onFinish={(data) => {
            setPending(true);

            const edited = {
              name: data['name'],
              unit_id: data['unit_id'],
              vat_id: data['vat']['id'],
              quantity: data['quantity'],
              description: data['description'],
              price_value: data['net_price'] ?? 0,
            } as EditPartnerOrder;

            addOrderPosition(edited, () => setPending(false));
          }}
        >
          {pending ? <Loader /> : <SingleAddPosition form={form} symbolName={symbolName} />}

          <FormSubmit title={t('Global.Save')} isPending={pending} />
        </Form>
      </Space>
    </>
  );
};
