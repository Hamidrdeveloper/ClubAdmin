// @ts-nocheck
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import React, { ReactElement } from 'react';
import { useMutation } from 'react-query';

import BankDetailsForm from '../components/BankDetailsForm';
import Fallback from '../components/Fallback';
import { BankDetailFormCtx, BankDetailPure } from '../model/bankDetails';
import { BankDetailsModule } from '../User.module';

interface Props extends GlobalUpsertProps<BankDetailPure> {
  userId: number | string | undefined;
}
const BankDetailsUpsert = ({ singleData, userId: id }: Props): ReactElement => {
  if (!id) return <Fallback />;

  const module = new BankDetailsModule();

  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<BankDetailFormCtx>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleSubmit = (formValues: BankDetailPure) => {
    const values: BankDetailFormCtx = { ...formValues, user_id: +id };

    mutate({ id: singleData?.id, values });
  };

  return <BankDetailsForm isPending={isLoading} onSubmit={handleSubmit} initialValues={singleData} />;
};

export default BankDetailsUpsert;
