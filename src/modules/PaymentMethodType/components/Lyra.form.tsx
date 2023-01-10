import { FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Col, Form, Input, Row } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { LyraModel } from '../model/lyra.entity';

export const LyraForm = ({ onSubmit, isPending, initialValues }: FormProps<LyraModel>): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <MainContainer>
      <Form form={form} layout={'vertical'} name="lyraSetting-form" onFinish={onSubmit}>
        <Row gutter={[16, 0]}>
          <Col span={12}>
            <Form.Item
              name="lyra_currency"
              rules={[{ required: true }]}
              label={t('ShopSettings.Field.Lyra.Currency')}
            >
              <Input
                placeholder={t('Global.InputPlaceholder', {
                  title: t('ShopSettings.Field.Lyra.Currency'),
                })}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label={t('ShopSettings.Field.Lyra.SandboxUsername')} name="lyra_sandbox_username">
              <Input
                placeholder={t('Global.InputPlaceholder', {
                  title: t('ShopSettings.Field.Lyra.SandboxUsername'),
                })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t('ShopSettings.Field.Lyra.SandboxPassword')} name="lyra_sandbox_password">
              <Input
                type="password"
                placeholder={t('Global.InputPlaceholder', {
                  title: t('ShopSettings.Field.Lyra.SandboxPassword'),
                })}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={t('ShopSettings.Field.Lyra.ProductionUsername')}
              name="lyra_production_username"
            >
              <Input
                placeholder={t('Global.InputPlaceholder', {
                  title: t('ShopSettings.Field.Lyra.ProductionUsername'),
                })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('ShopSettings.Field.Lyra.ProductionPassword')}
              name="lyra_production_password"
            >
              <Input
                type="password"
                placeholder={t('Global.InputPlaceholder', {
                  title: t('ShopSettings.Field.Lyra.ProductionPassword'),
                })}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={t('ShopSettings.Field.Lyra.Mode')}
              name="lyra_mode"
              rules={[{ required: true }]}
            >
              <Input
                placeholder={t('Global.InputPlaceholder', {
                  title: t('ShopSettings.Field.Lyra.Mode'),
                })}
              />
            </Form.Item>
          </Col>
        </Row>

        <FormSubmit isPending={isPending} />
      </Form>
    </MainContainer>
  );
};

const MainContainer = styled.div``;
