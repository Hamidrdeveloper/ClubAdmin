import { GlobalUpsertProps } from '@src/shared/models';
import React, { ReactElement } from 'react';
import { useMutation } from 'react-query';

import ABillForm from '../components/ABillForm';
import { ABill, ABillCreationModel } from '../model/bill.entity';
import { createABills } from '../service/bills.service';

const CreateABill = ({ closeModal, onCallback }: GlobalUpsertProps<ABill>): ReactElement => {
  const { mutate, isLoading } = useMutation(createABills);

  const handleFormSubmit = (formValues: ABillCreationModel) => {
    const { from, to, execute_at, ...restValues } = formValues;

    const values: ABillCreationModel = {
      to: new Date(to).toISOString().split('T')[0],
      from: new Date(from).toISOString().split('T')[0],
      execute_at: execute_at ? new Date(execute_at).toISOString().split('T')[0] : undefined,
      ...restValues,
    };

    mutate(values, {
      onSuccess: (data) => {
        onCallback?.(data);
        closeModal?.();
      },
    });
  };

  return <ABillForm isPending={isLoading} onSubmit={handleFormSubmit} />;
};

export default CreateABill;
