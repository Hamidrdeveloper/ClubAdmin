import { FormSubmit, NameArrayInput } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Col, Form, InputNumber, Row } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { PaymentTerm } from '../model/paymentTerm.entity';

export default function PaymentTermForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<PaymentTerm>): ReactElement {
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
      name="paymentTerm-form"
      onFinish={onSubmit}
      initialValues={{ translate: [{ locale: undefined, description: '' }] }}
    >
      <Row gutter={[16, 0]}>
        <Col xs={24}>
          <Form.Item required>
            <NameArrayInput inputName="description" />
          </Form.Item>
        </Col>

        <Col xs={12}>
          <Form.Item label={t('PaymentTerm.Field.DueDays')} name="due_days" rules={[{ required: true }]}>
            <InputNumber
              min={0}
              placeholder={t('Global.InputPlaceholder', { title: t('PaymentTerm.Field.DueDays') })}
            />
          </Form.Item>
        </Col>

        <Col xs={12}>
          <Form.Item
            label={t('PaymentTerm.Field.DiscountPercentage')}
            name="discount_percentage"
            rules={[{ required: true }]}
          >
            <InputNumber
              step={0.01}
              min={0}
              max={100}
              placeholder={t('Global.InputPlaceholder', { title: t('PaymentTerm.Field.DiscountPercentage') })}
            />
          </Form.Item>
        </Col>
      </Row>

      <FormSubmit isPending={isPending} />
    </Form>
  );
}
