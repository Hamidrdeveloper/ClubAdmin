import { UserDocs } from '@src/modules/User/model/document';
import { DocumentModule } from '@src/modules/User/User.module';
import { PageLayout, Panel } from '@src/shared/components';
import { useAtom } from 'jotai';
import React, { ReactElement } from 'react';

import Fallback from '../../components/Fallback';
import { userIdAtom } from '../SupplierManage.page';

const DocumentsTab = (): ReactElement => {
  const [userId] = useAtom(userIdAtom);
  if (!userId) return <Fallback />;

  const module = new DocumentModule(userId);

  return (
    <PageLayout<UserDocs> module={module}>
      <PageLayout.Panel>
        <Panel.Header hasSearch />

        <Panel.ListView module={module} noId params={{ orderBy: { created_at: 'DESC' } }} />
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default DocumentsTab;
