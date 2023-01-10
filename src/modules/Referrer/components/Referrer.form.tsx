/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheckimport i18n from '@src/core/i18n/config';
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { UserSelect } from '@src/modules/User';
import { ColorPicker, FormSubmit, Upload } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Checkbox, Col, Form, Input, InputNumber, Row } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Referrer } from '../model/Referrer.entity';
import CustomUpload from '@src/shared/components/Upload/Upload';

const ReferrerForm = ({ onSubmit, initialValues, isPending }: FormProps<Referrer>): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <Form
      form={form}
      layout={'vertical'}
      name="referrer-form"
      onFinish={onSubmit}
      initialValues={{ isActive: true ,clubId:1,adminId:12}}
    >
      <Row justify="space-between" gutter={16}>
      <Col span={12}>
          <Form.Item label={t('Global.Title')} name="title" required>
            <Input />
          </Form.Item>
        </Col>
        <Col xs={12}>
            <Form.Item label={t('Calendar.Event.Field.Color')} name="color" required>
              <ColorPicker />
            </Form.Item>
          </Col>
        <Col span={12}>
          <Form.Item label={"Point"} name="point" required>
            <InputNumber />
          </Form.Item>
        </Col>
        <Col xs={12}>
          <Form.Item name="file" label={"File"} required>
            <Upload form={form} idName="file" />
          </Form.Item>
          <Form.Item hidden name="file" />
        </Col>
        <Col span={12}>
          <Form.Item name="isActive" valuePropName="checked">
            <Checkbox>{t('Global.IsActive')}</Checkbox>
          </Form.Item>
        </Col>
      </Row>

      <FormSubmit isPending={isPending} />
    </Form>
  );
};

export default ReferrerForm;
