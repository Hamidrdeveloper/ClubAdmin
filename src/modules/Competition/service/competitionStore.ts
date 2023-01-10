import { atom } from 'jotai';

import { CompetitionModel } from '../model/Competition.entity';

export const competitionIdAtom = atom<number | undefined | null>(undefined);
export const competitionAtom = atom<CompetitionModel | undefined>(undefined);
