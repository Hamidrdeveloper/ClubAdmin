import { PackerDashboardContext } from '@modules/PackerDashboard/context/PackerDashboardContext';
import { message } from 'antd';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

type HookProps = {
  whenBarcodeTypeIsOrder: () => void;
  whenBarcodeTypeIsBox: () => void;
  whenBarcodeTypeIsProduct: () => void;
};

export function useBarcodeTypeChangePacker(): HookProps {
  const { setBarcodeType, selectedProducts, selectedOrder, selectedBox, barcode } =
    useContext(PackerDashboardContext);
  const { t } = useTranslation();
  function whenBarcodeTypeIsOrder() {
    if (selectedOrder && selectedBox) {
      setBarcodeType('Product');

      message.error(t('PackerDashboard.ChoseOrder'));
    }
  }

  function whenBarcodeTypeIsBox() {
    if (selectedOrder) {
      if (selectedProducts.length > 0 && barcode && barcode !== '') {
        message.error(t('PackerDashboard.ChoseBox'));

        setBarcodeType('Product');
      }
    } else {
      message.error(t('PackerDashboard.ChoseOrderFirst'));
    }
  }

  function whenBarcodeTypeIsProduct() {
    if (selectedOrder) {
      if (selectedBox === null) {
        message.error(t('PackerDashboard.ChoseBoxFirst'));

        setBarcodeType('Box');
      }
    } else {
      message.error(t('PackerDashboard.ChoseOrderFirst'));

      setBarcodeType('Order');
    }
  }

  return { whenBarcodeTypeIsOrder, whenBarcodeTypeIsProduct, whenBarcodeTypeIsBox };
}
