import { EyeOutlined } from '@ant-design/icons';
import { intlDate } from '@src/shared/utils/engine.service';
import { Tag } from 'antd';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export const DateRenderer: React.FC<Date | string> = (date) => (
  <span>{date ? intlDate(new Date((date as string).replace(/'-'/g, '/'))) : '-'}</span>
);

export const DetailDateRenderer = ({ data }: { data: string }): ReactElement => {
  return (
    <span>
      <strong>{data ? intlDate(new Date((data as string).replace(/'-'/g, '/'))) : '-'}</strong>
    </span>
  );
};

export const EventLink = (id: number): ReactElement => {
  return (
    <Link to={`/admin/calendar/events/${id}`}>
      <Tag color="magenta">
        <EyeOutlined />
        <span>Events</span>
      </Tag>
    </Link>
  );
};
