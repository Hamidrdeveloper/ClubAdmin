import { FormSubmit } from '@src/shared/components';
import FallbackSelect from '@src/shared/components/FallbackSelect/FallbackSelect';
import { FormProps } from '@src/shared/models';
import { Form, Input } from 'antd';
import React, { ReactElement, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import BuildingSelect from '../../Building/containers/BuildingSelect';
import { Floor } from '../model/floor';

const FloorForm = ({ onSubmit, isPending, initialValues }: FormProps<Floor>): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <Form form={form} layout={'vertical'} onFinish={onSubmit} name="floor-form">
      <Form.Item name="name" label={t('Global.Name')} rules={[{ required: true }]}>
        <Input placeholder={t('Global.InputPlaceholder', { title: t('Global.Name') })} />
      </Form.Item>

      <Suspense fallback={FallbackSelect(t('Stock.SubModules.Building.Title'))}>
        <Form.Item name="building" label={t('Stock.SubModules.Building.Title')} rules={[{ required: true }]}>
          <BuildingSelect />
        </Form.Item>
      </Suspense>

      <FormSubmit isPending={isPending} />
    </Form>
  );
};

export default FloorForm;
