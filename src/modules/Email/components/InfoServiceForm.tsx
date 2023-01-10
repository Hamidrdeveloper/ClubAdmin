import { FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Checkbox, Col, Form, Input, Row, Select } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { InfoServiceContext } from '../model/email.entity';
import Styles from './styles/Email.style';
import FormStyles from './styles/Form.style';

const InfoServiceForm: React.FC<FormProps<InfoServiceContext>> = ({ onSubmit, isPending, initialValues }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { Item: FormItem } = Form;

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        bcc: String(initialValues.bcc),
        send_email_after_new_order: String(initialValues.send_email_after_new_order),
      });
    }
  }, [initialValues]);

  return (
    <Styles.MainContainer>
      <FormStyles.FormContainer
        colon={false}
        form={form}
        onFinish={onSubmit}
        name="info-service-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        labelAlign="left"
      >
        <Row wrap={false} gutter={16} justify={'space-around'}>
          <Col span={11} className="customBoxShadow formContainer">
            <FormItem name="bcc" label={t('Email.Field.AllOutgoing')}>
              <Select>
                <Select.Option value="true">{t('Global.Active')}</Select.Option>
                <Select.Option value="false">{t('Global.InActive')}</Select.Option>
              </Select>
            </FormItem>
            <FormItem
              name="bcc_email"
              label={t('Email.Field.EmailAddressForBlindCopy')}
              rules={[{ required: true }]}
            >
              <Input />
            </FormItem>
            <FormItem name="bcc_for_news_letter" valuePropName="checked">
              <Checkbox>{t('Email.Field.DeActiveBlindCopies')}</Checkbox>
            </FormItem>
          </Col>

          <Col span={11} className="customBoxShadow formContainer">
            <FormItem
              name="send_email_after_new_order"
              label={t('Email.Field.SendNotificationToEmailAddressWhenNewOrderIsReceived')}
            >
              <Select>
                <Select.Option value={'true'}>{t('Global.Yes')}</Select.Option>
                <Select.Option value={'false'}>{t('Global.No')}</Select.Option>
              </Select>
            </FormItem>
            <FormItem
              name="email_address_for_new_order_email"
              label={t('Email.Field.EmailAddress')}
              rules={[{ required: true }]}
            >
              <Input />
            </FormItem>
          </Col>
        </Row>

        <FormSubmit isPending={isPending} />
      </FormStyles.FormContainer>
    </Styles.MainContainer>
  );
};

export default InfoServiceForm;
