import { User } from '@src/core/Authentication/model';
import { generateUserManageLinkBaseOnRole } from '@src/shared/utils/engine.service';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { SubDomainPartner } from '../model/Subdomain.entity';

export const PartnerRenderer = (partner: SubDomainPartner | null): ReactElement => {
  if (!partner?.user) return <span>-</span>;

  const partnerManageLink = generateUserManageLinkBaseOnRole({
    role: 'partner',
    profile: partner.user as unknown as User,
  });

  return partner ? (
    <Link to={partnerManageLink}>{partner.user.person.full_name ?? partner.user.username}</Link>
  ) : (
    <span> - </span>
  );
};
