import { notification } from 'antd';
import React, { ReactElement, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { LoginFormComponent } from '../components';
import { LoginForm, onLoginResponse } from '../model';
import { AuthContext } from '../service/AuthProvider';

export default function PartnerLoginContainer({
  onChangePage,
}: {
  onChangePage: (page: string) => void;
}): ReactElement {
  const navigate = useNavigate();

  const { onLoginPartner } = useContext(AuthContext);
  const [isPending, setPending] = useState<boolean>(false);

  const handleSubmit = ({ password, username }: LoginForm): void => {
    setPending(true);
    onLoginPartner({ password, username })
      .then((response: onLoginResponse) => {
        if (response.status === 302) {
          navigate('/auth/login/verify');
        } else if (response.status === 304) {
          navigate('legals');
        } else if (response.status === 200) {
          navigate('/admin/dashboard');
          notification.success({
            message: 'Logged In Successfully',
            description: "You're Redirecting To Your Dashboard",
          });
        }
      })
      .catch(() => setPending(false));
  };

  return <LoginFormComponent onSubmit={handleSubmit} isPending={isPending} onChangePage={onChangePage} />;
}
