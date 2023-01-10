import { FormSubmit, NameArrayInput } from '@shared/components';
import { FormProps } from '@src/shared/models';
import { Col, Form, Row } from 'antd';
import React, { ReactElement, useEffect } from 'react';

import { VariationCategory } from '../model/variationCategory.entity';

export default function VariationCategoryForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<VariationCategory>): ReactElement {
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
      name="variation-category-form"
      initialValues={{ translate: [{ locale: undefined, name: '' }] }}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item required>
            <NameArrayInput />
          </Form.Item>
        </Col>
      </Row>

      <FormSubmit isPending={isPending} />
    </Form>
  );
}
