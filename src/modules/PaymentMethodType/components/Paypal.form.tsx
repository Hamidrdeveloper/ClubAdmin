import { FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Col, Form, Input, Row } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { PaypalModel } from '../model/paypal.entity';

export const PaypalForm = ({ onSubmit, isPending, initialValues }: FormProps<PaypalModel>): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <MainContainer>
      <Form form={form} layout={'vertical'} name="paypalSetting-form" onFinish={onSubmit}>
        <Row gutter={[16, 0]}>
          <Col span={12}>
            <Form.Item
              name="paypal_currency"
              rules={[{ required: true }]}
              label={t('ShopSettings.Field.Paypal.Currency')}
            >
              <Input
                placeholder={t('Global.InputPlaceholder', {
                  title: t('ShopSettings.Field.Paypal.Currency'),
                })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('ShopSettings.Field.Paypal.ProductionClientId')}
              name="paypal_production_client_id"
              rules={[{ required: true }]}
            >
              <Input
                placeholder={t('Global.InputPlaceholder', {
                  title: t('ShopSettings.Field.Paypal.ProductionClientId'),
                })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('ShopSettings.Field.Paypal.ProductionClientSecret')}
              name="paypal_production_client_secret"
              rules={[{ required: true }]}
            >
              <Input
                placeholder={t('Global.InputPlaceholder', {
                  title: t('ShopSettings.Field.Paypal.ProductionClientSecret'),
                })}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={t('ShopSettings.Field.Paypal.Mode')}
              name="paypal_mode"
              rules={[{ required: true }]}
            >
              <Input
                placeholder={t('Global.InputPlaceholder', {
                  title: t('ShopSettings.Field.Paypal.Mode'),
                })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('ShopSettings.Field.Paypal.SandboxClientId')}
              name="paypal_sandbox_client_id"
              rules={[{ required: true }]}
            >
              <Input
                placeholder={t('Global.InputPlaceholder', {
                  title: t('ShopSettings.Field.Paypal.SandboxClientId'),
                })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('ShopSettings.Field.Paypal.SandboxClientSecret')}
              name="paypal_sandbox_client_secret"
              rules={[{ required: true }]}
            >
              <Input
                placeholder={t('Global.InputPlaceholder', {
                  title: t('ShopSettings.Field.Paypal.SandboxClientSecret'),
                })}
              />
            </Form.Item>
          </Col>
        </Row>

        <FormSubmit isPending={isPending} />
      </Form>
    </MainContainer>
  );
};

const MainContainer = styled.div`
`;
