import {
  CreditSalePure,
  CreditSettingModel,
  OrderDeliveryModalFields,
  OrderDetailTabs,
  OrderModuleType,
  OrderPacking,
  OrderSalePure,
  OrderSaleType,
  OrderSettingModel,
  PurchaseSalePure,
  PurchaseSettingModel,
  SubscriptionSalePure,
  SubscriptionSettingModel,
} from '@modules/Order';
import { shippedOnPUT } from '@modules/Order/services/order.service';
import i18n from '@src/core/i18n/config';
import { Country } from '@src/modules/Country';
import { Currency } from '@src/modules/Currency';
import { Language } from '@src/modules/Language';
import { Referrer } from '@src/modules/Referrer';
import { Subdomain } from '@src/modules/Subdomain';
import { message, notification } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';

import { getCreditSettingFromCreditSale } from '../../controllers/credit.controller';
import {
  addOrderDeliveryPacking,
  editAnyColumn,
  getOrderSettingFromOrderSale,
  getPaymentLink,
  updateShippingCosts,
  updateShippingProfiles,
  updateStatus,
} from '../../controllers/order.controller';
import { getPurchaseSettingFromPurchaseSale } from '../../controllers/purchase.controller';
import { getSubscriptionSettingFromSubscriptionSale } from '../../controllers/subscription.controller';

type States = {
  setPending(pendPartKey: string): void;
  setModalVisibility(visible: boolean): void;
  updateTab(tab: OrderDetailTabs): void;
  setPaymentLink(paymentLink: string): void;
};

type Arguments = {
  moduleType: OrderModuleType;
  states: States;
  orderSale: OrderSaleType;
  packages?: OrderPacking[] | null;
};

type HookType = {
  changeStatus: (orderStatusId: number) => void;
  changeShippingProfile: (shippingProfileId: number) => void;
  changeShippingCost: (shippingCost: number, vatAmount?: number) => void;
  changeLanguage: (language: Language) => void;
  changeCountry: (country: Country) => void;
  changeCurrency: (currency: Currency) => void;
  changeReferrer: (referrer: Referrer) => void;
  changeSubdomain: (subdomain: Subdomain) => void;
  setShippedOn: (estimatedDate: string | number | moment.Moment | null) => void;
  onSubmit: (formFields: OrderDeliveryModalFields) => void;
  orderSettings: OrderSettingType | undefined;
  generatePaymentLink: (orderId: number) => void;
  copyPaymentLinkToClipboard: (paymentLink: string) => void;
};

type OrderSettingType =
  | OrderSettingModel
  | CreditSettingModel
  | SubscriptionSettingModel
  | PurchaseSettingModel
  | null;

