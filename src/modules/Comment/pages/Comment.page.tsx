import i18n from '@src/core/i18n/config';
import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';

import CommentModule from '../Comment.module';
import { Comment } from '../model/comment.entity';

export default function CommentPage(): ReactElement {
  const commentModule = new CommentModule();

  return (
    <PageLayout<Comment> module={commentModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasSearch />

        <Panel.ListView
          hasUpdate={false}
          togglers={[{ url: 'approved', title: i18n.t('Comment.List.Table.Approve'), dataIndex: 'approved' }]}
          module={commentModule}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}
