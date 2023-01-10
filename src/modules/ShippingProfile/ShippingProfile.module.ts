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

import {
  DetailsFileRenderer,
  DetailsLinkRenderer,
  FileRenderer,
  LinkRenderer,
} from '../ShippingProfile/components/TableComponents';
import { ShippingProfile } from './model/shippingProfile.entity';
import ModuleInfo from './ModuleInfo.json';
import { ImageRenderer } from '../Product/components/TableComponents';

export default class ShippingProfileModule implements FactoryModule<ShippingProfile> {
  public entity = 'http://88.198.95.174:2020/ClubAdmin/GetAllBoards';
  public title = [i18n.t('ShippingProfile.Title'), i18n.t('ShippingProfile.Title', { count: 2 })];
  public apiService = new ApiBuilder<ShippingProfile>(this.entity, this.title[0]);
 

  public UpsertComponent = lazy(() => import('./containers/ShippingProfileUpsert'));

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${ModuleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [
    {
      key: 'title',
      label: i18n.t('Global.Name'),
    },
    {
      key: 'title',
      label: i18n.t('ShippingProfile.Type'),
    },
    {
      key: 'title',
      render: DetailsFileRenderer,
      label: i18n.t('ShippingProfile.Icon'),
    },
    {
      key: 'title',
      render: DetailsLinkRenderer,
      label: i18n.t('ShippingProfile.TrackingLink'),
    },
  ];

  public tableColumns = [
    {
      width: 220,
      key: 'title',
      dataIndex: 'title',
      className: 'hasTile',
      title: i18n.t('Global.Name'),
    },
    {
      width: 350,
      key: 'description',
      dataIndex: 'description',
      className: 'hasTile',
      title: i18n.t('Global.Description'),
    },
    {
      key: 'pictureUrl',
      dataIndex: 'pictureUrl',
      render: ImageRenderer,
      className: 'hasTile',
      title: i18n.t('Global.Image'),
    },
  ];

  public ShippingProfileTypes: { label: string; value: string }[] = [
    { label: i18n.t('ShippingProfile.PostType'), value: 'post' },
    { label: i18n.t('ShippingProfile.PackageType'), value: 'package' },
    { label: i18n.t('ShippingProfile.FreightType'), value: 'freight' },
  ];
}
