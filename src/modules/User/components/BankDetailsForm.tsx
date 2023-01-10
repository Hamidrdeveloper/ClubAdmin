import { FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Form, Input } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { BankDetailPure } from '../model/bankDetails';
import FormStyle from './styles/Form.style';

const BankDetailsForm = ({ isPending, onSubmit, initialValues }: FormProps<BankDetailPure>): ReactElement => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <FormStyle.Container
      form={form}
      layout={'horizontal'}
      onFinish={onSubmit}
      name="bank-details-form"
      labelAlign={'left'}
      labelCol={{ xs: { span: 24 }, md: { span: 12 }, lg: { span: 10 } }}
      wrapperCol={{ xs: { span: 24 }, md: { span: 10 }, lg: { span: 12 } }}
    >
      <h2>{t('User.BankDetails.BankData')}</h2>
      <br />

      <Form.Item label={t('User.BankDetails.BankName')} name="bank_name">
        <Input placeholder={t('Global.InputPlaceholder', { title: t('User.BankDetails.BankName') })} />
      </Form.Item>

      <Form.Item label={t('User.BankDetails.IBANNumber')} name="iban">
        <Input placeholder={t('Global.InputPlaceholder', { title: t('User.BankDetails.IBANNumber') })} />
      </Form.Item>

      <Form.Item label={t('User.BankDetails.BIC')} name="bic">
        <Input placeholder={t('Global.InputPlaceholder', { title: t('User.BankDetails.BIC') })} />
      </Form.Item>

      <FormSubmit isPending={isPending} />
    </FormStyle.Container>
  );
};

export default BankDetailsForm;
