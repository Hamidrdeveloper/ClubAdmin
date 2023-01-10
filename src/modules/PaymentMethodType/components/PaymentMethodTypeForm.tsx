import { AuthContext } from '@src/core';
import { FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Checkbox, Form, Input } from 'antd';
import React, { ReactElement, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { PaymentMethodType } from '../model/paymentMethodType.entity';
import Styles from './style/Form.style';

export default function PaymentTermForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<PaymentMethodType>): ReactElement {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const { loggedInUserRole } = useContext(AuthContext);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <Styles.MainContainer>
      <Form form={form} layout={'vertical'} name="paymentMethodType-form" onFinish={onSubmit}>
        <Styles.FieldSet>
          <legend>
            {
              <Form.Item className="checkbox-legend" name={'is_active'} valuePropName="checked">
                <Checkbox disabled={loggedInUserRole === 'partner'}>{t('Global.IsActive')}</Checkbox>
              </Form.Item>
            }
          </legend>

          <Form.Item required label={t('Global.Name')} name="title" rules={[{ required: true }]}>
            <Input placeholder={t('Global.InputPlaceholder', { title: t('Global.Name') })} />
          </Form.Item>
        </Styles.FieldSet>

        <FormSubmit isPending={isPending} />
      </Form>
    </Styles.MainContainer>
  );
}
