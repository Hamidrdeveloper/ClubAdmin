import { ThemeContext } from '@src/modules/Widget/model/widget.entity';
import axios, { AxiosResponse } from 'axios';

import { CompanyThemesFullModel } from '../model/theme.entity';

export async function getThemeViaCompanyId(companyId: number): Promise<ThemeContext> {
  try {
    const response: AxiosResponse<ThemeContext> = await axios.get(`settings/theme`, {
      params: { company_id: companyId },
    });

    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function updateThemeSettings(values: CompanyThemesFullModel): Promise<void> {
  try {
    return await axios.put(`/settings/theme`, values);
  } catch (e) {
    throw new Error(e);
  }
}
