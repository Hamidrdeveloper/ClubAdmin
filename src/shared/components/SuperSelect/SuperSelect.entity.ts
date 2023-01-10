import { FactoryChild, FactoryModule } from '@src/shared/models';
import { ReactNode } from 'react';
import { GroupTypeBase } from 'react-select';
import { LoadOptions } from 'react-select-async-paginate';

export type LoadOptionFunc<Type> = LoadOptions<Type, GroupTypeBase<Type>, { page: number }>;

export interface SuperSelect<Type> {
  value: Type;
  hasNew: boolean;
  isMulti: boolean;
  isClearable?: boolean;
  searchParam: string;
  menuPlacement?: 'top' | 'bottom';
  onChange: (data: Type | Type[]) => void;
  optionSelector: { label: string; value: string };
}

export type SuperSelectProps<Type> = Partial<SuperSelect<Type>> & {
  title?: string;
  pending?: boolean;
  loading?: boolean;
  className?: string;
  disabled?: boolean;
  maxItemsToShow?: number;
  query?: Record<string, any>;
  upsertProps?: Record<string, unknown>;
  orderBy?: Record<string, 'ASC' | 'DESC'>;
  getCustomLabelProperty?: (item: Type) => string;
  module: FactoryModule<Type> | FactoryChild<Type>;
};

export interface SelectModalProps<Type> {
  children: ReactNode;
  module: FactoryModule<Type> | FactoryChild<Type>;
  isVisible: boolean;
  setVisible: (status: boolean) => void;
}
