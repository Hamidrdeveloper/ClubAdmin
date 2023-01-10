import AvailabilityRadio from '@src/modules/Availability/containers/AvailabilityRadio';
import BarcodeAsyncSelect from '@src/modules/Barcode/containers/BarcodeAsyncSelect';
import { CustomTariffSelect } from '@src/modules/CustomTariff';
import { NumberSeriesSelect } from '@src/modules/NumberSeries';
import AsyncProductCategorySelect from '@src/modules/ProductCategory/containers/ProductCategoryAsyncSelect';
import { ShippingProfileSelect } from '@src/modules/ShippingProfile';
import { UnitSelect } from '@src/modules/Unit';
import { FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { intlDateFormat } from '@src/shared/utils/engine.service';
import { Button, Checkbox, Col, DatePicker, Form, Input, InputNumber, Row } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import VariationSelect from '../containers/VariationSelect';
import { Product } from '../model/Product.entity';
import { VariationSettings } from '../model/ProductVariation-args';
import BarcodeGenerationModalForm from './BarcodeGenerationModalForm';
import FormStyles from './styles/Form.style';
import SettingStyles from './styles/Settings.style';

const VariationSettingsForm: React.FC<FormProps<VariationSettings> & { product: Product }> = ({
  product,
  onSubmit,
  isPending,
  initialValues,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { Item: FormItem } = Form;
  const [isInherit, setInherit] = useState(false);

  const [isGenerateBarcodeModalVisible, setGenerateBarcodeModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (initialValues) {
      setInherit(initialValues.inherit);
      form.setFieldsValue({
        ...initialValues,
        release_date: initialValues.inherit
          ? product.release_date
            ? moment(product.release_date)
            : undefined
          : initialValues.release_date
          ? moment(initialValues.release_date)
          : undefined,
        available_until: initialValues.inherit
          ? product.available_until
            ? moment(product.available_until)
            : undefined
          : initialValues.available_until
          ? moment(initialValues.available_until)
          : undefined,
        min_order_quantity: initialValues.inherit
          ? product.min_order_quantity
          : initialValues.min_order_quantity,
        max_order_quantity: initialValues.inherit
          ? product.max_order_quantity
          : initialValues.max_order_quantity,
        maximum_sale_for_each_user: initialValues.inherit
          ? product.maximum_sale_for_each_user
          : initialValues.maximum_sale_for_each_user,
      });
    }
  }, [initialValues]);

  const handleInheritChange = (event: CheckboxChangeEvent) => {
    setInherit(event.target.checked);
    form.setFields([{ name: 'inherit', value: event.target.checked }]);

    if (event.target.checked) {
      form.setFields([
        { name: 'max_order_quantity', value: product.max_order_quantity },
        { name: 'min_order_quantity', value: product.min_order_quantity },
        { name: 'maximum_sale_for_each_user', value: product.maximum_sale_for_each_user },
        { name: 'release_date', value: product.release_date ? moment(product.release_date) : undefined },
        {
          name: 'available_until',
          value: product.available_until ? moment(product.available_until) : undefined,
        },
      ]);
    }
  };

  const makePlaceholder = (title: string) => t('Global.InputPlaceholder', { title });
  return (
    <SettingStyles.MainContainer>
      <FormStyles.FormContainer
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        name="variation-settings-form"
        initialValues={{
          is_active: true,
          is_main: false,
          inherit: false,
          has_serial_number: false,
          auto_active_net_stock: false,
          auto_deactivate_net_stock: false,
          free_logistics_for_customer: false,
          free_logistics_for_partner: false,
          only_partner: false,
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <div className="form-content">
              <FormItem name="number" label={t('Global.Number')}>
                <Input placeholder={makePlaceholder(t('Global.Number'))} />
              </FormItem>

              <FormItem name="purchase_price" label={t('Product.Variation.Settings.PurchasePrice')}>
                <InputNumber placeholder={makePlaceholder(t('Product.Variation.Settings.PurchasePrice'))} />
              </FormItem>

              {!initialValues && (
                <Form.Item name="number_series_position_id" label={t('Product.Field.NumberSeries')}>
                  <NumberSeriesSelect slug="product-variation" />
                </Form.Item>
              )}

              <FormItem name="quantity" label={t('Order.Field.Quantity')}>
                <InputNumber min={0} placeholder={makePlaceholder(t('Order.Field.Quantity'))} />
              </FormItem>

              <FormItem
                name="max_order_quantity"
                label={t('Product.Field.MaxOrderQuantity')}
                rules={[{ type: 'number', min: 1 }]}
              >
                <InputNumber
                  disabled={isInherit}
                  placeholder={makePlaceholder(t('Product.Field.MaxOrderQuantity'))}
                />
              </FormItem>

              <FormItem
                name="min_order_quantity"
                label={t('Product.Field.MinOrderQuantity')}
                rules={[{ type: 'number', min: 1 }]}
              >
                <InputNumber
                  disabled={isInherit}
                  placeholder={makePlaceholder(t('Product.Field.MinOrderQuantity'))}
                />
              </FormItem>

              <FormItem name="crossSellingVariations" label={t('Product.Variation.Settings.CrossSelling')}>
                <VariationSelect isMulti />
              </FormItem>

              <FormItem
                name="availability_id"
                label={t('Product.Variation.Settings.Availability')}
                rules={[{ required: true }]}
              >
                <AvailabilityRadio />
              </FormItem>

              <FormItem name="productCategories" label={t('Product.Variation.Settings.Categories')}>
                <AsyncProductCategorySelect isMulti />
              </FormItem>
            </div>
          </Col>

          <Col span={12}>
            <div className="form-content">
              <FormItem
                name="maximum_sale_for_each_user"
                label={t('Product.Field.MaxSaleForEachUser')}
                rules={[{ type: 'number', min: 1 }]}
              >
                <InputNumber
                  disabled={isInherit}
                  placeholder={makePlaceholder(t('Product.Field.MaxSaleForEachUser'))}
                />
              </FormItem>
              <FormItem name="release_date" label={t('Product.Field.ReleaseDate')}>
                <DatePicker
                  disabled={isInherit}
                  format={intlDateFormat()}
                  placeholder={makePlaceholder(t('Product.Field.ReleaseDate'))}
                />
              </FormItem>
              <FormItem name="available_until" label={t('Product.Field.AvailableUntil')}>
                <DatePicker
                  disabled={isInherit}
                  format={intlDateFormat()}
                  placeholder={makePlaceholder(t('Product.Field.AvailableUntil'))}
                />
              </FormItem>
              <FormItem name="customTariff" label={t('Product.Variation.Settings.CustomTariff')}>
                <CustomTariffSelect />
              </FormItem>
              <FormItem name="shippingProfiles" label={t('Product.Variation.Settings.ShippingProfile')}>
                <ShippingProfileSelect isMulti />
              </FormItem>
              <FormItem name="unit" label={makePlaceholder(t('Product.Variation.Settings.Unit'))}>
                <UnitSelect />
              </FormItem>

              <Form.Item className="barcode-gen-container" label={t('Product.Variation.Settings.Barcode')}>
                <Form.Item noStyle name="barcodes">
                  <BarcodeAsyncSelect
                    isMulti
                    menuPlacement="top"
                    query={{ used: false }}
                    className="barcode-select"
                  />
                </Form.Item>

                <Button onClick={() => setGenerateBarcodeModalVisible(true)} className="barcode-gen-btn">
                  {t('Product.Variation.Settings.GenerateBarcode')}
                </Button>
              </Form.Item>

              {isGenerateBarcodeModalVisible && (
                <BarcodeGenerationModalForm
                  form={form}
                  isModalVisible={isGenerateBarcodeModalVisible}
                  setModalVisible={setGenerateBarcodeModalVisible}
                />
              )}

              <Row className="checkboxContainer">
                <Col flex={1}>
                  <FormItem name="is_active" valuePropName="checked">
                    <Checkbox>{t('Global.IsActive')}</Checkbox>
                  </FormItem>
                </Col>
                <Col flex={1}>
                  <FormItem name="is_main" valuePropName="checked">
                    <Checkbox>{t('Global.IsMain')}</Checkbox>
                  </FormItem>
                </Col>

                <Col flex={1}>
                  <FormItem>
                    <Checkbox checked={isInherit} onChange={handleInheritChange}>
                      {t('Product.Variation.Settings.Inherit')}
                    </Checkbox>
                  </FormItem>
                </Col>
                <Col flex={1}>
                  <FormItem name="auto_deactivate_net_stock" valuePropName="checked">
                    <Checkbox>{t('Product.Field.AutoDeactiveNetStock')}</Checkbox>
                  </FormItem>
                </Col>

                <Col flex={1}>
                  <FormItem name="auto_active_net_stock" valuePropName="checked">
                    <Checkbox>{t('Product.Field.AutoActiveNetStock')}</Checkbox>
                  </FormItem>
                </Col>

                <Col flex={1}>
                  {/* NOTE: this variation has a unique serial number that can be used as Product guarantee. */}
                  {/* And in OrderSalePosition => we assign that serial number to the device we just sold */}
                  <FormItem name="has_serial_number" valuePropName="checked">
                    <Checkbox>{t('Product.Field.HasSerialNumber')}</Checkbox>
                  </FormItem>
                </Col>

                <Col flex={1}>
                  <FormItem name="free_logistics_for_customer" valuePropName="checked">
                    <Checkbox>{t('Product.Variation.Settings.FreeLogisticsForCustomer')}</Checkbox>
                  </FormItem>
                </Col>

                <Col flex={1}>
                  <FormItem name="free_logistics_for_partner" valuePropName="checked">
                    <Checkbox>{t('Product.Variation.Settings.FreeLogisticsForPartner')}</Checkbox>
                  </FormItem>
                </Col>
                <Col flex={1}>
                  <FormItem name="only_partner" valuePropName="checked">
                    <Checkbox>{t('Product.Variation.Field.OnlyPartner')}</Checkbox>
                  </FormItem>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <FormSubmit isPending={isPending} />
      </FormStyles.FormContainer>
    </SettingStyles.MainContainer>
  );
};

export default VariationSettingsForm;
