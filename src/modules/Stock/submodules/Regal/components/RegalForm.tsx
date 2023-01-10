import { FormSubmit } from '@src/shared/components';
import FallbackSelect from '@src/shared/components/FallbackSelect/FallbackSelect';
import { FormProps } from '@src/shared/models';
import { Form, Input } from 'antd';
import React, { ReactElement, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import ZoneSelect from '../../Zone/containers/ZoneSelect';
import { Regal } from '../model/Regal';

const RegalForm = ({ onSubmit, isPending, initialValues }: FormProps<Regal>): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <Form form={form} layout={'vertical'} onFinish={onSubmit} name="regal-form">
      <Form.Item name="name" label={t('Global.Name')} rules={[{ required: true }]}>
        <Input placeholder={t('Global.InputPlaceholder', { title: t('Global.Name') })} />
      </Form.Item>

      <Suspense fallback={FallbackSelect(t('Stock.SubModules.Zone.Title'))}>
        <Form.Item name="zone" label={t('Stock.SubModules.Zone.Title')} rules={[{ required: true }]}>
          <ZoneSelect />
        </Form.Item>
      </Suspense>

      <FormSubmit isPending={isPending} />
    </Form>
  );
};

export default RegalForm;
