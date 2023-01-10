import { MailFilled } from '@ant-design/icons';
import { FormProps } from '@src/shared/models';
import { Button, Form, Input, Row, Typography } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import Styles from './styles/loginForm.style';

type ForgetFormType = FormProps<{ email: string }>;

export default function ForgotPasswordForm({ onSubmit, isPending }: ForgetFormType): ReactElement {
  const { t } = useTranslation();

  return (
    <Styles.MainContainer>
      <Form layout="vertical" onFinish={onSubmit}>
        <Row className="header">
          <Typography.Text strong>{t('Auth.Forget.Forgot')} </Typography.Text>
          <Typography.Text>{t('Auth.Password')}?</Typography.Text>
        </Row>
        <Typography.Text type="secondary">{t('Auth.Forget.Subtitle')}</Typography.Text>
        <Form.Item label={t('Auth.Email')} name="email" rules={[{ required: true }]}>
          <Input size="large" suffix={<MailFilled />} placeholder={t('Auth.EmailPlaceholder')} />
        </Form.Item>

        <Row className="send-again">
          <div>{t('Auth.Forget.DidntReceiveLink')}</div>
          <Button disabled={isPending} type="text" htmlType="submit">
            {t('Auth.Forget.SendLinkAgain')}
          </Button>
        </Row>

        <Button loading={isPending} type="primary" size="large" htmlType="submit">
          {t('Auth.Forget.ResetPassword')}
        </Button>
      </Form>
    </Styles.MainContainer>
  );
}
