import { PurchaseReceiptsFormContext, SubscriptionReceiptsFormContext } from '@modules/Order';
import { AuthContext, Env } from '@src/core';
import { Loader } from '@src/shared/components';
import { Button, Col, Row, Select, Space, Table, Typography } from 'antd';
import React, { ReactElement, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { CreditNoteGenerateType, generateInvoiceCredit } from '../../controllers/credit.controller';
import { GenerateType, generate } from '../../controllers/order.controller';
import { generatePartnerSale } from '../../controllers/partner.controller';
import { PurchaseGenerateType, generatePurchaseSale } from '../../controllers/purchase.controller';
import {
  SubscriptionGenerateType,
  generateSubscribeDocuments,
} from '../../controllers/subscription.controller';
import { OrderReceiptsModule } from '../../Order.module';
import { uploadPurchaseDocument } from '../../services/purchase.service';
import {
  CreditDocumentsModel,
  CreditReceiptsFormContext,
  OrderDetailTabs,
  OrderDocumentModelType,
  OrderDocumentsModel,
  OrderModuleType,
  OrderReceiptsFormContext,
  OrderReceiptsModalFields,
} from '../..';
import OrderReceiptsUpload from './OrderReceiptsUpload';
import OrderReceiptsUpsert from './OrderReceiptsUpsert';

const { Option } = Select;

type Props = {
  orderSaleId: number | null;
  receipt: OrderDocumentModelType;
  moduleType: OrderModuleType;
  updateTab: (type: OrderDetailTabs) => void;
};

const OrderReceipts = ({ orderSaleId, receipt, moduleType, updateTab }: Props): ReactElement => {
  const { t } = useTranslation();
  const module = new OrderReceiptsModule(orderSaleId ?? '', moduleType);

  const {
    profile: { roles },
  } = useContext(AuthContext);

  const isOrderReadOnly = !!roles.find((role) => role.slug === 'partner');

  if (!receipt || !orderSaleId) return <Loader title={t('Order.Receipt.Loader')} />;

  const [isModalVisible, setModalVisibility] = useState<boolean>(false);
  const [isUploadModalVisible, setUploadModalVisible] = useState<boolean>(false);
  const [pending, setPending] = useState(false);
  const [selectedValue, setSelectedValue] = useState<
    GenerateType | PurchaseGenerateType | SubscriptionGenerateType | CreditNoteGenerateType
  >('default');

  const onSelectChange = (value) => {
    if (moduleType === 'order-sale' && value === 'pick_list') {
      onSubmit(value as GenerateType);
    } else {
      setModalVisibility(true);
      setSelectedValue(value);
    }
  };

  const onSubmit = (type?: GenerateType, values?: OrderReceiptsModalFields) => {
    if (type) {
      if (moduleType === 'order-sale') {
        setPending(true);
        generate(type, receipt.options.orderSaleId, { invoice_type: type })
          .then((link) => {
            window.open(Env.PURE_URL + link);
            updateTab(OrderDetailTabs.All);
          })
          .finally(() => {
            setPending(false);
            setModalVisibility(false);
          });
      }
    } else {
      const { ...restValues } = values;

      const data:
        | OrderReceiptsFormContext
        | CreditReceiptsFormContext
        | SubscriptionReceiptsFormContext
        | PurchaseReceiptsFormContext = {
        invoice_type: selectedValue,
        OrderDocument: { ...restValues },
        order_status_id: values?.ChangeOrderStatusTo?.id,
      };

      setPending(true);
      if (moduleType === 'partner') {
        generatePartnerSale(data.invoice_type, receipt.options.orderSaleId, data)
          .then((link) => {
            window.open(Env.PURE_URL + link);
            updateTab(OrderDetailTabs.All);
          })
          .finally(() => {
            setPending(false);
            setModalVisibility(false);
          });
      }
      if (moduleType === 'credit') {
        generateInvoiceCredit(selectedValue as CreditNoteGenerateType, receipt.options.orderSaleId, data)
          .then((link) => {
            window.open(Env.PURE_URL + link);
            updateTab(OrderDetailTabs.All);
          })
          .finally(() => {
            setPending(false);
            setModalVisibility(false);
          });
      } else if (moduleType === 'order-sale') {
        generate(selectedValue as GenerateType, receipt.options.orderSaleId, data)
          .then((link) => {
            window.open(Env.PURE_URL + link);
            updateTab(OrderDetailTabs.All);
          })
          .finally(() => {
            setPending(false);
            setModalVisibility(false);
          });
      } else if (moduleType === 'subscription') {
        generateSubscribeDocuments(
          selectedValue as SubscriptionGenerateType,
          receipt.options.orderSaleId,
          data,
        )
          .then((link) => {
            window.open(Env.PURE_URL + link);
            updateTab(OrderDetailTabs.All);
          })
          .finally(() => {
            setPending(false);
            setModalVisibility(false);
          });
      } else if (moduleType === 'purchase') {
        generatePurchaseSale(selectedValue as PurchaseGenerateType, receipt.options.orderSaleId, data)
          .then((link) => {
            window.open(Env.PURE_URL + link);
            updateTab(OrderDetailTabs.All);
          })
          .finally(() => {
            setPending(false);
            setModalVisibility(false);
          });
      }
    }
  };

  const selectOptionsCreditMode = (): ReactElement => {
    return (
      <>
        <Option value="default" disabled>
          {t('Global.SelectPlaceholder', { title: 'Item' })}
        </Option>
        {!(receipt as CreditDocumentsModel).options.correctionUrl ? (
          <Option value="correction_document">{t('Order.Receipt.GenerateCorrectionDocument')}</Option>
        ) : (
          <Option value="correction_document_cancellation">
            {t('Order.Receipt.GenerateCorrectionDocumentCancellation')}
          </Option>
        )}
        {!(receipt as CreditDocumentsModel).options.creditNoteUrl ? (
          <Option value="credit_note">{t('Order.Receipt.GenerateCreditNoteInvoice')}</Option>
        ) : (
          <Option value="credit_note_cancellation">
            {t('Order.Receipt.GenerateCreditNoteInvoiceCancellation')}
          </Option>
        )}
      </>
    );
  };

  const selectOptionsSubscribeOptions = (): ReactElement => {
    return (
      <>
        <Option value="default" disabled>
          {t('Global.SelectPlaceholder', { title: 'Item' })}
        </Option>
        <Option value="cancellation">{t('Order.Receipt.GenerateCancellation')}</Option>
        <Option value="confirmation">{t('Order.Receipt.GenerateConfirmation')}</Option>
      </>
    );
  };

  const selectOptionsPurchaseOptions = (): ReactElement => {
    return (
      <>
        <Option value="default" disabled>
          {t('Global.SelectPlaceholder', { title: 'Item' })}
        </Option>
        <Option value="generatePurchase">{t('Order.Receipt.GeneratePurchase')}</Option>
      </>
    );
  };

  return (
    <MainContainer>
      <div className="content">
        <Row className="select-container" align="middle" gutter={[16, 16]}>
          <Col span={24}>
            <Space>
              <Typography>{t('Order.Receipt.Create')}:</Typography>
              <Select
                value={selectedValue}
                className="action-select"
                onChange={onSelectChange}
                placeholder={t('Global.Action') + '...'}
                disabled={isOrderReadOnly ? moduleType !== 'partner' : false}
              >
                {
                  _Options({
                    receipt,
                    selectOptionsCreditMode,
                    selectOptionsSubscribeOptions,
                    selectOptionsPurchaseOptions,
                    t,
                  })[moduleType]
                }
              </Select>
              {moduleType === 'purchase' && (
                <Button
                  disabled={isOrderReadOnly}
                  onClick={() => {
                    setUploadModalVisible(true);
                  }}
                >
                  {t('Global.UploadFile')}
                </Button>
              )}
            </Space>
          </Col>
          <Col span={24}>
            <Table dataSource={receipt['documents']} columns={module.tableColumns} pagination={false} />
          </Col>
        </Row>
      </div>

      {(!isOrderReadOnly || moduleType === 'partner') && (
        <OrderReceiptsUpsert
          module={module}
          pending={pending}
          moduleType={moduleType}
          visible={isModalVisible}
          setVisible={setModalVisibility}
          onSubmit={(data) => onSubmit(undefined, data)}
          setSelectedValue={(value) => setSelectedValue(value as GenerateType)}
        />
      )}

      {moduleType === 'purchase' && !isOrderReadOnly && (
        <OrderReceiptsUpload
          module={module}
          onSubmit={(data) => {
            setPending(true);
            uploadPurchaseDocument(orderSaleId, data)
              .then(() => {
                setPending(false);
                setUploadModalVisible(false);
                updateTab(OrderDetailTabs.All);
              })
              .catch(() => {
                setPending(false);
              });
          }}
          pending={pending}
          visible={isUploadModalVisible}
          setVisible={setUploadModalVisible}
        />
      )}
    </MainContainer>
  );
};

export default OrderReceipts;

const _Options = ({
  receipt,
  selectOptionsCreditMode,
  selectOptionsSubscribeOptions,
  selectOptionsPurchaseOptions,
  t,
}) => ({
  'order-sale': !(receipt as OrderDocumentsModel).options.invoiceId ? (
    <>
      <Option value="default" disabled>
        {t('Global.SelectPlaceholder', { title: 'Item' })}
      </Option>
      <Option value="invoice">{t('Order.Receipt.GenerateInvoice')}</Option>
      <Option value="delivery_note">{t('Order.Receipt.GenerateDeliveryNote')}</Option>
      <Option value="pick_list">{t('Order.Receipt.GeneratePickList')}</Option>
      <Option value="export_custom">{t('Order.Receipt.ExportCustom')}</Option>
      <Option value="total_summery">{t('Order.Receipt.TotalSummery')}</Option>
    </>
  ) : (
    <>
      <Option value="default" disabled>
        {t('Global.SelectPlaceholder', { title: 'Item' })}
      </Option>
      <Option value="invoice_cancellation">{t('Order.Receipt.GenerateInvoiceCancellation')}</Option>
      <Option value="delivery_note">{t('Order.Receipt.GenerateDeliveryNote')}</Option>
      <Option value="pick_list">{t('Order.Receipt.GeneratePickList')}</Option>
      <Option value="export_custom">{t('Order.Receipt.ExportCustom')}</Option>
      <Option value="total_summery">{t('Order.Receipt.TotalSummery')}</Option>
    </>
  ),
  partner: (
    <>
      <Option value="default" disabled>
        {t('Global.SelectPlaceholder', { title: 'Item' })}
      </Option>
      <Option value="invoice">{t('Order.Receipt.GenerateInvoice')}</Option>
      <Option value="invoice_cancellation">{t('Order.Receipt.GenerateInvoiceCancellation')}</Option>
    </>
  ),
  credit: selectOptionsCreditMode(),
  subscription: selectOptionsSubscribeOptions(),
  purchase: selectOptionsPurchaseOptions(),
});

const MainContainer = styled.div`
  & .content {
    border-radius: 4px;
    box-shadow: 0 0 10px #ebede7;
    padding: 12px;
    & .select-container {
      padding: 5px;
      & .ant-select {
        outline: none;
        margin-left: 3px;
      }
    }
    & .ant-table {
      & th.ant-table-cell {
        color: #fff;
        background: #4a5161;
      }

      & tr {
        &:nth-child(odd) {
          & td.ant-table-cell {
            background: #fbfbfb;
          }
        }

        &:nth-child(even) {
          & td.ant-table-cell {
            background: #f2f2f2;
          }
        }
      }
      & .action-btn {
        color: #4474e7;
      }
    }

    & .action-select {
      min-width: 16vw;
    }
  }
  .table-container {
    width: 100%;
  }
`;
