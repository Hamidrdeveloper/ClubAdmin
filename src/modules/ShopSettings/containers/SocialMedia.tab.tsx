import React, { ReactElement, useState } from 'react';

import { SocialMediaForm } from '../components/SocialMedia.form';
import { editSocialMediaSetting } from '../controllers/socialMedia.controller';
import { SocialMediaModel } from '../model/socialMedia.entity';
import Styles from './styles/SocialMedia.style';

type Props = { settings: SocialMediaModel[] };

const SocialMedia = ({ settings: initial }: Props): ReactElement => {
  const [pending, setPending] = useState<boolean>(false);
  const [settings, setSettings] = useState<SocialMediaModel[]>(initial);

  const handleFormSubmit = (data: SocialMediaModel[]) => {
    setPending(true);
    editSocialMediaSetting(data)
      .then((res) => {
        setPending(false);
        res && setSettings(res);
      })
      .catch(() => setPending(false));
  };

  return (
    <Styles.MainContainer>
      <SocialMediaForm initialValues={settings} onSubmit={handleFormSubmit} isPending={pending} />
    </Styles.MainContainer>
  );
};

export default SocialMedia;
