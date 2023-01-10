import { updateAppTitle } from '@src/modules/Company/services/widget.service';
import { TitleContext } from '@src/modules/Widget/model/widget.entity';
import { FormSubmit } from '@src/shared/components';
import { GlobalMutationProps } from '@src/shared/models';
import { Col, Form, Input, Row, message } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

type Props = {
  singleData: { data: { title: string } };
  companyId: string;
};
const TitleUpdate = ({ singleData, companyId }: Props): ReactElement => {
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
      company_id: companyId,
      slug: 'website-title',
    };

    mutate(
      { values },
      {
        onSuccess: () => {
          message.success('Title updated successfully');
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
          <Form.Item label="Website Title" name={['data', 'title']} rules={[{ required: true }]}>
            <Input placeholder={t('Global.InputPlaceholder', { title: t('Global.Title') })} />
          </Form.Item>
        </Col>
      </Row>
      <FormSubmit isPending={isLoading} />
    </Form>
  );
};

export default TitleUpdate;
