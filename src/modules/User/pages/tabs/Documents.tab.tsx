import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';

import Fallback from '../../components/Fallback';
import { UserDocs } from '../../model/document';
import { DocumentModule } from '../../User.module';

const DocumentsTab = (): ReactElement => {
  const { user_id: id } = useParams();
  if (!id) return <Fallback />;

  const module = new DocumentModule(+id);

  return (
    <PageLayout<UserDocs> module={module}>
      <PageLayout.Panel>
        <Panel.Header hasSearch dontNavigate />

        <Panel.ListView
          module={module}
          noId
          dontNavigate
          params={{ orderBy: { created_at: 'DESC' } }}
          customEntities={{ getOne: '/order-documents/$1' }}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default DocumentsTab;
