import { Modal } from 'antd';
import React, { ReactElement, Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import { usePageLayout } from '../PageLayoutPanel';
import { GenericModalProps } from './GenericFormModal.entity';
import ModalHeader from './ModalHeader/ModalHeader';

function GenericFormModal<T>({ children, module }: GenericModalProps<T>): ReactElement {
  const { t } = useTranslation();
  const { singleData, isModalVisible, setSingleData, setModalVisible } = usePageLayout();

  const handleClose = () => {
    setSingleData(undefined);
    setModalVisible(false);
  };

  const moduleTitle = t`${module.title[0]}.Title`;
  const title = !!singleData
    ? t('Global.UpdateTitle', { title: moduleTitle })
    : t('Global.CreateTitle', { title: moduleTitle });

  return (
    <Modal
      width={1300}
      footer={false}
      destroyOnClose
      closable={false}
      onCancel={handleClose}
      visible={isModalVisible}
      title={
        <ModalHeader
          onClose={handleClose}
          items={[...(module.breadcrumbItems || []), { path: '', breadcrumbName: title }]}
        />
      }
    >
      <Suspense fallback={<p>Loading Upsert Module ...</p>}>
        {React.Children.toArray(children).map((child: ReactElement) =>
          React.cloneElement(child, { singleData }),
        )}
      </Suspense>
    </Modal>
  );
}

export default GenericFormModal;
