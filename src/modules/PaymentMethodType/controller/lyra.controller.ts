import { LyraModel } from '../model/lyra.entity';
import { editLyraSettings, getLyraSettings } from '../service/lyra.service';

export const getLyraSetting = async (): Promise<LyraModel | null> => await getLyraSettings();

export const editLyraSetting = async (data: LyraModel): Promise<LyraModel | null> =>
  await editLyraSettings({
    data,
    id: 10,
    partner_id: null,
    subdomain_id: null,
    slug: 'lyra',
    template_setting_id: 10,
  });
