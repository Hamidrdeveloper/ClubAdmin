import { Role } from '@src/modules/Role';
import { intlDate } from '@src/shared/utils/engine.service';
import { Tag } from 'antd';
import React from 'react';

export const NameRenderer: React.FC<{ name: string; id: number }> = ({ name, id }) => {
  return (
    <span>
      {name} {id}
    </span>
  );
};

export const DateRenderer: React.FC<{ date: string | null }> = ({ date }) => {
  return (
    <span>
      <strong>{date ? intlDate(new Date((date as string).replace(/'-'/g, '/'))) : ' - '}</strong>
    </span>
  );
};

export const RolesNameRenderer: React.FC<Role[]> = (roles) => {
  return (
    <>
      {roles.map((role) => (
        <Tag>{role.slug}</Tag>
      ))}
    </>
  );
};
