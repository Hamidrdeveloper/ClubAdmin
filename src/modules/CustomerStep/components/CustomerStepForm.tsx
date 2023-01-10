import { FormSubmit, NameArrayInput } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Col, Form, InputNumber, Row } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { CustomerStepModel } from '../model/CustomerStep.entity';

export default function CustomerStepForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<CustomerStepModel>): ReactElement {
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
      onFinish={onSubmit}
      initialValues={{ translate: [{ locale: undefined, name: '' }] }}
    >
      <Row align="middle" gutter={[16, 0]}>
        <Col span={24}>
          <Form.Item required>
            <NameArrayInput />
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item label={t('CustomerStep.Field.VoucherLevel')} name="voucher_level">
            <InputNumber
              placeholder={t('Global.InputPlaceholder', { title: t('CustomerStep.Field.VoucherLevel') })}
            />
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item label={t('CustomerStep.Field.AccountMinusValue')} name="id_account_minus_value">
            <InputNumber
              placeholder={t('Global.InputPlaceholder', { title: t('CustomerStep.Field.AccountMinusValue') })}
            />
          </Form.Item>
        </Col>
      </Row>

      <FormSubmit isPending={isPending} />
    </Form>
  );
}
