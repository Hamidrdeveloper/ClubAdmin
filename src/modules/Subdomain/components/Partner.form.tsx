import { FormSubmit, Upload } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Col, Form, Input, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { PartnerModel } from '../model/partner.entity';

export const PartnerForm = ({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<PartnerModel>): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        file: initialValues.partner_picture,
        partner_detail: 'Selbständige ClubAdmin Partner-in',
      });
    } else {
      form.setFieldsValue({
        partner_detail: 'Selbständige ClubAdmin Partner-in',
      });
    }
  }, [initialValues]);

  return (
    <Form form={form} layout={'vertical'} name="partnerSettings-form" onFinish={onSubmit}>
      <Row gutter={[16, 0]}>
        <Col span={12}>
          <Form.Item label={t('ShopSettings.Field.Partner')} name="partner" rules={[{ required: true }]}>
            <Input placeholder={t('Global.InputPlaceholder', { title: t('ShopSettings.Field.Partner') })} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="partner_detail"
            rules={[{ required: true }]}
            label={t('ShopSettings.Field.PartnerDetail')}
          >
            <Input
              disabled
              placeholder={t('Global.InputPlaceholder', { title: t('ShopSettings.Field.PartnerDetail') })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="partner_picture"
            rules={[{ required: true }]}
            label={t('ShopSettings.Field.PartnerPicture')}
          >
            <Input
              disabled
              placeholder={t('Global.InputPlaceholder', { title: t('ShopSettings.Field.PartnerPicture') })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label={t('Global.UploadFile')} name="file">
            <Upload form={form} valueName="partner_picture" />
          </Form.Item>
          <Form.Item hidden name="file_id" />
        </Col>

        <Col span={12}>
          <Form.Item label={t('ShopSettings.Field.PhoneNumber')} name="phone" rules={[{ required: true }]}>
            <Input
              placeholder={t('Global.InputPlaceholder', { title: t('ShopSettings.Field.PhoneNumber') })}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label={t('ShopSettings.Field.Email')}
            name="email"
            rules={[{ required: true, type: 'email', message: `${t('User.PersonalInfo.EmailWrong')}` }]}
          >
            <Input placeholder={t('Global.InputPlaceholder', { title: t('ShopSettings.Field.Email') })} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item label={t('Subdomain.FirstPageText')} name="first_page_text">
            <TextArea
              style={{ minHeight: 140 }}
              placeholder={t('Global.InputPlaceholder', { title: t('Subdomain.FirstPageText') })}
            />
          </Form.Item>
        </Col>
      </Row>

      <FormSubmit isPending={isPending} />
    </Form>
  );
};
