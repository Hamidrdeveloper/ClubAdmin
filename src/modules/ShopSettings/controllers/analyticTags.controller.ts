import { AnalyticTagsModel } from '../model/analyticTags.entity';
import { editAnalyticTagsSettings, getAnalyticTagsSettings } from '../services/analyticTags.service';

export const getAnalyticTagsSetting = async (): Promise<AnalyticTagsModel[] | null> =>
  await getAnalyticTagsSettings();

export const editAnalyticTagsSetting = async (
  data: AnalyticTagsModel[],
): Promise<AnalyticTagsModel[] | null> =>
  await editAnalyticTagsSettings({
    data,
    id: 14,
    partner_id: null,
    slug: 'analytic-tags',
    template_setting_id: 7,
  });
