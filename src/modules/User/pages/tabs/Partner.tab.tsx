import { Partner } from '@src/modules/Partner';
import PartnerModule from '@src/modules/Partner/Partner.module';
import { Loader } from '@src/shared/components';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { UpsertWrapper } from '@src/shared/styles';
import React, { ReactElement, useEffect, useState } from 'react';

import PartnerUpsert from '../../containers/PartnerUpsert';

type props = {
  userId: number;
  partnerId?: number;
  sponsorId?: number;
};

const PartnerTab = ({ userId, partnerId, sponsorId }: props): ReactElement => {
  const [isLoading, setIsLoading] = useState(false);
  const [singleData, setSingleData] = useState({} as Partner);

  const partnerModule = new PartnerModule();
  const title = partnerModule.title[0];

  const routes = [
    ...partnerModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: partnerId ? `Update ${title} - ${partnerId}` : `New ${title}`,
    },
  ];

  useEffect(() => {
    if (partnerId) {
      setIsLoading(true);
      partnerModule.apiService
        .getOne(+partnerId)
        .then((data) => {
          setSingleData(data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <UpsertWrapper>
      <div className="header">
        <ModalHeader hideBackBtn items={routes} />
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <PartnerUpsert userId={userId} sponsorId={sponsorId} singleData={singleData} />
      )}
    </UpsertWrapper>
  );
};

export default PartnerTab;
