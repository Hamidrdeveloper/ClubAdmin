import { CountrySelect } from '@src/modules/Country';
import { FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Col, Form, InputNumber, Row } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { TransportationRule } from '../model/transportationrule.entity';

export default function TransportationRuleForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<TransportationRule>): ReactElement {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <Form form={form} layout={'vertical'} onFinish={onSubmit}>
      <Row align="middle" gutter={[16, 0]}>
        <Col span={8}>
          <Form.Item label={t('Global.Country')} name="country" rules={[{ required: true }]}>
            <CountrySelect />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={t('TransportationRule.Field.MinPartnerAmountGross')}
            name="min_partner_amount"
            rules={[{ required: true }]}
          >
            <InputNumber
              precision={2}
              min={0}
              placeholder={t('Global.InputPlaceholder', {
                title: t('TransportationRule.Field.MinPartnerAmountGross'),
              })}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={t('TransportationRule.Field.MinCustomerAmount')}
            name="min_customer_amount"
            rules={[{ required: true }]}
          >
            <InputNumber
              precision={2}
              min={0}
              placeholder={t('Global.InputPlaceholder', {
                title: t('TransportationRule.Field.MinCustomerAmount'),
              })}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={t('TransportationRule.Field.PartnerCostNet')}
            name="partner_cost"
            rules={[{ required: true }]}
          >
            <InputNumber
              precision={2}
              min={0}
              placeholder={t('Global.InputPlaceholder', {
                title: t('TransportationRule.Field.PartnerCostNet'),
              })}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label={t('TransportationRule.Field.CustomerCost')}
            name="customer_cost"
            rules={[{ required: true }]}
          >
            <InputNumber
              precision={2}
              min={0}
              placeholder={t('Global.InputPlaceholder', {
                title: t('TransportationRule.Field.CustomerCost'),
              })}
            />
          </Form.Item>
        </Col>
      </Row>

      <FormSubmit isPending={isPending} />
    </Form>
  );
}
