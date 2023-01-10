import { GroupTypeBase } from 'react-select';
import { LoadOptions } from 'react-select-async-paginate';

export type LoadOptionFunc<Type> = LoadOptions<Type, GroupTypeBase<Type>, { page: number }>;

export interface AsyncSelect {
  hasNew: boolean;
  isMulti: boolean;
  isClearable?: boolean;
  searchParam: string;
  menuPlacement?: 'top' | 'bottom';
  onChange: (data: unknown | unknown[]) => void;
}

export type AsyncFilterSelectProps = Partial<AsyncSelect> & {
  url: string;
  title?: string;
  pending?: boolean;
  maxItemsToShow?: number;
  value?: unknown | unknown[];
  query?: Record<string, any>;
};
