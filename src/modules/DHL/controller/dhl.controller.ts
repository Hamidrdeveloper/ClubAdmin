import { DHLModel } from '../model/dhl.entity';
import { editDHLSettings, getDHLSettings } from '../service/dhl.service';

export const getDHLSetting = async (): Promise<DHLModel | null> => await getDHLSettings();

export const editDHLSetting = async (data: DHLModel): Promise<DHLModel | null> =>
  await editDHLSettings({
    data,
    id: 17,
    slug: 'dhl',
    partner_id: null,
    template_setting_id: 10,
  });
