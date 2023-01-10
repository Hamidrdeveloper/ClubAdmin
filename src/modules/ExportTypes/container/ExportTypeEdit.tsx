import { GlobalUpsertProps } from '@src/shared/models';
import React, { ReactElement } from 'react';
import { useMutation } from 'react-query';

import ExportTypeForm from '../component/ExportTypeForm';
import { ExportTypeModel } from '../model/ExportsTypes.entity';
import { updateExportTypeHeaders } from '../service/Type.service';

const ExportTypeEdit = ({ singleData, onCallback }: GlobalUpsertProps<ExportTypeModel>): ReactElement => {
  const { mutate, isLoading } = useMutation(updateExportTypeHeaders);

  const formSubmitHandler = (formValues: ExportTypeModel) => {
    if (!singleData?.id) return;

    mutate({ typeId: singleData?.id, headers: formValues.headers }, { onSuccess: onCallback });
  };

  return <ExportTypeForm initialValues={singleData} onSubmit={formSubmitHandler} isPending={isLoading} />;
};

export default ExportTypeEdit;
