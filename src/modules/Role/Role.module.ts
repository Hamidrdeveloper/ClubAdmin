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
import { lazy } from 'react';

import { RenderTranslate, TranslateDetailsRenderer } from './components/TableComponents';
import { Role } from './model/role.entity';
import ModuleInfo from './ModuleInfo.json';
import { ImageRenderer, VideoPageRender } from '../Product/components/TableComponents';

export default class RoleModule implements FactoryModule<Role> {
  public entity = 'http://88.198.95.174:2020/ClubAdmin/GetAllVideo';
  public title = [i18n.t('Role.Title'), i18n.t('Role.Title', { count: 2 })];
  public apiService = new ApiBuilder<Role>(this.entity, this.title[0]);

  public UpsertComponent = lazy(() => import('./containers/RoleUpsert'));

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${ModuleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [
    {
      key: 'title',
      label: i18n.t('Global.Title'),
    },
    {
      key: 'company_visibility',
      label: i18n.t('Role.Field.CompanyVisibility'),
    },
    {
      key: 'owner_visibility',
      label: i18n.t('Role.Field.OwnerVisibility'),
    },
    {
      key: 'translate',
      render: TranslateDetailsRenderer,
      label: i18n.t('Role.Field.Language'),
    },
  ];

  public tableColumns = [
    {
      width: 150,
      key: 'title',
      dataIndex: 'title',
      className: 'hasTile',
      title: i18n.t('Global.Title'),
    },
    {
      width: 150,
      key: 'fileUrl',
      dataIndex: 'fileUrl',
      render: VideoPageRender,
      title: i18n.t('Role.Field.Language'),
    },
    {
      width: 150,
      key: 'insertTimeString',
      dataIndex: 'insertTimeString',
      title: "insert Time",
    },
    {
      width: 150,
      key: 'pastTime',
      dataIndex: 'pastTime',
  
      title:"Past Time",
    },
    {
      width: 150,
      key: 'userPictureUrl',
      dataIndex: 'userPictureUrl',
      render:ImageRenderer,
      title: "User Picture",
    }
  ];
}
