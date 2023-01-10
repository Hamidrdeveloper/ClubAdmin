import { Subdomain } from '@src/modules/Subdomain';
import SubdomainUpsert from '@src/modules/Subdomain/containers/SubdomainUpsert';
import SubdomainModule from '@src/modules/Subdomain/Subdomain.module';
import { Loader } from '@src/shared/components';
import React, { ReactElement } from 'react';
import { useQuery } from 'react-query';

type Props = {
  subdomainId: number;
  onCallback: (data: Subdomain) => void;
};
const { apiService } = new SubdomainModule();

const SubdomainTabs = ({ subdomainId, onCallback }: Props): ReactElement => {
  const { data, isLoading } = useQuery<Subdomain>(`subdomain-id:${subdomainId}`, () =>
    apiService.getOne(subdomainId),
  );

  return <>{isLoading ? <Loader /> : <SubdomainUpsert singleData={data} onCallback={onCallback} />}</>;
};

export default SubdomainTabs;
