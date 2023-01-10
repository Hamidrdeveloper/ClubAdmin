import { FormSubmit } from '@src/shared/components';
import FallbackSelect from '@src/shared/components/FallbackSelect/FallbackSelect';
import { FormProps } from '@src/shared/models';
import { Form, Input } from 'antd';
import React, { ReactElement, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import FloorSelect from '../../Floor/containers/FloorSelect';
import { Zone } from '../model/zone';

const ZoneForm = ({ onSubmit, isPending, initialValues }: FormProps<Zone>): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <Form form={form} layout={'vertical'} onFinish={onSubmit} name="zone-form">
      <Form.Item name="name" label={t('Global.Name')} rules={[{ required: true }]}>
        <Input placeholder={t('Global.InputPlaceholder', { title: t('Global.Name') })} />
      </Form.Item>

      <Suspense fallback={FallbackSelect(t('Stock.SubModules.Floor.Title'))}>
        <Form.Item name="floor" label={t('Stock.SubModules.Floor.Title')} rules={[{ required: true }]}>
          <FloorSelect />
        </Form.Item>
      </Suspense>

      <FormSubmit isPending={isPending} />
    </Form>
  );
};

export default ZoneForm;
