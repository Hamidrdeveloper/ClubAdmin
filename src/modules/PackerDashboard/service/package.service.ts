import { Package } from '@src/modules/Package';
import { ApiBuilder } from '@src/shared/utils';

const API = new ApiBuilder<Package>('/packages');
//
async function getAllPackages(): Promise<Package[]> {
  return await (
    await API.getAll({ pagination: { per_page: 100 } })
  ).data;
}

export { getAllPackages };
