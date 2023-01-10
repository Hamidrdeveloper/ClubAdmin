import { Country } from '@src/modules/Country';
import { ResponseContext } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';

type updateProps = {
  competitionId: number;
  values: { country_ids: number[] };
};
export function updateCountries({ competitionId, values }: updateProps): Promise<unknown> {
  const CountryAPI = new ApiBuilder<unknown>(`competitions/${competitionId}/countries`);
  return CountryAPI.request({
    method: 'put',
    body: values,
    url: `competitions/${competitionId}/countries`,
  });
}

export async function getAllowedCountries(competitionId: number): Promise<Country[]> {
  const CountryAPI = new ApiBuilder<Country>(`competitions/${competitionId}/countries`);
  try {
    const response: ResponseContext<Country[]> = await CountryAPI.getAll({});

    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}
