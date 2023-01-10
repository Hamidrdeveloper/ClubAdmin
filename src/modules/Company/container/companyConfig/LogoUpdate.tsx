import { FormSubmit, Upload } from '@src/shared/components';
import { GlobalMutationProps } from '@src/shared/models';
import { Col, Form, Row, message, notification } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useMutation } from 'react-query';

import { LogoContext } from '../../../Widget/model/widget.entity';
import { updateAppLogo } from '../../services/widget.service';

type Props = {
  slug: string;
  name: string;
  singleData: { file: string };
  companyId: string;
};
const LogoUpdate = ({ slug, name, singleData, companyId }: Props): ReactElement => {
  const [form] = Form.useForm();
  const { mutate, isLoading } = useMutation(({ values }: GlobalMutationProps<LogoContext>) =>
    updateAppLogo(values, slug),
  );

  useEffect(() => {
    if (singleData) {
      form.setFieldsValue(singleData);
    }
  }, [singleData]);

  const formSubmitHandler = (formValues: { file_path: string | null; file_id: number }) => {
    const { file_path, file_id } = formValues;
    if (!file_path && !file_id) {
      notification.error({
        message: 'File field required',
        description: 'File is required, Consider uploading one.',
      });
      return;
    }

    const values: Partial<LogoContext> = {
      slug,
      data: { file_id, file_path },
      subdomain_id: null,
      company_id: companyId,
    };

    mutate(
      { values },
      {
        onSuccess: () => {
          message.success('Updated successfully');
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
          <Form.Item label={name} name="file">
            <Upload form={form} type="dragger" idName="file_id" pathName="file_path" />
          </Form.Item>
          <Form.Item hidden name="file_id">
            <></>
          </Form.Item>
          <Form.Item hidden name="file_path">
            <></>
          </Form.Item>
        </Col>
      </Row>
      <FormSubmit isPending={isLoading} />
    </Form>
  );
};

export default LogoUpdate;
