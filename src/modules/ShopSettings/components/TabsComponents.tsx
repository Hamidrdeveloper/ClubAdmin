import React, { ReactElement } from 'react';

import AnalyticTags from '../containers/AnalyticTags.tab';
import CustomExport from '../containers/CustomExport.tab';
import Partner from '../containers/Partner.tab';
import SaleSystem from '../containers/SaleSystem.tab';
import SocialMedia from '../containers/SocialMedia.tab';
import { AnalyticTagsModel } from '../model/analyticTags.entity';
import { PartnerModel } from '../model/partner.entity';
import { SaleSystemModel } from '../model/saleSystem.entity';
import { SocialMediaModel } from '../model/socialMedia.entity';

export const SaleSystemTab = (saleSystemSettings: SaleSystemModel | null): ReactElement | null =>
  saleSystemSettings && <SaleSystem settings={saleSystemSettings} />;

export const PartnerTab = (partnerSettings: PartnerModel | null): ReactElement | null =>
  partnerSettings && <Partner settings={partnerSettings} />;

export const AnalyticTagsTab = (analyticTagsSettings: AnalyticTagsModel[]): ReactElement | null => (
  <AnalyticTags settings={analyticTagsSettings} />
);

export const SocialMediaTab = (socialMediaSettings: SocialMediaModel[]): ReactElement | null => (
  <SocialMedia settings={socialMediaSettings} />
);

export const ExportCustomTab = (exportCustomSettings: {
  order_user_id: number | null;
  order_status_id: number | null;
}): ReactElement | null => <CustomExport settings={exportCustomSettings} />;
