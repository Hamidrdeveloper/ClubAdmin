import { PageLayout, Panel } from '@src/shared/components';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { RuleModel } from '../../model/Rule.entity';
import RuleModule from '../../Rule.module';
import { competitionAtom } from '../../service/competitionStore';

type Props = {
  competitionId?: number | undefined;
};
export default function RulesListPage({ competitionId }: Props): ReactElement {
  const module = new RuleModule();
  const [competition] = useAtom(competitionAtom);
  const { t } = useTranslation();
  return (
    <PageLayout<RuleModel> module={module}>
      <PageLayout.Panel>
        <Panel.Header hasSearch dontNavigate hasFilters={false} />

        <Panel.ListView
          module={module}
          dontNavigate
          hasUpdate={competition?.is_editable}
          updateLink=""
          params={{ competitionId }}
          togglers={[
            {
              url: 'is-active',
              title: t('Global.IsActive'),
              dataIndex: 'is_active',
            },
          ]}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}
