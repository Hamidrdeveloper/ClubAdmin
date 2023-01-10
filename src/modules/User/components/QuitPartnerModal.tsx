import { Button, Modal, message, notification } from 'antd';
import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { quitPartner } from '../services/personalInfo.service';

interface Props {
  partnerId: number | undefined;
  setModalVisible: (isModalVisible: boolean) => void;
  isModalVisible: boolean;
}
const QuitPartnerModal = ({ partnerId, setModalVisible, isModalVisible }: Props): ReactElement => {
  const { t } = useTranslation();
  const [pending, setPending] = useState<boolean>(false);
  const navigate = useNavigate();
  const handlerQuitPartner = (partnerId: number | undefined) => {
    setPending(true);
    quitPartner(partnerId)
      .then((response) => {
        setPending(false);
        setModalVisible(false);
        message.success(response?.data?.data?.message);
        navigate(-1);
      })
      .catch((error) => {
        notification.error(error.message);
        setPending(false);
        setModalVisible(false);
      });
  };
  return (
    <Modal
      title={t('User.PersonalInfo.QuitPartner')}
      visible={isModalVisible}
      footer={[
        <Button onClick={() => setModalVisible(false)}>{t('Global.Cancel')}</Button>,
        <Button danger loading={pending} onClick={() => handlerQuitPartner(partnerId)}>
          {t('User.PersonalInfo.QuitPartner')}
        </Button>,
      ]}
    >
      <p>{t('User.PersonalInfo.QuitPartnerConfirmation')}</p>
    </Modal>
  );
};

export default QuitPartnerModal;
