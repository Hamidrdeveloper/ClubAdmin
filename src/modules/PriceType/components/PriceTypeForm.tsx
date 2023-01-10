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
import { FormSubmit, EventArrayInput, Upload } from '@shared/components';
import { FormProps } from '@src/shared/models';
import { Checkbox, Col, DatePicker, Form, Input, Row } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { PriceType } from '../model/priceType.entity';
import { intlDateFormat } from '@src/shared/utils/engine.service';
import { PaymentMethodSelect } from '@src/modules/PaymentMethod';
import PriceSelect from '@src/modules/Price/containers/PriceSelect';

export default function PriceTypeForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<PriceType>): ReactElement {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      console.log('====================================');
      console.log(initialValues);
      console.log('====================================');
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);
  const { t } = useTranslation();

  return (
    <Form
      form={form}
      layout={'vertical'}
      name="price-type-form"
      initialValues={{ translate: [{ locale: undefined, name: '' }] }}
      onFinish={onSubmit}
    >
       <Row gutter={[16, 0]}>

<Col xs={12}>
  <Form.Item
    label={"Title"}
    name="title"
    rules={[{ required: true }]}
  >
    <Input
      placeholder={"Title"}
    />
  </Form.Item>
</Col>
<Col span={12}>
            <Form.Item name="hostTeamId" label={"Host Team Id"} rules={[{ required: true }]}>
             <PaymentMethodSelect/>
             </Form.Item>
        </Col>
        <Col span={12}>
            <Form.Item name="guestTeamId" label="Guest Team Id" rules={[{ required: true }]}>
             <PaymentMethodSelect/>
             </Form.Item>
        </Col>
        <Col span={12}>
            <Form.Item name="status" label="Status" rules={[{ required: true }]}>
             <PriceSelect/>
             </Form.Item>
        </Col>
        
<Col span={12}>
              <Form.Item label={`StartTime`} name="startTime" rules={[{ required: true }]}>
                <DatePicker format={intlDateFormat()} placeholder={`StartTime`} />
              </Form.Item>
              </Col>
            <Col span={12}>
              <Form.Item label={`EndTime`} name="endTime" rules={[{ required: true }]}>
                <DatePicker format={intlDateFormat()} placeholder={`EndTime`} />
              </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item name={"file"} label={t('Availability.Field.File')} rules={[{ required: true }]}>
            <Upload pathName="file" type={'normal'} form={form} valueName="file" idName="file" key={"file"} />
          </Form.Item>
            </Col>
        <Col span={12}>
            <Form.Item name="isActive" valuePropName="checked">
          <Checkbox>{"isActive"}</Checkbox>
        </Form.Item>
        </Col>
</Row>
      {/* <Form.Item required>
        <EventArrayInput />
      </Form.Item> */}

      <Form.Item>
        <Row className="submit" justify="end">
          <FormSubmit isPending={isPending} />
        </Row>
      </Form.Item>
    </Form>
  );
}
