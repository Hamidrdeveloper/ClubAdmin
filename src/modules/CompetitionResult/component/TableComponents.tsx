import { intlDate } from '@src/shared/utils/engine.service';
import React, { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { CompetitionResultModel } from '../model/competitionResult.entity';

export const DateRenderer: React.FC<string> = (date) => {
  return (
    <span>{date ? intlDate(new Date(((date as unknown as string) || '').replace(/'-'/g, '/'))) : '-'}</span>
  );
};

export const PartnerLink = (id: number): ReactElement => {
  return (
    <Link to={`/admin/dashboard/partner/${id}`}>
      <span>{id}</span>
    </Link>
  );
};

export const UserLink: FC<number> = (id, allData: CompetitionResultModel): ReactElement => {
  const { competitionRule } = allData;
  const competitionId = competitionRule.competition_id;

  return (
    <Link to={`/admin/competition/${competitionId}/users/${id}`}>
      <span>{id}</span>
    </Link>
  );
};
