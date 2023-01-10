import i18n from '@core/i18n/config';
import { FactoryChild, FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { TableColumnsType } from 'antd';
import { ReactNode, lazy } from 'react';

import { Flag } from '../Flag/model/flag.entity';
import {
  DateRenderer,
  DetailsAddress,
  DetailsOrderStatusRenderer,
  DetailsPaymentMethodRenderer,
  DetailsPaymentStatusRenderer,
  DetailsShippingProfileRenderer,
  DetailsSupplierNameRenderer,
  EstimatedDeliveryDateRenderer,
  ImportedRenderer,
  OrderFlagsRenderer,
  OrderReceiptsAction,
  OrderReceiptsCreatedAt,
  OrderStatusRenderer,
  PaidPurchaseRenderer,
  PaymentMethodRenderer,
  PaymentStatusRenderer,
  ShippingProfileRenderer,
  StorageVariationRenderer,
  TotalPaymentPurchaseRenderer,
} from './components';
import {
  PurchaseEmailsModalFields,
  PurchaseFlag,
  PurchasePaymentPure,
  PurchaseReceiptsModalFields,
  PurchaseSalePure,
  PurchaseStatus,
  PurchaseVat,
} from './model/purchase.entity';
import ModuleInfo from './ModuleInfo.json';
import { CreditPaymentPure } from '.';

export default class PurchaseModule implements FactoryModule<PurchaseSalePure> {
  public entity = '/order/purchases';
  public title = [i18n.t('Order.Purchase_Title'), i18n.t('Order.Purchase_Title', { count: 2 })];
  public apiService = new ApiBuilder<PurchaseSalePure>(this.entity, this.title[0]);

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${ModuleInfo.Route_Purchase}`,
    },
  ];

  UpsertComponent = lazy(() => import('./containers/PurchaseUpsert'));

  public detailColumns = [
    {
      key: 'id',
      label: i18n.t('Global.ID'),
    },
    {
      key: 'orderStatus',
      label: i18n.t('Order.Field.OrderStatus'),
      render: DetailsOrderStatusRenderer,
    },
    {
      key: 'supplier',
      label: i18n.t('Order.Field.SupplierName'),
      render: DetailsSupplierNameRenderer,
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
      key: 'paymentMethod',
      label: i18n.t('Order.Field.PaymentMethod'),
      render: DetailsPaymentMethodRenderer,
    },
    {
      key: 'payment_status',
      label: i18n.t('Order.Field.PaymentStatus'),
      render: DetailsPaymentStatusRenderer,
    },
    {
      key: 'storageVariation',
      label: i18n.t('Order.Field.StorageVariation'),
      render: StorageVariationRenderer,
    },
    {
      key: 'shippingProfile',
      label: i18n.t('Order.Field.ShippingProfile'),
      render: DetailsShippingProfileRenderer,
    },
  ];

  public tableColumns: TableColumnsType = [
    {
      width: 120,
      key: 'OrderDate',
      className: 'number',
      render: DateRenderer,
      dataIndex: 'order_date',
      title: i18n.t('Order.Field.OrderDate'),
    },
    {
      key: 'SupplierName',
      dataIndex: 'customer_full_name',
      width: 200,
      title: i18n.t('Order.Field.SupplierName'),
    },
    {
      key: 'PaymentMethod',
      dataIndex: 'paymentMethod',
      width: 200,
      title: i18n.t('Order.Field.PaymentMethod'),
      render: (payment_method: { name: string }): ReactNode => PaymentMethodRenderer({ payment_method }),
    },
    {
      key: 'ShippingProfile',
      dataIndex: 'shippingProfile',
      width: 200,
      title: i18n.t('Order.Field.ShippingProfile'),
      render: (shipping_profile: { name: string }): ReactNode =>
        ShippingProfileRenderer({ shipping_profile }),
    },
    {
      key: 'TotalPayment',
      dataIndex: 'total_gross_amount',
      className: 'number',
      width: 100,
      title: i18n.t('Order.Field.TotalPayment'),
      render: (total_price: number, data: PurchaseSalePure): ReactNode =>
        TotalPaymentPurchaseRenderer({ total_price, data }),
    },
    {
      key: 'Paid',
      dataIndex: 'total_payment',
      className: 'number',
      width: 100,
      title: i18n.t('Order.Field.Paid'),
      render: (payment: number | null, data: PurchaseSalePure): ReactNode =>
        PaidPurchaseRenderer({ payment, data }),
    },
    {
      key: 'PaymentStatus',
      dataIndex: 'payment_status',
      width: 140,
      title: i18n.t('Order.Field.PaymentStatus'),
      render: (payment_status: string): ReactNode => PaymentStatusRenderer({ payment_status }),
    },

    {
      key: 'OrderStatus',
      dataIndex: 'orderStatus',
      width: 120,
      title: i18n.t('Order.Field.OrderStatus'),
      render: (orderStatus: PurchaseStatus): ReactNode => OrderStatusRenderer({ orderStatus }),
    },
    {
      key: 'id',
      dataIndex: ['flags'],
      width: 120,
      title: i18n.t('Order.OrderFlag'),
      align: 'center',
      render: (flags: Flag[], order: PurchaseSalePure): ReactNode =>
        OrderFlagsRenderer(flags, 'purchase', order),
    },

    {
      width: 200,
      className: 'number',
      key: 'EstimatedDeliveryDate',
      dataIndex: 'estimate_delivery_date',
      title: i18n.t('Order.Field.EstimatedDeliveryDate'),
      render: (date: Date): ReactNode => EstimatedDeliveryDateRenderer({ date }),
    },
  ];
}

export class PurchaseStatusChildModule implements FactoryChild<PurchaseStatus> {
  public entity = '/order-statuses';
  public title = [i18n.t('Order.PurchaseStatus'), i18n.t('Order.PurchaseStatus', { count: 2 })];
  public apiService = new ApiBuilder<PurchaseStatus>(this.entity, this.title[0]);
}

export class PurchaseFlagChildModule implements FactoryChild<PurchaseFlag> {
  public entity = '/flags';
  public title = [i18n.t('Order.PurchaseFlag'), i18n.t('Order.PurchaseFlag', { count: 2 })];
  public apiService = new ApiBuilder<PurchaseFlag>(this.entity, this.title[0]);
}

export class PurchaseVatChildModule implements FactoryChild<PurchaseVat> {
  public entity = '/vats';
  public title = [i18n.t('Order.PurchaseVat'), i18n.t('Order.PurchaseVat', { count: 2 })];
  public apiService = new ApiBuilder<PurchaseVat>(this.entity, this.title[0]);
}

export class PurchasePaymentModule implements FactoryChild<PurchasePaymentPure> {
  public entity: string;
  public apiService;
  breadcrumbItems;
  public title = [i18n.t('Order.Payment.Title'), i18n.t('Order.Payment.Title', { count: 2 })];

  constructor(orderId: number | null, isCredit: boolean) {
    if (isCredit) {
      this.entity = `order/credit-notes/${orderId}/payments`;
      this.apiService = new ApiBuilder<CreditPaymentPure>(this.entity, this.title[0]);
    } else {
      this.entity = `order-sales/${orderId}/payments`;
      this.apiService = new ApiBuilder<PurchasePaymentPure>(this.entity, this.title[0]);
    }
  }

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
}

export class PurchaseEmailModule implements FactoryModule<PurchaseEmailsModalFields> {
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

export class PurchaseReceiptsModule implements FactoryModule<PurchaseReceiptsModalFields> {
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

export class PurchaseCreditGenerateModule implements FactoryModule<PurchaseReceiptsModalFields> {
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
        path: `/admin${ModuleInfo.Route.replace('*', '')}order-sale/${id}`,
      },
    ];
  }
}

export class PurchaseSplitModule implements FactoryModule<PurchaseSplitModule> {
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
        path: `/admin${ModuleInfo.Route.replace('*', '')}order-sale/${id}`,
      },
    ];
  }
}
