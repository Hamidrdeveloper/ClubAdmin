import React, { ReactElement, useState } from 'react';

import { PartnerForm } from '../components/Partner.form';
import { editPartnerSetting } from '../controllers/partner.controller';
import { PartnerModel } from '../model/partner.entity';
import Styles from './styles/Partner.style';

type Props = { settings: PartnerModel };

const Partner = ({ settings: initial }: Props): ReactElement => {
  const [pending, setPending] = useState<boolean>(false);
  const [settings, setSettings] = useState<PartnerModel>(initial);

  const handleFormSubmit = (data: PartnerModel) => {
    setPending(true);
    editPartnerSetting(data)
      .then((res) => {
        setPending(false);
        res && setSettings(res);
      })
      .catch(() => setPending(false));
  };

  return (
    <Styles.MainContainer>
      <PartnerForm initialValues={settings} onSubmit={handleFormSubmit} isPending={pending} />
    </Styles.MainContainer>
  );
};

export default Partner;
