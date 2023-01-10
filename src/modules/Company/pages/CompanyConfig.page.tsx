import LogoUpdate from '@src/modules/Company/container/companyConfig/LogoUpdate';
import { Loader } from '@src/shared/components';
import React from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import TitleUpdate from '../container/companyConfig/TitleUpdate';
import {
  getCompanyTitleViaCompanyId,
  getFavIconPathViaCompanyId,
  getLogoPathViaCompanyId,
} from '../services/companyConfig.service';

type Props = {
  companyId: string;
};
const CompanyConfigPage: React.FC<Props> = ({ companyId }) => {
  const { data: websiteTitle, isLoading: websiteTitleLoading } = useQuery<string>(
    ['websiteTitle-companyId-', companyId],
    getCompanyTitleViaCompanyId.bind(null, companyId),
  );
  const { data: logoPath, isLoading: logoLoading } = useQuery<string>(
    ['logo-companyId-', companyId],
    getLogoPathViaCompanyId.bind(null, companyId),
  );

  const { data: FavIconPath, isLoading: FavIconLoading } = useQuery<string>(
    ['favIcon-companyId-', companyId],
    getFavIconPathViaCompanyId.bind(null, companyId),
  );

  return (
    <MainContainer>
      <div className="tabs">
        {websiteTitleLoading ? (
          <Loader />
        ) : (
          <TitleUpdate companyId={companyId} singleData={{ data: { title: websiteTitle ?? '' } }} />
        )}
      </div>

      <div className="tabs">
        {logoLoading ? (
          <Loader />
        ) : (
          <LogoUpdate
            slug="logo"
            name="Website Logo"
            companyId={companyId}
            singleData={{ file: logoPath ?? '' }}
          />
        )}
      </div>

      <div className="tabs">
        {FavIconLoading ? (
          <Loader />
        ) : (
          <LogoUpdate
            slug="favicon"
            companyId={companyId}
            name="Website Favicon"
            singleData={{ file: FavIconPath ?? '' }}
          />
        )}
      </div>
    </MainContainer>
  );
};

export default CompanyConfigPage;

const MainContainer = styled.div`
  border-radius: 12px;
  background: #fff;
  margin-top: 16px;
  position: relative;
  overflow: hidden;
  min-height: 800px;

  & .tabs {
    padding: 16px;

    margin-bottom: 16px;
  }
`;
