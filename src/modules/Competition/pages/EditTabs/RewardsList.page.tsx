import { PageLayout, Panel } from '@src/shared/components';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';

import { RewardModel } from '../../model/Reward.entity';
import RewardModule from '../../Reward.module';
import { competitionAtom, competitionIdAtom } from '../../service/competitionStore';

export default function RewardListPage(): ReactElement {
  const [competitionId] = useAtom(competitionIdAtom);
  const [competition] = useAtom(competitionAtom);
  const module = new RewardModule();

  return (
    <PageLayout<RewardModel> module={module}>
      <PageLayout.Panel>
        <Panel.Header hasSearch dontNavigate hasFilters={false} />

        <Panel.ListView
          module={module}
          dontNavigate
          updateLink=""
          params={{ competitionId }}
          hasUpdate={competition?.is_editable}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}
