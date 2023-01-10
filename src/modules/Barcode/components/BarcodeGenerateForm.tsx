import { FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Form, Input, InputNumber, Select } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import BarcodeModule from '../Barcode.module';
import { BarcodeGenerateModel } from '../model/barcode.entity';

const BarcodeGenerateForm = ({ onSubmit, isPending }: FormProps<BarcodeGenerateModel>): ReactElement => {
  const { BarcodeTypes } = new BarcodeModule();
  const { t } = useTranslation();

  return (
    <CustomForm layout="vertical" onFinish={onSubmit} labelCol={{ span: 8 }} name="barcode-generator-form">
      <Form.Item label={t('Barcode.Field.Type')} name="type" rules={[{ required: true }]}>
        <Select
          options={BarcodeTypes}
          placeholder={t('Global.SelectPlaceholder', { title: t('Barcode.Field.Type') })}
        />
      </Form.Item>

      <Form.Item name="from" label={t('Global.From')} className="inline" rules={[{ required: true }]}>
        <InputNumber min={0} />
      </Form.Item>
      <Form.Item
        name="to"
        label={t('Global.To')}
        className="inline secondElement"
        rules={[{ required: true }]}
      >
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item name="prefix" className="inline" label={t('Barcode.Prefix')}>
        <Input />
      </Form.Item>

      <Form.Item name="postfix" className="inline secondElement" label={t('Barcode.Postfix')}>
        <Input />
      </Form.Item>

      <FormSubmit isPending={isPending} />
    </CustomForm>
  );
};

export default BarcodeGenerateForm;

const CustomForm = styled(Form)`
  .inline {
    display: inline-block;
    width: calc(50% - 8px);

    &.secondElement {
      margin: 0 8px;
    }
  }
`;
