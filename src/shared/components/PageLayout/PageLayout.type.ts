import { Route } from 'antd/es/breadcrumb/Breadcrumb';
import { Dispatch, Key, ReactNode, SetStateAction } from 'react';

import { HeaderProps } from './Header/Header.type';
import { ListViewProps, TableProps } from './Lists/ListView.type';

interface PageLayoutContext {
  entity?: string;
  filter?: ReactNode;
  details?: ReactNode;
  pagination?: ReactNode;
  breadcrumbItems: Route[];
}

export type PageLayoutProps<T> = HeaderProps & TableProps<T> & PageLayoutContext;

export interface PageLayoutPropsContext {
  singleData: unknown;
  listView: string;
  selectedRows: Key[];
  requestUpdate: boolean;
  isModalVisible: boolean;
  isDetailVisible: boolean;
  isFilterVisible: boolean;
  selectedRowsData: unknown[];
  params: Record<string, unknown>;
  setRequestUpdate: (req: boolean) => void;
  setSingleData: (singleData: unknown) => void;
  setListView: (view: string) => void;
  setSelectedRows: (selected: Key[]) => void;
  setModalVisible: (isVisible: boolean) => void;
  setFilterVisible: (isVisible: boolean) => void;
  setDetailVisible: (isVisible: boolean) => void;
  setSelectedRowsData: Dispatch<SetStateAction<unknown[]>>;
  setParams: Dispatch<SetStateAction<Record<string, unknown>>>;
}

export interface PageLayoutComposition<T> {
  Pagination: React.FC<any>;
  Header: React.FC<HeaderProps>;
  DetailContainer: React.FC<any>;
  ListView: React.FC<ListViewProps<T>>;
}
