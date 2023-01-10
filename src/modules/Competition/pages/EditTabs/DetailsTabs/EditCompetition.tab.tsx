import Fallback from '@src/modules/Competition/components/Fallback';
import FullCompetitionEditUpdate from '@src/modules/Competition/containers/FullCompetitionEditUpdate';
import { competitionAtom } from '@src/modules/Competition/service/competitionStore';
import { getAllowedCountries } from '@src/modules/Competition/service/Country';
import { getUserBlacklist } from '@src/modules/Competition/service/UserBlacklist';
import { Loader } from '@src/shared/components';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';
import { useQuery } from 'react-query';

const EditCompetitionTab = (): ReactElement => {
  const [competition] = useAtom(competitionAtom);
  if (!competition) return <Fallback title={`Can't Perform Edit if Competition is Not Available`} />;

  const { data: country_list, isLoading: country_isLoading } = useQuery(`competition_country_list`, () =>
    getAllowedCountries(competition.id),
  );

  const { data: user_list, isLoading: user_isLoading } = useQuery('competition_user_list', () =>
    getUserBlacklist(competition.id),
  );

  const singleData = { ...competition, country_list: country_list ?? [], blacklist_users: user_list ?? [] };

  return (
    <>
      {user_isLoading && country_isLoading ? (
        <Loader />
      ) : (
        <FullCompetitionEditUpdate singleData={singleData} />
      )}
    </>
  );
};

export default EditCompetitionTab;
