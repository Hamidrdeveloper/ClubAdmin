import { FormSubmit } from '@shared/components';
import { FormProps } from '@src/shared/models';
import { Col, Form, Input, InputNumber, Row } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { CustomTariff } from '../model/customTariff.entity';

export default function CustomTariffForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<CustomTariff>): ReactElement {
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
      onFinish={onSubmit}
      initialValues={{ translate: [{ locale: undefined, name: '' }] }}
      name="custom-tariff-form"
    >
      <Row gutter={[16, 0]}>
        <Col xs={12}>
          <Form.Item name="number" rules={[{ required: true }]} label={t('CustomTariff.Field.Number')}>
            <Input placeholder={t('Global.InputPlaceholder', { title: t('CustomTariff.Field.Number') })} />
          </Form.Item>
        </Col>

        <Col xs={12}>
          <Form.Item name="value" rules={[{ required: true }]} label={t('CustomTariff.Field.Value')}>
            <InputNumber
              min={0}
              step={0.01}
              placeholder={t('Global.InputPlaceholder', { title: t('CustomTariff.Field.Value') })}
            />
          </Form.Item>
        </Col>
      </Row>

      <FormSubmit isPending={isPending} />
    </Form>
  );
}
