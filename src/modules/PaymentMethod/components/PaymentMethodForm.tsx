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
import { PaymentMethodType, PaymentMethodTypeSelect } from '@modules/PaymentMethodType/index';
import { FormSubmit, Loader, NameArrayInput, Upload, UploadLabel } from '@shared/components';
import { AuthContext } from '@src/core';
import CompanySelect from '@src/modules/Company/container/CompanySelect';
import { FormProps } from '@src/shared/models';
import { Checkbox, Col, Form, Input, InputNumber, Row } from 'antd';
import React, { ReactElement, Suspense, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PaymentMethod } from '../model/paymentMethod.entity';
import Styles from './style/form.style';

export default function PaymentMethodForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<PaymentMethod>): ReactElement {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { loggedInUserRole } = useContext(AuthContext);
  const [additionalDataFields, setAdditionalDataFields] = useState<string[]>(
    Object.keys(initialValues?._data ?? {}),
  );

  useEffect(() => {
    if (!initialValues) return;

    const { paymentMethodType } = initialValues;
    if (paymentMethodType) onMethodTypeChange(paymentMethodType);

    form.setFieldsValue(initialValues);
  }, [initialValues]);

  const onMethodTypeChange = (methodType: PaymentMethodType) => {
    const dataFields = methodType?.data;
    const dataFieldsName = Object.keys(dataFields ?? {});

    setAdditionalDataFields(dataFieldsName);
  };

  return (
    <Styles.MainContainer>
      <Form
        form={form}
        name="paymentMethod-form"
        layout={'vertical'}
        onFinish={onSubmit}
        initialValues={{ translate: [{ locale: undefined, name: '' }], is_active: false }}
      >
        <Suspense fallback={<Loader />}>
          <Styles.FieldSet>
           

           
            <Row gutter={[16, 0]}>

              <Col xs={12}>
                <Form.Item
                  label={
                    "Name"
                  }
                  name="name"
                  rules={[{ required: true }]}
                >
                  <Input
                   
                    placeholder={ "Title"}
                  />
                </Form.Item>
              </Col>
              <Col xs={12}>
                <Form.Item
                  label={"City Name"}
                  name="cityName"
                  rules={[{ required: true }]}
                >
                  <Input
                    placeholder={"City Name"}
                  />
                </Form.Item>
              </Col>
              <Col xs={12} style={{ alignSelf: 'end' }}>
       <Form.Item name={'file'} fieldKey={'file'} label={t('Availability.Field.File')}   rules={[{ required: true }]}>
            <Upload form={form} idName="file_id"/>
          </Form.Item>
          <Form.Item name="file_id" hidden>
                <></>
              </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="isActive" valuePropName="checked">
            <Checkbox>{t('Global.IsActive')}</Checkbox>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="isClubTeam" valuePropName="checked">
            <Checkbox>{"isClubTeam"}</Checkbox>
          </Form.Item>
        </Col>

            </Row>
            <FormSubmit isPending={isPending} />
          </Styles.FieldSet>
        </Suspense>
      </Form>
    </Styles.MainContainer>
  );
}

function removeUnderscore(str: string): string {
  return str.replace(/\_/g, ' ');
}

// turns paypal mode => Paypal Mode
function capitalizeFirstLetter(str: string): string {
  const words = str.split(' ');
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
