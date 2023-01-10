import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Button, Col, Form, Input, Row } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { PasswordFormCtx } from '../model/password';
import FormStyle from './styles/Form.style';

interface Props extends FormProps<PasswordFormCtx> {
  haveReset: boolean;
  resetPending: boolean;
  onResetPass: () => void;
}

const PasswordForm = ({ isPending, onSubmit, resetPending, onResetPass, haveReset }: Props): ReactElement => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const SecondaryBtn = haveReset ? (
    <Button onClick={onResetPass} loading={resetPending} disabled={isPending}>
      {t('User.PasswordSetting.SendPasswordResetLink')}
    </Button>
  ) : undefined;

  return (
    <FormStyle.Container
      form={form}
      colspace={8}
      layout={'vertical'}
      onFinish={onSubmit}
      name="password-form"
    >
      <h2>{t('User.PasswordSetting.Title')}</h2>
      <br />

      <Row justify="space-between">
        <Col xs={24} md={12} className="leftCol">
          <Form.Item
            label={t('User.PasswordSetting.NewPassword')}
            name="password"
            rules={[
              { required: true, message: 'Password is required' },
              { min: 8, message: 'Password should at least have 8 Characters' },
            ]}
          >
            <Input.Password
              placeholder={t('Global.InputPlaceholder', { title: t`Global.Password` })}
              iconRender={(visible) => (visible ? <EyeFilled /> : <EyeInvisibleFilled />)}
            />
          </Form.Item>
        </Col>

        <Col xs={24} md={12} className="rightCol">
          <Form.Item
            label={t('User.PasswordSetting.ConfirmNewPassword')}
            name="password_confirmation"
            rules={[
              { required: true, message: 'Password conformation is required' },
              { min: 8, message: 'Password should at least have 8 Characters' },
            ]}
          >
            <Input.Password
              placeholder={t('Global.InputPlaceholder', { title: t`Global.Password` })}
              iconRender={(visible) => (visible ? <EyeFilled /> : <EyeInvisibleFilled />)}
            />
          </Form.Item>
        </Col>
      </Row>

      <FormSubmit
        isPending={isPending}
        title={t('Global.Save')}
        Secondary={SecondaryBtn}
        disabledPrimary={resetPending}
      />
    </FormStyle.Container>
  );
};

export default PasswordForm;
