import { FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Col, Form, Input, Row } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ExportTypeModel } from '../model/ExportsTypes.entity';

const ExportTypeForm = ({ initialValues, onSubmit, isPending }: FormProps<ExportTypeModel>): ReactElement => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    if (!initialValues) return;

    form.setFieldsValue(initialValues);
  }, [initialValues]);

  return (
    <Form form={form} name="export-type-form" layout={'horizontal'} onFinish={onSubmit}>
      <Form.Item name="name" label={t('Global.Name')}>
        <Input disabled placeholder={t('Global.InputPlaceholder', { title: t('Global.Name') })} />
      </Form.Item>

      <Row gutter={32}>
        {initialValues?.headers?.map((headerName, index) => (
          <Col xs={6}>
            <Form.Item name={['headers', index]} label={`${index + 1}:`}>
              <Input placeholder={t('Global.InputPlaceholder', { title: headerName })} />
            </Form.Item>
          </Col>
        ))}
      </Row>

      <FormSubmit isPending={isPending} />
    </Form>
  );
};

export default ExportTypeForm;
