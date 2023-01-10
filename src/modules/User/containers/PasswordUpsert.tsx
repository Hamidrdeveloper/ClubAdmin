import { GlobalUpsertProps } from '@src/shared/models';
import React, { FC } from 'react';
import { useMutation } from 'react-query';

import PasswordForm from '../components/PasswordForm';
import { PasswordFormCtx, ResetPassFormCtx } from '../model/password';
import { changePassword, resetPassword } from '../services/password.service';

interface Props extends GlobalUpsertProps<PasswordFormCtx> {
  id: number;
  userEmail: string | undefined;
  resetPassCallback: () => void;
}

const PasswordUpsert: FC<Props> = ({ id, onCallback, userEmail, resetPassCallback }) => {
  const { mutate: submit, isLoading: submitPending } = useMutation(changePassword);
  const { mutate: resetPass, isLoading: resetPassPending } = useMutation(resetPassword);

  const handleSubmit = (formValues: PasswordFormCtx) => {
    const values = {
      ...formValues,
    };

    submit({ id, values }, { onSuccess: onCallback });
  };

  const handleResetPassword = () => {
    if (!userEmail) return;

    const values: ResetPassFormCtx = {
      email: userEmail,
    };

    resetPass({ values }, { onSuccess: resetPassCallback });
  };

  return (
    <PasswordForm
      isPending={submitPending}
      onSubmit={handleSubmit}
      resetPending={resetPassPending}
      onResetPass={handleResetPassword}
      haveReset={!!userEmail}
    />
  );
};

export default PasswordUpsert;
