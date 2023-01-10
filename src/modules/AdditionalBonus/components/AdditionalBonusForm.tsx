import { UserTypeSelect } from '@modules/UserType';
import { FormSubmit, Loader } from '@shared/components';
import { FormProps } from '@src/shared/models';
import { Col, Form, InputNumber, Row, Select } from 'antd';
import React, { ReactElement, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { AdditionalBonus } from '../model/additionalBonus.entity';

export default function AdditionalBonusForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<AdditionalBonus>): ReactElement {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);
  return (
    <Form
      name="additional-bonus-form"
      form={form}
      layout={'vertical'}
      onFinish={onSubmit}
      initialValues={{ translate: [{ locale: 'en', name: 'My Name' }] }}
    >
      <Suspense fallback={<Loader />}>
        <Row gutter={16}>
          <Col xl={12}>
            <Form.Item name="userType" label={'User Type'} rules={[{ required: true }]}>
              <UserTypeSelect />
            </Form.Item>
          </Col>
          <Col xl={12}>
            <Form.Item
              label={t('AdditionalBonus.Field.CriticType')}
              name="critic_type"
              rules={[{ required: true }]}
            >
              <Select
                placeholder={t('Global.SelectPlaceholder', { title: 'AdditionalBonus.Field.CriticType' })}
              >
                <Select.Option value={'point'}>{t('AdditionalBonus.Field.Point')}</Select.Option>
                <Select.Option value={'percentage'}>{t('AdditionalBonus.Field.Percent')}</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xl={8}>
            <Form.Item
              label={t('AdditionalBonus.Field.CriticValue')}
              name="critic_value"
              rules={[{ required: true }]}
            >
              <InputNumber
                min={0}
                placeholder={t('Global.InputPlaceholder', { title: t('AdditionalBonus.Field.CriticValue') })}
              />
            </Form.Item>
          </Col>
          <Col xl={8}>
            <Form.Item
              label={t('AdditionalBonus.Field.TimePeriod')}
              name="time_period"
              rules={[{ required: true }]}
            >
              <InputNumber
                min={0}
                placeholder={t('Global.InputPlaceholder', { title: t('AdditionalBonus.Field.TimePeriod') })}
              />
            </Form.Item>
          </Col>
          <Col xl={8}>
            <Form.Item
              label={t('AdditionalBonus.Field.MinPoint')}
              name="min_point"
              rules={[{ required: true }]}
            >
              <InputNumber
                min={0}
                placeholder={t('Global.InputPlaceholder', { title: t('AdditionalBonus.Field.MinPoint') })}
              />
            </Form.Item>
          </Col>
        </Row>
        <FormSubmit isPending={isPending} />
      </Suspense>
    </Form>
  );
}
