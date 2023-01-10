import { FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { intlDateFormat } from '@src/shared/utils/engine.service';
import { DatePicker, Form, Input } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { ABillCreationModel } from '../model/bill.entity';

const ABillForm = ({ isPending, onSubmit }: FormProps<ABillCreationModel>): ReactElement => {
  const [form] = Form.useForm();

  const { t } = useTranslation();

  return (
    <Form form={form} name="A-Bill-Form" layout="vertical" onFinish={onSubmit}>
      <Form.Item name="name" label={t('Global.Name')}>
        <Input />
      </Form.Item>

      <Form.Item name="from" label={t('Global.From')} rules={[{ required: true }]}>
        <DatePicker format={intlDateFormat()}></DatePicker>
      </Form.Item>
      <Form.Item name="to" label={t('Global.To')} rules={[{ required: true }]}>
        <DatePicker format={intlDateFormat()}></DatePicker>
      </Form.Item>
      <Form.Item name="execute_at" label={t('Bill.Field.ExecuteAt')}>
        <DatePicker format={intlDateFormat()}></DatePicker>
      </Form.Item>

      <FormSubmit isPending={isPending} />
    </Form>
  );
};

export default ABillForm;
