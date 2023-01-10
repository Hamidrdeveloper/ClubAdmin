import { Loader } from '@src/shared/components';
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import VariationTextsForm from '../components/VariationTextsForm';
import { VariationTranslate } from '../model/ProductVariation-args';
import { updateVariationText } from '../services';

const VariationTextUpsert: React.FC<
  GlobalUpsertProps<VariationTranslate> & { variationId: number; isFetching: boolean }
> = ({ onCallback, singleData, isFetching, variationId }) => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useMutation(({ values }: GlobalMutationProps<VariationTranslate>) =>
    updateVariationText(variationId, values),
  );

  const handleFormSubmit = (values: Partial<VariationTranslate>) => {
    mutate({ values }, { onSuccess: onCallback });
  };
  return (
    <>
      {isFetching ? (
        <Loader title={t('Product.LoadingTabInfo', { Tab: t('Product.Tab.Texts') })} />
      ) : (
        <VariationTextsForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />
      )}
    </>
  );
};

export default VariationTextUpsert;
