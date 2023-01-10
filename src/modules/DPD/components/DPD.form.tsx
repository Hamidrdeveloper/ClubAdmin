import { FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Checkbox, Col, Form, Input, Row } from 'antd';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { editDPDSetting } from '../controller/dpd.controller';
import { DPDModel } from '../model/dpd.entity';

export const DPDForm = ({
  initialValues,
  onDone,
}: Partial<FormProps<DPDModel>> & { onDone: () => void }): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [pending, setPending] = useState<boolean>(false);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({ ...initialValues, password: '' });
    }
  }, [initialValues]);

  const handleFormSubmit = (data: DPDModel) => {
    setPending(true);
    editDPDSetting(data)
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
        name="dpdSetting-form"
        onFinish={(data) => handleFormSubmit({ ...data, password: data.password || initialValues?.password })}
      >
        <Row gutter={[16, 0]}>
          <Col span={12}>
            <Form.Item
              name="customer_number"
              rules={[{ required: true }]}
              label={t('DPD.Field.CustomerNumber')}
            >
              <Input
                placeholder={t('Global.InputPlaceholder', {
                  title: t('DPD.Field.CustomerNumber'),
                })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t('DPD.Field.DelisId')} name="delis_id" rules={[{ required: true }]}>
              <Input
                placeholder={t('Global.InputPlaceholder', {
                  title: t('DPD.Field.DelisId'),
                })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t('DPD.Field.MessageLanguage')}
              name="message_language"
              rules={[{ required: true }]}
            >
              <Input
                placeholder={t('Global.InputPlaceholder', {
                  title: t('DPD.Field.MessageLanguage'),
                })}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label={t('DPD.Field.Password')} name="password">
              <Input
                type={'password'}
                placeholder={t('Global.InputPlaceholder', {
                  title: t('DPD.Field.Password'),
                })}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="saturday_delivery" valuePropName="checked">
              <Checkbox>{t('DPD.Field.SaturdayDelivery')}</Checkbox>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="staging" valuePropName="checked">
              <Checkbox>{t('DPD.Field.Staging')}</Checkbox>
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
