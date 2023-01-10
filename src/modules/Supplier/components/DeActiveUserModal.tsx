import { UserToggler } from '@src/modules/User';
import { GlobalMutationProps } from '@src/shared/models';
import { Col, Modal, Row, Typography, message } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { QueryObserverResult, useMutation } from 'react-query';

import SupplierModule from '../Supplier.module';

type Props = {
  isModalVisible: boolean;
  setModalVisible: (mode: boolean) => void;
  userId: number | undefined;
  userStatus: boolean | undefined;
  refetch: () => Promise<QueryObserverResult<unknown, unknown>>;
};
function DeActiveUserModal({
  isModalVisible,
  setModalVisible,
  userId,
  userStatus,
  refetch,
}: Props): ReactElement {
  const { t } = useTranslation();

  const module = new SupplierModule();
  const { mutate: toggleActivate } = useMutation(
    ({ id, values }: GlobalMutationProps<UserToggler>) => {
      return module.apiService.request({ url: `/users/${id}/active-status`, body: values, method: 'PUT' });
    },
    {
      onSuccess: () => {
        message.success(t('Supplier.CompanyInfo.UserDisabled'));
        refetch();
      },
    },
  );

  const onDeactiveUserHandler = () => {
    const values: UserToggler = {
      is_active: !userStatus,
    };

    toggleActivate({ id: userId ? userId : undefined, values });
  };
  return (
    <Modal
      visible={isModalVisible}
      width={500}
      closable={true}
      closeIcon
      title={t('Supplier.CompanyInfo.DeActiveAccount')}
      okText={t('Supplier.CompanyInfo.DeActiveAccount')}
      okType="danger"
      onCancel={() => {
        setModalVisible(false);
      }}
      onOk={() => {
        onDeactiveUserHandler();
        setModalVisible(false);
      }}
    >
      <Row>
        <Col span={24}>
          <Typography.Text>{t('Supplier.CompanyInfo.AskForDeActiveUser')}</Typography.Text>
        </Col>
      </Row>
    </Modal>
  );
}

export default DeActiveUserModal;
