import UserRewardListModule from '@src/modules/Competition/AttendeesModules/UserRewardList.module';
import Fallback from '@src/modules/Competition/components/Fallback';
import { UserRewardModel } from '@src/modules/Competition/model/Reward.entity';
import { competitionIdAtom } from '@src/modules/Competition/service/competitionStore';
import { PageLayout, Panel } from '@src/shared/components';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';

const UserRewardListTab = (): ReactElement => {
  const [compId] = useAtom(competitionIdAtom);

  if (!compId) return <Fallback title={`Can't Perform Edit if Competition is Not Available`} />;
  const userRewardModule = new UserRewardListModule(compId);
  return (
    <PageLayout<UserRewardModel> module={userRewardModule}>
      <PageLayout.Panel>
        <Panel.Header hasSearch dontNavigate noDescription />

        <Panel.ListView module={userRewardModule} noId dontNavigate />
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default UserRewardListTab;
