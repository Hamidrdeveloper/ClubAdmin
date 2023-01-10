import { FormSubmit } from '@src/shared/components';
import FallbackSelect from '@src/shared/components/FallbackSelect/FallbackSelect';
import { FormProps } from '@src/shared/models';
import { Form, Input } from 'antd';
import React, { ReactElement, Suspense } from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import RegalSelect from '../../Regal/containers/RegalSelect';
import { Shelf } from '../model/shelf';

const ShelfForm = ({ onSubmit, isPending, initialValues }: FormProps<Shelf>): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <Form form={form} layout={'vertical'} onFinish={onSubmit} name="shelf-form">
      <Form.Item name="name" label={t('Global.Name')} rules={[{ required: true }]}>
        <Input placeholder={t('Global.InputPlaceholder', { title: t('Global.Name') })} />
      </Form.Item>

      <Suspense fallback={FallbackSelect(t('Stock.SubModules.Regal.Title'))}>
        <Form.Item name="regal" label={t('Stock.SubModules.Regal.Title')} rules={[{ required: true }]}>
          <RegalSelect />
        </Form.Item>
      </Suspense>

      <FormSubmit isPending={isPending} />
    </Form>
  );
};

export default ShelfForm;
