// NOTE: this form has been migrated from Shop-settings side bar tabs to Company Tabs /admin/settings/companies - see modules/Company Directory
// NOTE: I'm not going to Remove this form.

import { CountrySelect } from '@src/modules/Country';
import { FormSubmit, Loader } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Col, Form, Input, InputNumber, Row } from 'antd';
import React, { ReactElement, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { SaleSystemModel } from '../model/saleSystem.entity';

export const SaleSystemForm = ({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<SaleSystemModel>): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        country: { name: initialValues.country, id: initialValues.country_id },
      });
    }
  }, [initialValues]);

  return (
    <Form form={form} layout={'vertical'} name="saleSystemSettings-form" onFinish={onSubmit}>
      <Suspense fallback={<Loader />}>
        <Row gutter={[16, 0]}>
          <Col span={12}>
            <Form.Item
              label={t('ShopSettings.Field.CompanyName')}
              name="company_name"
              rules={[{ required: true }]}
            >
              <Input
                placeholder={t('Global.InputPlaceholder', { title: t('ShopSettings.Field.CompanyName') })}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label={t('ShopSettings.Field.Country')} name="country" rules={[{ required: true }]}>
              <CountrySelect />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label={t('ShopSettings.Field.Street')} name="street" rules={[{ required: true }]}>
              <Input placeholder={t('Global.InputPlaceholder', { title: t('ShopSettings.Field.Street') })} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="house_number"
              label={t('ShopSettings.Field.HouseNumber')}
              rules={[{ required: true }]}
            >
              <Input
                placeholder={t('Global.InputPlaceholder', { title: t('ShopSettings.Field.HouseNumber') })}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="postal_code"
              rules={[{ required: true }]}
              label={t('ShopSettings.Field.PostalCode')}
            >
              <Input
                placeholder={t('Global.InputPlaceholder', { title: t('ShopSettings.Field.PostalCode') })}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label={t('ShopSettings.Field.City')} name="city" rules={[{ required: true }]}>
              <Input placeholder={t('Global.InputPlaceholder', { title: t('ShopSettings.Field.City') })} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label={t('ShopSettings.Field.Email')} name="email" rules={[{ required: true }]}>
              <Input placeholder={t('Global.InputPlaceholder', { title: t('ShopSettings.Field.Email') })} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label={t('ShopSettings.Field.PhoneNumber')} name="phone" rules={[{ required: true }]}>
              <Input
                placeholder={t('Global.InputPlaceholder', { title: t('ShopSettings.Field.PhoneNumber') })}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label={t('ShopSettings.Field.Fax')} name="fax">
              <Input placeholder={t('Global.InputPlaceholder', { title: t('ShopSettings.Field.Fax') })} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label={t('ShopSettings.Field.BIC')} name="bic" rules={[{ required: true }]}>
              <Input placeholder={t('Global.InputPlaceholder', { title: t('ShopSettings.Field.BIC') })} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={t('ShopSettings.Field.TaxNumber')}
              name="tax_number"
              rules={[{ required: true }]}
            >
              <Input
                placeholder={t('Global.InputPlaceholder', { title: t('ShopSettings.Field.TaxNumber') })}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={t('ShopSettings.Field.VATNumber')}
              name="vat_number"
              rules={[{ required: true }]}
            >
              <Input
                placeholder={t('Global.InputPlaceholder', { title: t('ShopSettings.Field.VATNumber') })}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label={t('ShopSettings.Field.Template')} name="template" rules={[{ required: true }]}>
              <Input
                placeholder={t('Global.InputPlaceholder', { title: t('ShopSettings.Field.Template') })}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="communication_by_letter_price"
              label={t('ShopSettings.Field.CommunicationByLetterPrice')}
            >
              <InputNumber
                placeholder={t('Global.InputPlaceholder', {
                  title: t('ShopSettings.Field.CommunicationByLetterPrice'),
                })}
              />
            </Form.Item>
          </Col>
        </Row>

        <FormSubmit isPending={isPending} />
      </Suspense>
    </Form>
  );
};
