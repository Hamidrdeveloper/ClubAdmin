import { ModalHeader } from '@src/shared/components';
import { Modal } from 'antd';
import React, { ReactElement, Suspense } from 'react';
import { useTranslation } from 'react-i18next';

import AutoGenerateUpsert from '../containers/AutoGenerateUpsert';

type Props = {
  isVisible: boolean;
  setVisible: (status: boolean) => void;
};
function AutoGenerateModal({ isVisible, setVisible }: Props): ReactElement {
  const { t } = useTranslation();

  const handleClose = () => {
    setVisible(false);
  };

  const title = t('Global.CreateTitle', { title: t('Product.Variation.Title') });

  return (
    <Modal
      width={1300}
      footer={false}
      destroyOnClose
      closable={false}
      visible={isVisible}
      onCancel={handleClose}
      title={<ModalHeader onClose={handleClose} items={[...[], { path: '', breadcrumbName: title }]} />}
    >
      <Suspense fallback={<p>{t('Product.Variation.LoadingUpsertModule')}</p>}>
        <AutoGenerateUpsert onCallback={() => setVisible(false)} />
      </Suspense>
    </Modal>
  );
}

export default AutoGenerateModal;
