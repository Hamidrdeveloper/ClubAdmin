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
import { notification } from 'antd';
import React, { ReactElement, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginFormComponent } from '../components';
import { LoginForm, onLoginResponse } from '../model';
import { AuthContext } from '../service/AuthProvider';

export default function LoginContainer({
  onChangePage,
}: {
  onChangePage: (page: string) => void;
}): ReactElement {
  const navigate = useNavigate();

  const { onLogin } = useContext(AuthContext);
  const [isPending, setPending] = useState<boolean>(false);

  const handleSubmit = ({ password, username }: LoginForm): void => {
    setPending(true);
    onLogin({ password, username })
      .then((response: any) => {
     
        setPending(false)
      
        notification.info({
          message: response.message,
         
        });
      })
      .catch(() => setPending(false));
  };

  return <LoginFormComponent onSubmit={handleSubmit} isPending={isPending} onChangePage={onChangePage} />;
}
