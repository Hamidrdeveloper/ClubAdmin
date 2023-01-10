import Fallback from '@src/modules/Competition/components/Fallback';
import { TopParticipantModel } from '@src/modules/Competition/model/TopParticipant.entity';
import { competitionIdAtom } from '@src/modules/Competition/service/competitionStore';
import TopListParticipantModule from '@src/modules/Competition/TopListParticipant.module';
import { PageLayout, Panel } from '@src/shared/components';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';

const TopListParticipantsTab = (): ReactElement => {
  const [compId] = useAtom(competitionIdAtom);

  if (!compId) return <Fallback title="Competition ID" />;
  const module = new TopListParticipantModule(compId);

  return (
    <PageLayout<TopParticipantModel> module={module}>
      <PageLayout.Panel>
        <Panel.Header hasSearch noDescription />

        <Panel.ListView module={module} hasUpdate={false} noId />
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default TopListParticipantsTab;
