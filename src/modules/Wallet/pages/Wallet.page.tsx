import { adminTheme } from '@src/core';
import { WalletListModel } from '@src/modules/Wallets/model/WalletList.entity';
import WalletModule from '@src/modules/Wallets/WalletList.module';
import { PageLayout } from '@src/shared/components';
import { Button, Col, Row, Typography } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import ExpenseLogo from '../components/ExpenseLogo';
import IncomeLogo from '../components/IncomeSvg';
import { WalletOverViewModel } from '../model/Wallet.entity';
import getUserWalletService from '../service/getUserWallet.service';
import TransactionHistoryPage from './TransactionHistory.page';

const { Title } = Typography;
const WalletPage = (): ReactElement => {
  const module = new WalletModule();
  const { user_id: userId } = useParams();

  const { data } = useQuery<WalletOverViewModel>(
    ['wallet-userId', userId],
    getUserWalletService.bind(null, { userId }),
  );

  const { t } = useTranslation();

  const routes = [
    {
      path: '',
      breadcrumbName: `Dashboard`,
    },
    {
      path: '/wallet',
      breadcrumbName: `Wallet`,
    },
  ];
  return (
    <PageLayout<WalletListModel> module={module}>
      <PageLayout.Breadcrumb routes={routes} />
      <CustomRow gutter={[32, 32]}>
        <Col xs={24} lg={12} className="container current-balance-container">
          <Title level={4} className="text">
            {t('Wallet.CleafinStars')}
          </Title>

          <Title level={1} className="digit">
            {data?.balance}
          </Title>
        </Col>
        <Col xs={24} lg={12} className="container no-padding">
          <Row justify="space-between" gutter={[0, rowGap]}>
            <Col xs={11} className="small-container income-container">
              <div className="icon">
                <IncomeLogo strokeWidth={2.5} />
              </div>
              <div className="title">
                <Title level={5}>{t('Wallets.Income')}</Title>
              </div>
              <div className="digits">
                <Title level={3}>{data?.deposit}</Title>
              </div>
            </Col>

            <Col xs={11} className="small-container expense-container">
              <div className="icon">
                <ExpenseLogo strokeWidth={2.5} />
              </div>
              <div className="title">
                <Title level={5}>{t('Wallets.Spend')}</Title>
              </div>
              <div className="digits">
                <Title level={3}>{data?.withdraw}</Title>
              </div>
            </Col>

            <Col xs={24} className="small-container deposit-container disabled">
              <Paragraph>
                You can request a deposit and after confirming the system, the money will be credited to your
                account.
              </Paragraph>
              <Button type="primary" disabled>
                Submit a Request
              </Button>
            </Col>
          </Row>
        </Col>

        <Col xs={24}>
          <Title level={3} className="text">
            {t('Wallet.TransactionHistory')}
          </Title>

          <TransactionHistoryPage userId={userId} />
        </Col>
      </CustomRow>
    </PageLayout>
  );
};

export default WalletPage;

const heightOfContainers = '30vh';
const heightOfSmallContainer = parseInt(heightOfContainers) / 2 + 'vh';
const whiteColor = '#FFFFFF';
// in pixels
const rowGap = 8;

const CustomRow = styled(Row)`
  padding: 20px;

  .deposit-container {
    gap: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;

    & button {
      border-radius: 3px;
      min-width: fit-content;
    }
  }

  .income-container,
  .expense-container {
    display: grid;
    column-gap: 20px;
    align-items: center;
    grid-template-columns: 1fr 3fr;
    grid-template-rows: 10px 1fr 10px 2fr 10px;

    .icon {
      grid-area: 2 / 1 / 5 / 2;

      justify-self: end;
      font-size: 3.5rem;
    }
    .title {
      grid-area: 2 / 2 /3 / 3;
    }
    .digits {
      grid-area: 4 / 2 / 5 /3;
    }
  }

  & .ant-col {
    padding: 12px;
    border-radius: 8px;
  }

  .no-padding {
    padding: 0;
  }

  .container {
    height: ${heightOfContainers};
  }

  .small-container {
    min-width: 49%;
    background-color: ${whiteColor};
    height: ${heightOfSmallContainer};
  }

  .current-balance-container {
    display: grid;
    align-items: center;
    justify-items: center;
    grid-template-rows: 5vh 1fr 5vh;
    grid-template-columns: 1fr 1fr 1fr;

    height: calc(${heightOfContainers} + ${rowGap + 'px'});

    background-color: ${adminTheme.colors.secondary};

    .text {
      justify-self: left;
      color: ${whiteColor};
      grid-area: 1 / 1 / 2 / 1;
    }
    .digit {
      margin-top: 0;
      margin-bottom: 0;
      letter-spacing: 3px;
      color: ${whiteColor};
      grid-area: 2 / 2 / 2 / 2;
    }
  }

  .disabled {
    cursor: not-allowed;
    opacity: 0.5;
    & .ant-typography {
      color: #b0b0b0;
    }
  }
`;
