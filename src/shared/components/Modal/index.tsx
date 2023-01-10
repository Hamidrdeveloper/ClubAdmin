import { ModalHeader } from '@src/shared/components';
import { Modal } from 'antd';
import React, { Dispatch, ReactElement, SetStateAction, Suspense } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {
  children: ReactElement;
  isModalVisible: boolean;
  breadcrumbTitle?: string;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
};
const SharedModal = ({ children, isModalVisible, setModalVisible, breadcrumbTitle }: Props): ReactElement => {
  const { t } = useTranslation();
  const handleClose = () => {
    setModalVisible(false);
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
        <ModalHeader onClose={handleClose} items={[{ path: '', breadcrumbName: breadcrumbTitle ?? '' }]} />
      }
    >
      <Suspense fallback={<p>{t('Global.LoadingUpsertModule')}</p>}>
        {React.Children.toArray(children).map((child: ReactElement) => React.cloneElement(child))}
      </Suspense>
    </Modal>
  );
};

export default SharedModal;
