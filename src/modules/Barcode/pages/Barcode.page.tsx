import i18n from '@src/core/i18n/config';
import { PageLayout, Panel } from '@src/shared/components';
import SharedModal from '@src/shared/components/Modal';
import { Button } from 'antd';
import React, { ReactElement, useState } from 'react';

import BarcodeModule from '../Barcode.module';
import BarcodeGenerateUpsert from '../containers/BarcodeGenerateUpsert';
import { Barcode } from '../model/barcode.entity';

export default function BarcodePage(): ReactElement {
  const barcodeModule = new BarcodeModule();
  const [isVisible, setVisible] = useState(false);

  return (
    <PageLayout<Barcode> module={barcodeModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header
          hasNew
          hasSearch
          ExtraAction={() => (
            <Button type="primary" onClick={() => setVisible(true)}>
              {i18n.t('Barcode.GenerateBarcodes')}
            </Button>
          )}
        />

        <Panel.ListView module={barcodeModule} />
      </PageLayout.Panel>

      {isVisible && (
        <SharedModal setModalVisible={setVisible} isModalVisible={isVisible}>
          <BarcodeGenerateUpsert onCallback={() => setVisible(false)} />
        </SharedModal>
      )}
    </PageLayout>
  );
}
