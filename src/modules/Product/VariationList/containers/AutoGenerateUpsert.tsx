import React, { ReactElement } from 'react';
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';

import AutoGenerateForm from '../components/AutoGenerateForm';
import { VariationAutoGenerate, VariationAutoGenerateFormCtx } from '../model/autoGenerate.entity';
import { autoGenerateService } from '../services/autoGenerate.service';

type MutationProps = {
  id: number | string;
  values: VariationAutoGenerateFormCtx;
};

type UpsertProps = {
  onCallback: () => void;
};
const AutoGenerateUpsert = ({ onCallback }: UpsertProps): ReactElement => {
  const { product_id: id } = useParams();

  const { mutate, isLoading } = useMutation(({ id, values }: MutationProps) => {
    return autoGenerateService(id, values);
  });

  const submitHandler = (formValues: VariationAutoGenerate) => {
    if (!id) return;

    const { attributes } = formValues;

    const values: VariationAutoGenerateFormCtx = {
      attributeTypeOptions: attributes?.map((el) => el.attributeTypeOption?.map((option) => option?.id)),
    };

    mutate({ id, values }, { onSuccess: onCallback });
  };
  return <AutoGenerateForm onSubmit={submitHandler} isPending={isLoading} />;
};

export default AutoGenerateUpsert;
