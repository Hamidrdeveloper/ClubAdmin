import i18n from '@src/core/i18n/config';
import Fallback from '@src/modules/Competition/components/Fallback';
import { CompetitionResultModel } from '@src/modules/CompetitionResult/model/competitionResult.entity';
import { PageLayout, Panel } from '@src/shared/components';
import React, { ReactElement } from 'react';
import { useParams } from 'react-router-dom';
import UserCompetitionListModule from '../UserCompetitionList.module';


const UserResultListPage = (): ReactElement => {
  const { competition_id, user_id } = useParams();

  if (!competition_id) return <Fallback title={`Compitition Id is needed`} />;
  if (!user_id) return <Fallback title={`User Id is needed`} />;
  const userCompetitionListModule = new UserCompetitionListModule(parseInt(competition_id), parseInt(user_id));

  const routes = [
    {
      breadcrumbName:  i18n.t('CompetitionResult.Title'),
      path: `/admin/competition/result`,
    },
    ...userCompetitionListModule.breadcrumbItems
  ];

  return (
    <PageLayout<CompetitionResultModel> module={userCompetitionListModule}>
      <PageLayout.Breadcrumb routes={routes}/>
      <PageLayout.Panel>
        <Panel.Header hasSearch dontNavigate />

        <Panel.ListView module={userCompetitionListModule} noId dontNavigate />
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default UserResultListPage;
