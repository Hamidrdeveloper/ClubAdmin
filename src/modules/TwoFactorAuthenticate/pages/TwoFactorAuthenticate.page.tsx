/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheckimport i18n from '@src/core/i18n/config';
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { AuthContext } from '@src/core';
import { TwoFactorVerificationFormCtx } from '@src/core/Authentication/model';
import { Button, Form, Typography, notification } from 'antd';
import React, { ReactElement, useContext, useEffect } from 'react';
import ReactCodeInput from 'react-code-input';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { TwoFactorModel } from '../model/TwoFactor.entity';
import MainContainer from './styles/twoFactorPage.style';

const TwoFactorAuthenticatePage = (): ReactElement => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { tokenKey, onTwoFactorVerification } = useContext(AuthContext);
  const token = tokenKey || localStorage.getItem('token_key');

  const { mutate, isLoading } = useMutation(onTwoFactorVerification);

  // useEffect(() => {
  //   if (!token) {
  //     navigate('/auth/login');
  //   }
  // }, []);

  const onSubmit = async (formValues: TwoFactorModel) => {
    if (!token) {
      // navigate('/auth/login');
      return;
    }

    const values: TwoFactorVerificationFormCtx = {
      token_key: token,
      code: formValues.code,
    };

    mutate(values, {
      onSuccess: (response) => {
        if (response?.status === 302) {
          // navigate('/auth/login/partner/legals');
        } else if (response?.status === 200) {
          // navigate('/admin/dashboard');
          notification.success({
            message: 'Logged In Successfully',
            description: "You're Redirecting To Your Dashboard",
          });
        }
      },
    });
  };

  return (
    <MainContainer form={form} onFinish={onSubmit} name="two-step-verification-form">
      <img src="/favicon.ico" alt="cleafin logo" />

      <div className="code-container">
        <Typography.Title>Two-factor authentication</Typography.Title>

        <Typography.Text type="secondary">Open your emails and enter the code for Cleafin</Typography.Text>

        <div className="code-btn-container">
          <Form.Item
            name="code"
            rules={[
              { len: 6, message: 'The code length must be 6 digits' },
              { required: true, message: 'The code is required' },
              {
                validator: (_, value) => (value.match(/[A-z]/) ? Promise.reject() : Promise.resolve()),
                message: 'The code must be a number',
              },
            ]}
          >
            <ReactCodeInput name="code-input" inputMode="numeric" fields={6} />
          </Form.Item>
          <Button type="primary" block htmlType="submit" loading={isLoading}>
            Verify
          </Button>
        </div>
      </div>
    </MainContainer>
  );
};

export default TwoFactorAuthenticatePage;
