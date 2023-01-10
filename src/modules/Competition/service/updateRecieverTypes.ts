import { ApiBuilder } from '@src/shared/utils';

type Props = {
  competitionId: number;
  career_step_ids: number[];
};
export function updateReceiverTypesList({ competitionId, ...career_step_ids }: Props): Promise<unknown> {
  const API = new ApiBuilder<unknown>(`competition-rules/${competitionId}/career-steps`);
  return API.request({
    method: 'put',
    body: career_step_ids,
    url: `competition-rules/${competitionId}/career-steps`,
  });
}
