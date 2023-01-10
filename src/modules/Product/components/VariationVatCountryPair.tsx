/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { Country, CountrySelect } from '@src/modules/Country';
import { Col, Form, FormInstance, FormItemProps, Select } from 'antd';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const VariationVatCountryPair: React.FC<{
  form: FormInstance;
  countryProps: FormItemProps;
  vatProps: FormItemProps;
  selectedCountryIDs: number[] | undefined;
  setSelectedCountryIDs: Dispatch<SetStateAction<number[]>>;
}> = ({ form, vatProps, countryProps, selectedCountryIDs, setSelectedCountryIDs }) => {
  const { t } = useTranslation();
  const [country, setCountry] = useState<Country>();

  useEffect(() => {
    if (form.getFieldValue('productVariationVats')) {
      const vats = form.getFieldValue('productVariationVats');

      const index = countryProps?.fieldKey?.[0] || 0;
      if (vats && vats[index]?.country) {
        setCountry(vats[index]?.country);
      }
    }
  }, []);

  // TODO: REF -> useCallback
  const removeSelectedCountries = (country: Country) => {
    return !selectedCountryIDs?.includes(country.id);
  };

  const handleCountryChange = (country: Country) => {
    setCountry(country);
    const variationVats = form.getFieldValue('productVariationVats');

    // when selecting/deselecting update the options - fix: when removing it won't bring back options
    const selectedCountryList = variationVats.map((variationVat) => variationVat?.country?.id);
    setSelectedCountryIDs(selectedCountryList);

    // when selecting country => clear the vat select
    const changedRowIndex = vatProps.name?.[0];
    variationVats[changedRowIndex].id = undefined;

    form.setFieldsValue({ productVariationVats: variationVats });

    return country;
  };

  return (
    <>
      <Col flex={1}>
        <Form.Item {...countryProps} rules={[{ required: true }]} label={t('Country.Title')}>
          <CountrySelect maxHeight={200} onChange={handleCountryChange} filterFn={removeSelectedCountries} />
        </Form.Item>
      </Col>

      <Col flex={1}>
        <Form.Item {...vatProps} rules={[{ required: true }]} label={t('Country.Field.Vat')}>
          <Select showSearch placeholder={t('Global.SelectPlaceholder', { title: t('Country.Field.Vat') })}>
            {country?.vats.map((vat) => (
              <Select.Option key={vat.id} value={vat.id || 0}>
                {vat.number} - {vat.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    </>
  );
};

export default VariationVatCountryPair;
