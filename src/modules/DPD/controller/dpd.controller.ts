import { DPDModel } from '../model/dpd.entity';
import { editDPDSettings, getDPDSettings } from '../service/dpd.service';

export const getDPDSetting = async (): Promise<DPDModel | null> => await getDPDSettings();

export const editDPDSetting = async (data: DPDModel): Promise<DPDModel | null> =>
  await editDPDSettings({
    data,
    id: 16,
    slug: 'dpd',
    partner_id: null,
    template_setting_id: 10,
  });
