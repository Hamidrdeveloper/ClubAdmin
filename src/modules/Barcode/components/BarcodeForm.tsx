import { FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Checkbox, Col, Form, Input, Row, Select } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import BarcodeModule from '../Barcode.module';
import { Barcode } from '../model/barcode.entity';

export default function BarcodeForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<Barcode>): ReactElement {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const module = new BarcodeModule();

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
      name="barcode-form"
      initialValues={{ used: false, translate: [{ locale: 'en', name: 'My Name' }] }}
    >
      <Row align="middle" gutter={[16, 0]}>
        <Col span={8}>
          <Form.Item label={t('Barcode.Field.Type')} name="type" rules={[{ required: true }]}>
            <Select options={module.BarcodeTypes} placeholder={t('Barcode.Field.Value')} />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label={t('Barcode.Field.Value')} name="value" rules={[{ required: true }]}>
            <Input placeholder={t('Global.InputPlaceholder', { title: t('Barcode.Field.Value') })} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label={' '} name="used" valuePropName="checked">
            <Checkbox>{t('Global.IsUsed')}</Checkbox>
          </Form.Item>
        </Col>
      </Row>

      <FormSubmit isPending={isPending} />
    </Form>
  );
}
