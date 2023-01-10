import { normalizeTranslate } from '@src/shared/utils';
import { message } from 'antd';
import { useAtom } from 'jotai';
import moment from 'moment';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';

import Fallback from '../components/Fallback';
import FullCompetitionEditForm from '../components/FullCompetitionEditForm';
import { FullCompetitionFormCtx, FullCompetitionModel } from '../model/Competition.entity';
import { competitionIdAtom } from '../service/competitionStore';
import fullCompetitionEdit from '../service/editCompetition';

interface Props {
  singleData: FullCompetitionModel;
}
type MutationProps = {
  id: number;
  values: Partial<FullCompetitionFormCtx>;
};
const FullCompetitionEditUpdate = ({ singleData }: Props): ReactElement => {
  const { t } = useTranslation();
  const [compId] = useAtom(competitionIdAtom);
  if (!compId) return <Fallback title="Invalid Competition ID" />;

  const { mutate, isLoading } = useMutation(({ id, values }: MutationProps) =>
    fullCompetitionEdit(id, values),
  );

  function formSubmitHandler(formValues: FullCompetitionModel) {
    if (!compId) return;

    const { country_list, blacklist_users, translations, release_date, available_until, ...restValues } =
      formValues;

    const values: Partial<FullCompetitionFormCtx> = {
      translate: normalizeTranslate(translations),
      release_date: moment(release_date).format('YYYY-MM-DD'),
      available_until: moment(available_until).format('YYYY-MM-DD'),
      country_ids: country_list?.length > 0 ? country_list.map((country) => country.id) : undefined,
      user_ids: blacklist_users?.length > 0 ? blacklist_users.map((user) => user.id) : undefined,
      ...restValues,
    };

    mutate(
      { id: compId, values },
      {
        onSuccess: () => {
          message.success(t('Global.UpdatedSuccessfully', { title: t('Competition.Title') }));
        },
      },
    );
  }

  return (
    <FullCompetitionEditForm isPending={isLoading} onSubmit={formSubmitHandler} initialValues={singleData} />
  );
};

export default FullCompetitionEditUpdate;
