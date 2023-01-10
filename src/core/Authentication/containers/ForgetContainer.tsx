import { notification } from 'antd';
import React, { ReactElement, useState } from 'react';

import { ForgetPasswordComponent } from '../components';
import { sendResetPasswordEmail } from '../service/api';

export default function ForgetContainer({ onCallback }: { onCallback: () => void }): ReactElement {
  const [isPending, setPending] = useState<boolean>(false);

  const handleSubmit = ({ email }: { email: string }): void => {
    setPending(true);
    sendResetPasswordEmail({ email })
      .then((user) => {
        if (user) {
          onCallback();
          notification.success({
            message: 'Email Found !',
            description: 'Check Your Email And Press Forget Password Link',
          });
        }
      })
      .finally(() => setPending(false));
  };

  return <ForgetPasswordComponent onSubmit={handleSubmit} isPending={isPending} />;
}
