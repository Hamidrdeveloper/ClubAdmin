import { Country } from '@src/modules/Country';
import { FormSubmit } from '@src/shared/components';
import { FormProps } from '@src/shared/models';
import { Form, Typography, message } from 'antd';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { VariationPrices } from '../model/ProductVariation-args';
import { ProductVariation } from '../model/ProductVariation.entity';
import FormStyles from './styles/Form.style';
import VariationPriceForm from './VariationPriceForm';
import VariationUserPriceForm from './VariationUserPriceForm';

interface Props extends FormProps<VariationPrices> {
  variation: ProductVariation;
}
const VariationPricesForm: React.FC<Props> = ({ onSubmit, isPending, variation, initialValues }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();

  // NOTE: this whole calculation gross and NET Thing is handled locally,
  // FORMULA:
  // NET * VAT = GROSS
  const calculateGross = (name: number, _country?: Country, _NETValue?: number): number | void => {
    const NETValue = form.getFieldValue(['productVariationPrices', name, 'value']) ?? _NETValue;
    const country: Country =
      form.getFieldValue(['productVariationPrices', name, 'price', 'countries']) ?? _country;

    const VATExists = variation.vats
      .map((vat) => ({ value: vat.value, countryId: vat.country.id }))
      .filter((vatCountry) => vatCountry.countryId === country.id);

    if (VATExists.length > 0) {
      const selectedCountryVat = VATExists[0].value / 100;

      const prevValues: VariationPrices = form.getFieldsValue() ?? initialValues;

      const { productVariationPrices, ...restValues } = prevValues;

      const gross = selectedCountryVat * NETValue + NETValue;

      // When using initial value productVariationPrices is undefined therefore it will throw an error when you want to assign it.
      try {
        productVariationPrices[name].gross = gross;
        form.setFieldsValue({ productVariationPrices, ...restValues });
      } catch (e) {
        // DO NOTHING
      }

      // when we want to use the calculated gross value
      return gross;
    } else {
      message.error(t('Product.Variation.Prices.SetCountryVat', { countryName: country.name }));
    }
  };

  const calculateNET = (name: number) => {
    const grossValue = form.getFieldValue(['productVariationPrices', name, 'gross']);
    const country = form.getFieldValue(['productVariationPrices', name, 'price', 'countries']);

    const VATExists = variation.vats
      .map((vat) => ({ value: vat.value, countryId: vat.country.id }))
      .filter((vatCountry) => vatCountry.countryId === country.id);

    if (VATExists.length > 0) {
      const selectedCountryVat = VATExists[0].value / 100;

      const prevValues: VariationPrices = form.getFieldsValue();
      const { productVariationPrices, ...restValues } = prevValues;
      productVariationPrices[name].value = grossValue / (selectedCountryVat + 1);

      form.setFieldsValue({ productVariationPrices, ...restValues });
    } else {
      message.error(t('Product.Variation.Prices.SetVatForProductVariation'));
    }
  };

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        productVariationPrices: initialValues.productVariationPrices.map(
          // Countries are multiple in backend, and singular in frontend
          ({ available_from, value, price: { countries, ...restOfPrice }, ...rest }, id) => ({
            ...rest,
            value: value,
            gross: calculateGross(id, countries[0], value),
            available_from: available_from ? moment(available_from) : null,
            price: {
              countries: countries[0],
              ...restOfPrice,
            },
          }),
        ),
        userVariationPrices: initialValues.userVariationPrices.map(
          ({ available_from, price: { countries, ...restOfPrice }, ...rest }) => ({
            ...rest,
            price: {
              countries: countries[0],
              ...restOfPrice,
            },
            available_from: available_from ? moment(available_from) : null,
          }),
        ),
      });
    }
  }, [initialValues]);

  return (
    <div>
      <FormStyles.FormContainer
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        name="variation-prices-form"
      >
        <Typography.Title style={{ marginTop: 16 }} level={3}>
          {t('Product.Variation.Prices.VariationPrices')}
        </Typography.Title>
        <VariationPriceForm grossCalcFunc={calculateGross} NETCalcFunc={calculateNET} />

        <Typography.Title style={{ marginTop: 24 }} level={3}>
          {t('Product.Variation.Prices.VariationUserPrices')}
        </Typography.Title>
        <VariationUserPriceForm />

        <FormSubmit isPending={isPending} />
      </FormStyles.FormContainer>
    </div>
  );
};

export default VariationPricesForm;
