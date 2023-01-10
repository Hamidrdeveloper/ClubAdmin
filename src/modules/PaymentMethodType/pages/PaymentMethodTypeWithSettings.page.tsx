// Since 26 Mordad - We Do not use this file and removed settings because payment method type settings migrated to payment method form, and fields loads dynamically and we get it from Backend

import { PageLayout, Panel } from '@src/shared/components';
import { Modal } from 'antd';
import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

import BankAccount from '../containers/PaymentMethodBankAccount';
import Lyra from '../containers/PaymentMethodLyra';
import Paypal from '../containers/PaymentMethodPaypal';
import { PaymentMethodType } from '../model/paymentMethodType.entity';
import PaymentMethodTypeModule from '../PaymentMethodType.module';

export default function PaymentTermManagePage(): ReactElement {
  const { t } = useTranslation();
  const paymentMethodTypeModule = new PaymentMethodTypeModule();
  const [modalVisible, setModalVisible] = useState<'Paypal' | 'Bank' | 'Lyra' | 'None'>('None');

  const onUpdate = (id: number) => {
    switch (id) {
      case 1:
        // PayPal
        setModalVisible('Paypal');
        break;
      case 2:
        // Lyra
        setModalVisible('Lyra');
        break;
      case 4:
        // Bank Account
        setModalVisible('Bank');
        break;
    }
  };

  return (
    <PageLayout<PaymentMethodType> module={paymentMethodTypeModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <Panel.Header hasSearch />

        <Panel.ListView
          module={paymentMethodTypeModule}
          hasUpdate={false}
          onUpdate={onUpdate}
          togglers={[
            {
              url: 'active',
              sorter: true,
              dataIndex: 'is_active',
              title: t('Global.Active'),
            },
          ]}
        />

        <Modal
          visible={modalVisible === 'Paypal'}
          width={1300}
          footer={false}
          destroyOnClose
          onCancel={() => setModalVisible('None')}
        >
          <Paypal onSubmit={() => setModalVisible('None')} />
        </Modal>

        <Modal
          visible={modalVisible === 'Bank'}
          width={1300}
          footer={false}
          destroyOnClose
          onCancel={() => setModalVisible('None')}
        >
          <BankAccount onSubmit={() => setModalVisible('None')} />
        </Modal>

        <Modal
          visible={modalVisible === 'Lyra'}
          width={1300}
          footer={false}
          destroyOnClose
          onCancel={() => setModalVisible('None')}
        >
          <Lyra onSubmit={() => setModalVisible('None')} />
        </Modal>
      </PageLayout.Panel>
    </PageLayout>
  );
}
