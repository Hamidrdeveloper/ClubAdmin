import AvailabilityRadio from '@src/modules/Availability/containers/AvailabilityRadio';
import { CountrySelect } from '@src/modules/Country';
import { PartnerSelect } from '@src/modules/Partner';
import ReferrerSelect from '@src/modules/Referrer/containers/ReferrerSelect';
import AsyncSubdomainSelect from '@src/modules/Subdomain/containers/AsyncSubdomainSelect';
import { FormSubmit, Loader } from '@src/shared/components';
import FallbackSelect from '@src/shared/components/FallbackSelect/FallbackSelect';
import { FormProps } from '@src/shared/models';
import { Alert, Checkbox, Col, Form, Input, Row, Select } from 'antd';
import React, { ReactElement, Suspense, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import StockSelect from '../containers/StockSelect';
import { Stock } from '../model';
import FormStyle from './styles/Form.style';

const SettingForm = ({ onSubmit, initialValues, isPending }: FormProps<Stock>): ReactElement => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!initialValues) return;

    const fax = initialValues.contactGroup?.phones
      ?.filter((el) => el.type === 'fax')
      .map((el) => el.number)[0];

    const telephone = initialValues.contactGroup?.phones
      ?.filter((el) => el.type === 'phone')
      .map((el) => el.number)[0];

    const email = initialValues.contactGroup?.emails?.[0]?.email;

    form.setFieldsValue(Object.assign(initialValues, { fax, telephone, email }));
  }, [initialValues]);

  return (
    <FormStyle.Container
      form={form}
      layout="horizontal"
      colon={false}
      colspace={8}
      labelAlign="left"
      onFinish={onSubmit}
      name="stock-setting-form"
      labelCol={{ xs: { span: 8 } }}
      wrapperCol={{ xs: { span: 16 } }}
    >
      <Suspense fallback={<Loader />}>
        <Row justify="space-around">
          <Col xs={24} lg={12} className="leftCol">
            <Row>
              <Col span={'24'} className="box-container">
                {initialValues?.id && (
                  <Alert message={`${t('Stock.Setting.WarehouseId')} : ${initialValues?.id} `} type="info" />
                )}
                <h1 className="header-margin">{t('Stock.Setting.BasicSetting')}</h1>
                <Form.Item label={t('Stock.Setting.WarehouseName')} name="name" rules={[{ required: true }]}>
                  <Input
                    placeholder={t('Global.SelectPlaceholder', { title: t('Stock.Setting.WarehouseName') })}
                  />
                </Form.Item>
                <Form.Item label={t('Stock.Setting.WarehouseType')} name="type" rules={[{ required: true }]}>
                  <Select
                    placeholder={t('Global.SelectPlaceholder', { title: t('Stock.Setting.WarehouseType') })}
                    options={[
                      { label: t('Stock.Setting.Sales'), value: 'Sales' },
                      { label: t('Stock.Setting.Repair'), value: 'Repair' },
                      { label: t('Stock.Setting.Storage'), value: 'Storage' },
                      { label: t('Stock.Setting.Transit'), value: 'Transit' },
                      { label: t('Stock.Setting.Distribution'), value: 'Distribution' },
                      { label: t('Stock.Setting.Others'), value: 'Others' },
                    ]}
                  />
                </Form.Item>
                <Form.Item label={t('Stock.Setting.LogisticType')} name="logistic_type">
                  <Select
                    placeholder={t('Global.SelectPlaceholder', { title: t('Stock.Setting.LogisticType') })}
                    options={[
                      {
                        label: t('Global.None'),
                        value: 'None',
                      },
                      {
                        label: t('Stock.Setting.DHLFulfillment'),
                        value: 'DHL fulfillment',
                      },
                      {
                        label: t('Stock.Setting.Amazon'),
                        value: 'Amazon',
                      },
                    ]}
                  />
                </Form.Item>

                <Form.Item label={t('Stock.Setting.WarehouseAssignedForRepairs')} name="warehouseRepair">
                  <StockSelect isClearable />
                </Form.Item>

                <Form.Item label={t('Stock.Setting.Partner')} name="partner">
                  <PartnerSelect />
                </Form.Item>

                <Suspense fallback={FallbackSelect(t('Stock.Setting.Subdomain'))}>
                  <Form.Item label={t('Stock.Setting.Subdomain')} name={'subdomains'}>
                    <AsyncSubdomainSelect isClearable isMulti />
                  </Form.Item>
                </Suspense>

                <Suspense fallback={FallbackSelect(t('Stock.Setting.Referrer'))}>
                  <Form.Item label={t('Stock.Setting.Referrer')} name={'referrers'}>
                    <ReferrerSelect isMulti />
                  </Form.Item>
                </Suspense>

                <Form.Item label={t('Stock.Setting.Priority')} name="priority">
                  <Select
                    placeholder={t('Global.SelectPlaceholder', { title: t('Stock.Setting.Priority') })}
                    options={[
                      { label: t('Stock.Setting.VeryLow'), value: 'Very Low' },
                      {
                        label: t('Stock.Setting.Low'),
                        value: 'Low',
                      },
                      {
                        label: t('Stock.Setting.Medium'),
                        value: 'Medium',
                      },
                      {
                        label: t('Stock.Setting.High'),
                        value: 'High',
                      },
                      {
                        label: t('Stock.Setting.VeryHigh'),
                        value: 'Very High',
                      },
                    ]}
                  />
                </Form.Item>
                <Form.Item name="freight_logistic" valuePropName="checked">
                  <Checkbox>{t('Stock.Setting.FreightLogistic')}</Checkbox>
                </Form.Item>

                <Form.Item label={t('Stock.Strategy')} name="strategy">
                  <Select
                    placeholder={t('Global.SelectPlaceholder', { title: t('Stock.Strategy') })}
                    options={[
                      {
                        label: t('Stock.Setting.FirstInFirstOut'),
                        value: 'First-In, First-Out',
                      },
                      {
                        label: t('Stock.Setting.LastInFirstOut'),
                        value: 'Last-In, First-Out',
                      },
                      {
                        label: t('Stock.Setting.FirstExpiredFirstOut'),
                        value: 'First-Expired, First-Out',
                      },
                    ]}
                  />
                </Form.Item>

                <Form.Item label={t('Stock.Conditions')} name="conditions" rules={[{ required: true }]}>
                  <Select
                    placeholder={t('Global.SelectPlaceholder', { title: t('Stock.Conditions') })}
                    options={[
                      { label: t('Stock.Setting.Normal'), value: 'normal' },
                      { label: t('Stock.Setting.Custom'), value: 'custom' },
                      { label: t('Stock.Setting.Incendiary'), value: 'incendiary' },
                      { label: t('Stock.Setting.Virtual'), value: 'virtual' },
                      { label: t('Stock.Setting.Refrigerator'), value: 'refrigerator' },
                    ]}
                  />
                </Form.Item>

                <Form.Item
                  name="countries"
                  rules={[{ required: true }]}
                  label={t('Stock.Setting.CountriesServe')}
                  tooltip={t('Stock.Setting.SelectCountriesThisWarehouseCanSendProductsTo')}
                >
                  <CountrySelect isMulti />
                </Form.Item>
              </Col>

              <Col span={'24'} className="box-container">
                <h1>{t('Stock.Setting.Availability')}</h1>
                <Form.Item
                  name="exists_product_availability_id"
                  label={t('Stock.Setting.ExistProductAvailability')}
                  rules={[{ required: true }]}
                >
                  <AvailabilityRadio />
                </Form.Item>
                <Form.Item
                  name="not_exists_product_availability_id"
                  label={t('Stock.Setting.NotExistProductAvailability')}
                  rules={[{ required: true }]}
                >
                  <AvailabilityRadio />
                </Form.Item>
                <Form.Item label={t('Stock.Setting.Note')} name="description">
                  <Input
                    size="large"
                    placeholder={t('Global.InputPlaceholder', { title: t('Stock.Setting.Note') })}
                  />
                </Form.Item>
                <Form.Item name="inventory_mode" valuePropName="checked">
                  <Checkbox>{t('Stock.Setting.InventoryMode')}</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Col>

          <Col xs={24} lg={11} className="rightCol">
            <Row>
              <Col span={24} className="box-container">
                <h1>{t('Stock.Setting.LocationInfo')}</h1>
                <Suspense fallback={<Select loading disabled></Select>}>
                  <Form.Item
                    rules={[{ required: true }]}
                    label={t('Stock.Setting.Location')}
                    name={['contactGroup', 'country']}
                  >
                    <CountrySelect />
                  </Form.Item>
                </Suspense>

                <Form.Item
                  rules={[{ required: true }]}
                  label={t('Stock.Setting.Street')}
                  name={['contactGroup', 'address', 'address2']}
                >
                  <Input placeholder={t('Global.InputPlaceholder', { title: t('Stock.Setting.Street') })} />
                </Form.Item>

                <Form.Item
                  label={t('Stock.Setting.HouseNumber')}
                  name={['contactGroup', 'address', 'house_number']}
                  rules={[{ required: true }]}
                >
                  <Input
                    placeholder={t('Global.InputPlaceholder', { title: t('Stock.Setting.HouseNumber') })}
                  />
                </Form.Item>

                <Form.Item
                  label={t('Stock.Setting.PostCode')}
                  name={['contactGroup', 'address', 'postal_code']}
                  rules={[{ required: true }]}
                >
                  <Input placeholder={t('Global.InputPlaceholder', { title: t('Stock.Setting.PostCode') })} />
                </Form.Item>

                <Form.Item
                  label={t('Stock.Setting.Town')}
                  name={['contactGroup', 'address', 'city']}
                  rules={[{ required: true }]}
                >
                  <Input placeholder={t('Global.InputPlaceholder', { title: t('Stock.Setting.Town') })} />
                </Form.Item>

                <Form.Item label={t('Stock.Setting.Telephone')} name="telephone" rules={[{ required: true }]}>
                  <Input
                    placeholder={t('Global.InputPlaceholder', { title: t('Stock.Setting.Telephone') })}
                  />
                </Form.Item>

                <Form.Item label={t('Stock.Setting.Fax')} name="fax">
                  <Input placeholder={t('Global.InputPlaceholder', { title: t('Stock.Setting.Fax') })} />
                </Form.Item>

                <Form.Item label={t('Stock.Setting.Email')} name="email" rules={[{ required: true }]}>
                  <Input
                    allowClear
                    placeholder={t('Global.InputPlaceholder', { title: t('Stock.Setting.Email') })}
                  />
                </Form.Item>

                <Form.Item name="has_dynamic_reorder" valuePropName="checked">
                  <Checkbox>{t('Stock.Setting.DynamicReorderLevel')}</Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>

        <FormSubmit title={initialValues?.id ? t('Global.Save') : t('Global.Create')} isPending={isPending} />
      </Suspense>
    </FormStyle.Container>
  );
};

export default SettingForm;
