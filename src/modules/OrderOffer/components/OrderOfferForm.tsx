import { PaymentMethodTypeSelect } from '@src/modules/PaymentMethodType';
import { FormSubmit, NameArrayInput } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { intlDateFormat } from '@src/shared/utils/engine.service';
import { Col, DatePicker, Form, Input, InputNumber, Row } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { LanguageSelect } from '../../Language';
import { PaymentTermSelect } from '../../PaymentTerm';
import { OrderOffer } from '../model/orderOffer.entity';

export default function OrderOfferForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<OrderOffer>): ReactElement {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <Form
      form={form}
      layout={'vertical'}
      name="currency-form"
      onFinish={onSubmit}
      initialValues={{ is_active: false, is_default: false, translate: [{ locale: undefined, name: '' }] }}
    >
      <Row gutter={[16, 0]}>
        <Col xs={12}>
          <Form.Item label={t('OrderOffer.Field.UserId')} name="user_id" rules={[{ required: true }]}>
            <NameArrayInput hasLabel={false} />
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item label={t('OrderOffer.Field.Number')} name="number" rules={[{ required: true }]}>
            <InputNumber placeholder={'Enter Number'} />
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item
            name="invoice_contact_group_id"
            rules={[{ required: true }]}
            label={t('OrderOffer.Field.InvoiceContactGroupId')}
          >
            <PaymentTermSelect />
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item
            name="delivery_contact_group_id"
            rules={[{ required: true }]}
            label={t('OrderOffer.Field.DeliveryContactGroupId')}
          >
            <PaymentTermSelect />
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item
            label={t('OrderOffer.Field.PaymentMethodId')}
            name="payment_method_id"
            rules={[{ required: true }]}
          >
            <PaymentMethodTypeSelect />
          </Form.Item>
        </Col>

        <Col xs={12}>
          <Form.Item
            name="payment_term_id"
            rules={[{ required: true }]}
            label={t('OrderOffer.Field.PaymentTermId')}
          >
            <PaymentTermSelect />
          </Form.Item>
        </Col>

        <Col xs={24}>
          <Form.Item
            name="description"
            rules={[{ required: true }]}
            label={t('OrderOffer.Field.Description')}
          >
            <Input.TextArea />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('OrderOffer.Field.OrderDate')} name="order_date">
            <DatePicker
              format={intlDateFormat()}
              placeholder={t('Global.SelectPlaceholder', { title: t('OrderOffer.Field.OrderDate') })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('OrderOffer.Field.EstimateDeliveryDate')} name="estimate_delivery_date">
            <DatePicker
              format={intlDateFormat()}
              placeholder={t('Global.SelectPlaceholder', {
                title: t('OrderOffer.Field.EstimateDeliveryDate'),
              })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('OrderOffer.Field.DeliveryDate')} name="delivery_date">
            <DatePicker
              format={intlDateFormat()}
              placeholder={t('Global.SelectPlaceholder', { title: t('OrderOffer.Field.DeliveryDate') })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={t('OrderOffer.Field.EstimatePaymentDate')}
            name="estimate_payment_date"
            rules={[{ required: true }]}
          >
            <DatePicker
              format={intlDateFormat()}
              placeholder={t('Global.SelectPlaceholder', {
                title: t('OrderOffer.Field.EstimatePaymentDate'),
              })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={t('OrderOffer.Field.EarlyPaymentDiscountDays')}
            name="early_payment_discount_days"
            rules={[{ required: true }]}
          >
            <Input
              placeholder={t('Global.InputPlaceholder', {
                title: t('OrderOffer.Field.EarlyPaymentDiscountDays'),
              })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={t('OrderOffer.Field.EarlyPaymentDiscountPercentage')}
            name="early_payment_discount_percentage"
            rules={[{ required: true }]}
          >
            <Input
              placeholder={t('Global.InputPlaceholder', {
                title: t('OrderOffer.Field.EarlyPaymentDiscountPercentage'),
              })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={t('OrderOffer.Field.OrderStatusId')}
            name="order_status_Id"
            rules={[{ required: true }]}
          >
            <Input
              placeholder={t('Global.InputPlaceholder', { title: t('OrderOffer.Field.OrderStatusId') })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('OrderOffer.Field.languageId')} name="language_id" rules={[{ required: true }]}>
            <LanguageSelect />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('OrderOffer.Field.PaidDate')} name="paid_date">
            <DatePicker
              format={intlDateFormat()}
              placeholder={t('Global.SelectPlaceholder', { title: t('OrderOffer.Field.PaidDate') })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('OrderOffer.Field.OutgoingItems')} name="outgoing_items">
            <DatePicker
              format={intlDateFormat()}
              placeholder={t('Global.SelectPlaceholder', { title: t('OrderOffer.Field.OutgoingItems') })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={t('OrderOffer.Field.CustomerReference')}
            name="customer_Reference"
            rules={[{ required: true }]}
          >
            <Input
              placeholder={t('Global.InputPlaceholder', { title: t('OrderOffer.Field.CustomerReference') })}
            />
          </Form.Item>
        </Col>
      </Row>

      <FormSubmit isPending={isPending} />
    </Form>
  );
}
