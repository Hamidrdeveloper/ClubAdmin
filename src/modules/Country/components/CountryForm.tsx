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
import { FormSubmit, Loader, NameArrayInput, VatArrayInput } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Checkbox, Col, Form, Input, InputNumber, Row, Space, TimePicker } from 'antd';
import moment from 'moment';
import React, { ReactElement, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { CurrencySelect } from '../../Currency';
import CountryModule from '../Country.module';
import { Country } from '../model/country.entity';
import Styles from './styles/CountryForm.style';

export default function CountryForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<Country>): ReactElement {
  const countryModule = new CountryModule();

  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        vats:
          initialValues.vats.length === 0
            ? [{ vat_number: '', vat_value: '', vat_from: moment() }]
            : initialValues.vats.map((vat) => ({ ...vat, valid_from: moment(vat.valid_from) })),
      });
    }
  }, [initialValues]);

  return (
    <Form
      form={form}
      name="country-form"
      layout={'vertical'}
      onFinish={onSubmit}
      initialValues={{}}
    >
      <Row gutter={[32, 8]}>
        <Col xs={12}>
          <Form.Item name="RepeatCount" label={"Repeat Count" } rules={[{ required: true }]}>
            <InputNumber placeholder={"RepeatCount" } />
          </Form.Item>
        </Col>

    
        <Col xs={12}>
          <Form.Item name="startTime_ms" label={"Start Time ms" } rules={[{ required: true }]}    valuePropName='date'>
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
