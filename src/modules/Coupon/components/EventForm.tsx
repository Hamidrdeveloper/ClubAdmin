/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheckimport i18n from '@src/core/i18n/config';
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VariationSelect from '@src/modules/Product/containers/VariationSelect';
import { ProductVariation } from '@src/modules/Product/model/ProductVariation.entity';
import { DescriptionArrayInput, FormSubmit } from '@src/shared/components';
import EventArrayInput from '@src/shared/components/EventArray/EventArrayInput';
import { FormProps } from '@src/shared/models';
import { intlDateFormat } from '@src/shared/utils/engine.service';
import { Checkbox, Col, DatePicker, Form, Input, InputNumber, Row, Select, Space } from 'antd';
import moment from 'moment';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Coupon } from '../model/coupon.entity';
import ProductTable from './ProductVariationTable';

function CouponForm({ onSubmit, isPending, initialValues }: FormProps<Coupon>): ReactElement {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  const [selectedProductVariations, setSelectedProductVariations] = useState<ProductVariation[] | null>([]);

  useEffect(() => {
    form.setFieldsValue({ productVariations: selectedProductVariations });
  }, [selectedProductVariations]);

  const [isPercent, setIsPercent] = useState(true);
  const [isProductInsteadOfDiscount, setProductInsteadOfDiscount] = useState(true);

  useEffect(() => {
    if (initialValues) {
      if (initialValues.type === 'amount') setIsPercent(false);

      setProductInsteadOfDiscount(initialValues.product_instead_of_discount);
      form.setFieldsValue({
        ...initialValues,
        release_date: initialValues.release_date ? moment(initialValues.release_date) : '',
        available_until: initialValues.available_until ? moment(initialValues.available_until) : '',
        translate:
          initialValues.translate?.length > 0 ? initialValues.translate : [{ locale: undefined, name: '' }],
      });
    }

    if (initialValues?.productVariations) {
      setSelectedProductVariations(initialValues?.productVariations);
    }
  }, [initialValues]);

  const memoizedProductVariationTable = React.useMemo(() => ProductTable(setSelectedProductVariations), []);

  return (
    <Form
      form={form}
      layout={'vertical'}
      onFinish={onSubmit}
      name="coupon-form"
      initialValues={{
        is_active: false,
        first_order: false,
        product_instead_of_discount: false,
        translate: [{ locale: undefined, name: '' }],
      }}
    >
       <Row gutter={[16, 0]}>
       <Col span={12}>
          <Form.Item name={['couponCodes', 0, 'code']} label={t('Coupon.Field.Codes')}>
            <Input placeholder={t('Global.InputPlaceholder', { title: t('Coupon.Field.Codes') })} />
          </Form.Item>
        </Col>
       <Col xs={12}>
          <Form.Item label={t('Coupon.Field.ReleaseDate')} name="release_date">
            <DatePicker format={intlDateFormat()} placeholder={t('Coupon.Field.ReleaseDate')} />
          </Form.Item>
        </Col>
       
      </Row>
      {/* <EventArrayInput /> */}

     

      {isProductInsteadOfDiscount && <>{memoizedProductVariationTable}</>}

      <FormSubmit isPending={isPending} />
    </Form>
  );
}

export default CouponForm;
