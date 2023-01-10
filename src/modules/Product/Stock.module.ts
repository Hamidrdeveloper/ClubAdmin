import i18n from '@src/core/i18n/config';
import { DetailColumnTypes, FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { TableColumnsType } from 'antd';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { ColumnsType } from 'antd/lib/table';
import { ReactNode } from 'react';

import { StockPure } from '../Stock/model';
import {
  BatchRenderer,
  DateRenderer,
  ExpireDateRenderer,
  NullRenderer,
  PurchasePriceRenderer,
  QuantityRenderer,
  TooltipRenderer,
} from './components/TableComponents';
import { MovementJournals } from './model/Movement.entity';

export default class StockModule implements FactoryModule<StockPure> {
  breadcrumbItems: Route[];
  public detailColumns: DetailColumnTypes[];

  public entity = `inventories`;
  public title = [i18n.t('Product.Stock.Title'), i18n.t('Product.Stock.Title', { count: 2 })];

  public apiService = new ApiBuilder<StockPure>(this.entity, this.title[0]);
  public tableColumns: ColumnsType = [
    {
      key: 'storage_variation',
      className: 'hasTile',
      dataIndex: ['storageVariation', 'name'],
      title: i18n.t('Product.Stock.Fields.StorageVariation'),
    },
    {
      key: 'phy',
      className: 'hasTile',
      dataIndex: 'quantity',
      title: i18n.t('Product.Stock.Fields.Phy'),
      render: (data: string): ReactNode =>
        TooltipRenderer({ data, tooltip: i18n.t('Product.Variation.Correction.Quantity') }),
    },
    {
      key: 'rs',
      className: 'hasTile',
      dataIndex: 'reserved_quantity',
      title: i18n.t('Product.Stock.Fields.Rs'),
      render: (data: string): ReactNode =>
        TooltipRenderer({ data, tooltip: i18n.t('Product.Variation.Correction.ReservedQuantity') }),
    },
    // 'rsl rsb ri felan khali bezar ta datash amade beshe', hamed
    {
      key: 'rsl',
      dataIndex: 'rsl',
      className: 'hasTile',
      title: i18n.t('Product.Stock.Fields.Rsl'),
      render: (data: string): ReactNode =>
        TooltipRenderer({ data, tooltip: i18n.t('Product.Stock.Fields.RelativeStrengthDefined') }),
    },
    {
      key: 'rsb',
      dataIndex: 'rsb',
      className: 'hasTile',
      title: i18n.t('Product.Stock.Fields.Rsb'),
      render: (data: string): ReactNode =>
        TooltipRenderer({ data, tooltip: i18n.t('Product.Stock.Fields.RSB') }),
    },
    {
      key: 'net',
      dataIndex: 'net',
      className: 'hasTile',
      title: i18n.t('Product.Stock.Fields.Net'),
      render: (data: string): ReactNode =>
        TooltipRenderer({ data, tooltip: i18n.t('Product.Stock.Fields.NET') }),
    },
    {
      key: 'supply',
      className: 'hasTile',
      dataIndex: 'purchase_quantity',
      title: i18n.t('Product.Stock.Fields.PurchaseQuantity'),
    },
    {
      key: 'ri',
      dataIndex: 'ri',
      className: 'hasTile',
      title: i18n.t('Product.Stock.Fields.RL'),
      render: (data: string): ReactNode =>
        TooltipRenderer({ data, tooltip: i18n.t('Product.Stock.Fields.RI') }),
    },
    {
      key: 'ri△',
      className: 'hasTile',
      dataIndex: 'delta_quantity',
      title: i18n.t('Product.Stock.Fields.RL△'),
      render: (data: string): ReactNode =>
        TooltipRenderer({ data, tooltip: i18n.t('Product.Stock.Fields.RIDelta') }),
    },
  ];
}

export class MovementModule implements FactoryModule<MovementJournals> {
  public detailColumns: DetailColumnTypes[];
  breadcrumbItems: Route[];

  public entity = 'movement-journals';
  public title = [
    i18n.t('Product.Stock.Movement.Title'),
    i18n.t('Product.Stock.Movement.Title', { count: 2 }),
  ];
  public apiService = new ApiBuilder<MovementJournals>(this.entity, this.title[0]);

  public tableColumns: TableColumnsType<MovementJournals> = [
    {
      dataIndex: 'id',
      key: 'process_id',
      className: 'hasTile',
      title: i18n.t('Product.Stock.Movement.ProcessId'),
    },
    {
      dataIndex: 'type',
      key: 'item_movement',
      className: 'hasTile',
      title: i18n.t('Product.Stock.Movement.ItemMovement'),
    },
    {
      key: 'pru',
      dataIndex: 'items',
      className: 'hasTile',
      render: PurchasePriceRenderer,
      title: i18n.t('Product.Stock.Movement.Pru'),
    },
    {
      className: 'hasTile',
      key: 'storage_variation',
      dataIndex: ['items', '0', 'storageVariation', 'name'],
      title: i18n.t('Product.Stock.Movement.StorageVariation'),
    },
    {
      key: 'warehouse_id',
      className: 'hasTile',
      title: i18n.t('Product.Stock.Movement.WarehouseName'),
      dataIndex: ['items', '0', 'storageVariation', 'warehouse', 'name'],
    },
    {
      key: 'batch',
      dataIndex: 'items',
      className: 'hasTile',
      render: BatchRenderer,
      title: i18n.t('Product.Stock.Movement.Batch'),
    },
    {
      key: 'quantity',
      dataIndex: 'items',
      className: 'hasTile',
      render: QuantityRenderer,
      title: i18n.t('Global.Quantity'),
    },
    {
      key: 'order_id',
      render: NullRenderer,
      dataIndex: 'order_id',
      className: 'hasTile number',
      title: i18n.t('Product.Stock.Movement.OrderID'),
    },
    {
      key: 'ex',
      dataIndex: 'items',
      className: 'hasTile',
      render: ExpireDateRenderer,
      title: i18n.t('Product.Stock.Movement.EX'),
    },
    {
      key: 'user',
      dataIndex: ['creator', 'person', 'full_name'],
      className: 'hasTile',
      title: i18n.t('Product.Stock.Movement.User'),
    },
    {
      key: 'date',
      className: 'hasTile',
      render: DateRenderer,
      dataIndex: 'created_at',
      title: i18n.t('Global.Date'),
    },
  ];
}

// TODO unknown => Supply
export class SupplyModule implements FactoryModule<unknown> {
  public detailColumns;
  breadcrumbItems: Route[];

  public entity = '/stock/supply';
  public title = [i18n.t('Product.Stock.Supply.Title'), i18n.t('Product.Stock.Supply.Title', { count: 2 })];

  public apiService = new ApiBuilder<unknown>(this.entity, this.title[0]);

  public tableColumns = [
    {
      key: 'supplier',
      className: 'hasTile',
      dataIndex: 'supplier',
      title: i18n.t('Product.Stock.Supply.Supplier'),
    },
    {
      key: 'status',
      dataIndex: 'status',
      className: 'hasTile',
      title: i18n.t('Product.Stock.Supply.Status'),
    },
  ];
}
