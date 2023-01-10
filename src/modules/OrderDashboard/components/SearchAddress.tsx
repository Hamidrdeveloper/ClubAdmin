import { PlusOutlined } from '@ant-design/icons';
import { getUserContactGroup } from '@modules/OrderDashboard/services/contactGroups.service';
import AddressUpsert from '@modules/User/containers/AddressUpsert';
import { Address } from '@modules/User/model/address';
import { ApiBuilder } from '@shared/utils';
import { Button, Col, Divider, Modal, Row, Select, Space, Spin, Typography } from 'antd';
import { useAtom } from 'jotai';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import { addressAtom, userAtom } from '../Atom';

type Props = {
  isPartner: boolean;
};
const SearchAddress: FC<Props> = ({ isPartner }) => {
  const [items, setItems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currency, setCurrency] = useState<any>();
  const { Title, Text } = Typography;
  const [user] = useAtom(userAtom);
  const [address, setAddress] = useAtom(addressAtom);
  const {
    data: addresses,
    isLoading,
    refetch,
  } = useQuery(['contact-groups', user?.id], () => getUserContactGroup(user!.id), {
    // @ts-ignore
    enabled: user?.id > 0,
  });

  useMemo(() => {
    if (addresses && address['invoice'])
      setCurrency(addresses?.data?.find((el) => el.id === address['invoice'][1])?.address?.country?.currency);
  }, [address]);

  useMemo(() => setAddress((prev) => ({ ...prev, currency: currency })), [currency]);
  const { t } = useTranslation();

  useMemo(() => {
    return (
      addresses &&
      setItems(
        // @ts-ignore
        addresses.data?.map((address) => [
          `${address?.title}-${address?.address?.city}`,
          address?.id,
          address?.address?.address_complete,
        ]),
      )
    );
  }, [addresses, user]);

  // set default invoice address
  useEffect(() => {
    user &&
      setAddress((prev) => ({
        // @ts-ignore
        ...prev,
        invoice: [
          `${user?.invoiceContactGroup?.address?.title}-${user?.invoiceContactGroup?.address?.city}`,
          user?.invoice_contact_group_id,
          user?.invoiceContactGroup?.address?.address_complete,
        ],
      }));
  }, [user]);
  return (
    <>
      <Modal
        width="810px"
        title={t('OrderDashboard.AddNewAddress')}
        visible={modalVisible}
        footer={false}
        onCancel={() => setModalVisible(false)}
      >
        <div style={{ width: '700px' }}>
          <AddressUpsert
            api={(values) =>
              new ApiBuilder<Address>('')
                .request({
                  url: `/user/${user?.id}/contact-groups`,
                  method: 'POST',
                  body: { ...values, user_id: user?.id },
                })
                .then(() => {
                  setModalVisible(false);
                  refetch();
                })
            }
          />
        </div>
      </Modal>
      <Row>
        <Col span={5}>
          <Title level={5}>{t('OrderDashboard.InvoiceAddress')}:</Title>
        </Col>
        <Col span={14}>
          <Select
            value={address?.['invoice']?.[0]}
            // @ts-ignore
            onSelect={(value) => setAddress((prev) => ({ ...prev, invoice: value }))}
            disabled={!user?.id}
            notFoundContent={isLoading ? <Spin size="small" /> : <Text type="warning">no item !</Text>}
            style={{ width: '100%' }}
            placeholder="Choose Invoice Address"
            dropdownRender={(menu) => (
              <>
                {menu}
                {!isPartner && (
                  <>
                    <Divider style={{ margin: '8px 0' }} />
                    <Space style={{ padding: '0 8px 4px' }}>
                      <Button type="text" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
                        Add item
                      </Button>
                    </Space>
                  </>
                )}
              </>
            )}
            options={items?.map((item) => ({ label: item, value: item }))}
          />
        </Col>
      </Row>
      <Row>
        <Col span={5}>
          <Title level={5}>{t('OrderDashboard.DeliveryAddress')}:</Title>
        </Col>
        <Col span={14}>
          <Select
            value={address?.['delivery']?.[0] || ''}
            // @ts-ignore
            onSelect={(value) => setAddress((prev) => ({ ...prev, delivery: value }))}
            disabled={!user?.id}
            notFoundContent={isLoading ? <Spin size="small" /> : <Text type="warning">no item !</Text>}
            style={{ width: '100%' }}
            placeholder="Choose Delivery Address"
            dropdownRender={(menu) => (
              <>
                {menu}
                <Divider style={{ margin: '8px 0' }} />
                <Space style={{ padding: '0 8px 4px' }}>
                  <Button type="text" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
                    Add item
                  </Button>
                </Space>
              </>
            )}
            options={items?.map((item) => ({ label: item, value: item }))}
          />
        </Col>
      </Row>
    </>
  );
};
export default SearchAddress;
