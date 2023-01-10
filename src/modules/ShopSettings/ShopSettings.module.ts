import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { ReactElement } from 'react';

import { AnalyticTagsTab, ExportCustomTab, SaleSystemTab, SocialMediaTab } from './components/TabsComponents';
import { AnalyticTagsModel } from './model/analyticTags.entity';
import { PartnerModel } from './model/partner.entity';
import { SaleSystemModel } from './model/saleSystem.entity';
import { SocialMediaModel } from './model/socialMedia.entity';
import ModuleInfo from './ModuleInfo.json';

type InputTabData = {
  analyticTagsSettings: AnalyticTagsModel[];
  partnerSettings: PartnerModel | null;
  saleSystemSettings: SaleSystemModel | null;
  socialMediaSettings: SocialMediaModel[];
  exportCustomSettings: { order_user_id: number | null; order_status_id: number | null };
};

export default class ShopSettingsModule implements FactoryModule<unknown> {
  public entity = '/';
  public title = [i18n.t('ShopSettings.Title'), i18n.t('ShopSettings.Title', { count: 2 })];
  public apiService = new ApiBuilder<unknown>(this.entity, this.title[0]);

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${ModuleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [
    {
      key: 'id',
      label: 'ID',
    },
  ];

  public tableColumns = [];

  public Tabs = [
    {
      title: i18n.t('ShopSettings.Tab.SaleSystem'),
      children: ({ saleSystemSettings }: InputTabData): ReactElement | null =>
        SaleSystemTab(saleSystemSettings),
    },
    // {
    //   title: i18n.t('ShopSettings.Tab.Partner'),
    //   children: ({ partnerSettings }: InputTabData): ReactElement | null => PartnerTab(partnerSettings),
    // },
    {
      title: i18n.t('ShopSettings.Tab.AnalyticTags'),
      children: ({ analyticTagsSettings }: InputTabData): ReactElement | null =>
        AnalyticTagsTab(analyticTagsSettings),
    },
    {
      title: i18n.t('ShopSettings.Tab.SocialMedia'),
      children: ({ socialMediaSettings }: InputTabData): ReactElement | null =>
        SocialMediaTab(socialMediaSettings),
    },
    {
      title: i18n.t('ShopSettings.Tab.ExportCustom'),
      children: ({ exportCustomSettings }: InputTabData): ReactElement | null =>
        ExportCustomTab(exportCustomSettings),
    },
  ];
}
