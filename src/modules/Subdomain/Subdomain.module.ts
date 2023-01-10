import i18n from '@src/core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils/api-builder.service';
import { ReactElement, lazy } from 'react';

import { PartnerRenderer } from './components/TableComponents';
import { SubDomainPartner, Subdomain } from './model/Subdomain.entity';
import moduleInfo from './ModuleInfo.json';

export default class SubdomainModule implements FactoryModule<Subdomain> {
  public entity = '/subdomains';
  public title = [i18n.t('Subdomain.Title'), i18n.t('Subdomain.Title', { count: 2 })];
  public apiService = new ApiBuilder<Subdomain>(this.entity, this.title[0]);

  public UpsertComponent = lazy(() => import('./containers/SubdomainUpsert'));

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
      width: 180,
      key: 'name',
      dataIndex: 'name',
      className: 'hasTile',
      title: i18n.t('Global.Name'),
    },
    {
      width: 180,
      key: 'title',
      dataIndex: 'title',
      title: i18n.t('Global.Title'),
    },
    {
      width: 180,
      key: 'partner',
      dataIndex: 'partner',
      className: 'hasTile',
      title: i18n.t('Subdomain.Table.Partner'),
      render: (partner: SubDomainPartner | null): ReactElement => PartnerRenderer(partner),
    },
  ];
}
