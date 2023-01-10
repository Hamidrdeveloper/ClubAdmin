import { FormSubmit, NameArrayInput } from '@shared/components';
import { FormProps } from '@src/shared/models';
import { Col, Form, Input, Row } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Unit } from '../model/unit.entity';

export default function UnitForm({ onSubmit, isPending, initialValues }: FormProps<Unit>): ReactElement {
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
      name="unit-form"
      layout={'vertical'}
      onFinish={onSubmit}
      initialValues={{ translate: [{ locale: undefined, name: '' }] }}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item required>
            <NameArrayInput />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('Unit.Field.Slug')} name="slug">
            <Input placeholder={t('Global.InputPlaceholder', { title: t('Unit.Field.Slug') })} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('Unit.Field.Symbol')} name="symbol">
            <Input placeholder={t('Global.InputPlaceholder', { title: t('Unit.Field.Symbol') })} />
          </Form.Item>
        </Col>
      </Row>

      <FormSubmit isPending={isPending} />
    </Form>
  );
}
