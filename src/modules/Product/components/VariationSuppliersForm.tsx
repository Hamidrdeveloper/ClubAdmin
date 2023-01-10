import { DeleteOutlined } from '@ant-design/icons';
import { CurrencySelect } from '@src/modules/Currency';
import { SupplierSelect } from '@src/modules/Supplier';
import { UnitSelect } from '@src/modules/Unit';
import { FormSubmit } from '@src/shared/components';
import FallbackSelect from '@src/shared/components/FallbackSelect/FallbackSelect';
import { FormProps } from '@src/shared/models';
import { Button, Col, Form, Input, InputNumber, Row } from 'antd';
import React, { ReactElement, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { VariationSupplier } from '../model/VariationSupplier.entity';
import FormStyles from './styles/Form.style';
import SupplierStyle from './styles/Suppliers.style';

interface Props extends FormProps<VariationSupplier> {
  onRemove: () => void;
}
const VariationSuppliersForm = ({ onSubmit, isPending, initialValues, onRemove }: Props): ReactElement => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { Item: FormItem } = Form;

  useEffect(() => {
    if (!initialValues) return;
    form.setFieldsValue(initialValues);
  }, [initialValues]);

  const makePlaceholder = (title) => t('Global.InputPlaceholder', { title });

  return (
    <SupplierStyle.MainContainer>
      <FormStyles.FormContainer
        form={form}
        labelAlign="left"
        onFinish={onSubmit}
        layout="vertical"
        name="variation-supplier-form"
      >
        <Row gutter={[16, 16]} justify={'space-around'}>
          <Col span={12} className="customBoxShadow formContainer">
            <Suspense fallback={FallbackSelect(t('Product.Variation.Suppliers.Title'))}>
              <FormItem
                name="supplier"
                rules={[{ required: true }]}
                label={t('Product.Variation.Suppliers.Title')}
              >
                <SupplierSelect />
              </FormItem>
            </Suspense>

            <FormItem
              name="supplier_product_number"
              rules={[{ required: true }]}
              label={t('Product.Variation.Suppliers.ProductNumber')}
            >
              <InputNumber placeholder={makePlaceholder(t('Product.Variation.Suppliers.ProductNumber'))} />
            </FormItem>

            <FormItem
              name="supplier_product_name"
              rules={[{ required: true }]}
              label={t('Product.Variation.Suppliers.ProductName')}
            >
              <Input placeholder={makePlaceholder(t('Product.Variation.Suppliers.ProductName'))} />
            </FormItem>

            <FormItem name="price_value" label={t('Product.Variation.Suppliers.PriceValue')}>
              <InputNumber placeholder={makePlaceholder(t('Product.Variation.Suppliers.PriceValue'))} />
            </FormItem>
          </Col>

          <Col span={12} className="customBoxShadow formContainer">
            <FormItem name="delivery_days" label={t('Product.Variation.Suppliers.DeliveryDays')}>
              <InputNumber placeholder={makePlaceholder(t('Product.Variation.Suppliers.DeliveryDays'))} />
            </FormItem>

            <FormItem name="unit" label={t('Product.Variation.Suppliers.PackingUnit')}>
              <UnitSelect />
            </FormItem>

            <FormItem label={t('Product.Variation.Prices.MinimumQuantity')} name="minimum_quantity">
              <InputNumber
                min={0}
                placeholder={makePlaceholder(t('Product.Variation.Prices.MinimumQuantity'))}
              />
            </FormItem>

            <FormItem label={t('Product.Variation.Suppliers.Currency')} name="currency">
              <CurrencySelect />
            </FormItem>
          </Col>
        </Row>

        <FormSubmit
          isPending={isPending}
          Secondary={<Button ghost danger type="primary" icon={<DeleteOutlined />} onClick={onRemove} />}
        />
      </FormStyles.FormContainer>
    </SupplierStyle.MainContainer>
  );
};

export default VariationSuppliersForm;
