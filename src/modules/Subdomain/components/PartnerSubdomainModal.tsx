import { ModalHeader } from '@src/shared/components';
import { Modal } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import PartnerSubdomainUpsert from '../containers/PartnerSubdomainUpsert';

interface Props {
  setModalVisible: (isModalVisible: boolean) => void;
  setCanCreateNew: (canCreateNew: boolean) => void;
  isModalVisible: boolean;
  subdomainId: number | undefined;
}
const PartnerSubdomainModal = ({
  subdomainId,
  setModalVisible,
  isModalVisible,
  setCanCreateNew,
}: Props): ReactElement => {
  const { t } = useTranslation();

  return (
    <Modal width={1200} visible={isModalVisible} footer={null} destroyOnClose>
      <div className="header">
        <ModalHeader title={t('Subdomain.PartnerSubdomain')} onClose={() => setModalVisible(false)} />
      </div>
      <PartnerSubdomainUpsert
        setCanCreateNew={setCanCreateNew}
        setModalVisible={setModalVisible}
        subdomainId={subdomainId}
      />
    </Modal>
  );
};

export default PartnerSubdomainModal;
