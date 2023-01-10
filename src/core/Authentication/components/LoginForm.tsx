import { MailFilled } from '@ant-design/icons';
import { FormProps } from '@src/shared/models';
import { Button, Checkbox, Form, Input, Row, Typography } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { LoginForm } from '../model';
import Styles from './styles/loginForm.style';

type LoginFormType = FormProps<LoginForm> & { onChangePage?: (page: string) => void };

export default function LoginForm({ isPending, onSubmit }: LoginFormType): ReactElement {
  const { t } = useTranslation();

  return (
    <Styles.MainContainer>
      <Form layout="vertical" onFinish={onSubmit}>
        <Row className="header">
          <Typography.Text strong>{t`Auth.Login.Title`}</Typography.Text>
          {<Typography.Text>{t`Auth.Login.ToCleafin`}</Typography.Text>}
        </Row>
        <Typography.Text type="secondary">{t`Auth.Login.WelcomeBack`}</Typography.Text>
        <Form.Item label={t`Auth.Email`} name="username" rules={[{ required: true }]}>
          <Input size="large" placeholder={t`Auth.EmailPlaceholder`} suffix={<MailFilled />} />
        </Form.Item>
        <Form.Item label={t`Auth.Password`} name="password" rules={[{ required: true }]}>
          <Input.Password size="large" placeholder={t`Auth.PasswordPlaceholder`} />
        </Form.Item>

        <Row justify="space-between">
          <Checkbox>{t`Auth.Login.RememberMe`}</Checkbox>
          {/* <div onClick={() => onChangePage?.('forget')}>{t`Auth.ForgotPassword`}</div> */}
        </Row>

        <Button type="primary" size="large" htmlType="submit" loading={isPending}>
          {t`Auth.Login.Title`}
        </Button>
        {/* <div className="hr">
          <span>{t`Auth.Login.Or`}</span>
        </div>

        <Row justify="center">
          <Typography.Text>{t`Auth.Login.NoAccount`} </Typography.Text>
          <Typography.Text onClick={() => onChangePage?.('register')}>{t`Auth.Login.RegisterNow`}</Typography.Text>
        </Row> */}
      </Form>
    </Styles.MainContainer>
  );
}
