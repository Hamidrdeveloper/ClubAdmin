import { atom } from 'jotai';
import { atomWithQuery } from 'jotai/query';

import { SocialMediaModel } from '../../model/socialMedia.entity';
import { getSocialMediaSettings } from '../socialMedia.service';

const socialMediaStore = atom([]);

export const socialMediaAtom = atomWithQuery((get) => ({
  queryKey: ['socialMedia', get(socialMediaStore)],
  queryFn: async (): Promise<SocialMediaModel[]> => (await getSocialMediaSettings()) ?? [],
}));
