import i18n from '@src/core/i18n/config';
import { Loader, PageLayout } from '@src/shared/components';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { UpsertWrapper } from '@src/shared/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import LegalConditionUpsert from '../containers/LegalConditionUpsert';
import LegalConditionModule from '../LegalCondition.module';
import { LegalCondition } from '../model/legalCondition.entity';

type Props = {
  name: string;
};
const LegalConditionUpsertPage = ({ name }: Props): ReactElement => {
  const navigate = useNavigate();
  const { legalCondition_id: id } = useParams();
  const [singleData, setSingleData] = useState({} as LegalCondition);
  const [isLoading, setIsLoading] = useState(false);
  const legalConditionModule = new LegalConditionModule(name);
  const title = legalConditionModule.title[0];

  const routes = [
    ...legalConditionModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: id ? `${i18n.t('Global.Update')} ${title} - ${id}` : `${i18n.t('Global.New')} ${title}`,
    },
  ];

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    legalConditionModule.apiService
      .getOne(+id)
      .then((data) => {
        setSingleData(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const goBack = () => {
    navigate(`/admin/legals/${name}`);
  };

  return (
    <PageLayout<LegalCondition> module={legalConditionModule}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader onClose={() => navigate(`/admin/legals/${name}`)} items={routes} />
          </div>
          {isLoading ? (
            <Loader />
          ) : (
            <LegalConditionUpsert singleData={singleData} onCallback={goBack} module={legalConditionModule} />
          )}
        </UpsertWrapper>
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default LegalConditionUpsertPage;
