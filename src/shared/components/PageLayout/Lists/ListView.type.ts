import { FactoryModule, PaginationContext } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { ColumnType } from 'antd/lib/table';
import { Key, ReactNode } from 'react';

export interface TableProps<T> {
  dataSource?: T[];
  columns?: ColumnType<T>[];

  loading?: boolean;
  tableLayout?: 'fixed' | 'auto';
  onClickRow?: (data: any) => void;
  tableScroll?: { x?: number | string; y: number | string };

  selectedRows?: Key[];
  setSelectedRows?: (keys: Key[], selectedRowsData?: Key[][]) => void;

  hasActive?: boolean;
  hasDefault?: boolean;
  togglers?: togglersProps[];

  hasNavigate?: (params: Record<string, any>) => void;
}

export interface togglersProps {
  key?: string;
  url: string;
  title: string;
  sorter?: boolean;
  disabled?: string;
  dataIndex: string;
}

export interface PaginationProps {
  isPending: boolean;
  pagination?: PaginationContext;
  dontNavigate?: boolean;
  onChange?: (page?: number, pageSize?: number) => void;
}

export interface FilterColumns {
  key: string;
  type: string;
  isSelect: boolean;
  selectUrl?: string;
}

export interface ListViewProps<T> extends TableProps<T> {
  noId?: boolean;
  filter?: ReactNode;
  updateLink?: string;
  hasUpdate?: boolean;
  module: FactoryModule<T>;
  params?: Record<string, unknown>;
  onUpdate?: (id: number, data?: T) => void;
  onUpdateWithModel?: (model: T) => void;
  customEntities?: Partial<CustomEntities<T>> | undefined;
}

interface CustomEntities<T> {
  getOne: string;
  // later we can add getAll, updateOne, insertOne ...
  getAll: ApiBuilder<T>;
}
