import React, { ReactElement, useState } from 'react';

import { AnalyticTagsForm } from '../components/AnalyticTags.form';
import { editAnalyticTagsSetting } from '../controllers/analyticTags.controller';
import { AnalyticTagsModel } from '../model/analyticTags.entity';
import Styles from './styles/AnalyticTags.style';

type Props = { settings: AnalyticTagsModel[] };

const AnalyticTags = ({ settings: initial }: Props): ReactElement => {
  const [pending, setPending] = useState<boolean>(false);
  const [settings, setSettings] = useState<AnalyticTagsModel[]>(initial);

  const handleFormSubmit = (data: AnalyticTagsModel[]) => {
    setPending(true);
    editAnalyticTagsSetting(data)
      .then((res) => {
        setPending(false);
        res && setSettings(res);
      })
      .catch(() => setPending(false));
  };

  return (
    <Styles.MainContainer>
      <AnalyticTagsForm initialValues={settings} onSubmit={handleFormSubmit} isPending={pending} />
    </Styles.MainContainer>
  );
};

export default AnalyticTags;
