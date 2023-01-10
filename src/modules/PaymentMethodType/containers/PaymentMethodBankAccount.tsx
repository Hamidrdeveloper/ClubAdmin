import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';

import { BankAccountForm } from '../components/BankAccount.form';
import { editBankAccountSetting, getBankAccountSetting } from '../controller/bankAccount.controller';
import { BankAccountModel } from '../model/bankAccount.entity';

type Props = { onSubmit: () => void };
const BankAccount = ({ onSubmit }: Props): ReactElement => {
  const [pending, setPending] = useState<boolean>(false);
  const [settings, setSettings] = useState<BankAccountModel[]>([]);

  const handleFormSubmit = (data: BankAccountModel[]) => {
    setPending(true);
    editBankAccountSetting(data)
      .then((res) => {
        setPending(false);
        onSubmit();
        res && setSettings(res);
      })
      .catch(() => setPending(false));
  };

  useEffect(() => {
    setPending(true);
    getBankAccountSetting()
      .then((data) => {
        setPending(false);
        setSettings(data ?? []);
      })
      .catch(() => setPending(false));
  }, []);

  return (
    <MainContainer>
      <BankAccountForm initialValues={settings} onSubmit={handleFormSubmit} isPending={pending} />
    </MainContainer>
  );
};

export default BankAccount;

const MainContainer = styled.div`
  padding: 16px;

  & .first-col,
  & .second-col {
    & .row {
      border-radius: 4px;
      padding: 16px;
      position: relative;
      & .action {
        position: absolute;
        right: 16px;
        top: 50%;
        transform: translateY(-50%);
      }
      & .select {
        width: 100%;
        & .ant-select-selector {
          border: 1px solid #f2f4eb;
          outline: none;
        }
      }
      & .picker {
        width: 100%;
      }
      & .ant-picker {
        border-radius: 4px;
        border: none;
      }
      & .info-box {
        background-color: white;
        border: 1px solid #f2f4eb;
        border-radius: 4px;
        height: 33px;
        padding: 5px;
        width: 100%;
      }
      & .success-btn {
        color: #57af52;
        font-size: 14px;
        border-color: #99e694;
        font-weight: 400;
        background-color: #b9eab6;
      }
    }
  }

  & .first-col {
    & .row {
      &:nth-child(odd) {
        background: #fbfbfb;
      }
      &:nth-child(even) {
        background: #f2f2f2;
      }
    }
  }

  & .second-col {
    & .row {
      &:nth-child(even) {
        background: #fbfbfb;
      }
      &:nth-child(odd) {
        background: #f2f2f2;
      }
    }
  }

  & .btn-row {
    margin: 35px;
    & .submit-btn {
      background-color: #2d5fa5;
      border-radius: 4px;
      color: white;
      width: 130px;
    }
  }
`;
