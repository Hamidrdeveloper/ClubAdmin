import { FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Checkbox, Col, Form, Input, Row } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { editDHLSetting } from '../controller/dhl.controller';
import { DHLModel } from '../model/dhl.entity';

export const DHLForm = ({
  initialValues,
  onDone,
}: Partial<FormProps<DHLModel>> & { onDone: () => void }): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [pending, setPending] = useState<boolean>(false);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues, api_password: '' });
    }
  }, [initialValues]);

  const handleFormSubmit = (data: DHLModel) => {
    setPending(true);
    editDHLSetting(data)
      .then(() => {
        setPending(false);
        onDone();
      })
      .catch(() => setPending(false));
  };

  return (
    <MainContainer>
      <Form
        form={form}
        layout={'vertical'}
        name="dhlSetting-form"
        onFinish={(data) =>
          handleFormSubmit({ ...data, api_password: data.api_password || initialValues?.api_password })
        }
      >
        <Row gutter={[16, 0]}>
          <Col span={12}>
            <Form.Item label={t('DHL.Field.User')} name="user" rules={[{ required: true }]}>
              <Input
                placeholder={t('Global.InputPlaceholder', {
                  title: t('DHL.Field.User'),
                })}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label={t('DHL.Field.Version')} name="version" rules={[{ required: true }]}>
              <Input
                placeholder={t('Global.InputPlaceholder', {
                  title: t('DHL.Field.Version'),
                })}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="api_user" rules={[{ required: true }]} label={t('DHL.Field.ApiUser')}>
              <Input
                placeholder={t('Global.InputPlaceholder', {
                  title: t('DHL.Field.ApiUser'),
                })}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label={t('DHL.Field.ApiPassword')} name="api_password">
              <Input
                type={'password'}
                placeholder={t('Global.InputPlaceholder', {
                  title: t('DHL.Field.ApiPassword'),
                })}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={t('DHL.Field.DHLBusinessTestUser')}
              name="dhl_business_test_user"
              rules={[{ required: true }]}
            >
              <Input
                placeholder={t('Global.InputPlaceholder', {
                  title: t('DHL.Field.DHLBusinessTestUser'),
                })}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={t('DHL.Field.DHLBusinessTestUserPassword')}
              name="dhl_business_test_user_password"
              rules={[{ required: true }]}
            >
              <Input
                placeholder={t('Global.InputPlaceholder', {
                  title: t('DHL.Field.DHLBusinessTestUserPassword'),
                })}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={t('DHL.Field.DHLBusinessTestEKP')}
              name="dhl_business_test_ekp"
              rules={[{ required: true }]}
            >
              <Input
                placeholder={t('Global.InputPlaceholder', {
                  title: t('DHL.Field.DHLBusinessTestEKP'),
                })}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label={t('DHL.Field.EKP')} name="ekp" rules={[{ required: true }]}>
              <Input
                placeholder={t('Global.InputPlaceholder', {
                  title: t('DHL.Field.EKP'),
                })}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label={t('DHL.Field.Signature')} name="signature" rules={[{ required: true }]}>
              <Input
                placeholder={t('Global.InputPlaceholder', {
                  title: t('DHL.Field.Signature'),
                })}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="test_mode" valuePropName="checked" label=" ">
              <Checkbox>{t('DHL.Field.TestMode')}</Checkbox>
            </Form.Item>
          </Col>
        </Row>

        <FormSubmit isPending={pending} />
      </Form>
    </MainContainer>
  );
};

const MainContainer = styled.div`
  margin-bottom: 200px;
`;
