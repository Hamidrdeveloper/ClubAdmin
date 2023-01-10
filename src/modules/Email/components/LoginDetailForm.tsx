import { FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Checkbox, Col, Form, Input, Radio, Row } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { LoginDetailContext } from '../model/email.entity';
import SettingStyles from './styles/Email.style';
import FormStyles from './styles/Form.style';

const LoginDetailForm: React.FC<FormProps<LoginDetailContext>> = ({ onSubmit, isPending, initialValues }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { Item: FormItem } = Form;

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <SettingStyles.MainContainer>
      <FormStyles.FormContainer
        form={form}
        colon={false}
        onFinish={onSubmit}
        name="login-detail-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        labelAlign="left"
      >
        <Row gutter={16} justify={'space-around'}>
          <Col span={11} className="customBoxShadow formContainer">
            <FormItem rules={[{ required: true }]} name={['data', 'mode']} valuePropName="checked">
              <Checkbox>{t('Email.Field.TestMode')}</Checkbox>
            </FormItem>

            <FormItem rules={[{ required: true }]} name="name" label={t('Email.Field.NameOfSender')}>
              <Input />
            </FormItem>

            <FormItem rules={[{ required: true }]} name="email" label={t('Email.Field.EmailAddress')}>
              <Input />
            </FormItem>

            <FormItem
              name="outgoing_server"
              rules={[{ required: true }]}
              label={t('Email.Field.OutGoingMailServer/SmtpServer')}
            >
              <Input />
            </FormItem>
          </Col>
          ​
          <Col span={11} className="customBoxShadow formContainer">
            <FormItem rules={[{ required: true }]} name="username" label={t('Email.Field.UserName')}>
              <Input />
            </FormItem>
            <FormItem rules={[{ required: true }]} name="password" label={t('Email.Field.Password')}>
              <Input type={'password'} />
            </FormItem>
            <FormItem rules={[{ required: true }]} name="port" label={t('Email.Field.PortStandardPort25')}>
              <Input />
            </FormItem>
            <FormItem rules={[{ required: true }]} name="host" label={t('Email.Field.Host')}>
              <Input />
            </FormItem>
            <FormItem rules={[{ required: true }]} name="encryption" label={t('Email.Field.Encryption')}>
              <Radio.Group>
                <Radio value="sal">{t('Email.Field.Sal')}</Radio>
                <Radio value="tls">{t('Email.Field.Tls')}</Radio>
                <Radio value="noEncryption">{t('Email.Field.NoEncryption')}</Radio>
              </Radio.Group>
            </FormItem>
          </Col>
        </Row>
        ​
        <FormSubmit isPending={isPending} />
      </FormStyles.FormContainer>
    </SettingStyles.MainContainer>
  );
};

export default LoginDetailForm;
