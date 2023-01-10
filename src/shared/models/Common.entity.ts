import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { ColumnsType } from 'antd/lib/table';
import { FunctionComponent } from 'react';
import { QueryObserverResult } from 'react-query';

import { ApiBuilder } from '../utils';

export type GeneralTranslate = { locale?: string; name: string };
export type TranslateContext = Record<string, GeneralTranslate>;

export interface FactoryModule<T extends unknown> {
  entity: string;
  title: string[];
  breadcrumbItems: Route[];
  apiService: ApiBuilder<T>;
  tableColumns: ColumnsType<T>;
  detailColumns: DetailColumnTypes[];

  UpsertComponent?: React.FC<GlobalUpsertProps<unknown>>;
}

export interface FactoryChild<T extends unknown> {
  entity: string;
  title: string[];
  apiService: ApiBuilder<T>;

  breadcrumbItems?: Route[];
  tableColumns?: ColumnsType<T>;
  detailColumns?: DetailColumnTypes[];
  UpsertComponent?: React.FC<{ onCallback: (data: T) => void }>;
}

export interface GlobalUpsertProps<T> {
  closeModal?: () => void;
  singleData?: T;
  module?: FactoryModule<T>;
  onCallback?: (data: T) => void;
  update?:boolean;
  onUpdate?: () => void;
  chantId?:number;
}

export interface GlobalMutationProps<T> {
  id?: number;
  values: Partial<T>;
}

export interface DetailColumnTypes {
  label: string;
  key: string | string[] | (string | number)[];
  render?: FunctionComponent<any>;
}

export interface ModuleListProps<T> {
  data: T[];
  isPending: boolean;
}

export interface ResponseLinks {
  last: string | null;
  next: string | null;
  prev: string | null;
  first: string | null;
}

export interface ResponseMetaLink {
  url: string;
  label: string;
  active: boolean;
}

export interface ResponseMeta {
  to?: number;
  from?: number;
  path?: string;
  total?: number;
  per_page?: number;
  last_page?: number;
  current_page?: number;
  orderByColumns: string[];
  links: ResponseMetaLink[];
  filters: Record<string, string>;
  filterLinks: Record<string, string>;
}

export type PaginationContext = Pick<
  ResponseMeta,
  'to' | 'from' | 'total' | 'per_page' | 'last_page' | 'current_page'
>;

// NOTE: Performance improvement ->  remove '?' from entities and add Partial when we wanna use it
export interface PaginationRequest {
  page?: number;
  per_page?: number;
  search?: string;
  orderBy?: string;
}

export interface ResponseContext<T> {
  data: T;
  meta: ResponseMeta;
  links: ResponseLinks[];
}

export type CallbackPromise<T> = () => Promise<QueryObserverResult<ResponseContext<T[]>>>;

export enum SortOrder {
  'DESC' = 'DESC',
  'ASC' = 'ASC',
}

// it requires at least one of properties of given interface
export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

// it requires only one properties in a given type
export type RequireOnlyOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Record<Exclude<Keys, K>, undefined>>;
  }[Keys];
