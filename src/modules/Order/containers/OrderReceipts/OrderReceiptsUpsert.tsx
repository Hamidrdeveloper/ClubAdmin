import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { FactoryModule } from '@src/shared/models';
import Modal from 'antd/lib/modal/Modal';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import OrderReceiptsForm from '../../components/OrderReceipts/OrderReceiptsForm';
import { OrderModuleType, OrderReceiptsModalFields } from '../..';

interface UpsertProps<T> {
  module: FactoryModule<T>;
  visible: boolean;
  pending: boolean;
  moduleType: OrderModuleType;
  onSubmit: (data: T) => void;
  setVisible: (value: boolean) => void;
  setSelectedValue: (value: string) => void;
}

const OrderReceiptsUpsert = ({
  module,
  visible,
  pending,
  onSubmit,
  setVisible,
  moduleType,
  setSelectedValue,
}: UpsertProps<OrderReceiptsModalFields>): ReactElement => {
  const { t } = useTranslation();
  const title = module.title[0];

  const closeHandler = () => {
    setSelectedValue('default');
    setVisible(false);
  };

  const handleFormSubmit = (formValues: OrderReceiptsModalFields) => {
    const values: OrderReceiptsModalFields = {
      ...formValues,
    };

    onSubmit(values);
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
      <OrderReceiptsForm onSubmit={handleFormSubmit} isPending={pending} moduleType={moduleType} />
    </Modal>
  );
};

export default OrderReceiptsUpsert;
