import { FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Checkbox, Col, Form, Input, Radio, Row } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { NewsLetterContext } from '../model/email.entity';
import SettingStyles from './styles/Email.style';
import FormStyles from './styles/Form.style';

const NewsLetterForm: React.FC<FormProps<NewsLetterContext>> = ({ onSubmit, isPending, initialValues }) => {
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
        onFinish={onSubmit}
        name="news-letter-form"
        labelCol={{ span: 8 }}
        colon={false}
        wrapperCol={{ span: 16 }}
        labelAlign="left"
      >
        <Row wrap={false} gutter={16} justify={'space-around'}>
          <Col span={11} className="customBoxShadow formContainer">
            <FormItem name={['data', 'mode']} valuePropName="checked">
              <Checkbox>{t('Email.Field.TestMode')}</Checkbox>
            </FormItem>
            <FormItem name="name" label={t('Email.Field.NameOfSender')}>
              <Input />
            </FormItem>
            <FormItem name="email" label={t('Email.Field.EmailAddress')}>
              <Input />
            </FormItem>

            <FormItem name="outgoing_server" label={t('Email.Field.OutGoingMailServer/SmtpServer')}>
              <Input />
            </FormItem>

            <FormItem name="username" label={t('Email.Field.UserName')}>
              <Input />
            </FormItem>
          </Col>
          ​
          <Col span={11} className="customBoxShadow formContainer">
            <FormItem name="password" label={t('Email.Field.Password')}>
              <Input type={'password'} />
            </FormItem>
            <FormItem name="host" label={t('Email.Field.Host')}>
              <Input />
            </FormItem>
            <FormItem name="port" label={t('Email.Field.PortStandardPort25')}>
              <Input />
            </FormItem>
            <FormItem name="encryption" label={t('Email.Field.Encryption')}>
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

export default NewsLetterForm;
