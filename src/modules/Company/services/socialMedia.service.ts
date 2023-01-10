import axios, { AxiosResponse } from 'axios';

import { SocialMediaFullModel } from '../model/socialMedia.entity';

export async function getSocialMediaSettingsViaCompanyId(companyId: number): Promise<SocialMediaFullModel> {
  try {
    const response: AxiosResponse<SocialMediaFullModel> = await axios.get('/settings/social-media', {
      params: { companyId: companyId },
    });

    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function updateSocialMediaSettings(data: SocialMediaFullModel): Promise<void> {
  try {
    return await axios.put('/settings/social-media', data);
  } catch (e) {
    throw new Error(e);
  }
}
