import { Tag } from 'antd';
import Text from 'antd/lib/typography/Text';
import moment from 'moment';
import React, { FC, ReactElement } from 'react';

import { CouponCodes } from '../model/coupon.entity';

export const DateRenderer = (date: string): ReactElement => {
  return (
    <span>
      <strong>{moment(date).format('DD.MM.yyyy')}</strong>
    </span>
  );
};

export const CodesRenderer: FC<CouponCodes[]> = (codes) => {
  return (
    <span>
      {(codes || []).map((tag) => (
        <Tag color={'geekblue'} key={tag.id}>
          {tag.code}
        </Tag>
      ))}
    </span>
  );
};

export const DescriptionRenderer = ({ data }: { data: string }): ReactElement => {
  return (
    <>
      {typeof data === 'string' ? (
        <Text
          ellipsis={{
            tooltip: data,
          }}
        >
          <strong>{data}</strong>
        </Text>
      ) : (
        <span>
          <strong>-</strong>
        </span>
      )}
    </>
  );
};
