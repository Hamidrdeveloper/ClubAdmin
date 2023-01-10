import i18n from '@core/i18n/config';
import { IconPack } from '@src/shared/components';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { lazy } from 'react';

import { Flag } from './model/flag.entity';
import moduleInfo from './ModuleInfo.json';

export default class FlagModule implements FactoryModule<Flag> {
  public entity = 'http://88.198.95.174:2020/ClubAdmin/GetAllChant_Audio';
  public title = [i18n.t('Country.Title'), i18n.t('Country.Title', { count: 2 })];
  public apiService = new ApiBuilder<Flag>(this.entity, this.title[0]);

  public UpsertComponent = lazy(() => import('./containers/FlagUpsert'));

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${moduleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [
    {
      key: 'color',
      label: i18n.t('Flag.Field.Color'),
    },
    {
      key: 'icon',
      label: i18n.t('Flag.Field.Icon'),
    },
  ];

  public tableColumns = [
    {
      key: 'name',
      width: 120,
      dataIndex: 'name',
      className: 'hasTile',
      title: i18n.t('Global.Name'),
    },
    {
      key: 'icon',
      dataIndex: 'icon',
      className: 'hasTile',
      title: i18n.t('Flag.Field.Icon'),
      render: (icon: string, rest: Flag): JSX.Element =>
        IconPack[icon] ? IconPack[icon]({ color: rest.color }) : '-',
    },
  ];

  public icons = [
    { key: 1, icon: 'FaBell' },
    { key: 2, icon: 'FaStar' },
    { key: 3, icon: 'FaLock' },
    { key: 4, icon: 'FaExclamationCircle' },
    { key: 5, icon: 'FaExclamationTriangle' },
    { key: 6, icon: 'FaBomb' },
    { key: 7, icon: 'FaCloudShowersHeavy' },
    { key: 8, icon: 'FaCloudMoonRain' },
    { key: 9, icon: 'FaCloudMeatball' },
    { key: 10, icon: 'FaSun' },
    { key: 11, icon: 'FaFlag' },
  ];
}
