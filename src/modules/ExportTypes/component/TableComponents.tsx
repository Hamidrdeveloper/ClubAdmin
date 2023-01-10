import { intlDate, startCase } from '@src/shared/utils/engine.service';
import { Tag } from 'antd';
import React, { FC } from 'react';

import { DataTypes, ExportTypeModel } from '../model/ExportsTypes.entity';

export const TagRenderer: FC<string[]> = (headers) => {
  return (
    <>
      {headers.map((header) => (
        <Tag>{header}</Tag>
      ))}
    </>
  );
};

export const FilterKeysRenderer: FC<Record<string, DataTypes>> = (filters) => {
  return (
    <>
      {Object.keys(filters).map((key) => (
        <Tag key={key}>{startCase(key)}</Tag>
      ))}
    </>
  );
};

export const DateRenderer: React.FC<Date | string> = (date) => (
  <span>{date ? intlDate(new Date((date as unknown as string).replace(/'-'/g, '/'))) : '-'}</span>
);

export const ExportDataTypeNameRenderer: FC<ExportTypeModel> = (exportType) => {
  return <span>{exportType.name}</span>;
};
