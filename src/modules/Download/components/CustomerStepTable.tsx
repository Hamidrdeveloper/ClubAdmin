import i18n from '@src/core/i18n/config';
import { CustomerStepModel } from '@src/modules/CustomerStep';
import CustomerStepModule from '@src/modules/CustomerStep/CustomerStep.module';
import { PageLayout, Panel } from '@src/shared/components';
import { Button } from 'antd';
import { SetStateAction } from 'jotai';
import React, { Dispatch, Key, ReactElement } from 'react';
export default function CustomerStepTable(
  setSelectedCustomerStep: Dispatch<SetStateAction<CustomerStepModel[]>>,
): ReactElement {
  const customerStepModule = new CustomerStepModule();

  const GetSelectedRows = (selectedRows: Key[], selectedRowsData: Key[][]): ReactElement => {
    return (
      <Button
        type="primary"
        onClick={() => {
          setSelectedCustomerStep((prev) => {
            if (prev) {
              const allSelectedCustomerSteps = [
                ...prev,
                ...(selectedRowsData as unknown as CustomerStepModel[]),
              ];

              const uniqueCustomerSteps = allSelectedCustomerSteps.filter(
                (value, index, arr) => arr.findIndex((v) => v.id === value.id) === index,
              );

              return uniqueCustomerSteps;
            } else {
              const allSelectedCustomerSteps = [...(selectedRowsData as unknown as CustomerStepModel[])];

              const uniqueCustomerSteps = allSelectedCustomerSteps.filter(
                (value, index, arr) => arr.findIndex((v) => v.id === value.id) === index,
              );

              return uniqueCustomerSteps;
            }
          });
        }}
        disabled={selectedRows.length === 0}
      >
        {i18n.t('Download.AddSelected')}
      </Button>
    );
  };

  return (
    <PageLayout<CustomerStepModel> module={customerStepModule}>
      <PageLayout.Panel>
        <Panel.Header hasSearch hasNew={false} dontNavigate ExtraAction={GetSelectedRows} />

        <Panel.ListView
          dontNavigate
          hasUpdate={false}
          module={customerStepModule}
          tableScroll={{ y: 640, x: 1300 }}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}
