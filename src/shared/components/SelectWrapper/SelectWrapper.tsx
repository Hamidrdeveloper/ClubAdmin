/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheckimport i18n from '@src/core/i18n/config';
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import i18n from '@src/core/i18n/config';
import { Modal } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import ModalHeader from '../PageLayout/GenericModal/ModalHeader/ModalHeader';

type Props = {
  children: ReactElement;
  title: string;
  isVisible: boolean;
  setVisible: (status: boolean) => void;
  hideBackBtn?: boolean;
};
function SelectWrapper({ children, title: _title, isVisible, setVisible, hideBackBtn }: Props): ReactElement {
  const { t } = useTranslation();
  const handleClose = () => setVisible(false);

  const title = t('Global.CreateTitle', { title: _title });

  return (
    <Modal
      width={1300}
      footer={false}
      destroyOnClose
      visible={isVisible}
      onCancel={handleClose}
      title={
        <ModalHeader
          hideBackBtn={hideBackBtn}
          onClose={handleClose}
          items={[{ path: '', breadcrumbName: title }]}
        />
      }
    >
      {isVisible && React.cloneElement(children, { closeModal: () => setVisible(false) })}
    </Modal>
  );
}

export default SelectWrapper;
