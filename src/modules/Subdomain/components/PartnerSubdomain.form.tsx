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
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { AuthContext } from '@src/core';
import { LanguageSelect } from '@src/modules/Language';
import { Partner, PartnerSelect } from '@src/modules/Partner';
import { PaymentMethod, PaymentMethodSelect } from '@src/modules/PaymentMethod';
import { FormSubmit, Loader, TextEditor } from '@src/shared/components';
import { Button, Checkbox, Col, Divider, Form, Input, Row, Space } from 'antd';
import React, { ReactElement, Suspense, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Subdomain } from '../model/Subdomain.entity';

interface SubdomainFormProps<T> {
  initialValues?: T;
  isPending: boolean;
  partnerData?: Partner;
  onSubmit: (data: T) => void;
}

const PartnerSubdomainForm = ({
  onSubmit,
  initialValues,
  isPending,
  partnerData,
}: SubdomainFormProps<Subdomain>): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod[]>([]);
  const { loggedInUserRole } = useContext(AuthContext);

  useEffect(() => {
    if (partnerData) {
      form.setFieldsValue({ partner: partnerData });
    }

    if (initialValues) {
      if ((initialValues.translate?.length ?? 0) <= 0)
        form.setFieldsValue({
          ...initialValues,
          translate: [{ locale: undefined, title: '', description: '' }],
        });
      else form.setFieldsValue(initialValues);

      setPaymentMethod(initialValues?.paymentMethods);
    }
  }, [initialValues]);

  const onPaymentMethodChangeHandler = (paymentMethods: PaymentMethod[]) => {
    const isPaymentMethodChangeConfirmed = window.confirm(
      t('Subdomain.Field.ChangePaymentMethodNotification'),
    );

    if (isPaymentMethodChangeConfirmed) {
      form.setFieldsValue({ paymentMethods });
      setPaymentMethod(paymentMethods);
    } else {
      form.setFieldsValue({ paymentMethods: paymentMethod });
    }
  };

  return (
    <Form
      form={form}
      layout={'vertical'}
      name="subdomain-form"
      onFinish={onSubmit}
      initialValues={{
        is_active: false,
        is_approved: false,
        translate: [{ locale: undefined, title: '', description: '' }],
      }}
    >
      <Suspense fallback={<Loader />}>
        <Row gutter={8}>
          <Col span={24}>
            <Row justify="space-between" gutter={16}>
              <Col span={12}>
                <Form.Item label={t('Global.Name')} name="name" rules={[{ required: true }]}>
                  <Input placeholder={t('Global.InputPlaceholder', { title: t('Global.Name') })} />
                </Form.Item>
              </Col>

              

              {/* <Col xs={12}>
                <Form.Item label={t('Subdomain.Field.PaymentMethod')} name="paymentMethods">
                  <PaymentMethodSelect isMulti onChange={onPaymentMethodChangeHandler} />
                </Form.Item>
              </Col> */}
            </Row>
            <Row>
              <Col span={3}>
                <Form.Item label={' '} name="is_active" valuePropName="checked">
                  <Checkbox disabled={loggedInUserRole === 'partner'}>{t('Global.IsActive')}</Checkbox>
                </Form.Item>
              </Col>

              <Col span={3}>
                <Form.Item label={' '} name="is_approved" valuePropName="checked">
                  <Checkbox disabled={loggedInUserRole === 'partner'}>{t('Global.IsApproved')}</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <FormSubmit isPending={isPending} />
      </Suspense>
    </Form>
  );
};

export default PartnerSubdomainForm;

const TranslationContainer = styled.div`
  gap: 8px;
  display: flex;

  &:not(:last-child) {
    margin-bottom: 16px;
  }

  & span[role='img'].icon {
    font-size: 16px;
    color: rgb(24, 144, 255);
  }
`;
