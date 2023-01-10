import { FormSubmit, NameArrayInput } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Checkbox, Col, Form, Input, InputNumber, Row } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { CareerStep } from '../model/careerstep.entity';
import Styles from './styles/Form.style';

export default function CareerStepForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<CareerStep>): ReactElement {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <Styles.MainContainer>
      <Form
        form={form}
        layout={'vertical'}
        onFinish={onSubmit}
        initialValues={{ translate: [{ locale: undefined, name: '' }] }}
      >
        <Styles.FieldSet>
          <legend>
            <Form.Item className="checkbox-legend" name="is_generation" valuePropName="checked">
              <Checkbox disabled>{t('CareerStep.Generation')}</Checkbox>
            </Form.Item>
          </legend>

          <Col span={24}>
            <Form.Item required>
              <NameArrayInput />
            </Form.Item>
          </Col>

          <Row align="middle" gutter={[16, 0]}>
            <Col xs={12}>
              <Form.Item label={t('CareerStep.MinPoint')} name="min_point" rules={[{ required: false }]}>
                <InputNumber
                  disabled
                  min={0}
                  placeholder={t('Global.InputPlaceholder', { title: t('CareerStep.MinPoint') })}
                />
              </Form.Item>
            </Col>

            <Col xs={12}>
              <Form.Item
                label={t('CareerStep.BonusValue')}
                name="discount_percentage"
                rules={[{ required: false }]}
              >
                <Input
                  disabled
                  placeholder={t('Global.InputPlaceholder', { title: t('CareerStep.BonusValue') })}
                />
              </Form.Item>
            </Col>

            <Col xs={12}>
              <Form.Item
                label={t('CareerStep.VoucherLevel')}
                name="voucher_level"
                rules={[{ required: true }]}
              >
                <Input placeholder={t('Global.InputPlaceholder', { title: t('CareerStep.VoucherLevel') })} />
              </Form.Item>
            </Col>

            <Col xs={12}>
              <Form.Item
                label={t('CareerStep.AccountMinusValue')}
                name="id_account_minus_value"
                rules={[{ required: true }]}
              >
                <Input
                  placeholder={t('Global.InputPlaceholder', { title: t('CareerStep.AccountMinusValue') })}
                />
              </Form.Item>
            </Col>
          </Row>

          <FormSubmit isPending={isPending} />
        </Styles.FieldSet>
      </Form>
    </Styles.MainContainer>
  );
}
