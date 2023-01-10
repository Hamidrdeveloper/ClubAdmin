import { FormProps } from '@src/shared/models';
import { Col, Form, Input, Row, Select } from 'antd';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { AutomaticContext } from '../model/email.entity';
import SettingStyles from './styles/Email.style';
import FormStyles from './styles/Form.style';

const AutomaticForm: React.FC<FormProps<AutomaticContext>> = ({ onSubmit, initialValues }) => {
  const [form] = Form.useForm();
  const { Item: FormItem } = Form;

  const { t } = useTranslation();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <SettingStyles.MainContainer>
      <FormStyles.FormContainer
        form={form}
        colon={false}
        name="variation-settings-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        labelAlign="left"
        onFinish={onSubmit}
      >
        <Row gutter={[16, 16]}>
          <Col span={12} className="customBoxShadow formContainer">
            <FormItem name="new_order" label={t('Email.Field.NewOrderFromOnlineStore')}>
              <Select defaultValue={'Active'} />
            </FormItem>

            <FormItem name="change_password" label={t('Email.Field.SendCostumerEmailToChangePassword')}>
              <Input defaultValue={'Active'} />
            </FormItem>

            <FormItem name="confirm_change_password" label={t('Email.Field.ConfirmationOfPasswordChange')}>
              <Input defaultValue={'Active'} />
            </FormItem>

            <FormItem name="change_email_address" label={t('Email.Field.CustomerWantsToChangeEmailAddress')}>
              <Input defaultValue={'Active'} />
            </FormItem>

            <FormItem name="news_letter" label={t('Email.Field.NewsLetterOpt_ln')}>
              <Select defaultValue={'Active'} />
            </FormItem>

            <FormItem name="confirm_news_letter" label={t('Email.Field.NewsLetterOpt_lnConfirmation')}>
              <Select defaultValue={'Active'} />
            </FormItem>

            <FormItem name="customer_register" label={t('Email.Field.CostumerRegistration')}>
              <Select defaultValue={'Active'} />
            </FormItem>
          </Col>
          ​
          <Col span={12} className="customBoxShadow formContainer">
            <FormItem name="tell_a_friend" label={t('Email.Field.Tell-A-Friend')}>
              <Select defaultValue={'Active'} />
            </FormItem>
            <FormItem name="new_scheduler_order" label={t('Email.Field.NewSchedulerOrder')}>
              <Select defaultValue={'Active'} />
            </FormItem>
            <FormItem name="service_unit" label={t('Email.Field.ServiceUnits')}>
              <Select defaultValue={'Active'} />
            </FormItem>
            <FormItem name="modify_scheduler_order" label={t('Email.Field.ModificationOfASchedulerOrder')}>
              <Select defaultValue={'Active'} />
            </FormItem>
            <FormItem name="forum_notification" label={t('Email.Field.ForumNotification')}>
              <Select defaultValue={'Active'} />
            </FormItem>
            <FormItem
              name="notification_item_in_stock"
              label={t('Email.Field.NotificationWhenItemIsInStock')}
            >
              <Select defaultValue={'Active'} />
            </FormItem>
          </Col>
        </Row>
        ​
      </FormStyles.FormContainer>
    </SettingStyles.MainContainer>
  );
};

export default AutomaticForm;
