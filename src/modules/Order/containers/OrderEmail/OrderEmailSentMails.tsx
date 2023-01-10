import { EditOutlined, SyncOutlined } from '@ant-design/icons';
import { AuthContext } from '@src/core';
import { Loader } from '@src/shared/components';
import { PaginationRequest, ResponseMeta } from '@src/shared/models';
import { Button, Col, Pagination, Row, Space, Table } from 'antd';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { resendEmailPreview, sendEmailPreview } from '../../controllers/email.controller';
import { OrderEmailModule } from '../../Order.module';
import { getAllSentMails } from '../../services/email.service';
import { OrderEmailsModalFields, OrderEmailsSentHistory, OrderModuleType } from '../..';
import OrderGeneralEmailTabUpsert from './modals/OrderGeneralEmailTabUpsert';

type Props = { orderId: number; moduleType: OrderModuleType };
export const OrderEmailSentMails = ({ orderId: orderId, moduleType }: Props): ReactElement => {
  const { t } = useTranslation();

  const {
    profile: { roles },
  } = useContext(AuthContext);

  const isOrderReadOnly = !!roles?.find((role) => role.slug === 'partner');

  const [isPending, setPending] = useState<boolean>(false);
  const [resendPendId, setResendPendId] = useState<number>(-1);
  const [update, setUpdate] = useState<number>(0);
  const [histories, setHistories] = useState<OrderEmailsSentHistory[]>([]);

  // For Modal
  const [mailPreview, setMailPreview] = useState<OrderEmailsModalFields>();
  const [formSubmitPending, setFormSubmitPending] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  // For Pagination
  const [pagination, setPagination] = useState<PaginationRequest>({ page: 1, per_page: 10 });
  const [metaResponse, setMetaResponse] = useState<ResponseMeta>();

  useEffect(() => {
    setPending(true);
    getAllSentMails(
      {
        mailableId: orderId,
        mailableType:
          moduleType === 'order-sale' || moduleType === 'credit'
            ? 'order-sale'
            : moduleType === 'subscription'
            ? 'order-subscription'
            : 'order-purchase',
      },
      { pagination },
    )
      .then(([histories, meta]) => {
        setHistories(histories);
        setMetaResponse(meta);
      })
      .finally(() => setPending(false));
  }, [update, pagination]);

  const onModalSubmit = (body: OrderEmailsModalFields) => {
    setFormSubmitPending(true);
    sendEmailPreview(body, orderId, moduleType).finally(() => {
      setFormSubmitPending(false);
      setModalVisible(false);
      setUpdate((update) => update + 1);
    });
  };

  const resend = (history: OrderEmailsSentHistory) => {
    setResendPendId(history.id);
    resendEmailPreview(history.id).finally(() => {
      setResendPendId(-1);
      setUpdate((update) => update + 1);
    });
  };

  const preview = (history: OrderEmailsSentHistory) => {
    setMailPreview({
      // TODO: We should'nt get from inner body
      template_id: history.id,
      body: history.body['body'],
      subject: history.subject,
      customer_email: history.recipient[0],
    });
    setModalVisible(true);
  };

  if (isPending) return <Loader title={t('Order.Email.Loader')} />;
  return (
    <EmailHistoryContainer>
      <Row>
        <Col span={24}>
          <Table
            dataSource={histories}
            columns={HistoryColumns(resend, preview, resendPendId, isOrderReadOnly)}
            pagination={false}
          />
        </Col>
        <Col span={24}>
          <PaginationContainer>
            <Pagination
              onChange={(page, pageSize) => setPagination({ page, per_page: pageSize })}
              disabled={isPending}
              total={metaResponse?.total}
              current={metaResponse?.current_page}
              pageSize={metaResponse?.per_page || 10}
            />
          </PaginationContainer>
        </Col>
      </Row>

      {!isOrderReadOnly && (
        <OrderGeneralEmailTabUpsert
          module={new OrderEmailModule()}
          onSubmit={onModalSubmit}
          visible={isModalVisible}
          setVisible={(isVisible) => setModalVisible(isVisible)}
          isPending={formSubmitPending}
          initialValues={mailPreview}
        />
      )}
    </EmailHistoryContainer>
  );
};

const EmailHistoryContainer = styled.div`
  padding: 16px;
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
    min-width: 12vw;
  }

  .table-container {
    width: 100%;
  }
`;

const PaginationContainer = styled.div`
  margin-top: 16px;
`;

const HistoryColumns = (resend, preview, resendPendId, isOrderReadOnly: boolean) => [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Subject',
    dataIndex: 'subject',
    key: 'subject',
  },
  {
    title: 'Recipients',
    dataIndex: 'recipient',
    key: 'recipient',
    render: (recipient) => <span>{recipient[0]}</span>,
  },
  {
    title: 'Action',
    dataIndex: 'id',
    key: 'action',
    render: (id, data) => (
      <Space>
        <Button
          disabled={isOrderReadOnly}
          icon={<SyncOutlined />}
          onClick={() => resend(data as OrderEmailsSentHistory)}
          loading={resendPendId === id}
        >
          Resend
        </Button>
        <Button
          icon={<EditOutlined />}
          onClick={() => preview(data as OrderEmailsSentHistory)}
          disabled={isOrderReadOnly}
        >
          Preview
        </Button>
      </Space>
    ),
  },
];
