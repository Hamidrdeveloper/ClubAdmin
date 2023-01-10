import i18n from '@core/i18n/config';
import { updatePartnerPaymentStatus } from '@modules/Order/services/partner.service';
import { FactoryChild, FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { Select } from 'antd';
import { ReactNode, lazy } from 'react';
import React from 'react';

import { ProductVariation } from '../Product/model/ProductVariation.entity';
import moduleInfo from '../Product/ModuleInfo.json';
import { TooltipRenderer } from '../Product/VariationList/components/TableComponents';
import {
  DateRenderer,
  DescriptionDateRenderer,
  DetailCustomerNameRenderer,
  DetailsAddress,
  DetailsPaymentStatusRenderer,
  ImportedRenderer,
  OrderReceiptsAction,
  OrderReceiptsCreatedAt,
  TotalPaymentPartnerRenderer,
} from './components';
import {
  PartnerEmailsModalFields,
  PartnerFlag,
  PartnerPaymentPure,
  PartnerReceiptsModalFields,
  PartnerSalePure,
  PartnerStatus,
  PartnerVat,
} from './model/partner.entity';
import { PurchasePaymentPure } from './model/purchase.entity';
import ModuleInfo from './ModuleInfo.json';
import { CreditPaymentPure } from '.';

export default class PartnerModule implements FactoryModule<PartnerSalePure> {
  public entity = '/order-partners';
  public title = [i18n.t('Order.Partner.Title'), i18n.t('Order.Partner.Title', { count: 2 })];
  public apiService = new ApiBuilder<PartnerSalePure>(this.entity, this.title[0]);

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${ModuleInfo.Route_Partner}`,
    },
  ];

  UpsertComponent = lazy(() => import('./containers/PartnerUpsert'));

  public detailColumns = [
    {
      key: 'id',
      label: i18n.t('Global.ID'),
    },
    {
      key: 'partner_date',
      label: i18n.t('Order.Field.OrderDate'),
      render: DescriptionDateRenderer,
    },
    {
      key: 'user',
      label: i18n.t('Order.Field.CustomerName'),
      render: DetailCustomerNameRenderer,
    },
    {
      key: 'invoiceContactGroup',
      label: i18n.t('Order.Field.FullAddress'),
      render: DetailsAddress,
    },
    {
      key: 'deliveryContactGroup',
      label: i18n.t('Order.Field.DeliveryAddress'),
      render: DetailsAddress,
    },
    {
      key: 'payment_status',
      label: i18n.t('Order.Field.PaymentStatus'),
      render: DetailsPaymentStatusRenderer,
    },
  ];

  paymentStatusDictionary = [
    ['paid', 'Paid'],
    ['not_paid', 'Not Paid'],
    ['partly_paid', 'Partly Paid'],
    ['over_paid', 'Over Paid'],
  ];

  public tableColumns = [
    {
      width: 120,
      key: 'OrderDate',
      className: 'number',
      render: DateRenderer,
      dataIndex: 'created_at',
      title: i18n.t('Order.Field.OrderDate'),
    },
    {
      width: 200,
      key: 'CustomerName',
      title: i18n.t('Order.Field.CustomerName'),
      dataIndex: ['customer', 'person', 'full_name'],
    },
    {
      key: 'TotalPayment',
      dataIndex: 'total_gross_amount',
      className: 'number',
      width: 100,
      title: i18n.t('Order.Field.TotalPayment'),
      render: (total_price: number, data: PartnerSalePure): ReactNode =>
        TotalPaymentPartnerRenderer({ total_price, data }),
    },
    // {
    //   key: 'Paid',
    //   dataIndex: 'total_payment',
    //   className: 'number',
    //   width: 100,
    //   title: i18n.t('Order.Field.Paid'),
    //   render: (payment: number | null, data: PartnerSalePure): ReactNode =>
    //     PaidPartnerRenderer({ payment, data }),
    // },
    {
      key: 'PaymentStatus',
      dataIndex: 'payment_status',
      width: 140,
      title: i18n.t('Order.Field.PaymentStatus'),
      render: (payment_status: string, row: { id: number }): ReactNode => {
        return (
          <Select
            defaultValue={payment_status}
            style={{ width: 120 }}
            onChange={(e) => updatePartnerPaymentStatus(row.id, e)}
            options={this.paymentStatusDictionary.map((S) => ({ value: S[0], label: S[1] }))}
          />
        );
      },
    },
  ];
}

export class PartnerStatusChildModule implements FactoryChild<PartnerStatus> {
  public entity = '/partner-statuses';
  public title = [i18n.t('Order.PartnerStatus'), i18n.t('Order.PartnerStatus', { count: 2 })];
  public apiService = new ApiBuilder<PartnerStatus>(this.entity, this.title[0]);
}

export class PartnerFlagChildModule implements FactoryChild<PartnerFlag> {
  public entity = '/flags';
  public title = [i18n.t('Order.PartnerFlag'), i18n.t('Order.PartnerFlag', { count: 2 })];
  public apiService = new ApiBuilder<PartnerFlag>(this.entity, this.title[0]);
}

export class PartnerVatChildModule implements FactoryChild<PartnerVat> {
  public entity = '/vats';
  public title = [i18n.t('Order.PartnerVat'), i18n.t('Order.PartnerVat', { count: 2 })];
  public apiService = new ApiBuilder<PartnerVat>(this.entity, this.title[0]);
}

export class PartnerPaymentModule implements FactoryChild<PartnerPaymentPure> {
  public entity: string;
  public apiService;
  breadcrumbItems;
  public title = [i18n.t('Order.Payment.Title'), i18n.t('Order.Payment.Title', { count: 2 })];
  public tableColumns = [
    {
      key: 'id',
      dataIndex: 'id',
      title: i18n.t('Global.ID'),
    },
    {
      key: 'price_value',
      dataIndex: 'price_value',
      title: i18n.t('Global.Value'),
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: i18n.t('Global.Status'),
    },
    {
      key: 'description',
      dataIndex: 'description',
      title: i18n.t('Global.Description'),
    },
    {
      key: 'payment',
      dataIndex: 'origin',
      title: i18n.t('Order.Payment.Title'),
    },
    {
      key: 'received_at',
      render: DateRenderer,
      dataIndex: 'received_at',
      title: i18n.t('Order.Payment.Received'),
    },
    {
      key: 'imported',
      dataIndex: 'imported',
      render: ImportedRenderer,
      title: i18n.t('Order.Payment.Imported'),
    },
    {
      key: 'type',
      dataIndex: 'type',
      title: i18n.t('Global.Type'),
    },
  ];

  constructor(partnerId: number | null, moduleType: 'credit' | 'partner-sale' | 'purchase') {
    if (moduleType === 'credit') {
      this.entity = `partner/credit-notes/${partnerId}/payments`;
      this.apiService = new ApiBuilder<CreditPaymentPure>(this.entity, this.title[0]);
    } else if (moduleType === 'partner-sale') {
      this.entity = `partner-sales/${partnerId}/payments`;
      this.apiService = new ApiBuilder<PartnerPaymentPure>(this.entity, this.title[0]);
    } else if (moduleType === 'purchase') {
      this.entity = `partner/purchases/${partnerId}/payments`;
      this.apiService = new ApiBuilder<PurchasePaymentPure>(this.entity, this.title[0]);
    }
  }
}

export class PartnerEmailModule implements FactoryModule<PartnerEmailsModalFields> {
  public entity: string;
  public apiService;
  public detailColumns;
  public tableColumns;
  breadcrumbItems;
  public title = [i18n.t('Order.Tab.Email'), i18n.t('Order.Tab.Email', { count: 2 })];

  constructor(id?: string | number) {
    this.breadcrumbItems = [
      {
        breadcrumbName: this.title[1],
        path: `/admin${ModuleInfo.Route.replace('*', '')}/${id}`,
      },
    ];
  }
}

export class PartnerReceiptsModule implements FactoryModule<PartnerReceiptsModalFields> {
  public entity: string;
  public apiService;
  public detailColumns;
  public tableColumns = [
    {
      dataIndex: 'id',
      key: 'id',
      title: i18n.t('Global.ID'),
    },
    {
      dataIndex: 'name',
      key: 'name',
      title: i18n.t('Global.Name'),
    },
    {
      dataIndex: 'number',
      key: 'number',
      title: i18n.t('Global.Number'),
    },
    {
      dataIndex: 'createDate',
      key: 'createDate',
      render: (date: Date | null): ReactNode => OrderReceiptsCreatedAt({ date }),
      title: i18n.t('Global.CreatedAt'),
    },

    {
      dataIndex: 'fileURL',
      key: 'fileURL',
      render: (fileURL: string | null): ReactNode => OrderReceiptsAction({ fileURL }),
      title: i18n.t('Global.Action'),
    },
  ];
  breadcrumbItems;
  public title = [i18n.t('Order.Receipt.title'), i18n.t('Order.Receipt.title', { count: 2 })];

  constructor(id?: string | number) {
    this.breadcrumbItems = [
      {
        breadcrumbName: this.title[1],
        path: `/admin${ModuleInfo.Route.replace('*', '')}/${id}`,
      },
    ];
  }
}

export class PartnerCreditGenerateModule implements FactoryModule<PartnerReceiptsModalFields> {
  public entity: string;
  public apiService;
  public detailColumns;
  public tableColumns;
  public breadcrumbItems;
  public title = [i18n.t('Order.Credit.Title'), i18n.t('Order.Credit.Title', { count: 2 })];

  constructor(id?: string | number) {
    this.breadcrumbItems = [
      {
        breadcrumbName: this.title[1],
        path: `/admin${ModuleInfo.Route.replace('*', '')}partner-sale/${id}`,
      },
    ];
  }
}

export class PartnerSplitModule implements FactoryModule<PartnerSplitModule> {
  public entity: string;
  public apiService;
  public detailColumns;
  public tableColumns;
  public breadcrumbItems;
  public title = [i18n.t('Order.Overview.Split'), i18n.t('Order.Overview.Split', { count: 2 })];

  constructor(id?: string | number) {
    this.breadcrumbItems = [
      {
        breadcrumbName: this.title[1],
        path: `/admin${ModuleInfo.Route.replace('*', '')}partner-sale/${id}`,
      },
    ];
  }
}

export class PartnerProductModule implements FactoryModule<ProductVariation> {
  public entity = '/product-variations';
  public title = [i18n.t('Product.Variation.Title'), i18n.t('Product.Variation.Title', { count: 2 })];

  public apiService = new ApiBuilder<ProductVariation>(this.entity, this.title[0]);
  addPartnerSalePosition: (productVariationId, quantity, onComplete: () => void) => void;
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
  ];
  public tableColumns = [
    {
      width: 250,
      key: 'name',
      dataIndex: 'name',
      className: 'hasTile',
      ellipsis: {
        showTitle: false,
      },
      render: TooltipRenderer,
      title: i18n.t('Global.Name'),
    },
    {
      width: 100,
      key: 'type',
      dataIndex: 'type',
      className: 'hasTile',
      title: i18n.t('Global.Type'),
    },
    {
      width: 70,
      key: 'quantity',
      dataIndex: 'quantity',
      className: 'number hasTile',
      title: i18n.t('Product.Variation.Field.Quantity'),
    },
    {
      width: 70,
      key: 'min_quantity',
      dataIndex: 'min_partner_quantity',
      className: 'number',
      title: 'Min Quantity',
    },
    {
      width: 70,
      key: 'max_quantity',
      dataIndex: 'max_partner_quantity',
      className: 'number',
      title: 'Max Quantity',
    },
    {
      width: 150,
      key: 'release_date',
      className: 'hasTile',
      render: DateRenderer,
      dataIndex: 'release_date',
      title: i18n.t('Product.Variation.Field.ReleaseDate'),
    },
    {
      width: 150,
      className: 'hasTile',
      render: DateRenderer,
      key: 'available_until',
      dataIndex: 'available_until',
      title: i18n.t('Product.Variation.Field.AvailableUntil'),
    },
    //
  ];

  constructor(addPartner: (productVariationId, quantity, onComplete: () => void) => void) {
    this.addPartnerSalePosition = addPartner;
  }
}
