import { FormSubmit, Upload } from '@shared/components';
import { AuthContext } from '@src/core';
import CareerStepSelect from '@src/modules/CareerStep/container/CareerStepSelect';
import CompanyModule from '@src/modules/Company/Company.module';
import AsyncCompanySelect from '@src/modules/Company/container/AsyncCompanySelect';
import { Partner } from '@src/modules/Partner';
import { FormProps } from '@src/shared/models';
import { Checkbox, Col, Form, Input, InputNumber, Row, Select } from 'antd';
import React, { ReactElement, lazy, useContext, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import FormStyle from './styles/Form.style';
import PartnerStyle from './styles/Partner.style';

export default function PartnerForm({
  onSubmit,
  isPending,
  initialValues,
}: FormProps<Partner>): ReactElement {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const companyModule = useMemo(() => {
    const module = new CompanyModule();
    module.UpsertComponent = lazy(() => import('../containers/CompanyInsertFromPartnerID'));
    return module;
  }, []);

  const { profile } = useContext(AuthContext);
  const partnerId = useMemo(() => {
    return initialValues?.id;
  }, [initialValues]);

  const loggedInAsPartner = profile.roles.map((role) => role.slug).includes('partner');

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(
        initialValues.coach
          ? {
              ...initialValues,
              coach: { ...initialValues.coach, user: { person: initialValues.coach['person'] } },
            }
          : initialValues,
      );
    }
  }, [initialValues]);

  return (
    <FormStyle.Container
      form={form}
      colspace={8}
      colon={false}
      labelAlign="left"
      onFinish={onSubmit}
      name="partner-form"
      labelCol={{ xs: { span: 8 } }}
      wrapperCol={{ xs: { span: 16 } }}
      layout={'horizontal'}
      initialValues={{
        can_buy: false,
        has_btoc: false,
        has_btob: false,
        is_active: false,
        is_approved: false,
        has_network: false,
        public_findable: false,
        has_delivery: false,
        inhouse_sale: false,
        has_warehouse: false,
        hasInfoService: false,
        active_auto_bonus: false,
        can_see_down_line: false,
        receive_commission: false,
        send_vat_responsible: false,
        post_delivery_factor: false,
        active_training_bonus: false,
        over_personal_turnover: false,
        receive_vat_responsible: false,
        is_full_legals_responsible: false,
        is_promotional_article_active: false,
        receive_incentive_bonus: false,
        translate: [{ locale: undefined, name: '' }],
      }}
    >
      <Row justify="space-between">
        <Col xs={24} md={12} className="leftCol">
          {/* {Object.keys(initialValues || {}).length === 0 && (
              <Col span={12}>
                <Form.Item name="parent" label={t('Partner.Field.ParentId')}>
                  <PartnerSelect />
                </Form.Item>
              </Col>
            )} */}

          {/* hide Coach from front as requested in #5480 */}
          {/* <Form.Item name="coach" label={t('Partner.Field.CoachId')}>
            <PartnerSelect />
          </Form.Item> */}

          {!loggedInAsPartner && (
            <>
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
              <Form.Item label={t('Partner.Field.MaxClientRoot')} name="max_client_root">
                <Input
                  placeholder={t('Global.InputPlaceholder', { title: t('Partner.Field.MaxClientRoot') })}
                />
              </Form.Item>
              <Form.Item name="warranty_days" label={t('Partner.Field.WarrantyDays')}>
                <InputNumber
                  placeholder={t('Global.InputPlaceholder', { title: t('Partner.Field.WarrantyDays') })}
                />
              </Form.Item>
            </>
          )}

          <Form.Item label={t('Partner.Field.BankName')} name="bank_name">
            <Input placeholder={t('Global.InputPlaceholder', { title: t('Partner.Field.BankName') })} />
          </Form.Item>
          <Form.Item name="iban" label={t('Partner.Field.Iban')}>
            <Input placeholder={t('Global.InputPlaceholder', { title: t('Partner.Field.Iban') })} />
          </Form.Item>
          <Form.Item name="swift" label={t('Partner.Field.Swift')}>
            <Input placeholder={t('Global.InputPlaceholder', { title: t('Partner.Field.Swift') })} />
          </Form.Item>
        </Col>
        {/* --------------- END OF LEFT COLUMN ------------- */}
        <Col xs={24} md={12} className="rightCol">
          <Form.Item name={'company'} label={t('User.Partner.Company')}>
            <AsyncCompanySelect
              module={companyModule}
              upsertProps={{ partnerId }}
              hasNew={!initialValues?.company_id}
              query={{ partnerId, isActive: true }}
            />
          </Form.Item>

          <Form.Item
            name={['user', 'careerStep']}
            label={t('User.Field.CareerStep')}
            rules={[{ required: true }]}
          >
            <CareerStepSelect disabled={loggedInAsPartner} />
          </Form.Item>

          <Form.Item
            name={['frontIdentityCard', 'root_file', 'path']}
            label={t('Partner.Field.FrontIdentityCardId')}
          >
            <Upload
              form={form}
              idName="front_identity_card_id"
              requestHeaders={{ 'X-ENDPOINT': 'partner' }}
            />
          </Form.Item>
          <Form.Item hidden name="front_identity_card_id">
            <></>
          </Form.Item>
          <Form.Item
            name={['backIdentityCard', 'root_file', 'path']}
            label={t('Partner.Field.BackIdentityCardId')}
          >
            <Upload form={form} idName="back_identity_card_id" requestHeaders={{ 'X-ENDPOINT': 'partner' }} />
          </Form.Item>
          <Form.Item hidden name="back_identity_card_id">
            <></>
          </Form.Item>
          <Form.Item
            name={['businessCertification', 'root_file', 'path']}
            label={t('Partner.Field.BusinessCertificationId')}
          >
            <Upload
              form={form}
              idName="business_certification_id"
              requestHeaders={{ 'X-ENDPOINT': 'partner' }}
            />
          </Form.Item>
          <Form.Item hidden name="business_certification_id">
            <></>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={32} wrap={true} justify="space-between">
        <PartnerStyle.FieldSet className="partner-checkbox-container">
          <legend>More Options</legend>

          <Form.Item name="is_active" valuePropName="checked" className="checkbox">
            <Checkbox disabled={loggedInAsPartner}>{t('Global.IsActive')}</Checkbox>
          </Form.Item>

          <Form.Item name="is_approved" valuePropName="checked" className="checkbox">
            <Checkbox disabled={loggedInAsPartner}>{t('Global.IsApproved')}</Checkbox>
          </Form.Item>

          <Form.Item name="public_findable" valuePropName="checked" className="checkbox">
            <Checkbox>{t('Partner.Field.PublicFindable')}</Checkbox>
          </Form.Item>

          {/* NOTE: Hiding this field base on Hamed's Request */}
          {/* <Form.Item name="is_full_legals_responsible" valuePropName="checked" className="checkbox">
            <Checkbox>{t('Partner.Field.IsFullLegalsResponsible')}</Checkbox>
          </Form.Item> */}

          <Form.Item name="is_promotional_article_active" valuePropName="checked" className="checkbox">
            <Checkbox>{t('Partner.Field.IsPromotionalArticleActive')}</Checkbox>
          </Form.Item>

          <Form.Item name="has_info_service" valuePropName="checked" className="checkbox">
            <Checkbox>{t('Partner.Field.HasInfoService')}</Checkbox>
          </Form.Item>

          {!loggedInAsPartner && (
            <>
              <Form.Item name="active_auto_bonus" valuePropName="checked" className="checkbox">
                <Checkbox>{t('Partner.Field.ActiveAutoBonus')}</Checkbox>
              </Form.Item>
              <Form.Item name="active_training_bonus" valuePropName="checked" className="checkbox">
                <Checkbox>{t('Partner.Field.ActiveTrainingBonus')}</Checkbox>
              </Form.Item>
              <Form.Item name="receive_commission" valuePropName="checked" className="checkbox">
                <Checkbox>{t('Partner.Field.ReceiveCommission')}</Checkbox>
              </Form.Item>

              <Form.Item name="can_buy" valuePropName="checked" className="checkbox">
                <Checkbox>{t('Partner.Field.CanBuy')}</Checkbox>
              </Form.Item>
              <Form.Item name="receive_vat_responsible" valuePropName="checked" className="checkbox">
                <Checkbox>{t('Partner.Field.ReceiveVat')}</Checkbox>
              </Form.Item>

              <Form.Item name="send_vat_responsible" valuePropName="checked" className="checkbox">
                <Checkbox>{t('Partner.Field.SendVatResponsible')}</Checkbox>
              </Form.Item>
              <Form.Item name="over_personal_turnover" valuePropName="checked" className="checkbox">
                <Checkbox>{t('Partner.Field.OverPersonalTurnover')}</Checkbox>
              </Form.Item>
              <Form.Item name="can_see_down_line" valuePropName="checked" className="checkbox">
                <Checkbox>{t('Partner.Field.CanSeeDowLine')}</Checkbox>
              </Form.Item>
              <Form.Item name="inhouse_sale" valuePropName="checked" className="checkbox">
                <Checkbox>{t('Partner.Field.InHouseSale')}</Checkbox>
              </Form.Item>
              <Form.Item name="has_network" valuePropName="checked" className="checkbox">
                <Checkbox>{t('Global.HasNetwork')}</Checkbox>
              </Form.Item>
              <Form.Item name="has_btob" valuePropName="checked" className="checkbox">
                <Checkbox>{t('Global.HasBtob')}</Checkbox>
              </Form.Item>
              <Form.Item name="has_btoc" valuePropName="checked" className="checkbox">
                <Checkbox>{t('Partner.Field.HasBtoc')}</Checkbox>
              </Form.Item>
              <Form.Item name="post_delivery_factor" valuePropName="checked" className="checkbox">
                <Checkbox>{t('Partner.Field.PostDeliveryFactor')}</Checkbox>
              </Form.Item>
              <Form.Item name="has_warehouse" valuePropName="checked" className="checkbox">
                <Checkbox>{t('Partner.Field.HasWarehouse')}</Checkbox>
              </Form.Item>
              <Form.Item name="has_delivery" valuePropName="checked" className="checkbox">
                <Checkbox>{t('Partner.Field.HasDelivery')}</Checkbox>
              </Form.Item>
              <Form.Item name="receive_incentive_bonus" valuePropName="checked" className="checkbox">
                <Checkbox>{t('Partner.Field.ReceiveIncentiveBonus')}</Checkbox>
              </Form.Item>
            </>
          )}
        </PartnerStyle.FieldSet>
      </Row>
      <FormSubmit isPending={isPending} />
    </FormStyle.Container>
  );
}
