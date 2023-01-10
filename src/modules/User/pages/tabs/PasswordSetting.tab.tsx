import { Loader } from '@src/shared/components';
import { message } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { UseQueryResult } from 'react-query';
import { useParams } from 'react-router-dom';

import Fallback from '../../components/Fallback';
import PasswordUpsert from '../../containers/PasswordUpsert';
import { User } from '../..';

const PasswordSettingTab = ({
  queryResult,
}: {
  queryResult: UseQueryResult<User | undefined>;
}): ReactElement => {
  const { user_id: id } = useParams();
  if (!id) return <Fallback />;

  const { t } = useTranslation();

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
          id={+id}
          onCallback={changePasswordHandler}
          userEmail={queryResult.data?.email ?? ''}
          resetPassCallback={resetPassCallback}
        />
      )}
    </>
  );
};

export default PasswordSettingTab;
