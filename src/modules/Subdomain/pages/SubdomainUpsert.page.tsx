import i18n from '@src/core/i18n/config';
import { Loader, PageLayout } from '@src/shared/components';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { UpsertWrapper } from '@src/shared/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import SubdomainUpsert from '../containers/SubdomainUpsert';
import { Subdomain } from '../model/Subdomain.entity';
import moduleInfo from '../ModuleInfo.json';
import SubdomainModule from '../Subdomain.module';

const SubdomainUpsertPage = (): ReactElement => {
  const navigate = useNavigate();
  const { subdomain_id: id } = useParams();
  const [singleData, setSingleData] = useState({} as Subdomain);
  const [isLoading, setIsLoading] = useState(false);
  const subdomainModule = new SubdomainModule();
  const title = subdomainModule.title[0];
  const moduleUrl = `${moduleInfo.Route.replace('*', '')}`;

  const routes = [
    ...subdomainModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: id ? `${i18n.t('Global.Update')} ${title} - ${id}` : `${i18n.t('Global.New')} ${title}`,
    },
  ];

  useEffect(() => {
    if (!id) return;

    setIsLoading(true);
    subdomainModule.apiService
      .getOne(+id)
      .then((data) => {
        setSingleData(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <PageLayout<Subdomain> module={subdomainModule}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader onClose={() => navigate(`/admin${moduleUrl}`)} items={routes} />
          </div>
          {isLoading ? <Loader /> : <SubdomainUpsert singleData={singleData} onCallback={goBack} />}
        </UpsertWrapper>
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default SubdomainUpsertPage;
