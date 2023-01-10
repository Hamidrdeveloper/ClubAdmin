import { Country } from '@src/modules/Country';
import { Currency } from '@src/modules/Currency';
import { Language } from '@src/modules/Language';
import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';

import { SaleSystemForm } from '../../components/SaleSystem.form';
import { editSaleSystemSetting, getSaleSystemSetting } from '../../controllers/saleSystem.controller';
import { SaleSystemModel } from '../../model/saleSystem.entity';

type Props = { partnerId: number; subdomainId: number; companyId?: number };

const SubdomainSaleSystem = ({ partnerId, subdomainId, companyId }: Props): ReactElement => {
  const [pending, setPending] = useState<boolean>(false);
  const [settings, setSettings] = useState<SaleSystemModel>();

  useEffect(() => {
    setPending(true);

    getSaleSystemSetting(subdomainId, partnerId, companyId).then((settings) => {
      setSettings(settings ?? undefined);
      setPending(false);
    });
  }, []);

  return (
    <MainContainer>
      <SaleSystemForm
        initialValues={settings}
        onSubmit={(data) =>
          handleFormSubmit({
            data,
            states: { setPending, setSettings },
            partner_id: partnerId,
            subdomain_id: subdomainId,
            company_id: companyId,
          })
        }
        isPending={pending}
      />
    </MainContainer>
  );
};

export default SubdomainSaleSystem;

type handleFormSubmitArguments = {
  data: SaleSystemModel;
  states: { setPending: (pending: boolean) => void; setSettings: (settings: SaleSystemModel) => void };
  partner_id: number;
  subdomain_id: number;
  company_id?: number;
};

const handleFormSubmit = ({
  data,
  states: { setPending, setSettings },
  partner_id,
  subdomain_id,
  company_id,
}: handleFormSubmitArguments) => {
  setPending(true);
  editSaleSystemSetting(
    {
      ...data,
      country: (data.country as unknown as Country).name,
      country_id: (data.country as unknown as Country).id,
      currency: (data.currency as unknown as Currency).name,
      currency_id: (data.currency as unknown as Currency).id,
      language: (data.language as unknown as Language).title,
      language_id: (data.language as unknown as Language).id,
    },
    subdomain_id,
    partner_id,
    company_id,
  )
    .then((res) => {
      setPending(false);
      res && setSettings(res);
    })
    .catch(() => setPending(false));
};

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
