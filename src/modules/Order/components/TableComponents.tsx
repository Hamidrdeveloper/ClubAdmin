/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import { BookOutlined, PlusOutlined } from '@ant-design/icons';
import { OrderSalePure, OrderStatus, PurchaseSalePure } from '@modules/Order';
import { OrderModuleType } from '@modules/Order';
import { Env } from '@src/core';
import i18n from '@src/core/i18n/config';
import { FlagSelect } from '@src/modules/Flag';
import { Flag } from '@src/modules/Flag/model/flag.entity';
import { ProductVariation } from '@src/modules/Product/model/ProductVariation.entity';
import { StorageVariation } from '@src/modules/Stock/model/storageVariation';
import { Supplier } from '@src/modules/Supplier';
import { User } from '@src/modules/User';
import { Address } from '@src/modules/User/model/address';
import { intlCurrency, intlDate } from '@src/shared/utils/engine.service';
import { Button, InputNumber, Space, Tag, Tooltip, message, notification } from 'antd';
import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { updateFlag } from '../controllers/order.controller';
import { CreditSalePure, PartnerSalePure, SubscriptionSalePure } from '..';

export const IdRenderer: React.FC<{ id: number }> = ({ id }) => {
  return <span>Id {id}</span>;
};

export const DescriptionDateRenderer: React.FC<{ data?: Date }> = ({ data: date }) => {
  return <span>{date ? intlDate(new Date((date as unknown as string).replace(/'-'/g, '/'))) : '-'}</span>;
};

export const DateRenderer: React.FC<Date> = (date) => {
  return <span>{date ? intlDate(new Date((date as unknown as string).replace(/'-'/g, '/'))) : '-'}</span>;
};

export const DetailsPaymentMethodRenderer: React.FC<{ data?: { name: string } }> = ({
  data: payment_method,
}) => {
  return <span>{payment_method?.name ?? '-'}</span>;
};

export const PaymentMethodRenderer: React.FC<{ payment_method: { name: string } }> = ({ payment_method }) => {
  return <span>{payment_method?.name || '-'}</span>;
};

export const DetailsShippingProfileRenderer: React.FC<{ data?: { name: string } }> = ({
  data: shipping_profile,
}) => {
  return <span>{shipping_profile?.name || '-'}</span>;
};

export const ShippingProfileRenderer: React.FC<{ shipping_profile: { name: string } }> = ({
  shipping_profile,
}) => {
  return <span>{shipping_profile?.name || '-'}</span>;
};

export const TotalPaymentRenderer: React.FC<{ total_price: number; data: OrderSalePure }> = ({
  total_price,
  data,
}) => {
  return <span>{intlCurrency(data.currency?.iso3 ?? 'EUR', total_price)}</span>;
};

export const TotalPaymentPartnerRenderer: React.FC<{ total_price: number; data: PartnerSalePure }> = ({
  total_price,
  data,
}) => {
  return <span>{intlCurrency(data.currency?.iso3 ?? 'EUR', total_price)}</span>;
};

export const TotalPaymentPurchaseRenderer: React.FC<{ total_price: number; data: PurchaseSalePure }> = ({
  total_price,
  data,
}) => {
  return <span>{intlCurrency(data.currency?.iso3 ?? 'EUR', total_price)}</span>;
};

export const TotalPaymentCreditRenderer: React.FC<{ total_price: number; data: CreditSalePure }> = ({
  total_price,
  data,
}) => {
  return <span>{intlCurrency(data.order.currency?.iso3 ?? 'EUR', total_price)}</span>;
};

export const PaidRenderer: React.FC<{ payment: number | null; data: OrderSalePure }> = ({
  payment,
  data,
}) => <span>{intlCurrency(data.currency?.iso3 ?? 'EUR', payment ?? 0)}</span>;

export const PaidPartnerRenderer: React.FC<{ payment: number | null; data: PartnerSalePure }> = ({
  payment,
  data,
}) => <span>{intlCurrency(data.currency?.iso3 ?? 'EUR', payment ?? 0)}</span>;

export const PaidPurchaseRenderer: React.FC<{ payment: number | null; data: PurchaseSalePure }> = ({
  payment,
  data,
}) => <span>{intlCurrency(data.currency?.iso3 ?? 'EUR', payment ?? 0)}</span>;

export const PaidCreditRenderer: React.FC<{ total_payment: number; data: CreditSalePure }> = ({
  total_payment,
  data,
}) => <span>{intlCurrency(data.order.currency?.iso3 ?? 'EUR', total_payment)}</span>;

export const DetailsPaymentStatusRenderer: React.FC<{ data?: string }> = ({ data: payment_status }) => {
  return <span>{payment_status ? i18n.t('Order.Enum.' + payment_status) : ' - '}</span>;
};

export const StorageVariationRenderer: React.FC<{ data?: StorageVariation }> = ({
  data: storage_variation,
}) => {
  return <span>{storage_variation?.name ?? ' - '}</span>;
};

export const PaymentStatusRenderer: React.FC<{ payment_status: string }> = ({ payment_status }) => {
  return <span>{i18n.t('Order.Enum.' + payment_status)}</span>;
};

