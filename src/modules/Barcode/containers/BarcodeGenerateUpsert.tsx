import { message } from 'antd';
import React, { ReactElement } from 'react';
import { useMutation } from 'react-query';

import BarcodeGenerateForm from '../components/BarcodeGenerateForm';
import { BarcodeGenerateModel } from '../model/barcode.entity';
import { generateBarcodeService } from '../service/generateBarcode.service';

type Props = {
  onCallback: () => void;
};
const BarcodeGenerateUpsert = ({ onCallback }: Props): ReactElement => {
  const { mutate, isLoading } = useMutation(generateBarcodeService);

  const formSubmitHandler = (formValues: BarcodeGenerateModel) => {
    // used is mandatory from backend, and when we are generating new barcodes its obvious that its not 'used' yet
    mutate(
      { ...formValues, used: false },
      {
        onSuccess: (msg) => {
          message.success(msg);

          onCallback?.();
        },
      },
    );
  };
  return <BarcodeGenerateForm isPending={isLoading} onSubmit={formSubmitHandler} />;
};

export default BarcodeGenerateUpsert;
