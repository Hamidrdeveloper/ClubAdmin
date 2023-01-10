import UserResultListModule from '@src/modules/Competition/AttendeesModules/UserResultList.module';
import Fallback from '@src/modules/Competition/components/Fallback';
import { competitionIdAtom } from '@src/modules/Competition/service/competitionStore';
import { CompetitionResultModel } from '@src/modules/CompetitionResult/model/competitionResult.entity';
import { PageLayout, Panel } from '@src/shared/components';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';

const UserResultListTab = (): ReactElement => {
  const [compId] = useAtom(competitionIdAtom);

  if (!compId) return <Fallback title={`Can't Perform Edit if Competition is Not Available`} />;
  const userResultModule = new UserResultListModule(compId);

  return (
    <PageLayout<CompetitionResultModel> module={userResultModule}>
      <PageLayout.Panel>
        <Panel.Header hasSearch dontNavigate noDescription />

        <Panel.ListView module={userResultModule} noId dontNavigate noSelection />
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default UserResultListTab;
