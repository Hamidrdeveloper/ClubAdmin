import { EyeFilled, EyeInvisibleFilled, MailFilled } from '@ant-design/icons';
import { CountrySelect } from '@modules/Country';
import { LanguageSelect } from '@modules/Language';
import { Loader } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { intlDateFormat } from '@src/shared/utils/engine.service';
import { Button, Checkbox, Col, DatePicker, Form, Input, Radio, Row, Typography } from 'antd';
import React, { ReactElement, Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import { RegisterFormContext } from '../model';
import Styles from './styles/loginForm.style';

type RegisterFormType = FormProps<RegisterFormContext> & { onChangePage?: (page: string) => void };

export default function RegisterModal({ isPending, onSubmit, onChangePage }: RegisterFormType): ReactElement {
  const { t } = useTranslation();

  return (
    <Styles.MainContainer>
      <Form
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{
          gender: 'none',
          language: 'de',
          country: { id: 83, name: 'Deutschland' },
        }}
      >
        <Suspense fallback={<Loader />}>
          <Row className="header">
            {<Typography.Text strong>{t`Auth.Register.Create`}</Typography.Text>}
            <Typography.Text>{t`Auth.Register.AnAccount`}</Typography.Text>
          </Row>
          <Typography.Text type="secondary">
            <div
              dangerouslySetInnerHTML={{
                __html: t`Auth.Register.Welcome`,
              }}
            />
          </Typography.Text>

          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Form.Item label={t`Auth.Register.FirstName`} name="first_name" rules={[{ required: true }]}>
                <Input placeholder={t`Auth.Register.FirstName`} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={t`Auth.Register.LastName`} name="last_name" rules={[{ required: true }]}>
                <Input placeholder={t`Auth.Register.LastName`} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={t`Auth.Register.Birthday`} name="birth_date" rules={[{ required: true }]}>
                <DatePicker format={intlDateFormat()} placeholder={t`Auth.Register.BirthdayPlaceholder`} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={t`Auth.Email`} name="email" rules={[{ required: true }]}>
                <Input placeholder={t`Auth.EmailPlaceholder`} suffix={<MailFilled />} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={t`Auth.Register.Country`} name="country">
                <CountrySelect />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label={t`Auth.Register.Language`} name="language">
                <LanguageSelect />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label={t`Auth.Password`} name="password" rules={[{ required: true, min: 8 }]}>
                <Input.Password
                  placeholder={t`Auth.PasswordPlaceholder`}
                  iconRender={(visible) => (visible ? <EyeFilled /> : <EyeInvisibleFilled />)}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Form.Item name="gender" className="gender-row">
              <Radio.Group
                options={[
                  { label: t`Global.Male`, value: 'male' },
                  { label: t`Global.Female`, value: 'female' },
                  { label: t`Global.None`, value: 'none' },
                ]}
              />
            </Form.Item>
          </Row>
          <div className="term-of-use">
            <div>
              <Checkbox />
              <span>
                {' '}
                <div
                  style={{ display: 'inline' }}
                  dangerouslySetInnerHTML={{ __html: t`Auth.Register.TermsAndConditionsText` }}
                />
                {/* <Link to={''}>{t`Register.PrivacyPolicy`}</Link> */}
              </span>
            </div>
          </div>
          <Button type="primary" htmlType="submit" loading={isPending}>
            {t`Auth.Register.SignUp`}
          </Button>
          <div className="hr" />
          <Row justify="center">
            <Typography.Text>{t`Auth.Register.HaveAccount`} </Typography.Text>
            <Typography.Text
              onClick={() => onChangePage?.('login')}
            >{t`Auth.Register.Title`}</Typography.Text>
          </Row>
        </Suspense>
      </Form>
    </Styles.MainContainer>
  );
}
