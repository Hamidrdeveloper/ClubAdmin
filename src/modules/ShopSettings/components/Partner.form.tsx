import { FormSubmit, Upload } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Col, Form, Input, Row } from 'antd';
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
      form.setFieldsValue({ ...initialValues, file: initialValues.partner_picture });
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
            label={t('ShopSettings.Field.PartnerDetail')}
            name="partner_detail"
            rules={[{ required: true }]}
          >
            <Input
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
      </Row>

      <FormSubmit isPending={isPending} />
    </Form>
  );
};
