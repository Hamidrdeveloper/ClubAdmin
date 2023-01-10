import { PackingTypeSelect } from '@modules/PackingType';
import { FormSubmit } from '@shared/components';
import { FormProps } from '@src/shared/models';
import { Col, Form, InputNumber, Row } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Package } from '../model/package.entity';

export default function PackageForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<Package>): ReactElement {
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
      name="package-form"
      onFinish={onSubmit}
      initialValues={{ translate: [{ locale: undefined, name: '' }] }}
    >
      <Row gutter={16}>
        <Col xl={12}>
          <Form.Item name="packingType" rules={[{ required: true }]} label={t('Package.Field.PackingType')}>
            <PackingTypeSelect />
          </Form.Item>
        </Col>

        <Col xs={12}>
          <Form.Item label={`${t('Package.Field.Length')} (cm)`} name="length" rules={[{ required: true }]}>
            <InputNumber
              min={0}
              placeholder={t('Global.InputPlaceholder', { title: t('Package.Field.Length') })}
            />
          </Form.Item>
        </Col>

        <Col xs={12}>
          <Form.Item label={`${t('Package.Field.Width')} (cm)`} name="width" rules={[{ required: true }]}>
            <InputNumber
              min={0}
              placeholder={t('Global.InputPlaceholder', { title: t('Package.Field.Width') })}
            />
          </Form.Item>
        </Col>

        <Col xs={12}>
          <Form.Item name="height" rules={[{ required: true }]} label={`${t('Package.Field.Height')} (cm)`}>
            <InputNumber
              min={0}
              placeholder={t('Global.InputPlaceholder', { title: t('Package.Field.Height') })}
            />
          </Form.Item>
        </Col>

        <Col xs={12}>
          <Form.Item
            hasFeedback
            name="net_weight"
            dependencies={['gross_weight']}
            label={`${t('Package.Field.NetWeight')} (Kg)`}
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('gross_weight') >= value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(t('Package.Field.NetWeightShouldBeEqualOrLessThanGrossWeight')),
                  );
                },
              }),
            ]}
          >
            <InputNumber
              min={0}
              placeholder={t('Global.InputPlaceholder', { title: t('Package.Field.NetWeight') })}
            />
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item
            hasFeedback
            name="gross_weight"
            dependencies={['net_weight']}
            label={`${t('Package.Field.GrossWeight')} (Kg)`}
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('net_weight') <= value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(t('Package.Field.GrossWeightShouldBeEqualOrMoreThanNetWeight')),
                  );
                },
              }),
            ]}
          >
            <InputNumber
              placeholder={t('Global.InputPlaceholder', { title: t('Package.Field.GrossWeight') })}
            />
          </Form.Item>
        </Col>
      </Row>
      <FormSubmit isPending={isPending} />
    </Form>
  );
}
