import { NumberSeriesSelect } from '@src/modules/NumberSeries';
import { DescriptionArrayInput, FormSubmit, Upload } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { intlDateFormat } from '@src/shared/utils/engine.service';
import { Checkbox, Col, DatePicker, Form, Input, InputNumber, Row } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Product } from '../model/Product.entity';
import Styles from './styles/ProductForm.style';

const ProductForm: React.FC<FormProps<Product>> = ({ onSubmit, isPending, initialValues }) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        release_date: initialValues.release_date ? moment(initialValues.release_date) : null,
        available_until: initialValues.available_until ? moment(initialValues.available_until) : null,
      });
    }
  }, [initialValues]);

  return (
    <Form
      form={form}
      colon={false}
      name="product-form"
      onFinish={onSubmit}
      labelAlign="left"
      layout="vertical"
      initialValues={{
        is_active: false,
        price_visible: true,
        auto_active_net_stock: false,
        auto_deactive_net_stock: false,
        translate: [{ locale: undefined, name: '', description: '' }],
      }}
    >
      <Styles.SingleProductRow gutter={[16, 16]}>
        <Col span={12}>
          <h2>{t('Product.ProductImage')}</h2>
          <Row align={'middle'}>
            <Col flex={1}>
              <Form.Item name="file" style={{ marginBottom: 12 }}>
                <Upload type="dragger" form={form} />
              </Form.Item>
              <Form.Item hidden name="file_id">
                <></>
              </Form.Item>
            </Col>
          </Row>

          <Styles.BoxShadow>
            <h2>{t('Product.BasicSetting')}</h2>
            <Form.Item name="number" label={t('Global.Number')}>
              <Input placeholder={t('Global.InputPlaceholder', { title: t('Global.Number') })} />
            </Form.Item>
            {!initialValues && (
              <Form.Item name="number_series_position_id" label={t('Product.Field.NumberSeries')}>
                <NumberSeriesSelect slug="product" />
              </Form.Item>
            )}

            <Form.Item name="default_vat" label={t('Product.Field.DefaultVat')} rules={[{ required: true }]}>
              <InputNumber
                min={0}
                max={100}
                placeholder={t('Global.InputPlaceholder', { title: t('Product.Field.DefaultVat') })}
              />
            </Form.Item>
            <Form.Item label={t('Product.Field.Sort')} name="sort">
              <InputNumber
                min={0}
                placeholder={t('Global.InputPlaceholder', { title: t('Product.Field.Sort') })}
              />
            </Form.Item>
          </Styles.BoxShadow>
        </Col>

        <Col span={12}>
          <Styles.BoxShadow className="right-side">
            <Form.Item name="max_order_quantity" label={t('Product.Field.MaxOrderQuantity')}>
              <InputNumber
                min={1}
                placeholder={t('Global.InputPlaceholder', { title: t('Product.Field.MaxOrderQuantity') })}
              />
            </Form.Item>
            <Form.Item name="min_order_quantity" label={t('Product.Field.MinOrderQuantity')}>
              <InputNumber
                min={1}
                placeholder={t('Global.InputPlaceholder', { title: t('Product.Field.MinOrderQuantity') })}
              />
            </Form.Item>
            <Form.Item name="maximum_sale_for_each_user" label={t('Product.Field.MaxSaleForEachUser')}>
              <InputNumber
                min={1}
                placeholder={t('Global.InputPlaceholder', { title: t('Product.Field.MaxSaleForEachUser') })}
              />
            </Form.Item>
            <Form.Item label={t('Product.Field.ReleaseDate')} name={'release_date'}>
              <DatePicker format={intlDateFormat()} placeholder={t('Product.Field.ReleaseDate')} />
            </Form.Item>
            <Form.Item name={'available_until'} label={t('Product.Field.AvailableUntil')}>
              <DatePicker format={intlDateFormat()} placeholder={t('Product.Field.AvailableUntil')} />
            </Form.Item>
            <Form.Item label={t('Product.Field.IntervalOrderQuantity')} name="interval_order_quantity">
              <InputNumber
                min={1}
                placeholder={t('Global.InputPlaceholder', {
                  title: t('Product.Field.IntervalOrderQuantity'),
                })}
              />
            </Form.Item>
          </Styles.BoxShadow>
        </Col>
      </Styles.SingleProductRow>

      <Row gutter={[16, 16]} align={'middle'} style={{ padding: '16px 24px' }}>
        <Col>
          <Form.Item name="is_active" valuePropName="checked">
            <Checkbox>{t('Global.IsActive')}</Checkbox>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item name="price_visible" valuePropName="checked">
            <Checkbox>{t('Product.Field.PriceVisible')}</Checkbox>
          </Form.Item>
        </Col>
      </Row>

      <div style={{ padding: '0 16px' }}>
        <DescriptionArrayInput isDescriptionRequired={true} />
      </div>

      <FormSubmit
        isPending={isPending}
        title={initialValues ? t('Global.SaveChanges') : t('Global.Submit')}
      />
    </Form>
  );
};

export default ProductForm;
