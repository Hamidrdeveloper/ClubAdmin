import { MinusOutlined, PlusOutlined, SwapRightOutlined } from '@ant-design/icons';
import { Button, Col, Input, InputNumber, Modal, Row, Space, Tag, message } from 'antd';
import React, { KeyboardEvent, ReactElement, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { PackerDashboardContext } from '../context/PackerDashboardContext';
import { useBarcodeChangePacker } from '../hooks/useBarcodeChangePacker';
import { PositionSerialNumber } from '../model/packer';

type Props = {
  image: string;
  title: string;
  number: string;
  positionId: number;
  isParent?: boolean;
  quantity?: number;
  maxQuantity?: number;
  variationId?: number;
  hasSerialNumber?: boolean;
  onChange?: (quantity: number) => void;
};
function PackerProduct({
  image,
  title,
  number,
  quantity,
  isParent,
  maxQuantity,
  variationId,
  positionId,
  hasSerialNumber,
  onChange = undefined,
}: Props): ReactElement {
  const [visible, setVisible] = React.useState(false);
  const [removeVisible, setRemoveVisible] = useState(false);
  const [serialNumber, setSerialNumber] = React.useState('');

  const [quantityType, setQuantityType] = React.useState('variation');

  const { whenBarcodeTypeIsProduct: addSuddenProduct } = useBarcodeChangePacker();
  const { barcodeType, serialNumbers, setSerialNumbers } = useContext(PackerDashboardContext);
  const { t } = useTranslation();

  const handleSerialNumber = () => {
    if (serialNumber !== '') {
      setVisible(false);

      if (serialNumbers.find((element) => element.serialNumber === serialNumber)) {
        setSerialNumber('');
        message.error(t('PackerDashboard.DuplicateSerialNumber'));
      } else {
        setSerialNumbers([...serialNumbers, { serialNumber, positionId }]);
        if (quantityType === 'quantity') {
          setSerialNumber('');
          onChange?.((quantity ?? 0) + 1);
        } else {
          setSerialNumber('');
          addSuddenProduct(variationId, positionId);
        }
      }
    } else {
      message.error(t('PackerDashboard.RequiredSerialNumber'));
    }
  };

  const handleEnterSerialNumber = (e: KeyboardEvent) => {
    if (e.code === 'Enter') {
      handleSerialNumber();
    }
  };

  const handleAddProduct = () => {
    if (hasSerialNumber) {
      setVisible(true);
      setQuantityType('variation');
    } else {
      addSuddenProduct(variationId, positionId);
    }
  };

  const handleQuantityChange = (quantity: number) => {
    if (hasSerialNumber) {
      setVisible(true);
      setQuantityType('quantity');
    } else {
      onChange?.(quantity);
    }
  };

  const handleDecreaseQuantity = () => {
    if (hasSerialNumber) {
      setRemoveVisible(true);
    } else {
      onChange?.(Number(quantity) - 1);
    }
  };

  const handleRemoveSerialNumber = (item: PositionSerialNumber) => {
    setSerialNumbers(serialNumbers.filter((serial) => serial.serialNumber !== item.serialNumber));
    onChange?.(Number(quantity) - 1);
    setRemoveVisible(false);
  };

  const handleCloseModal = () => {
    setVisible(false);
    setSerialNumber('');
  };

  return (
    <MainContainer>
      {(quantity ?? 1) > 0 && (
        <Row justify="start" align="middle">
          <Col span={4}>
            <img
              src={image}
              style={{ width: '100%', objectFit: 'contain' }}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = '/assets/images/dashboard/box.png';
              }}
            />
          </Col>

          <Col span={onChange ? 11 : 14} offset={1}>
            <h4>{title}</h4>
            {number && (
              <h5>
                {t('PackerDashboard.Number')} : {number}
              </h5>
            )}
          </Col>

          <Col span={onChange ? 5 : 2} offset={1}>
            {onChange ? (
              <Space direction="horizontal">
                <Button size="small" style={{ height: 32 }} onClick={handleDecreaseQuantity}>
                  <MinusOutlined />
                </Button>

                {quantity && (
                  <InputNumber
                    step={1}
                    value={quantity}
                    max={maxQuantity ?? 0}
                    style={{ minWidth: 60, textAlign: 'center' }}
                    onChange={(value) => onChange?.(value as number)}
                  />
                )}

                <Button
                  size="small"
                  style={{ height: 32 }}
                  disabled={quantity === maxQuantity}
                  onClick={() => handleQuantityChange(Number(quantity) + 1)}
                >
                  <PlusOutlined />
                </Button>
              </Space>
            ) : (
              <h4>
                <b>{quantity}</b>
              </h4>
            )}
          </Col>

          {!onChange && !isParent && (
            <Col span={2}>
              <Button
                onClick={handleAddProduct}
                icon={<SwapRightOutlined />}
                disabled={barcodeType !== 'Product'}
              />
            </Col>
          )}
        </Row>
      )}

      <Modal
        destroyOnClose
        visible={visible}
        onOk={handleSerialNumber}
        onCancel={handleCloseModal}
        title={t('PackerDashboard.ProductVariationSerialNumber')}
      >
        <div>
          <Input
            value={serialNumber}
            placeholder={t('PackerDashboard.EnterSerialNumber')}
            onChange={(event) => setSerialNumber(event.target.value)}
            onKeyDown={handleEnterSerialNumber}
          />
        </div>
      </Modal>

      <Modal
        footer={null}
        destroyOnClose
        visible={removeVisible}
        onCancel={() => setRemoveVisible(false)}
        title={t('PackerDashboard.SelectSerialNumber')}
      >
        {serialNumbers.map((serial, idx) => (
          <Tag
            closable
            color="magenta"
            key={`serial-${idx}`}
            onClose={() => handleRemoveSerialNumber(serial)}
          >
            {serial.serialNumber}
          </Tag>
        ))}
      </Modal>
    </MainContainer>
  );
}

export default PackerProduct;

const MainContainer = styled.div`
  margin-bottom: 8px;

  & h4 {
    margin: 0;
  }

  & .ant-tag-magenta {
    font-size: 1rem !important;
    padding-block: 16px !important;

    & .ant-tag-close-icon {
      font-size: 1rem !important;
    }
  }
`;
