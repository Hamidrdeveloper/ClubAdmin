import DocumentTypeSelect from '@src/modules/Email/container/DocumentTypeSelect';
import { FormSubmit, Loader, Upload } from '@src/shared/components';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { FactoryModule } from '@src/shared/models';
import { Col, Form, Input, Row } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { ReactElement, Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import {
  PurchaseSalePure,
  PurchaseUploadDocument,
  PurchaseUploadDocumentContext,
} from '../../model/purchase.entity';

interface Props {
  module: FactoryModule<PurchaseSalePure>;
  visible: boolean;
  pending: boolean;
  onSubmit: (data: PurchaseUploadDocumentContext) => void;
  setVisible: (value: boolean) => void;
}

const OrderReceiptsUpload = ({ module, visible, pending, onSubmit, setVisible }: Props): ReactElement => {
  const { t } = useTranslation();
  const title = module.title[0];
  const [form] = Form.useForm();

  const closeHandler = () => {
    form.resetFields();
    setVisible(false);
  };

  const handleFormSubmit = (formValues: PurchaseUploadDocument) => {
    const { document_type, ...otherParams }: PurchaseUploadDocument = {
      ...formValues,
    };

    onSubmit({ ...otherParams, document_type_id: document_type.id });
  };

  return (
    <Modal
      visible={visible}
      width={1300}
      footer={false}
      destroyOnClose
      closable={false}
      onCancel={closeHandler}
      title={
        <ModalHeader
          onClose={closeHandler}
          items={[
            ...(module.breadcrumbItems || []),
            { path: '', breadcrumbName: t('Global.CreateTitle', { title }) },
          ]}
        />
      }
    >
      <Form name="receipt-upload-form" layout={'vertical'} onFinish={handleFormSubmit} form={form}>
        <Suspense fallback={<Loader />}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="number" label={t('Order.Field.Number')}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="document_type" label={t('Order.Receipt.Field.DocumentType')}>
                <DocumentTypeSelect />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item label={t('Global.UploadFile')} name="file">
                <Upload form={form} valueName="Receipt Upload" />
              </Form.Item>
              <Form.Item hidden name="file_id" />
            </Col>
          </Row>

          <FormSubmit isPending={pending} />
        </Suspense>
      </Form>
    </Modal>
  );
};

export default OrderReceiptsUpload;
