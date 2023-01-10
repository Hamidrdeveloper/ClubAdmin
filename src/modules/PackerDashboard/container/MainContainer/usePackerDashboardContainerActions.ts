import { addOrderDeliveryPacking } from '@modules/Order/controllers/order.controller';
import { callShipping, generateDeliveryNote, removePacking } from '@modules/Order/services/order.service';
import {
  changeProductQuantityWithProductId,
  normalizeSelectedProducts,
  quantityLessThanZero,
} from '@modules/PackerDashboard/container/MainContainer/PackerDashboardContainer.controller';
import { PackerDashboardContext } from '@modules/PackerDashboard/context/PackerDashboardContext';
import { BoxActionType } from '@modules/PackerDashboard/model/packer';
import { Env } from '@src/core';
import { OrderPacking } from '@src/modules/Order';
import axios from 'axios';
import { useContext } from 'react';

import { addSerialNumberToPosition } from '../../service/order.service';

type HookOutput = {
  onDoneClicked: () => void;
  onBoxAction: (action: BoxActionType, id?: number) => void;
  onQuantityChanged: (nQuantity: number, positionId: number) => void;
};

export function usePackerDashboardContainerActions(): HookOutput {
  const {
    setSelectedProducts,
    selectedOrder,
    selectedBox,
    selectedProducts,
    setSpinning,
    setBarcodeType,
    setSelectedBox,
    setPackages,
    setProducts,
    setOrders,
    setSelectedOrder,
    setPackedPackages,
    serialNumbers,
    setSerialNumbers,
  } = useContext(PackerDashboardContext);

  const onQuantityChanged = (nQuantity: number, productVarId: number): void => {
    const isQuantityMoreThanZero = nQuantity > 0;

    if (isQuantityMoreThanZero) {
      setSelectedProducts((productList) =>
        changeProductQuantityWithProductId(productList, productVarId, nQuantity),
      );
    } else {
      quantityLessThanZero(productVarId, nQuantity, { setSelectedProducts, selectedOrder });
    }
  };

  const onBoxAction = (action: BoxActionType, id?: number) => {
    switch (action) {
      case 'Close':
        return onCloseOfBoxActions();
      case 'Close With Delivery':
        return onCloseWithDeliveryOfBoxActions();
      case 'Close With Shipping':
        return onCloseWithShippingOfBoxActions();
      case 'Remove':
        return onRemoveOfBoxActions(id);
    }
  };

  function onRemoveOfBoxActions(id?: number): void {
    if (id && selectedOrder) {
      setSpinning('All');
      removePacking(id)
        .then(() => {
          axios.get<OrderPacking[]>(`/order-sales/${selectedOrder.id}/packing`).then(({ data: packs }) => {
            setSpinning('None');
            setPackedPackages(packs?.['data'] as unknown as OrderPacking[]);
          });
        })
        .catch(() => setSpinning('None'));
    }
  }

  function onCloseOfBoxActions(): void {
    const isEveryPartSelected = selectedOrder && selectedBox && selectedProducts.length > 0;

    if (isEveryPartSelected) {
      setSpinning('All');

      submitOrderDeliveryPacking()
        .then(() => onOrderDeliveryPackingFinished())
        .catch(() => setSpinning('None'));
    }
  }

  function onCloseWithDeliveryOfBoxActions(): void {
    const isEveryPartSelected = selectedOrder && selectedBox && selectedProducts.length > 0;

    if (isEveryPartSelected) {
      setSpinning('All');

      submitOrderDeliveryPacking()
        .then(() => onOrderDeliveryPackingFinished('delivery'))
        .catch(() => setSpinning('None'));
    }
  }

  function onCloseWithShippingOfBoxActions(): void {
    const isEveryPartSelected = selectedOrder && selectedBox && selectedProducts.length > 0;

    if (isEveryPartSelected) {
      setSpinning('All');

      submitOrderDeliveryPacking()
        .then(() => onOrderDeliveryPackingFinished('shipping'))
        .catch(() => setSpinning('None'));
    }
  }

  async function submitOrderDeliveryPacking(): Promise<any> {
    const selectedItemsNormalize = selectedProducts.map(normalizeSelectedProducts);
    return await addOrderDeliveryPacking(selectedOrder?.id ?? -1, {
      package: selectedBox ?? null,
      items: selectedItemsNormalize,
    }).then((data: { id: number }) => {
      if (serialNumbers.length > 0) {
        addSerialNumberToPosition(
          serialNumbers.map((serial) => ({
            packing_journal_id: data.id,
            serial_number: serial.serialNumber,
            order_sale_position_id: serial.positionId,
          })),
        )
          .then(() => {
            setSerialNumbers([]);
          })
          .catch(() => setSerialNumbers([]));
      }
    });
  }

  function onOrderDeliveryPackingFinished(generate: string | null = null) {
    if (selectedOrder) {
      axios
        .get<OrderPacking[]>(`/order-sales/${selectedOrder.id}/packing`)
        .then(({ data: packs }) => {
          if (generate === 'delivery') {
            generateDeliveryNote(selectedOrder.id, { invoice_type: 'delivery_note' })
              .then((link) => {
                setBarcodeType('Box');
                setSelectedBox(null);
                setPackedPackages(packs?.['data'] as unknown as OrderPacking[]);
                setSpinning('None');
                setSelectedProducts([]);
                window.open(Env.PURE_URL + link, '_blank');
              })
              .catch(() => setSpinning('None'));
          } else if (generate === 'shipping') {
            generateDeliveryNote(selectedOrder.id, { invoice_type: 'delivery_note' })
              .then((link) => {
                callShipping(packs?.['data'][packs?.['data'].length - 1].id)
                  .then((data) => {
                    window.open(Env.PURE_URL + link, '_blank');
                    window.open(Env.PURE_URL + data['labels']['link'], '_blank');
                  })
                  .catch(() => {
                    setSpinning('None');
                    window.open(Env.PURE_URL + link, '_blank');
                  });
                setBarcodeType('Box');
                setSelectedBox(null);
                setPackedPackages(packs?.['data'] as unknown as OrderPacking[]);
                setSpinning('None');
                setSelectedProducts([]);
              })
              .catch(() => setSpinning('None'));
          } else {
            setBarcodeType('Box');
            setSelectedBox(null);
            setPackedPackages(packs?.['data'] as unknown as OrderPacking[]);
            setSpinning('None');
            setSelectedProducts([]);
          }
        })
        .catch(() => setSpinning('None'));
    }
  }

  function onPackerDoneCompleted() {
    setOrders(null);
    setPackages(null);
    setPackedPackages([]);
    setProducts([]);
    setSelectedBox(null);
    setSelectedOrder(null);
    setSelectedProducts([]);
    setBarcodeType('Order');
  }

  return { onBoxAction, onQuantityChanged, onDoneClicked: onPackerDoneCompleted };
}
