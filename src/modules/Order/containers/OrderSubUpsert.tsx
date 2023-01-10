/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { AuthContext } from '@src/core';
import { Loader } from '@src/shared/components';
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { message } from 'antd';
import React, { useContext, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import OrderForm from '../components/OrderForm';
import { SubscriptionSalePure } from '../model/sub.entity';
import SubscriptionModule from '../Subscription.module';

const OrderUpsert: React.FC<GlobalUpsertProps<SubscriptionSalePure>> = ({ onCallback, singleData }) => {
  const module = new SubscriptionModule();
  const navigate = useNavigate();

  const { profile } = useContext(AuthContext);

  const isOrderReadOnly = !!profile.roles.find((role) => role.slug === 'partner');

  useEffect(() => {
    if (isOrderReadOnly) {
      const result = confirm('Are you certain for adding a new order subscription?');
      if (result) createNewOrderPOST(profile);
    }
  }, [isOrderReadOnly]);

  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<SubscriptionSalePure>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<SubscriptionSalePure>) => {
    createNewOrderPOST(formValues.user);
  };

  function createNewOrderPOST(user?: { id: number; invoice_contact_group_id: number }) {
    if (!user?.invoice_contact_group_id) {
      message.error("Your User doesn't have any contact group!");
    }

    mutate(
      {
        values: {
          user_id: user?.id ?? undefined,
          invoice_contact_group_id: user?.invoice_contact_group_id ?? undefined,
        },
      },
      {
        onSuccess: (data) => {
          onCallback?.(data);
          navigate('/admin/orders/subscription/' + data?.id ?? -1);
        },
        onError: onCallback,
      },
    );
  }

  return isOrderReadOnly ? (
    <Loader title={'Creating New Order Subscription...'} />
  ) : (
    <OrderForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />
  );
};
export default OrderUpsert;
