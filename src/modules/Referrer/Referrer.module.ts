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
import i18n from '@src/core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils/api-builder.service';
import { ReactElement, lazy } from 'react';

import { User } from '../User';
import { IsBasic, OwnerRedirection } from './components/TableComponents';
import { Referrer } from './model/Referrer.entity';
import moduleInfo from './ModuleInfo.json';
import { DateRenderer } from '../Wallets/components/TableComponents';
import { ImageRenderer } from '../Product/components/TableComponents';

export default class ReferrerModule implements FactoryModule<Referrer> {
  public entity = 'http://88.198.95.174:2020/ClubAdmin/GetAllChantTypes';
  public title = [i18n.t('Referrer.Title'), i18n.t('Referrer.Title', { count: 2 })];
  public apiService = new ApiBuilder<Referrer>(this.entity, this.title[0]);

  public UpsertComponent = lazy(() => import('./containers/ReferrerUpsert'));

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${moduleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'title',
      label: i18n.t('Global.Title'),
    },
  ];

  public tableColumns = [
    {
      key: 'title',
      dataIndex: 'title',
      className: 'hasTile',
      title:"Title",
    
    },
    {
      key: 'point',
      dataIndex: 'point',
      className: 'point',
      title: "Point",
    },
    {
      key: 'insertTime',
      dataIndex: 'insertTime',
      title: "Insert Time",
      render:DateRenderer
    },

    {
      key: 'fileUrl',
      dataIndex: 'fileUrl',
      title: "File",
      render:ImageRenderer
    }
  ];
}