export const DetailsOrderStatusRenderer: React.FC<{ data?: OrderStatus }> = ({ data: orderStatus }) => {
  return <span style={{ color: orderStatus?.color ?? 'red' }}>{orderStatus?.name || '-'}</span>;
};

export const OrderStatusRenderer: React.FC<{ orderStatus?: OrderStatus }> = ({ orderStatus }) => {
  return <span style={{ color: orderStatus?.color ?? 'red' }}>{orderStatus?.name || '-'}</span>;
};

export const DetailsAddress: React.FC<{ data?: Address }> = ({ data }) => {
  return (
    <span>
      {data && data.address ? (
        <div dangerouslySetInnerHTML={{ __html: data.address?.address_complete }} />
      ) : (
        ' - '
      )}{' '}
    </span>
  );
};

export const DetailCustomerNameRenderer: React.FC<{ data?: User }> = ({ data }) => {
  return <span>{data ? data.person.full_name : ' - '}</span>;
};

export const CustomerNameRenderer: React.FC<{ user: User }> = ({ user }) => {
  try {
    const firstName = user.person.first_name;
    const lastName = user.person.last_name;
    return <span>{(firstName ?? '') + ' ' + (lastName ?? '')}</span>;
  } catch (e) {
    return <span>-</span>;
  }
};

export const DetailsSupplierNameRenderer: React.FC<{ data?: Supplier }> = ({ data: user }) => {
  return <span>{user && user.people ? user.people.full_name : ' - '}</span>;
};

export const SupplierNameRenderer: React.FC<{ user: Supplier }> = ({
  user: {
    people: { first_name, last_name },
  },
}) => {
  return <span>{(first_name ?? '') + ' ' + (last_name ?? '')}</span>;
};

export const EstimatedDeliveryDateRenderer: React.FC<{ date: Date }> = ({ date }) => (
  <span>{date ? intlDate(new Date((date as unknown as string).replace(/'-'/g, '/'))) : '-'}</span>
);

export const ReturnOnSaleRenderer: React.FC<{ return_on_sale: number; data: OrderSalePure }> = ({
  return_on_sale,
  data,
}) => (
  <span>
    {return_on_sale && typeof return_on_sale === 'number'
      ? intlCurrency(data.currency?.iso3 ?? 'EUR', return_on_sale)
      : return_on_sale}
  </span>
);

export const ImportedRenderer = (imported: boolean): ReactElement => {
  const { t } = useTranslation();
  return imported ? <Tag color="green">{t('Global.Yes')}</Tag> : <Tag color="red">{t('Global.No')}</Tag>;
};

export const OrderReceiptsCreatedAt: React.FC<{ date: Date | null }> = ({ date }) => (
  <span>{date ? intlDate(date) : ' - '}</span>
);

export const OrderProductAction: React.FC<{
  product: ProductVariation;
  addOrder(productVariationId, quantity, onComplete: () => void);
}> = ({ product, addOrder }) => {
  const [quantity, setQuantity] = useState<number>(product.min_order_quantity ?? 1);
  const [pending, setPending] = useState<boolean>(false);
  //
  return (
    <Space>
      <InputNumber min={1} placeholder="Quantity" onChange={(value) => setQuantity(value)} value={quantity} />
      <EditButtonContainer>
        <Button
          loading={pending}
          icon={<PlusOutlined />}
          size="small"
          type="ghost"
          onClick={() => {
            setPending(true);
            addOrder(product.id, quantity, () => {
              setQuantity(product.min_order_quantity ?? 1);
              setPending(false);
            });
          }}
        />
      </EditButtonContainer>
    </Space>
  );
};

const EditButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > * {
    border-radius: 50% !important;
    width: 30px !important;
    height: 30px !important;
    border: 1px solid #326d94;
  }
`;

export const OrderReceiptsAction: React.FC<{ fileURL: string | null }> = ({ fileURL }) => {
  return fileURL ? (
    <Tooltip className="action-btn" title={i18n.t('Global.File')}>
      <Button
        disabled={!fileURL}
        shape="default"
        onClick={() => window.open(Env.PURE_URL + fileURL)}
        icon={<BookOutlined />}
      />
    </Tooltip>
  ) : (
    <></>
  );
};

export const OrderFlagsRenderer = (
  orderFlags: Flag[],
  moduleType: OrderModuleType,
  order: OrderSalePure | CreditSalePure | SubscriptionSalePure | PurchaseSalePure,
): ReactElement => {
  const [pending, setPending] = useState<boolean>(false);
  const [flags, setFlags] = useState<Flag[]>(orderFlags ? orderFlags : []);
  const { t } = useTranslation();
  const onFlagChange = (flags: Flag[]) => {
    setPending(true);
    updateFlag({ id: order?.id ?? -1, flag_ids: flags.map((flag) => flag.id) }, moduleType)
      .then(() => {
        setPending(false);
        setFlags(flags);
        message.success(t('Order.UpdateOrderFlags'));
      })
      .catch((error) => {
        notification.error(error.message);
      });
  };

  return (
    <FlagSelect
      isMulti
      isPending={pending}
      disabled={pending}
      value={flags}
      onChange={(flags) => onFlagChange(flags as Flag[])}
    />
  );
};
