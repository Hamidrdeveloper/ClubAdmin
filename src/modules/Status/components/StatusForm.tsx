import { ColorPicker, FormSubmit, NameArrayInput } from '@shared/components';
import { FormProps } from '@src/shared/models';
import { Col, Form, InputNumber, Row } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Status } from '../model/status.entity';

export default function StatusForm({ onSubmit, isPending, initialValues }: FormProps<Status>): ReactElement {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        translate:
          (initialValues.translate || []).length === 0
            ? [{ locale: undefined, name: '' }]
            : initialValues.translate,
      });
    }
  }, [initialValues]);

  return (
    <Form
      form={form}
      layout={'vertical'}
      onFinish={onSubmit}
      name="status-form"
      initialValues={{ translate: [{ locale: undefined, name: '' }] }}
    >
      <Row gutter={[16, 0]}>
        <Col span={24}>
          <Form.Item required>
            <NameArrayInput />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('Status.Field.Number')} name="number" rules={[{ required: true }]}>
            <InputNumber
              min={0}
              placeholder={t('Global.InputPlaceholder', { title: t('Status.Field.Number') })}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label={t('Status.Field.Color')} name="color" rules={[{ required: true }]}>
            <ColorPicker />
          </Form.Item>
        </Col>
      </Row>
      <FormSubmit isPending={isPending} />
    </Form>
  );
}
