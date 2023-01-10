import { CurrencySelect } from '@modules/Currency';
import { PriceTypeSelect } from '@modules/PriceType';
import { FormSubmit, Loader, NameArrayInput } from '@shared/components';
import { CountrySelect } from '@src/modules/Country';
import { FormProps } from '@src/shared/models';
import { Col, Form, InputNumber, Row, Select } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import React, { ReactElement, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Price } from '../model/price.entity';
import PriceModule from '../Price.module';

export default function PriceForm({ onSubmit, isPending, initialValues }: FormProps<Price>): ReactElement {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const module = new PriceModule();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <Form
      form={form}
      name="price-form"
      layout={'vertical'}
      onFinish={onSubmit}
      initialValues={{ translate: [{ locale: undefined, name: '' }], display_for_new_item: false }}
    >
      <Suspense fallback={<Loader />}>
        <Form.Item required>
          <NameArrayInput />
        </Form.Item>
        <Row gutter={[32, 8]}>
          <Col xs={12}>
            <Form.Item name="currency" rules={[{ required: true }]} label={t('Price.Field.CurrencyName')}>
              <CurrencySelect />
            </Form.Item>
          </Col>

          <Col xs={12}>
            <Form.Item name="priceType" rules={[{ required: true }]} label={t('Price.Field.PriceType')}>
              <PriceTypeSelect />
            </Form.Item>
          </Col>

          <Col xs={12}>
            <Form.Item name="interval" rules={[{ required: true }]} label={t('Price.Field.Interval')}>
              <Select
                options={module.PriceIntervalTypes}
                placeholder={t('Global.InputPlaceholder', { title: t('Price.Field.Interval') })}
              />
            </Form.Item>
          </Col>

          <Col xs={12}>
            <Form.Item name="min_quantity" rules={[{ required: true }]} label={t('Price.Field.MinQuantity')}>
              <InputNumber
                min={0}
                placeholder={t('Global.InputPlaceholder', { title: t('Price.Field.MinQuantity') })}
              />
            </Form.Item>
          </Col>

          <Col xs={12}>
            <Form.Item name="unit_price" rules={[{ required: true }]} label={t('Price.Field.UnitPrice')}>
              <InputNumber
                min={0}
                placeholder={t('Global.InputPlaceholder', { title: t('Price.Field.UnitPrice') })}
              />
            </Form.Item>
          </Col>

          <Col xs={12}>
            <Form.Item name="countries" rules={[{ required: true }]} label={t('Price.Field.CountryName')}>
              <CountrySelect menuPlacement="top" isMulti />
            </Form.Item>
          </Col>

          <Col xs={12}>
            <Form.Item name="display_for_new_item" valuePropName="checked">
              <Checkbox>{t('Price.Field.DisplayForNewItem')}</Checkbox>
            </Form.Item>
          </Col>
        </Row>

        <FormSubmit isPending={isPending} />
      </Suspense>
    </Form>
  );
}
