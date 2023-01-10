import { FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Form, Input } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { EmailSubscriptionModel } from '../model/emailSubscription.entity';

const EmailSubscriptionForm = ({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<EmailSubscriptionModel>): ReactElement => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <Form form={form} name="email-subscription-form" layout="vertical" onFinish={onSubmit}>
      <Form.Item label={t('Global.Email')} name="email">
        <Input placeholder={t('Global.InputPlaceholder', { title: t('Global.Email') })} type="email" />
      </Form.Item>

      <FormSubmit isPending={isPending} />
    </Form>
  );
};

export default EmailSubscriptionForm;
