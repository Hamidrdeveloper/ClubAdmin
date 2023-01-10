import { EditOutlined, FileTextOutlined, HistoryOutlined } from '@ant-design/icons';
import { AuthContext } from '@src/core';
import { Accordion, Loader } from '@src/shared/components';
import { intlDate } from '@src/shared/utils/engine.service';
import { Button, Divider, Space, Table } from 'antd';
import React, { Fragment, ReactElement, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { getAllHistories } from '../../services/order.service';
import { getAllPurchaseHistories } from '../../services/purchase.service';
import { getAllHistoriesForSubscription } from '../../services/subscription.service';
import {
  CreditSalePure,
  OrderDetailTabs,
  OrderHistoryPure,
  OrderModuleType,
  OrderSalePure,
  OrderSaleType,
} from '../..';
import OrderNoteUpsert from './modals/OrderNoteUpsert';

type Props = {
  orderSale: OrderSaleType;
  moduleType: OrderModuleType;
  updateTab: (type: OrderDetailTabs) => void;
};
const OrderOverviewNotes = ({ orderSale, moduleType, updateTab }: Props): ReactElement => {
  const { t } = useTranslation();

  const {
    profile: { roles },
  } = useContext(AuthContext);

  const isOrderReadOnly = !!roles.find((role) => role.slug === 'partner');

  // TODO: Refactor, Use real tabs!
  const [activeTab, setActiveTab] = useState(0);
  const [histories, setHistories] = useState<OrderHistoryPure[]>([]);
  const [isPending, setPending] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setPending(true);
    switch (moduleType) {
      case 'order-sale':
      case 'credit':
        getAllHistories(
          moduleType === 'credit' ? (orderSale as CreditSalePure).order.id : orderSale?.id ?? -1,
        ).then((histories) => {
          setHistories(histories);
          setPending(false);
        });
        break;
      case 'subscription':
        getAllHistoriesForSubscription(orderSale?.id ?? -1).then((histories) => {
          setHistories(histories);
          setPending(false);
        });
        break;
      case 'purchase':
        getAllPurchaseHistories(orderSale?.id ?? -1).then((histories) => {
          setHistories(histories);
          setPending(false);
        });
        break;
    }
  }, [orderSale]);

  if (isPending) return <Loader />;

  return (
    <MainContainer>
      <div className="tabs">
        <Space>
          <Button
            className={activeTab === 0 ? ' active' : ''}
            size="large"
            icon={<FileTextOutlined />}
            onClick={() => setActiveTab(0)}
          >
            {t('Order.Overview.OrderNotes')}
          </Button>
          <Button
            className={activeTab === 1 ? ' active' : ''}
            size="large"
            icon={<HistoryOutlined />}
            onClick={() => setActiveTab(1)}
          >
            {t('Order.Overview.StatusHistory')}
          </Button>
        </Space>
      </div>
      {activeTab === 0 ? (
        <Space direction="vertical" className="contents">
          <Accordion
            size="small"
            title={t('Global.Notes')}
            otherIcons={() =>
              moduleType !== 'credit' && moduleType !== 'purchase' ? (
                <AccordionEditIcon>
                  <Button
                    disabled={isOrderReadOnly}
                    icon={<EditOutlined color="#326D94" />}
                    size="small"
                    type="ghost"
                    onClick={(event) => {
                      event.stopPropagation();
                      setModalVisible(true);
                    }}
                  />
                </AccordionEditIcon>
              ) : null
            }
          >
            <div className="accordion-details">
              {(moduleType === 'credit'
                ? (orderSale as CreditSalePure).order
                : (orderSale as OrderSalePure)
              ).orderComments?.map((comment, index) => <p key={index}>{comment.description ?? ' - '}</p>) ||
                ' - '}
            </div>
          </Accordion>
        </Space>
      ) : (
        <Space direction="vertical" className="contents">
          <Accordion size="small" title={t('Global.History')}>
            <div className="accordion-details">
              {histories?.map((history, index) => (
                <Fragment key={index}>
                  <p>
                    - <b>{t('Global.FullName')}: </b>
                    {history?.user?.person?.full_name ?? ' - '}
                  </p>

                  <p>
                    - <b>{t('Global.Username')}: </b>
                    <Link to={`/admin/users/manage/${history.user?.id}`}>
                      {history?.user?.username ?? ' - '}
                    </Link>
                  </p>

                  <p>
                    - <b>{t('Order.Titles.IPAddress')}: </b>
                    {history.ip_address ?? '-'}
                  </p>

                  <p>
                    - <b>{t('Order.Titles.Event')}: </b>
                    {history.event ?? '-'}
                  </p>

                  <Table
                    dataSource={Object.keys(history.new_values).map((title) => ({
                      title,
                      n_value: history?.new_values[title] ?? '-',
                      o_value: history?.old_values[title] ?? '-',
                      date: history?.created_at ? intlDate(new Date(history.created_at)) : null,
                    }))}
                    columns={historyColumns}
                    pagination={false}
                  />
                  <Divider />
                </Fragment>
              ))}
            </div>
          </Accordion>
        </Space>
      )}
      {!isOrderReadOnly && (
        <OrderNoteUpsert
          moduleType={moduleType}
          initialValue={(moduleType === 'credit'
            ? (orderSale as CreditSalePure).order
            : (orderSale as OrderSalePure)
          ).orderComments?.reduce((a, b) => a + '\n' + b.description, '')}
          onDone={() => updateTab(OrderDetailTabs.Overview)}
          orderSaleId={orderSale?.id ?? -1}
          setVisible={setModalVisible}
          isVisible={isModalVisible}
        />
      )}
    </MainContainer>
  );
};

export default OrderOverviewNotes;

const MainContainer = styled.div`
  & .tabs {
    padding-bottom: 16px;
    width: 100%;
    justify-content: center;

    & button {
      &.active {
        background-color: #45b339;
        color: white;
        border: 1px solid ${(props) => props.theme.colors.success};
      }
    }
  }

  & .contents {
    width: 100%;

    & .icon-positions {
      margin: 8px;
    }

    & .accordion-details {
      padding: 16px;
      min-height: 150px;
      max-height: 256px;
      overflow-y: auto;
      background: #fbfbfb;
    }
  }
`;

const AccordionEditIcon = styled.div`
  margin-right: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  & > * {
    border-radius: 50% !important;
    width: 30px !important;
    height: 30px !important;
    border: 1px solid #326d94;
  }
`;

const historyColumns = [
  {
    title: 'Keys',
    dataIndex: 'title',
    key: 'key',
  },
  {
    title: 'New Value',
    dataIndex: 'n_value',
    key: 'new_value',
  },
  {
    title: 'Old Value',
    dataIndex: 'o_value',
    key: 'old_value',
  },
  {
    title: 'Date Time',
    dataIndex: 'date',
    key: 'date',
  },
];
