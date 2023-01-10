import { Barcode } from '@src/modules/Barcode';
import BarcodeModule from '@src/modules/Barcode/Barcode.module';
import { FormSubmit, ModalHeader } from '@src/shared/components';
import { Form, FormInstance, Modal, Select, message } from 'antd';
import React, { Dispatch, ReactElement, SetStateAction, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import { generateBarcode as generateBarcodeService } from '../services';

type Props = {
  form: FormInstance;
  isModalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
};
const { BarcodeTypes } = new BarcodeModule();
const BarcodeGenerationModalForm = ({ isModalVisible, setModalVisible, form }: Props): ReactElement => {
  const { mutate: generateBarcode, isLoading } = useMutation(generateBarcodeService);
  const { t } = useTranslation();
  const handleClose = () => {
    setModalVisible(false);
  };

  const getBarcodeOf = ({ type }: { type: string }): void => {
    generateBarcode(type, {
      onSuccess: (generatedBarcode: Barcode) => {
        if (generatedBarcode === null) {
          message.error(t('Product.Variation.Settings.CouldNotFindAnyBarcodeWithTheTypeOf', { type }));
          return;
        }

        const prevBarcodes = form.getFieldValue('barcodes') ?? [];
        form.setFieldsValue({ barcodes: [...prevBarcodes, generatedBarcode] });
      },
      onSettled: () => {
        handleClose();
      },
    });
  };

  return (
    <Modal
      width={1300}
      footer={false}
      destroyOnClose
      closable={true}
      onCancel={handleClose}
      visible={isModalVisible}
      title={
        <ModalHeader
          onClose={handleClose}
          items={[{ path: '', breadcrumbName: t('Product.Variation.Settings.GenerateBarcode') }]}
        />
      }
    >
      <Suspense fallback={<p>{t('Global.LoadingUpsertModule')}</p>}>
        <Form name="generate-barcode-modal" onFinish={getBarcodeOf}>
          <Form.Item label={t('Barcode.Field.Type')} name="type" rules={[{ required: true }]}>
            <Select
              options={BarcodeTypes}
              placeholder={t('Global.SelectPlaceholder', { title: t('Barcode.Field.Type') })}
            />
          </Form.Item>

          <FormSubmit title={t('Product.Variation.Settings.Generate')} isPending={isLoading} />
        </Form>
      </Suspense>
    </Modal>
  );
};

export default BarcodeGenerationModalForm;
