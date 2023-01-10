import { OrderPacking, OrderSalePositionPure, OrderSalePure } from '@modules/Order';
import { Package } from '@modules/Package';
import { AutoState } from '@modules/PickerDashboard/pages/PickerDashboard';
import { Dispatch, SetStateAction } from 'react';

export type PackerBarcodeType = 'Order' | 'Box' | 'Product';
export type BoxActionType = 'Close' | 'Close With Shipping' | 'Close With Delivery' | 'Remove';

type M_setSelectedProducts = Dispatch<SetStateAction<OrderSalePositionPure[]>>;
type M_setSelectedOrder = Dispatch<SetStateAction<OrderSalePure | null>>;

export type ContextType = {
  spinning: SpinType;
  setSpinning: (spin: SpinType) => void;
  orders?: AutoState<OrderSalePure[]>;
  setOrders: (order: AutoState<OrderSalePure[]>) => void;
  packages?: AutoState<Package[]>;
  setPackages: (packages: AutoState<Package[]>) => void;
  products: OrderSalePositionPure[];
  setProducts: (positions: OrderSalePositionPure[]) => void;
  selectedOrder: OrderSalePure | null;
  setSelectedOrder: M_setSelectedOrder;
  selectedBox?: Package | null;
  setSelectedBox: (_package: Package | null) => void;
  selectedProducts: OrderSalePositionPure[];
  setSelectedProducts: M_setSelectedProducts;
  barcode: string;
  setBarcode: (barcode: string) => void;
  barcodeType: PackerBarcodeType;
  setBarcodeType: (type: PackerBarcodeType) => void;
  packedPackages: OrderPacking[];
  setPackedPackages: (packs: OrderPacking[]) => void;
  serialNumberVisible: SerialNumberOptions;
  setSerialNumberVisible: (data: SerialNumberOptions) => void;
  serialNumbers: PositionSerialNumber[];
  setSerialNumbers: (data: PositionSerialNumber[]) => void;
};

export type SpinType = 'All' | 'Order' | 'Box' | 'None';

export type M_quantityLessThanZeroStates = {
  selectedOrder: OrderSalePure | null;
  setSelectedProducts: M_setSelectedProducts;
};

export type NormalizedSelectedProducts = {
  quantity: number;
  product_variation_id: number;
  order_position_id: number;
  isActive: boolean;
  name: string;
  order_position_type_id: number,
  parent_id: number|null,
};

export type CloseBoxActionType = 'Close';

export type SerialNumberOptions = { visible: boolean; barcode: string; positionId: number };
export interface PositionSerialNumber {
  positionId: number;
  serialNumber: string;
}

export interface PackingSerialNumber {
  serial_number: string;
  packing_journal_id: number;
  order_sale_position_id: number;
}
