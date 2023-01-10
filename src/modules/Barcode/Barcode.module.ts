import i18n from '@core/i18n/config';
import { FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { lazy } from 'react';

import { DetailsTagsRenderer, TagRenderer } from './components/TableComponents';
import { Barcode } from './model/barcode.entity';
import ModuleInfo from './ModuleInfo.json';

export default class BarcodeModule implements FactoryModule<Barcode> {
  public entity = '/barcodes';
  public title = [i18n.t('Barcode.Title'), i18n.t('Barcode.Title', { count: 2 })];
  public apiService = new ApiBuilder<Barcode>(this.entity, this.title[0]);

  public UpsertComponent = lazy(() => import('./containers/BarcodeUpsert'));

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${ModuleInfo.Route.replace('*', '')}`,
    },
  ];

  public detailColumns = [
    {
      key: 'type',
      label: i18n.t('Barcode.Field.Type'),
    },
    {
      key: 'value',
      label: i18n.t('Barcode.Field.Value'),
    },
    {
      key: 'used',
      label: i18n.t('Global.IsUsed'),
      render: DetailsTagsRenderer,
    },
  ];

  public tableColumns = [
    {
      key: 'type',
      title: i18n.t('Barcode.Field.Type'),
      dataIndex: 'type',
      className: 'hasTile',
      width: 150,
    },
    {
      key: 'value',
      title: i18n.t('Barcode.Field.Value'),
      dataIndex: 'value',
      className: 'hasTile',
      width: 120,
    },
    {
      key: 'used',
      title: i18n.t('Global.IsUsed'),
      dataIndex: 'used',
      className: 'hasTile',
      width: 120,
      render: TagRenderer,
    },
  ];

  public BarcodeTypes: { label: string; value: string }[] = [
    { label: 'GTIN_8', value: 'GTIN_8' },
    { label: 'GTIN_13', value: 'GTIN_13' },
    { label: 'GTIN_14', value: 'GTIN_14' },
    { label: 'GTIN_128', value: 'GTIN_128' },
    { label: 'ISBN', value: 'ISBN' },
    { label: 'QR', value: 'QR' },
    { label: 'CODE_128', value: 'CODE_128' },
    { label: 'UPC', value: 'UPC' },
    { label: 'EAN13', value: 'EAN13' },
    { label: 'EAN128', value: 'EAN128' },
  ];
}
