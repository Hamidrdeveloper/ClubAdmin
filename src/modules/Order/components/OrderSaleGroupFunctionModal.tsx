import { CloseOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import OrderSaleGroupFunctionUpsert from '../containers/OrderSaleGroupFunctionUpsert';

interface Props {
  groupFunctionIds: number[];
  isModalVisible: boolean;
  setModalVisible: (isModalVisible: boolean) => void;
}
const OrderSaleGroupFunctionModal = ({
  groupFunctionIds,
  isModalVisible,
  setModalVisible,
}: Props): ReactElement => {
  const { t } = useTranslation();

  return (
    <>
      <Modal
        width={900}
        footer={false}
        visible={isModalVisible}
        closeIcon={<CloseOutlined />}
        closable
        destroyOnClose
        onCancel={() => {
          setModalVisible(false);
        }}
        title={t('Global.GroupFunction')}
      >
        <OrderSaleGroupFunctionUpsert groupFunctionIds={groupFunctionIds} setModalVisible={setModalVisible} />
      </Modal>
    </>
  );
};

export default OrderSaleGroupFunctionModal;
