/* eslint-disable @typescript-eslint/no-unused-vars */
import i18n from '@core/i18n/config';
import { FactoryChild, FactoryModule } from '@src/shared/models';
import { ApiBuilder } from '@src/shared/utils';
import { TableColumnsType } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { ReactNode, lazy } from 'react';

import { Flag } from '../Flag/model/flag.entity';
import { ProductVariation } from '../Product/model/ProductVariation.entity';
import moduleInfo from '../Product/ModuleInfo.json';
import { TooltipRenderer } from '../Product/VariationList/components/TableComponents';
import { User } from '../User/model/personalInfo';
import {
  DateRenderer,
  DescriptionDateRenderer,
  DetailCustomerNameRenderer,
  DetailsAddress,
  DetailsOrderStatusRenderer,
  DetailsPaymentMethodRenderer,
  DetailsPaymentStatusRenderer,
  DetailsShippingProfileRenderer,
  EstimatedDeliveryDateRenderer,
  ImportedRenderer,
  OrderFlagsRenderer,
  OrderProductAction,
  OrderReceiptsAction,
  OrderReceiptsCreatedAt,
  OrderStatusRenderer,
  PaidRenderer,
  PaymentMethodRenderer,
  PaymentStatusRenderer,
  ReturnOnSaleRenderer,
  ShippingProfileRenderer,
  TotalPaymentRenderer,
} from './components';
import {
  OrderEmailsModalFields,
  OrderFlag,
  OrderPaymentPure,
  OrderReceiptsModalFields,
  OrderSalePure,
  OrderStatus,
  OrderVat,
} from './model/order.entity';
import { PurchasePaymentPure } from './model/purchase.entity';
import ModuleInfo from './ModuleInfo.json';
import { CreditPaymentPure, OrderModuleType } from '.';

export default class OrderModule implements FactoryModule<OrderSalePure> {
  public entity = '/order-sale';
  public title = [i18n.t('Order.Title'), i18n.t('Order.Title', { count: 2 })];
  public apiService = new ApiBuilder<OrderSalePure>(this.entity, this.title[0]);

  breadcrumbItems = [
    {
      breadcrumbName: this.title[1],
      path: `/admin${ModuleInfo.Route_Order}`,
    },
  ];

  UpsertComponent = lazy(() => import('./containers/OrderUpsert'));

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
      key: 'order_date',
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
      key: 'CustomerName',
      dataIndex: 'customer_full_name',
      width: 200,
      title: i18n.t('Order.Field.CustomerName'),
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
      render: (total_price: number, data: OrderSalePure): ReactNode =>
        TotalPaymentRenderer({ total_price, data }),
    },
    {
      key: 'Paid',
      dataIndex: 'total_payment',
      className: 'number',
      width: 100,
      title: i18n.t('Order.Field.Paid'),
      render: (payment: number | null, data: OrderSalePure): ReactNode => PaidRenderer({ payment, data }),
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
      render: (orderStatus: OrderStatus): ReactNode => OrderStatusRenderer({ orderStatus }),
    },
    {
      key: 'id',
      dataIndex: ['flags'],
      width: 120,
      title: i18n.t('Order.OrderFlag'),
      align: 'center',
      render: (flags: Flag[], order: OrderSalePure): ReactNode =>
        OrderFlagsRenderer(flags, 'order-sale', order),
    },

    {
      width: 200,
      className: 'number',
      key: 'EstimatedDeliveryDate',
      dataIndex: 'estimate_delivery_date',
      title: i18n.t('Order.Field.EstimatedDeliveryDate'),
      render: (date: Date): ReactNode => EstimatedDeliveryDateRenderer({ date }),
    },
    {
      key: 'ReturnOnSale',
      dataIndex: 'return_on_sale',
      className: 'number',
      title: i18n.t('Order.Field.ReturnOnSale'),
      render: (return_on_sale: number, data: OrderSalePure): ReactNode =>
        ReturnOnSaleRenderer({ return_on_sale, data }),
    },
  ];
}

export class OrderStatusChildModule implements FactoryChild<OrderStatus> {
  public entity = '/order-statuses';
  public title = [i18n.t('Order.OrderStatus'), i18n.t('Order.OrderStatus', { count: 2 })];
  public apiService = new ApiBuilder<OrderStatus>(this.entity, this.title[0]);
}

export class OrderFlagChildModule implements FactoryChild<OrderFlag> {
  public entity = '/flags';
  public title = [i18n.t('Order.OrderFlag'), i18n.t('Order.OrderFlag', { count: 2 })];
  public apiService = new ApiBuilder<OrderFlag>(this.entity, this.title[0]);
}

export class OrderVatChildModule implements FactoryChild<OrderVat> {
  public entity = '/vats';
  public title = [i18n.t('Order.OrderVat'), i18n.t('Order.OrderVat', { count: 2 })];
  public apiService = new ApiBuilder<OrderVat>(this.entity, this.title[0]);
}

export class OrderPaymentModule implements FactoryChild<OrderPaymentPure> {
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

