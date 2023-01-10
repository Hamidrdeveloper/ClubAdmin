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
import { ColorPicker, DescriptionArrayInput, FormSubmit, Upload } from '@shared/components';
import OnbordingArrayInput from '@src/shared/components/OnbordingArray/OnbordingArrayInput';
import { FormProps } from '@src/shared/models';
import { Checkbox, Col, Form, InputNumber, Row } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import AsyncProductCategorySelect from '../containers/ProductCategoryAsyncSelect';
import { ProductCategory } from '../model/productCategory.entity';

export default function ProductCategoryForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<ProductCategory>): ReactElement {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        translate: initialValues.translate ?? [{ locale: 'de', name: initialValues.name }],
      });
    }
  }, [initialValues]);

  return (
    <Form
      form={form}
      layout={'vertical'}
      onFinish={onSubmit}
      name="productCategory-form"
      initialValues={{
        show_in_header: false,
        show_in_website: true,
        translate: [{ locale: undefined, name: '', description: '' }],
      }}
    >
      <Row gutter={16}>
        <Col span={24}>
          <OnbordingArrayInput />
        </Col>
      </Row>

      <FormSubmit isPending={isPending} />
    </Form>
  );
}
