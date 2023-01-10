import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement, useState } from 'react';

import DetailsModal from '../containers/DetailsModal';
import LegalConditionModule from '../LegalCondition.module';
import { LegalCondition } from '../model/legalCondition.entity';

type Props = { name: string };
export default function LegalConditionPage({ name }: Props): ReactElement {
  const module = new LegalConditionModule(name);

  const [isModalVisible, setModalVisible] = useState(false);
  const [currentLegal, setCurrentLegal] = useState<LegalCondition>();

  return (
    <PageLayout<LegalCondition> module={module}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasNew noDescription noListView />

        <Panel.ListView
          dontNavigate
          hasUpdate={false}
          onUpdateWithModel={(legal) => {
            setModalVisible(true);
            setCurrentLegal(legal as LegalCondition);
          }}
          module={module}
        />
      </PageLayout.Panel>

      <DetailsModal
        visible={isModalVisible}
        htmlData={currentLegal?.description ?? ''}
        setVisible={setModalVisible}
      />
    </PageLayout>
  );
}
