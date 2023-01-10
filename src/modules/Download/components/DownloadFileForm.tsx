/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { DeleteOutlined } from '@ant-design/icons';
import CareerStepSelect from '@src/modules/Competition/containers/CareerStepSelect';
import { CareerStepModel } from '@src/modules/Competition/model/CareerStep.entity';
import { Country, CountrySelect } from '@src/modules/Country';
import { CustomerStepModel } from '@src/modules/CustomerStep';
import CustomerStepSelect from '@src/modules/CustomerStep/container/CustomerStepSelect';
import { Language, LanguageSelect } from '@src/modules/Language';
import { Loader, Upload } from '@src/shared/components';
import DeletePrompt from '@src/shared/components/DeletePrompt';
import FallbackSelect from '@src/shared/components/FallbackSelect/FallbackSelect';
import { FormProps } from '@src/shared/models';
import { Button, Checkbox, Col, Form, Input, Row } from 'antd';
import React, { ReactElement, Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import DownloadCategorySelect from '../container/DownloadCategorySelect';
import { DownloadFileModel } from '../model/DownloadFile.entity';
import CareerStepTable from './CareerStepTable';
import CountryTable from './CountryTable';
import CustomerStepTable from './CustomerStepTable';
import LanguageTable from './LanguageTable';
import Style from './style/Form.style';

export default function DownloadFileForm({
  onSubmit,
  onRemove,
  isPending,
  initialValues,
}: FormProps<DownloadFileModel> & { onRemove: () => void }): ReactElement {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [isShowCountryTable, setShowCountryTable] = useState<boolean>(false);
  const [isShowLanguageTable, setShowLanguageTable] = useState<boolean>(false);
  const [isShowCareerStepTable, setShowCareerStepTable] = useState<boolean>(false);
  const [isShowCustomerStepTable, setShowCustomerStepTable] = useState<boolean>(false);

  const [selectedCountry, setSelectedCountry] = useState<Country[] | null>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<Language[] | null>([]);
  const [selectedCareerStep, setSelectedCareerStep] = useState<CareerStepModel[] | null>([]);
  const [selectedCustomerStep, setSelectedCustomerStep] = useState<CustomerStepModel[] | null>([]);

  useEffect(() => {
    form.setFieldsValue({ countries: selectedCountry });
  }, [selectedCountry]);

  useEffect(() => {
    form.setFieldsValue({ languages: selectedLanguage });
  }, [selectedLanguage]);

  useEffect(() => {
    form.setFieldsValue({ careerSteps: selectedCareerStep });
  }, [selectedCareerStep]);

  useEffect(() => {
    form.setFieldsValue({ customerSteps: selectedCustomerStep });
  }, [selectedCustomerStep]);

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
      setSelectedCountry(initialValues?.countries);
      setSelectedLanguage(initialValues?.languages);
      setSelectedCareerStep(initialValues?.careerSteps);
      setSelectedCustomerStep(initialValues?.customerSteps);
    }
  }, [initialValues]);

  const memoizedCountryTable = React.useMemo(() => CountryTable(setSelectedCountry), []);
  const memoizedLanguageTable = React.useMemo(() => LanguageTable(setSelectedLanguage), []);
  const memoizedCareerStepTable = React.useMemo(() => CareerStepTable(setSelectedCareerStep), []);
  const memoizedCustomerStepTable = React.useMemo(() => CustomerStepTable(setSelectedCustomerStep), []);
  return (
    <Style.MainContainer radius={10}>
      <Form
        form={form}
        colon={false}
        labelAlign="left"
        layout={'vertical'}
        onFinish={onSubmit}
        name="download-file-form"
        labelCol={{ xs: { span: 8 } }}
        initialValues={{ translate: [{ locale: undefined, name: '' }] }}
      >
        <Suspense fallback={<Loader />}>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item name="name" label={t('Global.Name')} rules={[{ required: true }]}>
                <Input placeholder={t('Global.InputPlaceholder', { title: t('Download.Category.Slug') })} />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Suspense fallback={FallbackSelect(t('Download.File.Categories'))}>
                <Form.Item name={'downloadCategories'} label={t('Download.File.Categories')}>
                  <DownloadCategorySelect isMulti />
                </Form.Item>
              </Suspense>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item label={t('Global.File')} name={['file', 'root_file', 'path']} required requiredMark>
                <Upload form={form} idName="file_id" />
              </Form.Item>
              <Form.Item name="file_id" hidden>
                <></>
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              <Form.Item name="image_path" label={t('Download.File.PreviewImage')}>
                <Upload form={form} idName="image_id" />
              </Form.Item>
              <Form.Item hidden name="image_id">
                <></>
              </Form.Item>
            </Col>
          </Row>

          <Style.FieldSet>
            <legend>
              {
                <Form.Item name={'is_active'} valuePropName="checked" className="checkbox-legend">
                  <Checkbox>{t('Global.Available')}</Checkbox>
                </Form.Item>
              }
            </legend>

            <Row gutter={16}>
              <Col xs={6}>
                <Form.Item>
                  <Checkbox
                    onChange={(event) => {
                      setShowCountryTable(event.target.checked);
                      setShowLanguageTable(false);
                      setShowCareerStepTable(false);
                      setShowCustomerStepTable(false);
                    }}
                    checked={isShowCountryTable}
                  >
                    {t('Download.File.Country')}
                  </Checkbox>
                </Form.Item>
              </Col>
              <Col xs={6}>
                <Form.Item>
                  <Checkbox
                    onChange={(event) => {
                      setShowLanguageTable(event.target.checked);
                      setShowCountryTable(false);
                      setShowCareerStepTable(false);
                      setShowCustomerStepTable(false);
                    }}
                    checked={isShowLanguageTable}
                  >
                    {t('Download.File.Language')}
                  </Checkbox>
                </Form.Item>
              </Col>
              <Col xs={6}>
                <Form.Item>
                  <Checkbox
                    onChange={(event) => {
                      setShowCareerStepTable(event.target.checked);
                      setShowCountryTable(false);
                      setShowLanguageTable(false);
                      setShowCustomerStepTable(false);
                    }}
                    checked={isShowCareerStepTable}
                  >
                    {t('Download.File.CareerStep')}
                  </Checkbox>
                </Form.Item>
              </Col>
              <Col xs={6}>
                <Form.Item>
                  <Checkbox
                    onChange={(event) => {
                      setShowCustomerStepTable(event.target.checked);
                      setShowCountryTable(false);
                      setShowLanguageTable(false);
                      setShowCareerStepTable(false);
                    }}
                    checked={isShowCustomerStepTable}
                  >
                    {t('Download.File.CustomerStep')}
                  </Checkbox>
                </Form.Item>
              </Col>
            </Row>

            <Row
              gutter={16}
              style={{
                display:
                  isShowCountryTable &&
                  !isShowLanguageTable &&
                  !isShowCareerStepTable &&
                  !isShowCustomerStepTable
                    ? 'block'
                    : 'none',
              }}
            >
              <Col xs={24} md={24}>
                <Suspense fallback={FallbackSelect(t('Download.File.Country'))}>
                  <Form.Item name="countries" label={t('Download.File.Country')}>
                    <CountrySelect
                      onChange={(countries: Country[]) => setSelectedCountry(countries)}
                      isMulti
                    />
                  </Form.Item>
                </Suspense>
              </Col>
              <Col xs={24}>{memoizedCountryTable}</Col>
            </Row>

            <Row
              gutter={16}
              style={{
                display:
                  isShowLanguageTable &&
                  !isShowCountryTable &&
                  !isShowCareerStepTable &&
                  !isShowCustomerStepTable
                    ? 'block'
                    : 'none',
              }}
            >
              <Col xs={24} md={24}>
                <Suspense fallback={FallbackSelect(t('Download.File.Language'))}>
                  <Form.Item name="languages" label={t('Download.File.Language')}>
                    <LanguageSelect
                      onChange={(languages: Language[]) => setSelectedLanguage(languages)}
                      isMulti
                    />
                  </Form.Item>
                </Suspense>
              </Col>
              <Col xs={24}>{memoizedLanguageTable}</Col>
            </Row>

            <Row
              gutter={16}
              style={{
                display:
                  isShowCareerStepTable &&
                  !isShowCountryTable &&
                  !isShowLanguageTable &&
                  !isShowCustomerStepTable
                    ? 'block'
                    : 'none',
              }}
            >
              <Col xs={24} md={24}>
                <Suspense fallback={FallbackSelect(t('Download.File.CareerStep'))}>
                  <Form.Item name="careerSteps" label={t('Download.File.CareerStep')}>
                    <CareerStepSelect
                      onChange={(careerSteps: CareerStepModel[]) => setSelectedCareerStep(careerSteps)}
                      isMulti
                    />
                  </Form.Item>
                </Suspense>
              </Col>
              <Col xs={24}>{memoizedCareerStepTable}</Col>
            </Row>

            <Row
              gutter={16}
              style={{
                display:
                  isShowCustomerStepTable &&
                  !isShowCountryTable &&
                  !isShowLanguageTable &&
                  !isShowCareerStepTable
                    ? 'block'
                    : 'none',
              }}
            >
              <Col xs={24} md={24}>
                <Suspense fallback={FallbackSelect(t('Download.File.CustomerStep'))}>
                  <Form.Item name="customerSteps" label={t('Download.File.CustomerStep')}>
                    <CustomerStepSelect
                      onChange={(customerSteps: CustomerStepModel[]) =>
                        setSelectedCustomerStep(customerSteps)
                      }
                      isMulti
                    />
                  </Form.Item>
                </Suspense>
              </Col>
              <Col xs={24}>{memoizedCustomerStepTable}</Col>
            </Row>
          </Style.FieldSet>

          <Row justify="end" gutter={[16, 16]}>
            <Col>
              <Button style={{ minWidth: 180 }} type="primary" htmlType="submit" loading={isPending}>
                {t('Global.Submit')}
              </Button>
            </Col>

            <Col>
              <DeletePrompt onConfirm={onRemove}>
                <Button ghost danger type="primary" icon={<DeleteOutlined />} />
              </DeletePrompt>
            </Col>
          </Row>
        </Suspense>
      </Form>
    </Style.MainContainer>
  );
}
