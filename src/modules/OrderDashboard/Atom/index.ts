import { User } from '@core/Authentication/model';
import { ProductVariation } from '@modules/Product/model/ProductVariation.entity';
import { atom } from 'jotai';

export const userAtom = atom<User | null>(null);
export const productAtom = atom<{ id: number; product: ProductVariation; count: number }[]>([]);
export const addressAtom = atom<any>(null);
export const paymentAtom = atom<string | null>(null);
export const shippingAtom = atom<string | null>(null);
