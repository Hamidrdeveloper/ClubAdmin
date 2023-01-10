import { FactoryModule } from '@src/shared/models';
import { Key, ReactElement, ReactNode } from 'react';

export interface HeaderProps {
  newLink: string;
  hasNew: boolean;
  hasDelete: boolean;
  hasSearch: boolean;
  hasFilters: boolean;
  dontNavigate: boolean;
  ExtraAction: (val: Key[], selectedRowsData: unknown[]) => ReactNode | ReactElement;
  noDescription: boolean;
  noListView: boolean;
  extraComponent: ReactNode;
  onNew: () => void;
  onSort: () => void;
  onFilterButtonClick: () => void;
  onSearch: (text?: string) => void;
  onGroup: (selected: Key[]) => void;
  module: FactoryModule<unknown>;
  element?:any;
}