export default function useSettingCallback({ moduleType, orderSale, states, packages }: Arguments): HookType {
  const [orderSetting, setOrderSetting] = useState<OrderSettingType>();

  useEffect(() => {
    if (orderSale) {
      setOrderSetting(
        {
          credit: getCreditSettingFromCreditSale(orderSale as CreditSalePure),
          'order-sale': getOrderSettingFromOrderSale(orderSale as OrderSalePure),
          subscription: getSubscriptionSettingFromSubscriptionSale(orderSale as SubscriptionSalePure),
          purchase: getPurchaseSettingFromPurchaseSale(orderSale as PurchaseSalePure),
        }[moduleType],
      );
    }
  }, [orderSale]);

  function changeStatus(orderStatusId: number): void {
    states.setPending('Order Status');
    if (isOrderEditable()) {
      updateStatus(orderSale?.id ?? 0, orderStatusId, moduleType)
        .then(() => {
          states.updateTab(OrderDetailTabs.All);
          states.setPending('None');
        })
        .catch(() => states.setPending('None'));
    } else message.error(i18n.t('Order.Overview.EditError'));
  }

  function changeShippingProfile(shippingProfileId: number): void {
    const isPackagesValid = !packages || packages.length === 0;

    if (isOrderEditable()) {
      if (isPackagesValid) {
        states.setPending('Shipping Profile');
        updateShippingProfiles(orderSale?.id ?? 0, shippingProfileId, moduleType)
          .then(() => {
            states.updateTab(OrderDetailTabs.All);
            states.setPending('None');
          })
          .catch(() => states.setPending('None'));
      } else message.error(i18n.t('Order.Settings.EditShippingProfileError'));
    } else message.error(i18n.t('Order.Overview.EditError'));
  }

  function changeShippingCost(shippingCost: number, vatAmount?: number): void {
    if (isOrderEditable()) {
      states.setPending('Shipping Cost');
      updateShippingCosts(orderSale?.id ?? 0, shippingCost, moduleType, vatAmount)
        .then(() => {
          states.updateTab(OrderDetailTabs.All);
          states.setPending('None');
        })
        .catch((error) => {
          states.setPending('None');
          message.error(error.message);
        });
    } else message.error(i18n.t('Order.Overview.EditError'));
  }

  function setShippedOn(estimatedDate: string | number | moment.Moment | null): void {
    states.setPending('Shipped On');
    if (estimatedDate instanceof moment)
      estimatedDate = (estimatedDate as moment.Moment).format('YYYY-MM-DD');
    shippedOnPUT(orderSale?.id ?? 0, estimatedDate as string | null)
      .then(() => {
        states.updateTab(OrderDetailTabs.Settings);
        states.setPending('None');
      })
      .catch(() => {
        states.setPending('None');
      });
  }

  function changeLanguage(language: Language): void {
    updateWithoutAPIColumnsWithUpdateAnyColumnService<Language>(
      language,
      (language) => ({
        language_id: language.id,
      }),
      'Language',
    );
  }

  function changeCountry(country: Country): void {
    updateWithoutAPIColumnsWithUpdateAnyColumnService<Country>(
      country,
      (country) => ({
        country_id: country.id,
      }),
      'Country',
    );
  }

  function changeCurrency(currency: Currency): void {
    updateWithoutAPIColumnsWithUpdateAnyColumnService<Currency>(
      currency,
      (currency) => ({
        currency_id: currency.id,
      }),
      'Currency',
    );
  }

  function changeReferrer(referrer: Referrer): void {
    updateWithoutAPIColumnsWithUpdateAnyColumnService<Referrer>(
      referrer,
      (referrer) => ({
        referrer_id: referrer.id,
      }),
      'Referrer',
    );
  }

  function changeSubdomain(subdomain: Subdomain): void {
    updateWithoutAPIColumnsWithUpdateAnyColumnService<Subdomain>(
      subdomain,
      (subdomain) => ({
        subdomain_id: subdomain.id,
      }),
      'Subdomain',
    );
  }

  function updateWithoutAPIColumnsWithUpdateAnyColumnService<T>(
    value: T,
    bodyParam: (t: T) => Record<string, any>,
    pendKey: string,
  ) {
    const orderSaleIdByModuleType = orderSale?.id ?? 0;

    states.setPending(pendKey);
    editAnyColumn(orderSaleIdByModuleType, isOrderEditable(), bodyParam(value), moduleType)
      .then(() => {
        states.updateTab(OrderDetailTabs.Settings);
        states.setPending('None');
      })
      .catch(() => states.setPending('None'));
  }

  function isOrderEditable(): boolean {
    return (
      (moduleType === 'credit' && (orderSale as CreditSalePure).isEditable) || orderSale?.['is_editable']
    );
  }

  function onSubmit(formFields: OrderDeliveryModalFields): void {
    states.setPending('Packing Modal');
    addOrderDeliveryPacking(orderSale?.id ?? 0, formFields)
      .then(() => {
        states.setPending('None');
        states.setModalVisibility(false);
        states.updateTab(OrderDetailTabs.Settings);
      })
      .catch(() => {
        states.setPending('None');
        states.setModalVisibility(false);
      });
  }

  function generatePaymentLink(orderId: number): void {
    states.setPending('Generate Payment Link');
    getPaymentLink(orderId)
      .then((res) => {
        states.setPaymentLink(res);
        states.setPending('None');
        message.success(i18n.t('Order.Payment.GeneratePaymentLinkSuccess'));
      })
      .catch((error) => {
        states.setPending('None');
        notification.error({
          message: i18n.t('Order.Payment.GeneratePaymentLinkError'),
          description: error.message,
        });
      });
  }

  function copyPaymentLinkToClipboard(paymentLink: string) {
    navigator.clipboard.writeText(paymentLink);
    message.success(i18n.t('Order.Payment.CopyPaymentLinkSuccess'));
  }

  return {
    changeCountry,
    changeCurrency,
    changeLanguage,
    changeReferrer,
    changeSubdomain,
    changeShippingProfile,
    changeStatus,
    changeShippingCost,
    onSubmit,
    setShippedOn,
    orderSettings: orderSetting,
    generatePaymentLink,
    copyPaymentLinkToClipboard,
  };
}
