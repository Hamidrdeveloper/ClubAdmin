/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheckimport i18n from '@src/core/i18n/config';
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { GlobalMutationProps, GlobalUpsertProps } from '@src/shared/models';
import { normalizeTranslate } from '@src/shared/utils';
import React from 'react';
import { useMutation } from 'react-query';

import BarcodeModule from '../Barcode.module';
import BarcodeFrom from '../components/BarcodeForm';
import { Barcode } from '../model/barcode.entity';

const BarcodeUpsert: React.FC<GlobalUpsertProps<Barcode>> = ({ onCallback, closeModal, singleData }) => {
  const module = new BarcodeModule();
  const { mutate, isLoading } = useMutation(({ id, values }: GlobalMutationProps<Barcode>) => {
    return id ? module.apiService.updateOne(id, values) : module.apiService.createOne(values);
  });

  const handleFormSubmit = (formValues: Partial<Barcode>) => {
    const values: Partial<Barcode> = { ...formValues, translate: normalizeTranslate(formValues.translate) };
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

  return <BarcodeFrom initialValues={singleData} onSubmit={handleFormSubmit} isPending={isLoading} />;
};

export default BarcodeUpsert;
