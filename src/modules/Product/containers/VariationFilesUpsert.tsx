import { Loader } from '@src/shared/components';
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import VariationFilesForm from '../components/VariationFilesForm';
import { VariationFiles } from '../model/ProductVariation-args';
import { updateVariationFiles } from '../services';

const VariationFilesUpsert: React.FC<
  GlobalUpsertProps<VariationFiles> & { variationId: number; isFetching: boolean }
> = ({ isFetching, onCallback, singleData, variationId }) => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useMutation(({ values }: GlobalMutationProps<VariationFiles>) =>
    updateVariationFiles(variationId, values),
  );

  const handleFormSubmit = (formValues: VariationFiles) => {
    mutate({ values: formValues }, { onSuccess: onCallback });
  };

  return (
    <>
      {isFetching ? (
        <Loader title={t('Product.LoadingTabInfo', { Tab: t('Product.Tab.Files') })} />
      ) : (
        <VariationFilesForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />
      )}
    </>
  );
};

export default VariationFilesUpsert;
