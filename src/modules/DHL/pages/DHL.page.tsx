import AutoLoader from '@src/modules/PickerDashboard/components/AutoLoader';
import { AutoState } from '@src/modules/PickerDashboard/pages/PickerDashboard';
import { PageLayout } from '@src/shared/components';
import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';

import { DHLForm } from '../components/DHL.form';
import { getDHLSetting } from '../controller/dhl.controller';
import DHLModule from '../DHL.module';
import { DHLModel } from '../model/dhl.entity';

export default function DHLPage(): ReactElement {
  const statusModule = new DHLModule();
  const [settings, setSettings] = useState<AutoState<DHLModel>>(null);

  return (
    <PageLayout<DHLModel> module={statusModule}>
      <PageLayout.Breadcrumb />

      <PageLayout.Panel>
        <AutoLoader data={[settings, setSettings]} service={getDHLSetting}>
          <MainContainer>
            <DHLForm initialValues={settings ?? undefined} onDone={() => setSettings(null)} />
          </MainContainer>
        </AutoLoader>
      </PageLayout.Panel>
    </PageLayout>
  );
}

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
