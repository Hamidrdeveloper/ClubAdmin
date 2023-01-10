/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheckimport i18n from '@src/core/i18n/config';
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { FC, lazy, ReactElement } from 'react';
import { ActionButtonRender } from '../Product/components/TableComponents';

import { PriceType } from './model/priceType.entity';
import moduleInfo from './ModuleInfo.json';
import DateRenderer from '@src/shared/components/Date/DateRenderer';
import { RoundedImage } from '@src/shared/components';

export default class PriceTypeModule implements FactoryModule<PriceType> {
  public entity = 'http://88.198.95.174:2020/ClubAdmin/GetAllEvents';
  public title = [i18n.t('PriceType.Title'), i18n.t('PriceType.Title', { count: 2 })];
  public apiService = new ApiBuilder<PriceType>(this.entity, this.title[0]);

  public UpsertComponent: FC = lazy(() => import('./containers/PriceTypeUpsert'));

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${moduleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [
    {
      key: 'name',
      label: i18n.t('Global.Name'),
    },
  ];

  public tableColumns = [
    {
      key: 'title',
      dataIndex: 'title',
      className: 'hasTile',
      title: i18n.t('Global.Name'),
    },
    {
      key: 'startTime',
      dataIndex: 'startTime',
      render: DateRenderer,
      className: 'hasTile',
      title: "startTime",
    },
    {
      key: 'endTime',
      dataIndex: 'endTime',
      className: 'hasTile',
      render: DateRenderer,
      title: "endTime",
    },
   
    
  ];
}
