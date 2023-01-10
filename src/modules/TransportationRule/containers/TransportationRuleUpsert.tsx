// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React from 'react';
import { useMutation } from 'react-query';

import TransportationRuleForm from '../components/TransportationRuleForm';
import { TransportationRule } from '../model/transportationrule.entity';
import TransportationRuleModule from '../TransportationRule.module';

const TransportationRuleUpsert: React.FC<GlobalUpsertProps<TransportationRule>> = ({
  onCallback,
  closeModal,
  singleData,
}) => {
  const module = new TransportationRuleModule();
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<TransportationRule>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<TransportationRule>) => {
    const { country, ...formData } = formValues;
    const values: Partial<TransportationRule> = {
      country_id: country!.id,
      ...formData,
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

  return (
    <TransportationRuleForm initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />
  );
};

export default TransportationRuleUpsert;
