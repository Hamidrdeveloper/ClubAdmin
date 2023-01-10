/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import Env from '@src/core/Configs/ConfigureEnv';
import { ActionButton, RoundedImage, VideoRender } from '@src/shared/components';
import { intlDate } from '@src/shared/utils/engine.service';
import { Row, Tag, Tooltip } from 'antd';
import React, { FC, ReactElement } from 'react';

import { MovementJournals, MovementJournalsItem } from '../model/Movement.entity';

export const ImageRenderer = (data: string): ReactElement => <RoundedImage image={data} />;
export const VideoPageRender = (data: string): ReactElement => <VideoRender value={data} />;
export const ActionButtonRender = (): ReactElement => <ActionButton/>;

export const DetailImageRenderer = ({ data }: { data: string }): ReactElement => (
  <Row justify="end">
    <RoundedImage image={Env.PURE_URL + data} />
  </Row>
);

export const PurchasePriceRenderer: FC<MovementJournalsItem[]> = (_, allData: MovementJournals) => {
  const items = allData.items;

  const filteredItems = items
    .filter((item) => item?.purchase_price)
    .map((item) => ({ id: item.id, price: item?.purchase_price }));

  if (filteredItems.length === 0) {
    return <span>-</span>;
  }

  return (
    <span>
      {filteredItems.map((item) => (
        <Tag color={'geekblue'} key={item.id}>
          {item.price}
        </Tag>
      ))}
    </span>
  );
};

export const QuantityRenderer: FC<MovementJournalsItem[]> = (_, allData: MovementJournals) => {
  const items = allData.items;

  const quantityWithIds = items
    .filter((item) => item?.quantity)
    .map((item) => ({ id: item.id, quantity: item?.quantity }));

  if (quantityWithIds.length === 0) {
    return <span>-</span>;
  }

  return (
    <span>
      {quantityWithIds.map((item) => (
        <Tag color={'geekblue'} key={item.id}>
          {item.quantity}
        </Tag>
      ))}
    </span>
  );
};

export const BatchRenderer: FC<MovementJournalsItem[]> = (_, allData: MovementJournals) => {
  const items = allData.items;

  const filteredItems = items
    .filter((item) => item?.batch)
    .map((item) => ({ id: item.id, batch: item?.batch }));

  if (filteredItems.length === 0) {
    return <span>-</span>;
  }

  return (
    <span>
      {filteredItems.map((item) => (
        <Tag color={'geekblue'} key={item.id}>
          {item.batch}
        </Tag>
      ))}
    </span>
  );
};

export const NullRenderer: FC<string | number | null> = (data) => {
  if (!data) return <span>-</span>;
  else return <span>{data}</span>;
};

export const TooltipRenderer: FC<{ data: string; tooltip: string }> = ({ data, tooltip }) => {
  return (
    <Tooltip title={tooltip}>
      <span>{data ?? '-'}</span>
    </Tooltip>
  );
};

export const DateRenderer: React.FC<string | null> = (date) => {
  return (
    <span>
      <strong>{date ? intlDate(new Date((date ?? '').replace(/'-'/g, '/'))) : ' - '}</strong>
    </span>
  );
};
export const TimeRender: React.FC<string | null> = (value) => {
  const minutes = Math.floor(value / 60000);
  const seconds = ((value % 60000) / 1000).toFixed(0);
  return (
    <span>
      <strong> {minutes}:{seconds < 10 ? '0' : ''}{seconds} </strong>
    </span>
  );
};
export const TimePickerRender: React.FC<string | null> = (value) => {
  const minutes = Math.floor(value / 60000);
  const seconds = ((value % 60000) / 1000).toFixed(0);
  return (
    <span>
      <strong> {minutes}:{seconds < 10 ? '0' : ''}{seconds} </strong>
    </span>
  );
};
export const ExpireDateRenderer: React.FC<MovementJournalsItem[]> = (_, allData: MovementJournals) => {
  const items = allData.items;

  const filteredItems = items
    .filter((item) => item?.expire_date)
    .map((item) => ({ id: item.id, expire_date: item?.expire_date }));

  if (filteredItems.length === 0) {
    return <span>{' - '}</span>;
  }

  return (
    <span>
      {filteredItems.map((item) => (
        <strong key={item.id}>{intlDate(new Date(item.expire_date))}</strong>
      ))}
    </span>
  );
};

export const DetailDateRenderer: React.FC<{ data: string | null }> = ({ data }) => {
  return (
    <span>
      <strong>{data ? intlDate(new Date((data ?? '').replace(/'-'/g, '/'))) : ' - '}</strong>
    </span>
  );
};
