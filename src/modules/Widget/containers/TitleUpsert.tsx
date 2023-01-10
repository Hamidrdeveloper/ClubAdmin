import { FormSubmit } from '@src/shared/components';
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { Col, Form, Input, Row, message } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { TitleContext } from '../model/widget.entity';
import { updateAppTitle } from '../services/widget.service';

const TitleUpsert = ({ singleData }: GlobalUpsertProps<{ data: { title: string } }>): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { mutate, isLoading } = useMutation(({ values }: GlobalMutationProps<TitleContext>) =>
    updateAppTitle(values),
  );

  useEffect(() => {
    if (singleData) {
      form.setFieldsValue(singleData);
    }
  }, [singleData]);

  const formSubmitHandler = (formValues: { data: { title: string } }) => {
    const values: Partial<TitleContext> = {
      ...formValues,
      subdomain_id: null,
      slug: 'website-title',
    };

    mutate(
      { values },
      {
        onSuccess: () => {
          message.success(t('Widget.UpdateTitle'));
        },
      },
    );
  };

  return (
    <Form
      form={form}
      name="logo-form"
      layout={'vertical'}
      onFinish={formSubmitHandler}
      initialValues={{ file_id: null, logo: null }}
    >
      <Row gutter={[16, 0]}>
        <Col span={24}>
          <Form.Item label={t('Widget.WebsiteTitle')} name={['data', 'title']} rules={[{ required: true }]}>
            <Input placeholder={t('Global.InputPlaceholder', { title: t('Global.Title') })} />
          </Form.Item>
        </Col>
      </Row>
      <FormSubmit isPending={isLoading} />
    </Form>
  );
};

export default TitleUpsert;
