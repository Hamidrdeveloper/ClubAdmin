import { Loader } from '@src/shared/components';
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import VariationPackageForm from '../components/VariationPackageForm';
import { VariationPackage, VariationPackageContext } from '../model/ProductVariation-args';
import { updateVariationPackages } from '../services';

const VariationPackageUpsert: React.FC<
  GlobalUpsertProps<VariationPackage> & { variationId: number; isFetching: boolean }
> = ({ isFetching, onCallback, singleData, variationId }) => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useMutation(({ values }: GlobalMutationProps<VariationPackageContext>) =>
    updateVariationPackages(variationId, values),
  );

  const handleFormSubmit = (formValues: VariationPackage) => {
    const { packages } = formValues;
    const finalValues: Partial<VariationPackageContext> = {
      packages: packages.map(({ quantity, ...rest }) => ({ package_id: rest['package']['id'], quantity })),
    };

    mutate({ values: finalValues }, { onSuccess: onCallback });
  };

  return (
    <>
      {isFetching ? (
        <Loader title={t('Product.LoadingTabInfo', { Tab: t('Product.Tab.Packages') })} />
      ) : (
        <VariationPackageForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />
      )}
    </>
  );
};

export default VariationPackageUpsert;
