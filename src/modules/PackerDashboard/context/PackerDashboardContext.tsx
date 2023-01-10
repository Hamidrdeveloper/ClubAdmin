import { OrderPacking, OrderSalePositionPure, OrderSalePure } from '@modules/Order';
import { Package } from '@modules/Package';
import {
  ContextType,
  PackerBarcodeType,
  PositionSerialNumber,
  SerialNumberOptions,
  SpinType,
} from '@modules/PackerDashboard/model/packer';
import { AutoState } from '@modules/PickerDashboard/pages/PickerDashboard';
import React, { ReactElement, createContext, useState } from 'react';

export const PackerDashboardContext = createContext<ContextType>({
  barcode: '',
  barcodeType: 'Order',
  orders: [],
  packages: [],
  products: [],
  selectedBox: null,
  selectedOrder: null,
  selectedProducts: [],
  packedPackages: [],
  spinning: 'None',
  serialNumberVisible: {
    barcode: '',
    positionId: 0,
    visible: false,
  },
  serialNumbers: [],
  setBarcode: () => false,
  setOrders: () => false,
  setPackages: () => false,
  setSpinning: () => false,
  setProducts: () => false,
  setBarcodeType: () => false,
  setSelectedBox: () => false,
  setSelectedOrder: () => false,
  setSelectedProducts: () => false,
  setPackedPackages: () => false,
  setSerialNumberVisible: () => false,
  setSerialNumbers: () => false,
});

export function PackerDashboardContextProvider({ children }: { children: ReactElement }): JSX.Element {
  const [spinning, setSpinning] = useState<SpinType>('None');
  const [serialNumberVisible, setSerialNumberVisible] = useState<SerialNumberOptions>({
    barcode: '',
    positionId: 0,
    visible: false,
  });
  //
  const [barcode, setBarcode] = useState('');
  const [orders, setOrders] = useState<AutoState<OrderSalePure[]>>(null);
  const [packages, setPackages] = useState<AutoState<Package[]>>(null);
  const [products, setProducts] = useState<OrderSalePositionPure[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<OrderSalePure | null>(null);
  const [selectedBox, setSelectedBox] = useState<Package | null>(null);
  const [packedPackages, setPackedPackages] = useState<OrderPacking[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<OrderSalePositionPure[]>([]);
  const [barcodeType, setBarcodeType] = useState<PackerBarcodeType>('Order');
  const [serialNumbers, setSerialNumbers] = useState<PositionSerialNumber[]>([]);

  return (
    <PackerDashboardContext.Provider
      value={{
        spinning,
        setSpinning,
        orders,
        setOrders,
        packages,
        setPackages,
        products,
        setProducts,
        selectedOrder,
        setSelectedOrder,
        selectedBox,
        setSelectedBox,
        selectedProducts,
        setSelectedProducts,
        barcode,
        setBarcode,
        barcodeType,
        setBarcodeType,
        packedPackages,
        setPackedPackages,
        serialNumberVisible,
        setSerialNumberVisible,
        serialNumbers,
        setSerialNumbers,
      }}
    >
      {children}
    </PackerDashboardContext.Provider>
  );
}
