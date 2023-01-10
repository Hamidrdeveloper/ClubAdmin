import { AnalyticTagsModel } from '../model/analyticTags.entity';
import { editAnalyticTagsSettings, getAnalyticTagsSettings } from '../services/analyticTags.service';

export const getAnalyticTagsSetting = async (
  subdomain_id: number,
  partner_id: number,
  company_id?: number,
): Promise<AnalyticTagsModel[] | null> => await getAnalyticTagsSettings(subdomain_id, partner_id, company_id);

export const editAnalyticTagsSetting = async (
  data: AnalyticTagsModel[],
  subdomain_id: number,
  partner_id: number,
  company_id?: number,
): Promise<AnalyticTagsModel[] | null> =>
  await editAnalyticTagsSettings({
    data,
    id: 14,
    partner_id,
    company_id,
    subdomain_id,
    slug: 'analytic-tags',
    template_setting_id: 7,
  });
