import { DescriptionArrayInput, FormSubmit } from '@shared/components';
import { FormProps } from '@src/shared/models';
import { Checkbox, Col, Form, Input, InputNumber, Row, Select, Space } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { UserType } from '../model/userType.entity';
import UserTypeModule from '../UserType.module';

export default function UserTypeForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<UserType>): ReactElement {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [bonusType, setBonusType] = useState<'point' | 'percentage'>('point');
  const module = new UserTypeModule();

  const handleBonusTypeChange = (option) => {
    setBonusType(option);
  };

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
      name="userType-form"
      initialValues={{ translate: [{ locale: undefined, name: '' }], bonus_type: bonusType }}
    >
      <Row gutter={[16, 0]}>
        <Col span={12}>
          <Form.Item label={t('UserType.Field.DiscountPercentage')} name="discount_percentage">
            <InputNumber
              min={0}
              max={100}
              placeholder={t('Global.InputPlaceholder', { title: t('UserType.Field.DiscountPercentage') })}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label={t('UserType.Field.MinPoint')} name="min_point" rules={[{ required: true }]}>
            <InputNumber
              min={0}
              placeholder={t('Global.InputPlaceholder', { title: t('UserType.Field.MinPoint') })}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label={t('UserType.Field.BonusType')} name="bonus_type" rules={[{ required: true }]}>
            <Select
              style={{ minWidth: 150 }}
              onChange={handleBonusTypeChange}
              options={module.UserTypeBonusTypes}
              placeholder={t('Global.SelectPlaceholder', { title: t('UserType.Field.BonusType') })}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label={t('UserType.Field.BonusValue')} name="bonus_value">
            <InputNumber
              min={0}
              max={bonusType === 'percentage' ? 100 : Infinity}
              placeholder={t('Global.InputPlaceholder', { title: t('UserType.Field.BonusValue') })}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label={t('UserType.Field.MinPeriod')} name="period_type" required>
            <Input.Group compact style={{ display: 'flex', flex: 1 }}>
              <Form.Item name="period_type" rules={[{ required: true }]}>
                <Select
                  style={{ minWidth: 150 }}
                  options={module.UserTypeMinPeriodTypes}
                  placeholder={t('Global.SelectPlaceholder', { title: t('UserType.Field.MinPeriod') })}
                />
              </Form.Item>
              <Form.Item style={{ flex: 1 }} name="min_period">
                <InputNumber
                  min={0}
                  precision={0}
                  step={1}
                  placeholder={t('Global.InputPlaceholder', { title: t('UserType.Field.MinPeriod') })}
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item label={t('UserType.Field.WithNumberOfGenerations')} name="with_number_of_generations">
            <InputNumber
              min={0}
              maxLength={2}
              placeholder={t('Global.InputPlaceholder', {
                title: t('UserType.Field.WithNumberOfGenerations'),
              })}
            />
          </Form.Item>
        </Col>
      </Row>

      <Space>
        <Form.Item name="is_generation" valuePropName="checked">
          <Checkbox>{t('Global.IsGeneration')}</Checkbox>
        </Form.Item>

        <Form.Item name="is_partner" valuePropName="checked">
          <Checkbox>{t('Global.IsPartner')}</Checkbox>
        </Form.Item>
      </Space>

      <DescriptionArrayInput />
      <FormSubmit isPending={isPending} />
    </Form>
  );
}
