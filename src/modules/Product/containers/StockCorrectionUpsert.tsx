/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import i18n from '@src/core/i18n/config';
import { ApiBuilder } from '@src/shared/utils';
import React, { ReactElement } from 'react';
import { useMutation } from 'react-query';

import StockCorrectionTable from '../components/StockCorrectionTable';
import { StockCorrection, StockCorrectionFormCtx } from '../model/ProductStockCorrection';

interface MutationProps {
  id: number;
  values: StockCorrectionFormCtx;
}

const StockCorrectionUpsert = (): ReactElement => {
  const api = new ApiBuilder('inventories', i18n.t('Product.Stock.Correction.Title'));
  const { mutate, isLoading } = useMutation(({ id, values }: MutationProps) => {
    return api.updateOne(id, values);
  });

  const formSubmitHandler = ({ item, row }: { item: StockCorrection; row: { quantity: number } }) => {
    const { quantity } = row;
    const { id } = item;
    const values = {
      quantity,
    };
    mutate({ id, values });
  };

  return <StockCorrectionTable onSubmit={formSubmitHandler} isPending={isLoading} />;
};

export default StockCorrectionUpsert;