  constructor(orderId: number | null, moduleType: OrderModuleType) {
    if (moduleType === 'credit') {
      this.entity = `order/credit-notes/${orderId}/payments`;
      this.apiService = new ApiBuilder<CreditPaymentPure>(this.entity, this.title[0]);
    } else if (moduleType === 'order-sale') {
      this.entity = `order-sales/${orderId}/payments`;
      this.apiService = new ApiBuilder<OrderPaymentPure>(this.entity, this.title[0]);
    } else if (moduleType === 'purchase') {
      this.entity = `order/purchases/${orderId}/payments`;
      this.apiService = new ApiBuilder<PurchasePaymentPure>(this.entity, this.title[0]);
    }
  }
}

export class OrderEmailModule implements FactoryModule<OrderEmailsModalFields> {
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

export class OrderReceiptsModule implements FactoryModule<OrderReceiptsModalFields> {
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

  constructor(id?: string | number, slug?: string) {
    this.breadcrumbItems = [
      {
        breadcrumbName: this.title[1],
        path: `/admin${ModuleInfo.Route.replace('*', '')}${slug}/${id}`,
      },
    ];
  }
}

export class OrderCreditGenerateModule implements FactoryModule<OrderReceiptsModalFields> {
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

export class OrderSplitModule implements FactoryModule<OrderSplitModule> {
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

export class OrderProductModule implements FactoryModule<ProductVariation> {
  public entity = '/product-variations';
  public title = [i18n.t('Product.Variation.Title'), i18n.t('Product.Variation.Title', { count: 2 })];

  public apiService = new ApiBuilder<ProductVariation>(this.entity, this.title[0]);
  addOrderSalePosition: (productVariationId, quantity, onComplete: () => void) => void;
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
  public tableColumns: ColumnsType = [
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
      dataIndex: 'min_order_quantity',
      className: 'number',
      title: 'Min Quantity',
      align: 'center',
    },
    {
      width: 70,
      key: 'max_quantity',
      dataIndex: 'max_order_quantity',
      className: 'number',
      title: 'Max Quantity',
      align: 'center',
    },
    {
      width: 150,
      key: 'release_date',
      className: 'hasTile',
      render: DateRenderer,
      dataIndex: 'release_date',
      title: i18n.t('Product.Variation.Field.ReleaseDate'),
      align: 'center',
    },
    {
      width: 150,
      className: 'hasTile',
      render: DateRenderer,
      key: 'available_until',
      dataIndex: 'available_until',
      title: i18n.t('Product.Variation.Field.AvailableUntil'),
      align: 'center',
    },
    {
      key: 'action',
      title: i18n.t('Global.Action'),
      dataIndex: 'file',
      render: (file: string, product: ProductVariation): ReactNode =>
        OrderProductAction({ product, addOrder: this.addOrderSalePosition }),
    },
  ];

  constructor(addOrder: (productVariationId, quantity, onComplete: () => void) => void) {
    this.addOrderSalePosition = addOrder;
  }
}

export class CreateOrderUserModule implements FactoryModule<User> {
  public entity = '/users/list-create-order';
  public title = [i18n.t('Order.Title'), i18n.t('Order.Title', { count: 2 })];
  public apiService = new ApiBuilder<User>(this.entity, this.title[0]);
  breadcrumbItems;
  public detailColumns;
  public tableColumns;
}

export class OrderPositionAddModule implements FactoryModule<ProductVariation> {
  public entity = 'product-variations/panel-list';
  public title = [i18n.t('Product.Variation.Title'), i18n.t('Product.Variation.Title', { count: 2 })];

  public apiService = new ApiBuilder<ProductVariation>(this.entity, this.title[0]);
  addOrderSalePosition: (productVariationId, quantity, onComplete: () => void) => void;
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
  public tableColumns: ColumnsType = [
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
      align: 'center',
    },
    {
      width: 70,
      key: 'min_quantity',
      dataIndex: 'min_quantity',
      className: 'number',
      title: 'Min Quantity',
      align: 'center',
    },
    {
      width: 70,
      key: 'max_quantity',
      dataIndex: 'max_quantity',
      className: 'number',
      title: 'Max Quantity',
      align: 'center',
    },
    {
      width: 150,
      key: 'release_date',
      className: 'hasTile',
      render: DateRenderer,
      dataIndex: 'release_date',
      title: i18n.t('Product.Variation.Field.ReleaseDate'),
      align: 'center',
    },
    {
      width: 150,
      className: 'hasTile',
      render: DateRenderer,
      key: 'available_until',
      dataIndex: 'available_until',
      title: i18n.t('Product.Variation.Field.AvailableUntil'),
      align: 'center',
    },
    {
      key: 'action',
      title: i18n.t('Global.Action'),
      dataIndex: 'file',
      render: (file: string, product: ProductVariation): ReactNode =>
        OrderProductAction({ product, addOrder: this.addOrderSalePosition }),
    },
  ];

  constructor(addOrder: (productVariationId, quantity, onComplete: () => void) => void) {
    this.addOrderSalePosition = addOrder;
  }
}
