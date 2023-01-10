/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React, { FC, useMemo } from 'react';
import { useMutation } from 'react-query';

import SubdomainForm from '../components/Subdomain.form';
import { Subdomain, SubdomainContext } from '../model/Subdomain.entity';
import SubdomainModule from '../Subdomain.module';
import SubdomainTabs from './Subdomain.tabs';

const SubdomainUpsert: FC<GlobalUpsertProps<Subdomain>> = ({ onCallback, closeModal, singleData }) => {
  const module = new SubdomainModule();

  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<Subdomain>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<Subdomain>) => {
    const { partner, paymentMethods, ...restFormValues } = formValues;

    const values: Partial<SubdomainContext> = {
      ...restFormValues,
      partner_id: partner?.id,
      payment_method_ids: paymentMethods?.map((paymentMethod) => paymentMethod.id) ?? null,
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

  const isSubdomainUpdate = useMemo(() => {
    return singleData ? Object.keys(singleData).length > 0 : false;
  }, [singleData]);

  if (isSubdomainUpdate) {
    return (
      <SubdomainTabs
        formProps={{ isPending: isLoading, onSubmit: handleFormSubmit, initialValues: singleData }}
        subdomainId={singleData!.id}
        partnerId={singleData!.partner_id}
      />
    );
  } else {
    return <SubdomainForm onSubmit={handleFormSubmit} isPending={isLoading} />;
  }
};

export default SubdomainUpsert;
