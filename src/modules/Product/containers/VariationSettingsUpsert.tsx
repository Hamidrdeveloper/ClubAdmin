import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React from 'react';
import { useMutation } from 'react-query';

import VariationSettingsForm from '../components/VariationSettingsForm';
import { Product } from '../model/Product.entity';
import { VariationSettings, VariationSettingsContext } from '../model/ProductVariation-args';
import { createVariation, updateVariation } from '../services';

const VariationSettingsUpsert: React.FC<
  GlobalUpsertProps<VariationSettings> & {
    product: Product;
    isMulti: boolean;
    productId: number;
    variationId?: number | null;
  }
> = ({ onCallback, singleData, product, productId, variationId, isMulti }) => {
  const { mutate, isLoading } = useMutation(({ values }: GlobalMutationProps<VariationSettingsContext>) => {
    return variationId ? updateVariation(variationId, values) : createVariation(values);
  });

  const handleFormSubmit = (formValues: Partial<VariationSettings>) => {
    const {
      unit,
      barcodes,
      customTariff,
      shippingProfiles,
      productCategories,
      crossSellingVariations,
      ...rest
    } = formValues;

    const finalValues: Partial<VariationSettingsContext> = {
      ...rest,
      unit_id: unit?.id,
      product_id: productId,
      custom_tariff_id: customTariff?.id,
      type: isMulti ? 'multi' : 'single',
      barcodeIds: barcodes?.map((barcode) => barcode.id),
      product_category_ids: productCategories?.map((pCat) => pCat.id),
      shippingProfileIds: shippingProfiles?.map((shipping) => shipping.id),
      crossSellingVariations: crossSellingVariations?.map((product) => product.id),
    };

    mutate({ values: finalValues }, { onSuccess: onCallback });
  };
  return (
    <VariationSettingsForm
      initialValues={singleData}
      product={product}
      onSubmit={handleFormSubmit}
      isPending={isLoading}
    />
  );
};

export default VariationSettingsUpsert;
