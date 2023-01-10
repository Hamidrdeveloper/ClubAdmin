import { FormSubmit, Upload } from '@src/shared/components';
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { Col, Form, Row, message, notification } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useMutation } from 'react-query';

import { LogoContext } from '../model/widget.entity';
import { updateAppLogo } from '../services/widget.service';

const LogoUpsert = ({
  slug,
  name,
  singleData,
}: GlobalUpsertProps<{ file: string }> & { slug: string; name: string }): ReactElement => {
  const [form] = Form.useForm();
  const { mutate, isLoading } = useMutation(({ values }: GlobalMutationProps<LogoContext>) =>
    updateAppLogo(values, slug),
  );

  useEffect(() => {
    if (singleData) {
      form.setFieldsValue(singleData);
    }
  }, [singleData]);

  const formSubmitHandler = (formValues: { file: string | null; file_id: number }) => {
    const { file, file_id } = formValues;
    if (!file && !file_id) {
      notification.error({
        message: 'File field required',
        description: 'File is required, Consider uploading one.',
      });
    } else {
      const values: Partial<LogoContext> = {
        slug,
        data: { file_id, file_path: file },
        subdomain_id: null,
      };

      mutate(
        { values },
        {
          onSuccess: () => {
            message.success('Updated successfully');
          },
        },
      );
    }
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
          <Form.Item label={name} name="file">
            <Upload form={form} type="dragger" idName="file_id" />
          </Form.Item>
          <Form.Item hidden name="file_id">
            <></>
          </Form.Item>
        </Col>
      </Row>
      <FormSubmit isPending={isLoading} />
    </Form>
  );
};

export default LogoUpsert;
