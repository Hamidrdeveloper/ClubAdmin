import { ApiBuilder } from '@src/shared/utils';

import { PasswordFormCtx, ResetPassFormCtx } from '../model/password';

const passwordAPI = new ApiBuilder<PasswordFormCtx>(`/users/--/change-password`);

export const changePassword = async ({
  id,
  values,
}: {
  id: number;
  values: PasswordFormCtx;
}): Promise<PasswordFormCtx> => {
  try {
    return passwordAPI.request({ url: `/users/${id}/change-password`, method: 'PUT', body: values });
  } catch (e) {
    throw new Error(e);
  }
};

export const resetPassword = async ({ values }: { values: ResetPassFormCtx }): Promise<ResetPassFormCtx> => {
  try {
    return passwordAPI.request({ url: 'reset-password', method: 'POST', body: values });
  } catch (e) {
    throw new Error(e);
  }
};
