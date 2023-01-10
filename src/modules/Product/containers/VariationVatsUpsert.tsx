import { Loader } from '@src/shared/components';
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import VariationVatForm from '../components/VariationVatsForm';
import { VariationVats, VariationVatsContext } from '../model/ProductVariation-args';
import { updateVariationVats } from '../services';

const VariationVatsUpsert: React.FC<
  GlobalUpsertProps<VariationVats> & { variationId: number; isFetching: boolean }
> = ({ onCallback, singleData, variationId, isFetching }) => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useMutation(({ values }: GlobalMutationProps<VariationVatsContext>) =>
    updateVariationVats(variationId, values),
  );

  const handleFormSubmit = (formValues: VariationVats) => {
    const { productVariationVats } = formValues;
    const finalValues: Partial<VariationVatsContext> = {
      productVariationVats: productVariationVats.map(({ id }) => ({ vat_id: id })),
    };

    mutate({ values: finalValues }, { onSuccess: onCallback });
  };

  return (
    <>
      {isFetching ? (
        <Loader title={t('Product.LoadingTabInfo', { Tab: t('Product.Tab.CountryVats') })} />
      ) : (
        <VariationVatForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />
      )}
    </>
  );
};

export default VariationVatsUpsert;
