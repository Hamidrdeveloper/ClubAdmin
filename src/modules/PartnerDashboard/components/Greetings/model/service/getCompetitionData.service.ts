import { RangeDateProps } from '@src/modules/PartnerDashboard/pages/PartnerDashboard';
import axios, { AxiosResponse } from 'axios';

import { CompetitionTextModel } from '../headerTexts.entity';

type params = {
  id: number;
  selectedDateRange: RangeDateProps;
};

export async function getCompetitionData({ id, selectedDateRange }: params): Promise<CompetitionTextModel[]> {
  const url = `partner-dashboard/${id}/competitions`;

  try {
    const response: AxiosResponse<{ data: CompetitionTextModel[] }> = await axios.get(url, {
      params: selectedDateRange,
    });

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
}
