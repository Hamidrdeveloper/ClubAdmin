import PasswordUpsert from '@src/modules/User/containers/PasswordUpsert';
import { Loader } from '@src/shared/components';
import { message } from 'antd';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { UseQueryResult } from 'react-query';

import Fallback from '../../components/Fallback';
import { Supplier } from '../..';
import { userIdAtom } from '../SupplierManage.page';

const PasswordSettingTab = ({
  queryResult,
}: {
  queryResult: UseQueryResult<Supplier | undefined>;
}): ReactElement => {
  const { t } = useTranslation();
  const [userId] = useAtom(userIdAtom);
  if (!userId) return <Fallback />;

  const changePasswordHandler = () => {
    message.success(t('Global.UpdatedSuccessfully', { title: t('Auth.Password') }));
  };

  const resetPassCallback = () => {
    message.success('An email with a password recovery has been sent to you.');
  };

  return (
    <>
      {queryResult.isLoading ? (
        <Loader />
      ) : (
        <PasswordUpsert
          id={userId}
          onCallback={changePasswordHandler}
          userEmail={queryResult.data?.people?.user?.email ?? undefined}
          resetPassCallback={resetPassCallback}
        />
      )}
    </>
  );
};

export default PasswordSettingTab;
