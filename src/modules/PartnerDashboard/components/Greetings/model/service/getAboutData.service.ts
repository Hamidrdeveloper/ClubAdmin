import { RangeDateProps } from '@src/modules/PartnerDashboard/pages/PartnerDashboard';
import axios, { AxiosResponse } from 'axios';

import { AboutPartnerModel } from '../about.entity';

type params = {
  id: number;
  selectedDateRange: RangeDateProps;
};
export async function getAboutData({ id, selectedDateRange }: params): Promise<AboutPartnerModel> {
  const aboutUrl = `partner-dashboard/${id}/about`;

  try {
    const response: AxiosResponse<{ data: AboutPartnerModel }> = await axios.get(aboutUrl, {
      params: selectedDateRange,
    });

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
}
