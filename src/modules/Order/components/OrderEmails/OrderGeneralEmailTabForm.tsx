import { FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Col, Form, Input, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { OrderEmailsModalFields } from '../..';

const OrderGeneralEmailTabForm: FC<FormProps<OrderEmailsModalFields>> = ({
  onSubmit,
  isPending,
  initialValues,
}) => {
  const { t } = useTranslation();

  return (
    <MainContainer>
      <Form
        name="order-general-email-form"
        layout={'vertical'}
        onFinish={onSubmit}
        initialValues={initialValues}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="customer_email" label={t('Order.Email.Field.CustomerMail')}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="subject" label={t('Order.Email.Field.Subject')}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item name="body" label={t('Order.Email.Field.Body')}>
              <TextArea className="multi-line" />
            </Form.Item>
          </Col>
        </Row>

        <FormSubmit isPending={isPending} title={t('Order.Email.SendEmail')} />
      </Form>
    </MainContainer>
  );
};

export default OrderGeneralEmailTabForm;

const MainContainer = styled.div`
  & .multi-line {
    min-height: 180px;
  }
`;
