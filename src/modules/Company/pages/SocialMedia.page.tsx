// NOTE: this file functionality has been moved to ./container/SocialMediaUpdate.tsx

import SocialMedia from '@src/modules/ShopSettings/containers/SocialMedia.tab';
import { Loader } from '@src/shared/components';
import React, { ReactElement } from 'react';
import { useQuery } from 'react-query';

import { SocialMediaFullModel } from '../model/socialMedia.entity';
import { getSocialMediaSettingsViaCompanyId } from '../services/socialMedia.service';

type Props = {
  id: number | string;
};
const SocialMediaPage = ({ id }: Props): ReactElement => {
  const { data, isLoading } = useQuery<SocialMediaFullModel>(
    ['socialMediaSettings-companyId', id],
    getSocialMediaSettingsViaCompanyId.bind(null, id),
  );

  return <>{isLoading ? <Loader /> : <SocialMedia settings={data?.data ?? []} />}</>;
};

export default SocialMediaPage;
