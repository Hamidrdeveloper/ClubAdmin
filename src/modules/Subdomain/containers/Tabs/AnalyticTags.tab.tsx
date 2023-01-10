import React, { ReactElement, useEffect, useState } from 'react';
import styled from 'styled-components';

import { AnalyticTagsForm } from '../../components/AnalyticTags.form';
import { editAnalyticTagsSetting } from '../../controllers/analyticTags.controller';
import { AnalyticTagsModel } from '../../model/analyticTags.entity';

type Props = {
  partnerId: number;
  subdomainId: number;
  companyId?: number;
  analyticTagsData: AnalyticTagsModel[] | [];
};

const SubdomainAnalyticTags = ({
  partnerId,
  subdomainId,
  companyId,
  analyticTagsData,
}: Props): ReactElement => {
  const [pending, setPending] = useState<boolean>(false);
  const [settings, setSettings] = useState<AnalyticTagsModel[]>([]);

  useEffect(() => {
    if (analyticTagsData) {
      setSettings(analyticTagsData);
    }
  }, []);

  return (
    <MainContainer>
      <AnalyticTagsForm
        initialValues={settings}
        onSubmit={(data) => {
          handleFormSubmit({
            data,
            states: { setPending, setSettings },
            partner_id: partnerId,
            subdomain_id: subdomainId,
            company_id: companyId,
          });
        }}
        isPending={pending}
      />
    </MainContainer>
  );
};

export default SubdomainAnalyticTags;

type handleFormSubmitArguments = {
  data: AnalyticTagsModel[];
  states: { setPending: (pending: boolean) => void; setSettings: (settings: AnalyticTagsModel[]) => void };
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
  editAnalyticTagsSetting(data, subdomain_id, partner_id, company_id)
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
