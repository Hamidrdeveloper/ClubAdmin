import OrderModule from '@src/modules/Order/Order.module';
import { Loader, PageLayout, Panel } from '@src/shared/components';
import { ApiBuilder } from '@src/shared/utils';
import React, { ReactElement, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import CreditModule from '../../Credit.module';
import { PurchaseSalePure } from '../../model/purchase.entity';
import { SubscriptionSalePure } from '../../model/sub.entity';
import PurchaseModule from '../../Purchase.module';
import SubscriptionModule from '../../Subscription.module';
import { CreditSalePure, OrderModuleType, OrderSalePure, OrderSaleType } from '../..';

type Props = { moduleType: OrderModuleType; orderSale: OrderSaleType };

const Order = ({ orderSale, moduleType }: Props): ReactElement => {
  const { t } = useTranslation();

  const module = {
    'order-sale': new OrderModule(),
    credit: new CreditModule(),
    subscription: new SubscriptionModule(),
    purchase: new PurchaseModule(),
  }[moduleType];

  const makeUpdateLink = useCallback((type: string): string => {
    switch (type) {
      case 'order-sale':
        return '/admin/orders/order-sale';
      case 'credit':
        return '/admin/orders/credit';
      case 'subscription':
        return '/admin/orders/subscription';
      case 'purchase':
        return '/admin/orders/purchase';
      case 'partner':
        return '/admin/orders/partner';
      default:
        return '/admin/orders/order-sale';
    }
  }, []);
  const generatedUpdateLink: string = makeUpdateLink(moduleType);

  return (
    <PageLayout<OrderSalePure | CreditSalePure | SubscriptionSalePure | PurchaseSalePure> module={module}>
      <MainContainer>
        <span>{t('Order.Titles.UserIdFilter')} </span>
      </MainContainer>

      <PageLayout.Panel>
        <Panel.Header hasNew={false} hasSearch noDescription noListView />

        {!orderSale ? (
          <Loader title={t('Order.Orders.Loader')} />
        ) : (
          <Panel.ListView
            module={module}
            updateLink={generatedUpdateLink}
            tableScroll={{ x: 1450, y: 750 }}
            params={{
              supplierId:
                moduleType === 'purchase' ? (orderSale as PurchaseSalePure)?.supplier?.id : undefined,
              userId:
                moduleType === 'purchase'
                  ? undefined
                  : String(
                      moduleType === 'credit'
                        ? (orderSale as CreditSalePure).order.user_id
                        : moduleType === 'subscription'
                        ? (orderSale as SubscriptionSalePure).user_id
                        : (orderSale as OrderSalePure).user_id,
                    ),
              orderBy: { id: 'DESC' },
            }}
            customEntities={
              moduleType === 'order-sale'
                ? { getAll: new ApiBuilder<OrderSalePure>('/order-sales/list', module.title[0]) }
                : { getAll: new ApiBuilder<OrderSalePure>(module.entity, module.title[0]) }
            }
          />
        )}
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default Order;

const MainContainer = styled.div`
  background-color: #4a5161;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  z-index: 3;

  & > * {
    width: 33.3%;
  }

  & span {
    width: auto;
    color: white;
    margin-right: 14px;
  }
`;
