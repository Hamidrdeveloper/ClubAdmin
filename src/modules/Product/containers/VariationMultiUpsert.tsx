import { Loader } from '@src/shared/components';
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import VariationMultiProductForm from '../components/VariationMultiProductForm';
import { VariationMultiProduct, VariationMultiProductContext } from '../model/ProductVariation-args';
import { updateVariationMultiProduct } from '../services';

const VariationMultiUpsert: React.FC<
  GlobalUpsertProps<VariationMultiProduct> & { variationId: number; isFetching: boolean }
> = ({ isFetching, onCallback, singleData, variationId }) => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useMutation(({ values }: GlobalMutationProps<VariationMultiProductContext>) =>
    updateVariationMultiProduct(variationId, values),
  );

  const handleFormSubmit = (formValues: VariationMultiProduct) => {
    const { multiProductVariations } = formValues;
    const finalValues: Partial<VariationMultiProductContext> = {
      multi_product_variations: multiProductVariations.map((data) => ({
        id: data.variation.id,
        multi_variation_quantity: data.quantity,
      })),
    };

    mutate({ values: finalValues }, { onSuccess: onCallback });
  };

  return (
    <>
      {isFetching ? (
        <Loader title={t('Product.LoadingTabInfo', { Tab: t('Product.Tab.MultiVariation') })} />
      ) : (
        <VariationMultiProductForm
          initialValues={singleData}
          onSubmit={handleFormSubmit}
          isPending={isLoading}
        />
      )}
    </>
  );
};

export default VariationMultiUpsert;
