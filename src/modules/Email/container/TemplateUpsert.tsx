import { AuthContext } from '@core/Authentication/service/AuthProvider';
import { FormSubmit } from '@src/shared/components';
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { Col, Divider, Form, Row } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import EmailMessage from '../components/EmailMessage';
import EmailTemplateForm from '../components/EmailTemplateForm';
import { EmailTemplates, EmailTemplatesPure } from '../model/email.entity';
import { createTemplate, updateTemplate } from '../services/email.service';
import Style from './styles/Template.style';

const TemplateUpsert: React.FC<GlobalUpsertProps<EmailTemplates>> = ({ singleData, onCallback }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const { profile } = useContext(AuthContext);
  const [ownerType, setOwnerType] = useState(0);

  const { mutate, isLoading } = useMutation(({ values }: GlobalMutationProps<EmailTemplatesPure>) =>
    singleData?.id ? updateTemplate(singleData?.id || 0, values) : createTemplate(values),
  );

  useEffect(() => {
    if (singleData && singleData.data) {
      const owner = {};

      if (singleData.owner_id === null) {
        owner['owner_id'] = 0;
      } else if (singleData.owner_id === profile.id) {
        owner['owner_id'] = 1;
      } else {
        owner['owner_id'] = 2;
        owner['user'] = singleData.owner;
      }

      setOwnerType(owner['owner_id']);
      form.setFieldsValue({
        ...owner,
        name: singleData.name,
        type: singleData.type,
        file_path: singleData.file_path,
        reply_to: singleData.data.reply_to,
        documentType: singleData.documentType,
        template_type: singleData.data.template_type,
        translate: {
          plain_text: singleData.translate[0].plain_text,
          html: singleData.translate[0].html,
          title: singleData.translate[0].title,
          locale: singleData.translate[0].locale,
        },
      });
    }
  }, [singleData]);

  const handleSubmit = (values) => {
    const owner_id = ownerType === 0 ? null : ownerType === 1 ? profile.id : values.user.id;

    const finalValues: EmailTemplatesPure = {
      owner_id,
      updated_by: 1,
      created_by: 1,
      name: values.name,
      type: values.type,
      file_id: values.file_id,
      document_type_ids: values.documentType ? values.documentType.map((doc) => doc.id) : undefined,
      data: { reply_to: values.reply_to, template_type: values.template_type },
      translate: [
        {
          html: values.translate.html,
          title: values.translate.title,
          plain_text: values.translate.plain_text,
          locale: values.translate.locale.locale ?? values.translate.locale,
        },
      ],
    };
    mutate({ values: finalValues }, { onSuccess: onCallback });
  };

  return (
    <Style.MainContainer>
      <Form
        colon={false}
        form={form}
        labelAlign="left"
        onFinish={handleSubmit}
        name="email-template-form"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 24 }}
      >
        <Divider orientation="left">{t('Email.Template.Title')}</Divider>
        <Row>
          <Col span={24}>
            <EmailTemplateForm ownerType={ownerType} onChangeOwner={setOwnerType} />
          </Col>
        </Row>

        <Divider orientation="left">{t('Email.Template.MessageTitle')}</Divider>
        <Row>
          <Col span={24}>
            <EmailMessage form={form} />
          </Col>
        </Row>

        <Row justify="end" className="btn-primary">
          <FormSubmit isPending={isLoading} />
        </Row>
      </Form>
    </Style.MainContainer>
  );
};

export default TemplateUpsert;
