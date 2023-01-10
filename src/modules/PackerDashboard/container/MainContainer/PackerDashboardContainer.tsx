import PackerDashboardUI from '@modules/PackerDashboard/components/PackerDashboardUI';
import { usePackerDashboardContainerActions } from '@modules/PackerDashboard/container/MainContainer/usePackerDashboardContainerActions';
import { PackerDashboardContext } from '@modules/PackerDashboard/context/PackerDashboardContext';
import { useBarcodeChangePacker } from '@modules/PackerDashboard/hooks/useBarcodeChangePacker';
import { useBarcodeTypeChangePacker } from '@modules/PackerDashboard/hooks/useBarcodeTypeChangePacker';
import { getAllPackages } from '@modules/PackerDashboard/service/package.service';
import AutoLoader from '@modules/PickerDashboard/components/AutoLoader';
import { Col, Input, Modal, Row, Spin } from 'antd';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import PackerDashboardHeader from '../../components/PackerDashboardHeader';
import { PackerDashboard as Styles } from './PackerDashboardContainer.style';

function PackerDashboardContainer(): ReactElement {
  const {
    packages,
    setPackages,
    barcodeType,
    barcode,
    spinning,
    serialNumberVisible,
    setSerialNumberVisible,
    serialNumbers,
    setSerialNumbers,
  } = useContext(PackerDashboardContext);

  const { onQuantityChanged, onBoxAction, onDoneClicked } = usePackerDashboardContainerActions();

  const barcodeChange = useBarcodeChangePacker();
  const barcodeTypeChange = useBarcodeTypeChangePacker();

  const [serialNumber, setSerialNumber] = useState('');
  const { t } = useTranslation();
  useEffect(() => {
    if (barcode !== '') {
      switch (barcodeType) {
        case 'Order':
          return barcodeChange.whenBarcodeTypeIsOrder();

        case 'Box':
          return barcodeChange.whenBarcodeTypeIsBox();

        case 'Product':
          return barcodeChange.whenBarcodeTypeIsProduct();
      }
    }
  }, [barcode]);

  useEffect(() => {
    if (barcodeType) {
      switch (barcodeType) {
        case 'Order':
          return barcodeTypeChange.whenBarcodeTypeIsOrder();
        case 'Box':
          return barcodeTypeChange.whenBarcodeTypeIsBox();
        case 'Product':
          return barcodeTypeChange.whenBarcodeTypeIsProduct();
      }
    }
  }, [barcodeType]);

  const handleSerialNumberChange = () => {
    barcodeChange.addProductExistance(serialNumberVisible.barcode);
    setSerialNumbers([...serialNumbers, { serialNumber, positionId: serialNumberVisible.positionId }]);
    setSerialNumberVisible({ visible: false, barcode: '', positionId: 0 });
    setSerialNumber('');
  };

  return (
    <>
      <Spin spinning={spinning === 'All'}>
        <Styles.Container>
          <AutoLoader data={[packages, setPackages]} service={getAllPackages}>
            <Row>
              <Col span={24} className="title">
                <PackerDashboardHeader />
              </Col>

              <hr />

              <Col span={24}>
                <PackerDashboardUI
                  onBoxAction={onBoxAction}
                  onDoneCompleted={onDoneClicked}
                  onQuantityChanged={onQuantityChanged}
                />
              </Col>
            </Row>
          </AutoLoader>
        </Styles.Container>
      </Spin>

      <Modal
        onOk={handleSerialNumberChange}
        visible={serialNumberVisible.visible}
        title={t('PackerDashboard.ProductVariationSerialNumber')}
        onCancel={() => setSerialNumberVisible({ visible: false, barcode: '', positionId: 0 })}
      >
        <div>
          <Input
            value={serialNumber}
            placeholder={t('PackerDashboard.EnterSerialNumber')}
            onChange={(event) => setSerialNumber(event.target.value)}
          />
        </div>
      </Modal>
    </>
  );
}

export default PackerDashboardContainer;
