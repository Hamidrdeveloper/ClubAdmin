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
import { lazy } from 'react';

import { DetailsFileRenderer, FileRenderer } from './components/TableComponents';
import { Availability } from './model/Availability.entity';
import moduleInfo from './ModuleInfo.json';
import { DateRenderer, ImageRenderer, TimeRender } from '../Product/components/TableComponents';

export default class AvailabilityModule implements FactoryModule<Availability> {
  public entity = 'http://88.198.95.174:2020/ClubAdmin/GetAllChants';
  public title = ["Chant", "Chant"];
  public apiService = new ApiBuilder<Availability>(this.entity, this.title[0]);

  public UpsertComponent = lazy(() => import('./containers/AvailabilityUpsert'));

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
      label: "Title",
    },
    {
      key: 'duration_MSC',
      label:"duration_MSCc",
      render:TimeRender,
    },
    {
      key: 'chantTypeFileUrl',
      label: i18n.t('Availability.Field.File'),
      render: ImageRenderer,
    },
  ];

  public tableColumns = [
    {
      width: 180,
      key: 'title',
      dataIndex: 'title',
      className: 'hasTile',
      title: "Title",
    },
    {
      width: 150,
      key: 'duration_MSC',
      dataIndex: 'duration_MSC',
      className: 'number hasTile',
      title: "Duration_MSC",
      render:TimeRender,
    },
    {
      width: 150,
      key: 'chantTypeFileUrl',
      dataIndex: 'chantTypeFileUrl',
      render: ImageRenderer,
      title: i18n.t('Availability.Field.File'),
    },
  ];
}
