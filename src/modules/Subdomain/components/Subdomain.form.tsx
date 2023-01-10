import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { AuthContext } from '@src/core';
import { LanguageSelect } from '@src/modules/Language';
import { PartnerSelect } from '@src/modules/Partner';
import { PaymentMethod, PaymentMethodSelect } from '@src/modules/PaymentMethod';
import { FormSubmit, Loader, TextEditor } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Button, Checkbox, Col, Divider, Form, Input, Row, Space } from 'antd';
import React, { ReactElement, Suspense, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { Subdomain } from '../model/Subdomain.entity';

const SubdomainForm = ({ onSubmit, initialValues, isPending }: FormProps<Subdomain>): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod[]>([]);
  const { loggedInUserRole } = useContext(AuthContext);

  useEffect(() => {
    if (initialValues) {
      if ((initialValues.translate?.length ?? 0) <= 0)
        form.setFieldsValue({
          ...initialValues,
          translate: [{ locale: undefined, title: '', description: '' }],
        });
      else form.setFieldsValue(initialValues);

      setPaymentMethod(initialValues?.paymentMethods);
    }
  }, [initialValues]);

  const onPaymentMethodChangeHandler = (paymentMethods: PaymentMethod[]) => {
    const isPaymentMethodChangeConfirmed = window.confirm(
      t('Subdomain.Field.ChangePaymentMethodNotification'),
    );

    if (isPaymentMethodChangeConfirmed) {
      form.setFieldsValue({ paymentMethods });
      setPaymentMethod(paymentMethods);
    } else {
      form.setFieldsValue({ paymentMethods: paymentMethod });
    }
  };

  return (
    <Form
      form={form}
      layout={'vertical'}
      name="subdomain-form"
      onFinish={onSubmit}
      initialValues={{
        is_active: true,
        is_approved: true,
        translate: [{ locale: undefined, title: '', description: '' }],
      }}
    >
      <Suspense fallback={<Loader />}>
        <Row gutter={8}>
          <Col span={24}>
            <Row justify="space-between" gutter={16}>
              <Col span={12}>
                <Form.Item label={t('Global.Name')} name="name" rules={[{ required: true }]}>
                  <Input placeholder={t('Global.InputPlaceholder', { title: t('Global.Name') })} />
                </Form.Item>
              </Col>

              {loggedInUserRole !== 'partner' && (
                <Col span={12}>
                  <Form.Item label={t('Subdomain.Field.Partner')} name="partner" rules={[{ required: true }]}>
                    <PartnerSelect />
                  </Form.Item>
                </Col>
              )}

              {/* <Col span={12}>
                <Form.Item label={t('Subdomain.Field.Hours')} name="hours">
                  <Select
                    isClearable
                    isMulti
                    options={[
                      { value: 'Sunday 8:00 till 16:00' },
                      { value: 'Monday 8:00 till 16:00' },
                      { value: 'Tuesday 8:00 till 16:00' },
                      { value: 'Thursday 8:00 till 16:00' },
                      { value: 'Wednesday 8:00 till 16:00' },
                      { value: 'Saturday 8:00 till 16:00' },
                      { value: 'Friday 8:00 till 16:00' },
                    ]}
                    getOptionLabel={(option) => option?.value}
                    getOptionValue={(option) => String(option?.value)}
                    theme={(selectTheme) => reactSelectTheme(selectTheme)}
                    classNamePrefix="react-select"
                  />
                </Form.Item>
              </Col> */}

              <Col xs={12}>
                <Form.Item label={t('Subdomain.Field.PaymentMethod')} name="paymentMethods">
                  <PaymentMethodSelect isMulti onChange={onPaymentMethodChangeHandler} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={3}>
                <Form.Item label={' '} name="is_active" valuePropName="checked">
                  <Checkbox disabled={loggedInUserRole === 'partner'}>{t('Global.IsActive')}</Checkbox>
                </Form.Item>
              </Col>

              <Col span={3}>
                <Form.Item label={' '} name="is_approved" valuePropName="checked">
                  <Checkbox disabled={loggedInUserRole === 'partner'}>{t('Global.IsApproved')}</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Divider />

          <Col span={24}>
            <Row justify="space-between" gutter={16}>
              <Col span={24}>
                <Form.List name="translate">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, fieldKey, ...restField }, index: number) => (
                        <TranslationContainer key={key}>
                          <Input.Group>
                            <Row style={{ width: '100%' }} gutter={[0, 16]}>
                              <Col>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'locale']}
                                  label={t('Global.Language')}
                                  fieldKey={[fieldKey, 'locale']}
                                  rules={[
                                    {
                                      required: true,
                                      message: `Item ${name + 1} ${t('Global.Language')} is required`,
                                    },
                                  ]}
                                >
                                  <LanguageSelect isGroup />
                                </Form.Item>
                              </Col>

                              <Col flex={1}>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'title']}
                                  fieldKey={[fieldKey, 'title']}
                                  label={t('Global.Title')}
                                  rules={[
                                    {
                                      required: true,
                                      message: `Item ${name + 1} ${t('Global.Title')} is required`,
                                    },
                                  ]}
                                >
                                  <Input
                                    placeholder={t('Global.InputPlaceholder', { title: t('Global.Title') })}
                                  />
                                </Form.Item>
                              </Col>

                              <Col span={24}>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'description']}
                                  label={t('Global.Description')}
                                  fieldKey={[fieldKey, 'description']}
                                  rules={[
                                    {
                                      required: true,
                                      message: `Item ${name + 1} ${t('Global.Description')} is required`,
                                    },
                                  ]}
                                >
                                  <TextEditor
                                    placeholder={t('Global.InputPlaceholder', {
                                      title: t('Global.Description'),
                                    })}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          </Input.Group>

                          {
                            <div style={{ marginTop: '30px' }}>
                              {index < 1 ? (
                                <Space>
                                  <Button
                                    ghost
                                    type="primary"
                                    icon={<PlusOutlined />}
                                    onClick={() => add(null, 0)}
                                  />

                                  {(fields?.length ?? 0) > 1 && (
                                    <Button
                                      ghost
                                      danger
                                      type="primary"
                                      icon={<DeleteOutlined />}
                                      onClick={() => remove(name)}
                                    />
                                  )}
                                </Space>
                              ) : (
                                <Button
                                  ghost
                                  danger
                                  type="primary"
                                  icon={<DeleteOutlined />}
                                  onClick={() => remove(name)}
                                />
                              )}
                            </div>
                          }
                        </TranslationContainer>
                      ))}
                    </>
                  )}
                </Form.List>
              </Col>
            </Row>
          </Col>
        </Row>
        <FormSubmit isPending={isPending} />
      </Suspense>
    </Form>
  );
};

export default SubdomainForm;

const TranslationContainer = styled.div`
  gap: 8px;
  display: flex;

  &:not(:last-child) {
    margin-bottom: 16px;
  }

  & span[role='img'].icon {
    font-size: 16px;
    color: rgb(24, 144, 255);
  }
`;
