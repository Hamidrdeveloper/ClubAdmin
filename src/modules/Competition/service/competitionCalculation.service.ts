import { CopyCompetitionModel } from '@src/modules/Competition/model/Competition.entity';
import axios, { AxiosResponse } from 'axios';

export default async function calculateCompetition(competitionId: number): Promise<string> {
  try {
    const response: AxiosResponse<{ data: { message: string } }> = await axios.post(
      `competitions/rule-calculation-job`,
      { id: competitionId },
    );

    return response.data.data.message;
  } catch (e) {
    throw new Error(e);
  }
}

export async function redeemCompetitionRewards(competitionId: number): Promise<string> {
  try {
    const response: AxiosResponse<{ data: { message: string } }> = await axios.post(
      'competition-rewards/assign-to-user',
      {
        competition_id: competitionId,
      },
    );

    return response.data.data.message;
  } catch (e) {
    throw new Error(e);
  }
}

export async function copyCompetition(id: number): Promise<CopyCompetitionModel> {
  const result: { data: { data: CopyCompetitionModel } } = await axios.post(`competitions/${id}/copy`);
  return result?.data?.data;
}
