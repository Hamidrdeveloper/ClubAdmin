import { ShippingProfile } from '@src/modules/ShippingProfile';
import { ApiBuilder } from '@src/shared/utils';

const API = new ApiBuilder<ShippingProfile>('/ClubAdmin/GetAllBoards');
//
async function getAllShippings(): Promise<ShippingProfile[]> {
  return await (
    await API.getAll({ pagination: { per_page: 100 } })
  ).data;
}

export { getAllShippings };
