import { Country } from '@src/modules/Country';
import { ApiBuilder } from '@src/shared/utils';

const API = new ApiBuilder<Country>('');
//
async function getAllCountries(): Promise<Country[]> {
  return await API.request<Country[]>({
    url: '/picker-dashboard/countries',
    method: 'GET',
    params: { isActive: true },
  });
}

export { getAllCountries };
