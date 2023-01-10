import { PackerBarcodeType } from '@modules/PackerDashboard/model/packer';
import { Input, Row, Space, Steps } from 'antd';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const { Step } = Steps;

type Props = {
  barcodeValue: string;
  step: PackerBarcodeType;
  onBarcodeChange: (barcode: string) => void;
  onStepChanged: (step: PackerBarcodeType) => void;
};

function BarcodeColumn({ barcodeValue, step, onBarcodeChange, onStepChanged }: Props): ReactElement {
  const { t } = useTranslation();

  return (
    <Row justify="start" align="top">
      <Space>
        <StyledInput
          autoFocus
          placeholder={
            step === 'Order'
              ? t('PackerDashboard.OrderID')
              : step === 'Box'
              ? t('PackerDashboard.Box')
              : step === 'Product'
              ? t('PackerDashboard.ProductBarcode')
              : ''
          }
          value={barcodeValue}
          onChange={({ target: { value } }) => onBarcodeChange(value)}
        />
        <Steps
          progressDot
          direction="horizontal"
          style={{ marginTop: 16 }}
          current={step === 'Order' ? 0 : step === 'Box' ? 1 : 2}
          onChange={(step) => onStepChanged(step === 0 ? 'Order' : step === 1 ? 'Box' : 'Product')}
        >
          <Step title={t('PackerDashboard.Order')} />
          <Step title={t('PackerDashboard.Box')} />
          <Step title={t('PackerDashboard.Product')} />
        </Steps>
      </Space>
    </Row>
  );
}

export default BarcodeColumn;

const StyledInput = styled(Input)`
  min-width: 220px;
`;
