import { CountrySelect } from '@src/modules/Country';
import { OrderContactGroupAddress } from '@src/modules/Order';
import { FormSubmit } from '@src/shared/components';
import { Checkbox, Col, Form, Input, Row, Space } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  initialValues: any;
  isPending: boolean;
  formSubmit: (contactGroup: OrderContactGroupAddress) => void;
};
export const OrderEditAddressForm = ({ initialValues, isPending, formSubmit }: Props): ReactElement => {
  const { t } = useTranslation();

  return (
    <Form initialValues={initialValues} onFinish={formSubmit}>
      <Row gutter={16}>
        <Col xl={24} lg={24} md={24} xs={24}>
          <Form.Item
            label={t('Global.Title')}
            name="title"
            rules={[{ required: true }]}
            labelCol={{ span: 24 }}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xl={8} lg={8} md={8} xs={24}>
          <Form.Item
            labelCol={{ span: 24 }}
            label={t('Order.Overview.Address.CompanyName')}
            name="company_name"
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xl={8} lg={8} md={8} xs={24}>
          <Form.Item
            labelCol={{ span: 24 }}
            label={t('Global.FirstName')}
            name="first_name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xl={8} lg={8} md={8} xs={24}>
          <Form.Item
            labelCol={{ span: 24 }}
            label={t('Global.LastName')}
            name="last_name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xl={24} lg={24} md={24} xs={24}>
          <Form.Item labelCol={{ span: 24 }} label={t('Global.Address')} name="address1">
            <Input.TextArea />
          </Form.Item>
        </Col>

        <Col xl={12} lg={12} md={12} xs={24}>
          <Form.Item
            labelCol={{ span: 24 }}
            label={t('Order.Overview.Address.Street')}
            name="address2"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xl={12} lg={12} md={12} xs={24}>
          <Form.Item
            labelCol={{ span: 24 }}
            name="house_number"
            rules={[{ required: true }]}
            label={t('Order.Overview.Address.HouseNumber')}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xl={12} lg={12} md={12} xs={24}>
          <Form.Item
            labelCol={{ span: 24 }}
            label={t('Order.Overview.Address.PostCode')}
            name="postal_code"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xl={12} lg={12} md={12} xs={24}>
          <Form.Item
            labelCol={{ span: 24 }}
            label={t('Order.Overview.Address.City')}
            name="city"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xl={12} lg={12} md={12} xs={24}>
          <Form.Item labelCol={{ span: 24 }} label={t('Order.Overview.Address.State')} name="state">
            <Input />
          </Form.Item>
        </Col>

        <Col xl={12} lg={12} md={12} xs={24}>
          <Form.Item
            labelCol={{ span: 24 }}
            label={t('Order.Overview.Address.Country')}
            name="country"
            rules={[{ required: true }]}
          >
            <CountrySelect />
          </Form.Item>
        </Col>

        <Col xl={12} lg={12} md={12} xs={24}>
          <Form.Item
            labelCol={{ span: 24 }}
            label={t('Order.Overview.Address.Phone')}
            rules={[{ required: true }]}
            name="phone"
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xl={12} lg={12} md={12} xs={24}>
          <Space align="center" style={{ marginTop: 30 }}>
            <Form.Item labelCol={{ span: 24 }} name="is_pack_station" valuePropName="checked">
              <Checkbox>{t('Order.Overview.Address.PackStation')}</Checkbox>
            </Form.Item>
            <Form.Item labelCol={{ span: 24 }} name="is_post_office" valuePropName="checked">
              <Checkbox>{t('Order.Overview.Address.PostOffice')}</Checkbox>
            </Form.Item>
          </Space>
        </Col>
      </Row>
      <Form.Item>
        <Row justify={'end'}>
          <FormSubmit isPending={isPending} title={t('Global.Submit')} />
        </Row>
      </Form.Item>
    </Form>
  );
};
