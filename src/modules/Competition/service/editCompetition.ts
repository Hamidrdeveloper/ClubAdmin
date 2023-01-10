import axios, { AxiosResponse } from 'axios';

import { CompetitionModel, FullCompetitionFormCtx } from '../model/Competition.entity';

export default async function fullCompetitionEdit(
  competitionId: number,
  values: Partial<FullCompetitionFormCtx>,
): Promise<CompetitionModel> {
  try {
    const response: AxiosResponse<{ data: CompetitionModel }> = await axios.put(
      `competitions/${competitionId}/full-detail-update`,
      values,
    );

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
}
