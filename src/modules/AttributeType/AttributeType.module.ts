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
import { ApiBuilder } from '@src/shared/utils';
import { FC, lazy } from 'react';

import { Details_PVC_Renderer, PVC_Renderer } from './components/TableComponents';
import { AttributeTypes } from './model/attributeType.entity';
import moduleInfo from './ModuleInfo.json';
import { DateRenderer, ImageRenderer } from '../Product/components/TableComponents';

export default class AttributeTypeModule implements FactoryModule<AttributeTypes> {
  public entity = 'http://88.198.95.174:2020/ClubAdmin/GetAllEvent_Chant';
  public title = [i18n.t('AttributeType.Title'), i18n.t('AttributeType.Title', { count: 2 })];
  public apiService ;

  public UpsertComponent: FC = lazy(() => import('./containers/AttributeTypeUpsert'));
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(params?: any) { 
   
    this.apiService = new ApiBuilder<AttributeTypes>(this.entity, this.title[0],params);

  }
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
      key: 'name',
      label: i18n.t('Global.Name'),
    },
   
  ];

  public tableColumns = [
    {
      width: 150,
      key: 'title',
      dataIndex: 'title',
      className: 'hasTile',
      title: "Title",
    },
    {
      width: 150,
      key: 'startTime',
      dataIndex: 'startTime',
      className: 'hasTile',
      render:DateRenderer,
      title: "Start Time",
    },
    {
      width: 180,
      key: 'countDownStartTime',
      dataIndex: 'countDownStartTime',
      className: 'hasTile',
      render:DateRenderer,
      title: "Count Down Start Time",
    },
    {
      width: 180,
      key: 'chantTypeFileUrl',
      dataIndex: 'chantTypeFileUrl',
      className: 'hasTile',
      render:ImageRenderer,
      title: "File",
    },
   
  ];
}
