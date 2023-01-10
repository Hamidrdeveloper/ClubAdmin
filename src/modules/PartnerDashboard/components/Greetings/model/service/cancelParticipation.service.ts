import axios, { AxiosResponse } from 'axios';

type props = {
  competitionId: number;
  hasAcceptedConditions?: boolean;
};

// TODO: change unknown
export async function cancelParticipationService({
  competitionId,
  hasAcceptedConditions,
}: props): Promise<unknown> {
  try {
    const response: AxiosResponse<unknown> = await axios.put(`competitions/${competitionId}/participate`, {
      accept_terms: hasAcceptedConditions ?? false,
    });

    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}
