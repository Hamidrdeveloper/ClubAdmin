import { FormSubmit, Upload } from '@shared/components';
import { FormProps } from '@src/shared/models';
import { Checkbox, Col, Form, Input, InputNumber, Row, Select } from 'antd';
import React, { ReactElement, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { UserSelect } from '../../User';
import { Partner } from '../model/partner.entity';

export default function PartnerForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<Partner>): ReactElement {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  return (
    <Form
      form={form}
      layout={'vertical'}
      onFinish={onSubmit}
      name="partner-form"
      initialValues={{
        receive_vat_responsible: false,
        send_vat_responsible: false,
        active_auto_bonus: false,
        active_training_bonus: false,
        receive_commission: false,
        can_buy: false,
        over_personal_turnover: false,
        can_see_down_line: false,
        inhouse_sale: false,
        has_network: false,
        has_btob: false,
        has_btoc: false,
        has_warehouse: false,
        has_delivery: false,
        is_active: false,
        is_approved: false,
        post_delivery_factor: false,
        translate: [{ locale: undefined, name: '' }],
      }}
    >
      <Row gutter={16}>
        <Col span={Object.keys(initialValues || {}).length !== 0 ? 12 : 8}>
          <Form.Item label={t('Partner.Field.User')} name="user" rules={[{ required: true }]}>
            <UserSelect />
          </Form.Item>
        </Col>

        {Object.keys(initialValues || {}).length === 0 && (
          <Col span={8}>
            <Form.Item name="parent" label={t('Partner.Field.ParentId')}>
              <UserSelect />
            </Form.Item>
          </Col>
        )}

        <Col span={Object.keys(initialValues || {}).length !== 0 ? 12 : 8}>
          <Form.Item name="coach" label={t('Partner.Field.CoachId')}>
            <UserSelect />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="transportation_ratio_percentage"
            label={t('Partner.Field.TransportationRatioPercentage')}
          >
            <Select
              placeholder={t('Global.SelectPlaceholder', {
                title: t('Partner.Field.TransportationRatioPercentage'),
              })}
              options={[
                { label: '0', value: 0 },
                { label: '25', value: 25 },
                { label: '50', value: 50 },
                { label: '75', value: 75 },
                { label: '100', value: 100 },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label={t('Partner.Field.MaxClientRoot')} name="max_client_root">
            <Input placeholder={t('Global.InputPlaceholder', { title: t('Partner.Field.MaxClientRoot') })} />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="warranty_days"
            label={t('Partner.Field.WarrantyDays')}
            rules={[{ required: true }]}
          >
            <InputNumber
              placeholder={t('Global.InputPlaceholder', { title: t('Partner.Field.WarrantyDays') })}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label={t('Partner.Field.BankName')} name="bank_name">
            <Input placeholder={t('Global.InputPlaceholder', { title: t('Partner.Field.BankName') })} />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="iban" label={t('Partner.Field.Iban')}>
            <Input placeholder={t('Global.InputPlaceholder', { title: t('Partner.Field.Iban') })} />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item name="swift" label={t('Partner.Field.Swift')}>
            <Input placeholder={t('Global.InputPlaceholder', { title: t('Partner.Field.Swift') })} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16} className="file-upload">
        <Col span={8}>
          <Form.Item
            name={['frontIdentityCard', 'root_file', 'path']}
            label={t('Partner.Field.FrontIdentityCardId')}
          >
            <Upload form={form} idName="front_identity_card_id" />
          </Form.Item>
          <Form.Item hidden name="front_identity_card_id">
            <></>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name={['backIdentityCard', 'root_file', 'path']}
            label={t('Partner.Field.BackIdentityCardId')}
          >
            <Upload form={form} idName="back_identity_card_id" />
          </Form.Item>
          <Form.Item hidden name="back_identity_card_id">
            <></>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name={['businessCertification', 'root_file', 'path']}
            label={t('Partner.Field.BusinessCertificationId')}
          >
            <Upload form={form} idName="business_certification_id" />
          </Form.Item>
          <Form.Item hidden name="business_certification_id">
            <></>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={32}>
        <Col span={6}>
          <Form.Item name="active_auto_bonus" valuePropName="checked" className="checkbox">
            <Checkbox>{t('Partner.Field.ActiveAutoBonus')}</Checkbox>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="active_training_bonus" valuePropName="checked" className="checkbox">
            <Checkbox>{t('Partner.Field.ActiveTrainingBonus')}</Checkbox>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="receive_commission" valuePropName="checked" className="checkbox">
            <Checkbox>{t('Partner.Field.ReceiveCommission')}</Checkbox>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="can_buy" valuePropName="checked" className="checkbox">
            <Checkbox>{t('Partner.Field.CanBuy')}</Checkbox>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="is_active" valuePropName="checked" className="checkbox">
            <Checkbox>{t('Global.IsActive')}</Checkbox>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="receive_vat_responsible" valuePropName="checked" className="checkbox">
            <Checkbox>{t('Partner.Field.ReceiveVat')}</Checkbox>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="send_vat_responsible" valuePropName="checked" className="checkbox">
            <Checkbox>{t('Partner.Field.SendVatResponsible')}</Checkbox>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="is_approved" valuePropName="checked" className="checkbox">
            <Checkbox>{t('Global.IsApproved')}</Checkbox>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item name="over_personal_turnover" valuePropName="checked" className="checkbox">
            <Checkbox>{t('Partner.Field.OverPersonalTurnover')}</Checkbox>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="can_see_down_line" valuePropName="checked" className="checkbox">
            <Checkbox>{t('Partner.Field.CanSeeDowLine')}</Checkbox>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="inhouse_sale" valuePropName="checked" className="checkbox">
            <Checkbox>{t('Partner.Field.InHouseSale')}</Checkbox>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item name="has_network" valuePropName="checked" className="checkbox">
            <Checkbox>{t('Global.HasNetwork')}</Checkbox>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="has_btob" valuePropName="checked" className="checkbox">
            <Checkbox>{t('Global.HasBtob')}</Checkbox>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="has_btoc" valuePropName="checked" className="checkbox">
            <Checkbox>{t('Partner.Field.HasBtoc')}</Checkbox>
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item name="post_delivery_factor" valuePropName="checked" className="checkbox">
            <Checkbox>{t('Partner.Field.PostDeliveryFactor')}</Checkbox>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="has_warehouse" valuePropName="checked" className="checkbox">
            <Checkbox>{t('Partner.Field.HasWarehouse')}</Checkbox>
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="has_delivery" valuePropName="checked" className="checkbox">
            <Checkbox>{t('Partner.Field.HasDelivery')}</Checkbox>
          </Form.Item>
        </Col>
      </Row>

      <FormSubmit isPending={isPending} />
    </Form>
  );
}
