import { CurrencySelect } from '@src/modules/Currency';
import { PaymentMethodSelect } from '@src/modules/PaymentMethod';
import { FormSubmit } from '@src/shared/components';
import FallbackSelect from '@src/shared/components/FallbackSelect/FallbackSelect';
import { FormProps } from '@src/shared/models';
import { intlDateFormat } from '@src/shared/utils/engine.service';
import { Col, DatePicker, Form, Input, InputNumber, Row, Select } from 'antd';
import moment from 'moment';
import React, { ReactElement, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { OrderPaymentFormContext } from '../../model/order.entity';

interface OrderPaymentProps extends FormProps<Partial<OrderPaymentFormContext>> {
  orderId: number;
  isCredit: boolean;
}

function OrderPaymentForm({
  onSubmit,
  isPending,
  orderId,
  initialValues,
  isCredit,
}: OrderPaymentProps): ReactElement {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    if (initialValues) {
      delete initialValues.type;
      form.setFieldsValue(initialValues);
    }
  }, []);

  return (
    <Form
      form={form}
      layout={'vertical'}
      onFinish={onSubmit}
      name="payment-form"
      wrapperCol={{ span: 24 }}
      initialValues={{
        exchange_rate: 1,
        order_id: orderId,
        received_at: moment(),
        translate: [{ locale: undefined, name: '' }],
      }}
    >
      <Row gutter={[16, 0]}>
        <Col span={12}>
          <Form.Item name="order_id" label={t('Order.Title')}>
            <Input disabled />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label={t('Global.Amount')} name="price_value" rules={[{ required: true }]}>
            <InputNumber min={0} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 0]}>
        <Col span={12}>
          <Form.Item
            label={t('Order.Payment.CreditDebit')}
            name="type"
            rules={[{ required: true }]}
            initialValue={isCredit ? 'credit' : 'debit'}
          >
            <Select>
              <Select.Option value={'credit'}>{t('Global.Credit')}</Select.Option>
              <Select.Option value={'debit'}>{t('Global.Debit')}</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Suspense fallback={FallbackSelect(t('Global.Currency'))}>
            <Form.Item name="currency" label={t('Global.Currency')} rules={[{ required: true }]}>
              <CurrencySelect />
            </Form.Item>
          </Suspense>
        </Col>
      </Row>

      <Row gutter={[16, 0]}>
        <Col span={12}>
          <Form.Item name="exchange_rate" label={t('Order.Payment.ExchangeRate')}>
            <InputNumber disabled />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label={t('Global.Description')} name="description">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label={t('Order.Payment.IncomingPaymentDate')} name="received_at">
        <DatePicker format={intlDateFormat()} />
      </Form.Item>

      <Form.Item label={t('Order.Payment.Method')} name="payment_method" rules={[{ required: true }]}>
        <PaymentMethodSelect />
      </Form.Item>

      <FormSubmit isPending={isPending} />
    </Form>
  );
}

export default OrderPaymentForm;
