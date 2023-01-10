import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { FactoryModule } from '@src/shared/models';
import Modal from 'antd/lib/modal/Modal';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import OrderGeneralEmailTabForm from '../../../components/OrderEmails/OrderGeneralEmailTabForm';
import { OrderEmailsModalFields } from '../../..';

interface UpsertProps<T> {
  module: FactoryModule<T>;
  visible: boolean;
  isPending: boolean;
  initialValues?: T;
  onSubmit: (data: T) => void;
  setVisible: (value: boolean) => void;
}

const OrderGeneralEmailTabUpsert = ({
  module,
  visible,
  initialValues,
  isPending,
  onSubmit,
  setVisible,
}: UpsertProps<OrderEmailsModalFields>): ReactElement => {
  const { t } = useTranslation();
  const title = module.title[0];

  const closeHandler = () => setVisible(false);

  const handleFormSubmit = (formValues: OrderEmailsModalFields) => onSubmit(formValues);
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
          title={t('Global.CreateTitle', { title })}
          onClose={closeHandler}
          items={[
            { path: '', breadcrumbName: title },
            { path: '', breadcrumbName: title },
          ]}
        />
      }
    >
      <OrderGeneralEmailTabForm
        onSubmit={handleFormSubmit}
        isPending={isPending}
        initialValues={initialValues}
      />
    </Modal>
  );
};

export default OrderGeneralEmailTabUpsert;
