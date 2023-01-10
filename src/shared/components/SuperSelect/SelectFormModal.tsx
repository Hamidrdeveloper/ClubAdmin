import { Modal } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import ModalHeader from '../PageLayout/GenericModal/ModalHeader/ModalHeader';
import { SelectModalProps } from './SuperSelect.entity';

function SelectFormModal<Type>({
  children,
  module,
  isVisible,
  setVisible,
}: SelectModalProps<Type>): ReactElement {
  const { t } = useTranslation();
  const handleClose = () => setVisible(false);

  const moduleTitle = t`${module.title[0]}.Title`;
  const title = t('Global.CreateTitle', { title: moduleTitle });

  return (
    <Modal
      width={1300}
      footer={false}
      destroyOnClose
      closable={false}
      visible={isVisible}
      onCancel={handleClose}
      title={
        <ModalHeader
          onClose={handleClose}
          items={[...(module.breadcrumbItems || []), { path: '', breadcrumbName: title }]}
        />
      }
    >
      {children}
    </Modal>
  );
}

export default SelectFormModal;
