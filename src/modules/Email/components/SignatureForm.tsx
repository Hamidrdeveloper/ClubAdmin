import { FormSubmit } from '@src/shared/components';
import { TextEditor } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Col, Form, Row } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { SignatureContext } from '../model/email.entity';
import Styles from './styles/SignatureStyle';

const SignatureForm: React.FC<FormProps<SignatureContext>> = ({ onSubmit, initialValues, isPending }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { Item: FormItem } = Form;

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, []);

  return (
    <Styles.MainContainer>
      <Form
        form={form}
        onFinish={onSubmit}
        name="signature-form"
        labelCol={{ span: 8 }}
        initialValues={{ locale: 'en' }}
        wrapperCol={{ span: 24 }}
        labelAlign="left"
      >
        <Row gutter={16} className="row">
          <Col span={12} className="first-col" flex={2}>
            <FormItem name="plain" labelCol={{ span: 24 }} label={t('Email.Field.PlainTextSignature')}>
              <TextEditor placeholder={t('Email.Field.SomethingAboutProductOrAnything')} />
            </FormItem>
          </Col>

          <Col span={12} className="second-col">
            <FormItem labelCol={{ span: 24 }} name="html" label={t('Email.Field.HtmlSignature')}>
              <TextEditor />
            </FormItem>
          </Col>
        </Row>

        <FormSubmit isPending={isPending} />
      </Form>
    </Styles.MainContainer>
  );
};

export default SignatureForm;
