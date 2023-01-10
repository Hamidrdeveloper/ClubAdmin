import axios, { AxiosResponse } from 'axios';

import { AnalyticTagsFullModel } from '../model/analytic.entity';

export async function getAnalyticTagsViaCompanyId(
  companyId: string | number,
): Promise<AnalyticTagsFullModel> {
  try {
    const response: AxiosResponse<unknown> = await axios.get(
      `/settings/analytic-tags?company_id=${companyId}`,
    );

    return response.data as AnalyticTagsFullModel;
  } catch (e) {
    throw new Error(e);
  }
}

export async function updateAnalyticTags(data: AnalyticTagsFullModel): Promise<void> {
  try {
    return await axios.put(`/settings/analytic-tags`, data);
  } catch (e) {
    throw new Error(e);
  }
}
