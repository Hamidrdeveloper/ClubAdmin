import { Loader } from '@src/shared/components';
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React, { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import VariationPricesForm from '../components/VariationPricesForm';
import {
  VariationPriceContext,
  VariationPrices,
  VariationPricesContext,
  VariationUserPriceContext,
} from '../model/ProductVariation-args';
import { ProductVariation } from '../model/ProductVariation.entity';
import { updateVariationPrices } from '../services';

interface Props extends GlobalUpsertProps<VariationPrices> {
  variationId: number;
  isFetching: boolean;
  variation: ProductVariation;
}
const VariationPricesUpsert: React.FC<Props> = ({
  variation,
  onCallback,
  singleData,
  variationId,
  isFetching,
}) => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useMutation(({ values }: GlobalMutationProps<VariationPricesContext>) =>
    updateVariationPrices(variationId, values),
  );

  const handleFormSubmit = (formValues: VariationPrices) => {
    const { productVariationPrices, userVariationPrices } = formValues;

    const variationPrices: Partial<VariationPriceContext[]> = productVariationPrices?.map(
      ({ price, minimum_quantity, ...rest }) => ({
        ...rest,
        minimum_quantity,
        price_id: price.id,
        prices: {
          id: price.id,
          display_for_new_item: true,
          unit_price: price.unit_price,
          price_type_id: price.priceType.id,
          currency_id: price.currency.id,
          min_quantity: minimum_quantity,
          country_ids: [price.countries.id],
        },
      }),
    );

    const userPrices: Partial<VariationUserPriceContext[]> = userVariationPrices?.map(
      ({ price, user, minimum_quantity, ...rest }) => ({
        ...rest,
        minimum_quantity,
        user_id: user.id,
        price_id: price.id,
        prices: {
          id: price.id,
          display_for_new_item: true,
          unit_price: price.unit_price,
          price_type_id: price.priceType.id,
          currency_id: price.currency.id,
          min_quantity: minimum_quantity,
          country_ids: [price.countries.id],
        },
      }),
    );

    const finalValues: Partial<VariationPricesContext> = {
      userVariationPrices: userPrices,
      productVariationPrices: variationPrices,
    };

    mutate({ values: finalValues }, { onSuccess: onCallback });
  };
  return (
    <>
      {isFetching ? (
        <Loader title={t('Product.LoadingTabInfo', { Tab: t('Product.Tab.Prices') })} />
      ) : (
        <Suspense fallback={<Loader />}>
          <VariationPricesForm
            variation={variation}
            isPending={isLoading}
            initialValues={singleData}
            onSubmit={handleFormSubmit}
          />
        </Suspense>
      )}
    </>
  );
};

export default VariationPricesUpsert;
