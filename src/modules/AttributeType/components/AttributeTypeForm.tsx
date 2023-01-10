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
import { PartnerSelect } from '@src/modules/Partner';
import AsyncSubdomainSelect from '@src/modules/Subdomain/containers/AsyncSubdomainSelect';
import { FormSubmit, Loader, NameArrayInput, Upload } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Checkbox, Col, DatePicker, Form, InputNumber, Row, Select } from 'antd';
import React, { ReactElement, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { VariationCategorySelect } from '../../VariationCategory';
import { AttributeTypes } from '..';
import { AvailabilitySelect } from '@src/modules/Availability';
import { PriceTypeSelect } from '@src/modules/PriceType';
import { intlDateFormat } from '@src/shared/utils/engine.service';

export default function AttributeTypeForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<AttributeTypes>): ReactElement {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      console.log('====================================');
      console.log(initialValues);
      console.log('====================================');
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);
  const dateFormat = "YYYY/MM/DD";

  return (
    <Form
      form={form}
      layout={'vertical'}
      colon={false}
      name="attributeType-form"
      onFinish={onSubmit}
      labelAlign="left"
      labelCol={{ xs: { span: 8 } }}
      initialValues={}
    >
      <Suspense fallback={<Loader />}>
      <Row gutter={16} >

      <Col span={12}>
    
    <Form.Item
    required
          name="chantId"
          label={"Chant ID"}
        >
        <AvailabilitySelect/>
        </Form.Item>
    
        </Col>
        <Col span={12}>
        <Form.Item
        required
          name="eventId"
          label={"Event ID"}
        >
        <PriceTypeSelect/>
        </Form.Item>
        </Col>
        
        <Col span={12}>
        <Form.Item name={'repeatCount'} label={"RepeatCount"} required>
          <InputNumber
            min={0}
            placeholder={"RepeatCount"}
          />
        </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item name={'point'} label={"Point"} required>
          <InputNumber
            min={0}
            placeholder={"Point"}
          />
        </Form.Item>
        </Col>
        <Col span={12}>
              <Form.Item label={"Start Time"} name="startTime" rules={[{ required: true }]}  >
                <DatePicker format={dateFormat}  placeholder={"Start Time"} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={"Count Down Start Time"} name="countDownStartTime" rules={[{ required: true }]} required>
                <DatePicker format={intlDateFormat()} placeholder={"Count Down Start Time"} />
              </Form.Item>
            </Col>
            <Col xs={12}>
          <Form.Item name="file" label={"File"} rules={[{ required: true }]}>
            <Upload form={form} idName="file" />
          </Form.Item>
          <Form.Item hidden name="file" />
        </Col>
            <Col span={12}>
        <Form.Item name="isActive" valuePropName="checked">
          <Checkbox>{"Is Active"}</Checkbox>
        </Form.Item>
        </Col>
        </Row>
        <FormSubmit isPending={isPending} />
      </Suspense>
    </Form>
  );
}
