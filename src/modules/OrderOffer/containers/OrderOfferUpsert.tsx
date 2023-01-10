/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React from 'react';
import { useMutation } from 'react-query';

import OrderOfferForm from '../components/OrderOfferForm';
import { OrderOffer } from '../model/orderOffer.entity';
import OrderOfferModule from '../OrderOffer.module';

const OrderOfferUpsert: React.FC<GlobalUpsertProps<OrderOffer>> = ({ onCallback, singleData }) => {
  const module = new OrderOfferModule();
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<OrderOffer>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<OrderOffer>) => {
    const values: Partial<OrderOffer> = { ...formValues };
    mutate({ id: singleData ? singleData.id : undefined, values }, { onSuccess: onCallback });
  };

  return <OrderOfferForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default OrderOfferUpsert;
