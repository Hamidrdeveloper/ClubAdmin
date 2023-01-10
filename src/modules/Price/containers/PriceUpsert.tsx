/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { normalizeTranslate } from '@src/shared/utils';
import React from 'react';
import { useMutation } from 'react-query';

import PriceForm from '../components/PriceForm';
import { PriceFormContext } from '../model';
import { Price } from '../model/price.entity';
import PriceModule from '../Price.module';

const PriceUpsert: React.FC<GlobalUpsertProps<Price>> = ({ onCallback, closeModal, singleData }) => {
  const module = new PriceModule();
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<Price>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<Price>) => {
    const { countries, currency, priceType, translate, ...restValues } = formValues;

    const values: Partial<PriceFormContext> = {
      ...restValues,
      currency_id: currency?.id,
      price_type_id: priceType?.id,
      translate: normalizeTranslate(translate),
      country_ids: countries?.map((country) => country.id),
    };

    mutate(
      { id: singleData ? singleData.id : undefined, values },
      {
        onSuccess: (data) => {
          onCallback?.(data);
          closeModal?.();
        },
      },
    );
  };

  return <PriceForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default PriceUpsert;
