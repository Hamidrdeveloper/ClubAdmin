import { User as UserAuthenticationModel } from '@src/core/Authentication/model';
import { User } from '@src/modules/User';
import { generateUserManageLinkBaseOnRole } from '@src/shared/utils/engine.service';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export const OwnerRedirection = (owner: User | null): ReactElement => {
  if (!owner) return <span>-</span>;
  const userRole = owner.roles.map((role) => role.slug)[0];

  const manageLink = generateUserManageLinkBaseOnRole({
    role: userRole,
    profile: owner as unknown as UserAuthenticationModel,
  });

  return <>{owner ? <Link to={manageLink}>{owner.username ?? owner.id}</Link> : <span> - </span>}</>;
};

export const IsBasic = (isBasic: boolean | null): ReactElement => {
  return <span>{isBasic ? 'Basic' : 'Not Basic'}</span>;
};
