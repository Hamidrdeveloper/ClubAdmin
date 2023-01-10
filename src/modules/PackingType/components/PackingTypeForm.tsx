import { FormSubmit, NameArrayInput } from '@shared/components';
import { FormProps } from '@src/shared/models';
import { Form, Row } from 'antd';
import React, { ReactElement, useEffect } from 'react';

import { PackingType } from '../model/packingType.entity';

export default function PackingTypeForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<PackingType>): ReactElement {
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
      name="packing-type-form"
      initialValues={{ translate: [{ locale: undefined, name: '' }] }}
      onFinish={onSubmit}
    >
      <Form.Item required>
        <NameArrayInput />
      </Form.Item>

      <Form.Item>
        <Row className={'submit'} justify={'end'}>
          <FormSubmit isPending={isPending} />
        </Row>
      </Form.Item>
    </Form>
  );
}
