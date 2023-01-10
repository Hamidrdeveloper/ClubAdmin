import { generateUserLinkBasedOnIdAndRole } from '@src/shared/utils/engine.service';
import React, { ReactElement } from 'react';

import InfoLegend from '../InfoLegend';

type props = {
  idList: number[];
};
const PartnerBirthdayList = ({ idList }: props): ReactElement => {
  return (
    <div>
      {idList.map((partnerId) => (
        <InfoLegend
          amt={partnerId}
          key={partnerId}
          text={`Navigate to Partner: ${partnerId}`}
          link={generateUserLinkBasedOnIdAndRole(partnerId, 'partner')}
        />
      ))}
    </div>
  );
};

export default PartnerBirthdayList;
