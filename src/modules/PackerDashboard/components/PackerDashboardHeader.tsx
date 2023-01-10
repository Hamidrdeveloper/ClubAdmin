import { Space } from 'antd';
import React, { ReactElement, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { PackerDashboardContext } from '../context/PackerDashboardContext';
import BarcodeColumn from './Barcode/BarcodeColumn';

export default function PackerDashboardHeader(): ReactElement {
  const { barcodeType, barcode, setBarcode, setBarcodeType } = useContext(PackerDashboardContext);
  const { t } = useTranslation();
  return (
    <Space direction="horizontal">
      <h2>
        <b>{t('PackerDashboard.PackerDashboard')}</b>
      </h2>

      <BarcodeColumn
        step={barcodeType}
        barcodeValue={barcode}
        onBarcodeChange={(data) => setBarcode(data)}
        onStepChanged={(type) => setBarcodeType(type)}
      />
    </Space>
  );
}
