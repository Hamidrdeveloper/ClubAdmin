import i18n from '@src/core/i18n/config';
import { DetailColumnTypes, FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { Route } from 'antd/lib/breadcrumb/Breadcrumb';
import { FC, lazy } from 'react';

import {
  BooleanTagRenderer,
  NavigateToVariationRenderer,
  PackedQuantityRenderer,
  PurchaseQuantityRenderer,
} from './components/TableComponents';
import { Stock } from './model';
import { IncomingItems } from './model/incomingItems';
import { Inventory } from './model/inventory';
import { StorageVariation } from './model/storageVariation';
import moduleInfo from './ModuleInfo.json';

export default class StockModule implements FactoryModule<Stock> {
  public entity = '/warehouses';
  public title = [i18n.t('Stock.Title'), i18n.t('Stock.Title', { count: 2 })];
  public apiService = new ApiBuilder<Stock>(this.entity, this.title[0]);
  public UpsertComponent: FC = lazy(() => import('./containers/SettingUpsert'));

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${moduleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [
    {
      key: 'name',
      label: i18n.t('Global.Name'),
    },
    {
      key: 'conditions',
      label: i18n.t('Stock.Conditions'),
    },
    {
      key: 'type',
      label: i18n.t('Global.Type'),
    },
    {
      key: 'priority',
      label: i18n.t('Stock.Priority'),
    },
    {
      key: 'strategy',
      label: i18n.t('Stock.Strategy'),
    },
    {
      key: 'has_dynamic_reorder',
      label: i18n.t('Stock.HasDynamicReorder'),
    },
    {
      key: 'exists_product_availability_id',
      label: i18n.t('Stock.ExistsProductAvailabilityId'),
    },
    {
      key: 'not_exists_product_availability_id',
      label: i18n.t('Stock.NotExistsProductAvailabilityId'),
    },
    {
      key: 'warehouse_repair_id',
      label: i18n.t('Stock.WarehouseRepairId'),
    },
  ];
  public tableColumns = [
    {
      key: 'name',
      dataIndex: 'name',
      className: 'hasTile',
      title: i18n.t('Global.Name'),
    },
    {
      key: 'conditions',
      className: 'hasTile',
      dataIndex: 'conditions',
      title: i18n.t('Stock.Conditions'),
    },
    {
      key: 'type',
      dataIndex: 'type',
      className: 'hasTile',
      title: i18n.t('Global.Type'),
    },
    {
      key: 'strategy',
      className: 'hasTile',
      dataIndex: 'strategy',
      title: i18n.t('Stock.Strategy'),
    },
    {
      key: 'inventory_mode',
      className: 'hasTile',
      dataIndex: 'inventory_mode',
      render: BooleanTagRenderer,
      title: i18n.t('Stock.InventoryMode'),
    },
    {
      key: 'freight_logistic',
      className: 'hasTile',
      render: BooleanTagRenderer,
      dataIndex: 'freight_logistic',
      title: i18n.t('Stock.FreightLogistic'),
    },
  ];
}

export class StorageVariationModule implements FactoryModule<StorageVariation> {
  public entity = '/storage-variations';
  public title = [
    i18n.t('Stock.StorageVariation.Title'),
    i18n.t('Stock.StorageVariation.Title', { count: 2 }),
  ];
  public apiService = new ApiBuilder<StorageVariation>(this.entity, this.title[0]);
  public UpsertComponent: FC = lazy(() => import('./containers/StorageVariationUpsert'));

  breadcrumbItems: Route[];
  detailColumns: DetailColumnTypes[];

  public tableColumns = [
    {
      key: 'building',
      className: 'hasTile',
      dataIndex: ['building', 'name'],
      title: i18n.t('Stock.StorageVariation.Building'),
    },
    {
      key: 'floor',
      className: 'hasTile',
      dataIndex: ['floor', 'name'],
      title: i18n.t('Stock.StorageVariation.Floor'),
    },
    {
      key: 'zone',
      dataIndex: ['zone', 'name'],
      className: 'hasTile',
      title: i18n.t('Stock.StorageVariation.Zone'),
    },
    {
      key: 'regal',
      dataIndex: ['regal', 'name'],
      className: 'hasTile',
      title: i18n.t('Stock.StorageVariation.Regal'),
    },
    {
      key: 'shelf',
      dataIndex: ['shelf', 'name'],
      className: 'hasTile',
      title: i18n.t('Stock.StorageVariation.Shelf'),
    },
  ];
}

export class InventoryModule implements FactoryModule<Inventory> {
  public entity = '/inventories';
  public title = [i18n.t('Stock.Inventory.Title'), i18n.t('Stock.Inventory.Title', { count: 2 })];
  breadcrumbItems: Route[];

  public apiService = new ApiBuilder<Inventory>(this.entity, this.title[0]);

  detailColumns: DetailColumnTypes[] = [
    {
      key: 'id',
      label: i18n.t('Global.ID'),
    },
    {
      key: 'min_storage_quantity',
      label: i18n.t('Stock.Inventory.MinStorageQuantity'),
    },
    {
      key: 'quantity',
      label: i18n.t('Stock.Inventory.Quantity'),
    },
    {
      key: 'net',
      label: i18n.t('Stock.Inventory.Net'),
    },
    {
      key: 'packed_quantity',
      label: i18n.t('Stock.Inventory.PackedQuantity'),
    },
    {
      key: 'picked_quantity',
      label: i18n.t('Stock.Inventory.PickedQuantity'),
    },
    {
      key: 'product_variation_id',
      label: i18n.t('Stock.Inventory.ProductVariationID'),
    },
    {
      key: 'purchase_quantity',
      label: i18n.t('Stock.Inventory.PurchaseQuantity'),
    },
    {
      key: 'reserved_quantity',
      label: i18n.t('Stock.Inventory.ReservedQuantity'),
    },
    {
      key: 'storage_variation_id',
      label: i18n.t('Stock.Inventory.StorageVariationID'),
    },
  ];
  public tableColumns = [
    {
      className: 'hasTile',
      key: 'product_variation_id',
      dataIndex: 'product_variation_id',
      render: NavigateToVariationRenderer,
      title: i18n.t('Stock.Inventory.ProductVariationID'),
    },
    {
      className: 'hasTile',
      key: 'product_variation_name',
      dataIndex: ['productVariation', 'name'],
      title: i18n.t('Stock.Inventory.ProductVariation'),
    },
    {
      className: 'hasTile',
      key: 'storage_variation_name',
      dataIndex: ['storageVariation', 'name'],
      title: i18n.t('Stock.Inventory.StorageVariation'),
    },
    {
      key: 'quantity',
      className: 'hasTile',
      dataIndex: 'quantity',
      title: i18n.t('Stock.Inventory.Quantity'),
    },
    {
      className: 'hasTile',
      key: 'purchase_quantity',
      dataIndex: 'purchase_quantity',
      render: PurchaseQuantityRenderer,
      title: i18n.t('Stock.Inventory.PurchaseQuantity'),
    },
    {
      className: 'hasTile',
      key: 'packed_quantity',
      dataIndex: 'packed_quantity',
      render: PackedQuantityRenderer,
      title: i18n.t('Stock.Inventory.PackedQuantity'),
    },
  ];
}

export class IncomingItemsModule implements FactoryModule<IncomingItems> {
  public entity = '/incoming-journals';
  public title = [i18n.t('Stock.IncomingItems.Title'), i18n.t('Stock.IncomingItems.Title', { count: 2 })];
  breadcrumbItems: Route[];

  public apiService = new ApiBuilder<IncomingItems>(this.entity, this.title[0]);
  detailColumns;
  public tableColumns;
}
