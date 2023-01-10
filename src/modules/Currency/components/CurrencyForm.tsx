/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheckimport i18n from '@src/core/i18n/config';
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { FormSubmit, NameArrayInput } from '@shared/components';
import { FormProps } from '@src/shared/models';
import { Checkbox, Col, Form, Input, InputNumber, Row, Space, TimePicker } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Currency } from '../model/currency.entity';

export default function CurrencyForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<Currency>): ReactElement {
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
      initialValues={{ }}
    >
      <Row gutter={[32, 8]}>
        <Col xs={12}>
          <Form.Item name="RepeatCount" label={"Repeat Count" }  rules={[{ required: true }]}>
            <InputNumber placeholder={"RepeatCount" }/>
          </Form.Item>
        </Col>

    
        <Col xs={12}>
          <Form.Item name="startTime_ms" label={"Start Time ms"} rules={[{ required: true }]}    valuePropName='date'>
          <TimePicker  
           format={"mm:ss"}

              placeholder={"Start Time"}
            />
          </Form.Item>
        </Col>
        <Col xs={12} style={{ alignSelf: 'end' }}>
        <Form.Item name="isActive" valuePropName="checked">
                <Checkbox >{"Is Active"}</Checkbox>
              </Form.Item>
        </Col>
      </Row>


      <FormSubmit isPending={isPending} />
    </Form>
  );
}
