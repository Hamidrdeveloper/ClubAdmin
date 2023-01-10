import { atom } from 'jotai';

export const isCustomerAtom = atom<boolean | undefined>(undefined);

export const isPartnerAtom = atom<boolean | undefined>(undefined);

// setting default state will determine which form to render (on the new button click in user list)
export const userRoleAtom = atom<'user' | 'admin' | 'partner' | string>('');
