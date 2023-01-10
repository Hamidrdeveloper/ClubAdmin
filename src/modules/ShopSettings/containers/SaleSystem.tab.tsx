import React, { ReactElement, useState } from 'react';

import { SaleSystemForm } from '../components/SaleSystem.form';
import { editSaleSystemSetting } from '../controllers/saleSystem.controller';
import { SaleSystemModel } from '../model/saleSystem.entity';
import Styles from './styles/SaleSystem.style';

type Props = { settings: SaleSystemModel };

const SaleSystem = ({ settings: initial }: Props): ReactElement => {
  const [pending, setPending] = useState<boolean>(false);
  const [settings, setSettings] = useState<SaleSystemModel>(initial);

  const handleFormSubmit = (data: SaleSystemModel) => {
    setPending(true);
    editSaleSystemSetting({ ...data, country: data.country['name'], country_id: data.country['id'] })
      .then((res) => {
        setPending(false);
        res && setSettings(res);
      })
      .catch(() => setPending(false));
  };

  return (
    <Styles.MainContainer>
      <SaleSystemForm initialValues={settings} onSubmit={handleFormSubmit} isPending={pending} />
    </Styles.MainContainer>
  );
};

export default SaleSystem;
