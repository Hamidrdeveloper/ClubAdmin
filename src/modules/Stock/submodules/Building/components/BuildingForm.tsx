import { FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Form, Input } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Building } from '../model/Building';

const BuildingForm = ({ onSubmit, isPending, initialValues }: FormProps<Building>): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <Form form={form} name="building-form" layout={'vertical'} onFinish={onSubmit}>
      <Form.Item name="name" label={t('Global.Name')} rules={[{ required: true }]}>
        <Input placeholder={t('Global.InputPlaceholder', { title: t('Global.Name') })} />
      </Form.Item>

      <FormSubmit isPending={isPending} />
    </Form>
  );
};

export default BuildingForm;
