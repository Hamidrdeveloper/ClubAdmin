import i18n from '@src/core/i18n/config';
import { PageLayout } from '@src/shared/components';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { UpsertWrapper } from '@src/shared/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CommentModule from '../Comment.module';
import { Comment } from '../model/comment.entity';
import moduleInfo from '../ModuleInfo.json';

const CommentUpsertPage = (): ReactElement => {
  const navigate = useNavigate();
  const { comment_id: id } = useParams();
  // const [singleData, setSingleData] = useState({} as Comment);
  const [, setSingleData] = useState({} as Comment);
  // const [isLoading, setIsLoading] = useState(false);
  const [, setIsLoading] = useState(false);
  const commentModule = new CommentModule();
  const title = commentModule.title[0];
  const moduleUrl = `${moduleInfo.Route.replace('*', '')}`;

  const routes = [
    ...commentModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: id ? `${i18n.t('Global.Update')} ${title} - ${id}` : `${i18n.t('Global.New')} ${title}`,
    },
  ];

  useEffect(() => {
    if (!id) return;
    setIsLoading(true);
    commentModule.apiService
      .getOne(+id)
      .then((data) => {
        setSingleData(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // const goBack = () => {
  //   navigate(-1);
  // };

  return (
    <PageLayout<Comment> module={commentModule}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader onClose={() => navigate(`/admin${moduleUrl}`)} items={routes} />
          </div>
        </UpsertWrapper>
        {/* TODO: Comments module doesnt have upsert container, strip out following comment when added  */}
        {/* {isLoading ? <Loader /> : <CommentUpsert singelData={singleData} onCallback={goBack} />} */}
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default CommentUpsertPage;
