import { notification } from 'antd';
import React, { ReactElement, useContext, useState } from 'react';

import { RegisterFormComponent } from '../components';
import { RegisterForm, RegisterFormContext } from '../model';
import { AuthContext } from '../service/AuthProvider';

export default function RegisterContainer({
  onCallback,
  onChangePage,
}: {
  onCallback: () => void;
  onChangePage: (page: string) => void;
}): ReactElement {
  const { onRegister } = useContext(AuthContext);
  const [isPending, setPending] = useState<boolean>(false);

  const handleSubmit = ({ country, language, ...restValues }: RegisterFormContext): void => {
    const finalValues: RegisterForm = { ...restValues, country_id: country.id, language_id: language.id };

    setPending(true);
    onRegister(finalValues)
      .then((user) => {
        if (user) {
          onCallback();
          notification.success({
            message: 'Registered Successfully',
            description: "You're Redirecting To Your Dashboard",
          });
        }
      })
      .finally(() => setPending(false));
  };

  return <RegisterFormComponent onSubmit={handleSubmit} isPending={isPending} onChangePage={onChangePage} />;
}
