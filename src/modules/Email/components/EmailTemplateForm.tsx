import { UserSelect } from '@src/modules/User';
import { Col, Form, Input, Row, Select } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import DocumentTypeSelect from '../container/DocumentTypeSelect';
import Styles from './styles/Email.style';
import Style from './styles/TemplateForm.style';

type Props = { ownerType: number; onChangeOwner: (value: number) => void };

const EmailTemplateForm: React.FC<Props> = ({ ownerType, onChangeOwner }) => {
  const { t } = useTranslation();
  const { Item: FormItem } = Form;

  return (
    <Styles.MainContainer>
      <Style.FormContainer>
        <Row gutter={[4, 0]} wrap={false}>
          <Col span={12} className="customBoxShadow formContainer">
            <FormItem label={t('Email.Field.Owner')}>
              <Select
                value={ownerType}
                onChange={onChangeOwner}
                placeholder={t('Global.SelectPlaceholder', { title: t('Email.Field.Owner') })}
              >
                <Select.Option value={0}>{t('Global.All')}</Select.Option>
                <Select.Option value={1}>{t('Global.Me')}</Select.Option>
                <Select.Option value={2}>{t('Email.Template.Form.AnyOtherUser')}</Select.Option>
              </Select>
            </FormItem>

            <FormItem rules={[{ required: ownerType === 2 }]} name="user" label={t('User.Title')}>
              <UserSelect disabled={ownerType !== 2} />
            </FormItem>

            <FormItem name="name" label={t('Email.Field.Name')} rules={[{ required: true }]}>
              <Input placeholder={t('Email.Field.EnterName')} />
            </FormItem>

            <FormItem name="template_type" label={t('Email.Field.TemplateType')} rules={[{ required: true }]}>
              <Select placeholder={t('Email.Field.SelectTemplateType')}>
                <Select.Option value="online_store">{t('Global.OnlineStore')}</Select.Option>
                <Select.Option value="reset_password_email">
                  {t('Email.Field.ResetPasswordEmail')}
                </Select.Option>
              </Select>
            </FormItem>
          </Col>

          <Col span={12} className="customBoxShadow formContainer">
            <FormItem name="type" label={t('Email.Field.Content')} rules={[{ required: true }]}>
              <Select placeholder={'type'}>
                <Select.Option value="html">{t('Global.HTML')}</Select.Option>
                <Select.Option value="plain_text">{t('Global.PlainText')}</Select.Option>
              </Select>
            </FormItem>

            <FormItem name="reply_to" label={t('Email.Field.ReplyTo')}>
              <Input placeholder={t('Email.Field.EnterWhoToReplyOwner')} />
            </FormItem>

            <FormItem name="documentType" label={t('Email.Field.DocumentType')}>
              <DocumentTypeSelect isMulti />
            </FormItem>
          </Col>
        </Row>
      </Style.FormContainer>
    </Styles.MainContainer>
  );
};

export default EmailTemplateForm;
