import i18n from '@src/core/i18n/config';
import { CareerStep } from '@src/modules/CareerStep';
import CareerStepModule from '@src/modules/CareerStep/CareerStep.module';
import { CareerStepModel } from '@src/modules/Competition/model/CareerStep.entity';
import { PageLayout, Panel } from '@src/shared/components';
import { Button } from 'antd';
import { SetStateAction } from 'jotai';
import React, { Dispatch, Key, ReactElement } from 'react';
export default function CareerStepTable(
  setSelectedCareerSteps: Dispatch<SetStateAction<CareerStepModel[]>>,
): ReactElement {
  const careerStepModule = new CareerStepModule();

  const GetSelectedRows = (selectedRows: Key[], selectedRowsData: Key[][]): ReactElement => {
    return (
      <Button
        type="primary"
        onClick={() => {
          setSelectedCareerSteps((prev) => {
            if (prev) {
              const allSelectedCareerSteps = [...prev, ...(selectedRowsData as unknown as CareerStepModel[])];

              const uniqueCareerSteps = allSelectedCareerSteps.filter(
                (value, index, arr) => arr.findIndex((v) => v.id === value.id) === index,
              );

              return uniqueCareerSteps;
            } else {
              const allSelectedCareerSteps = [...(selectedRowsData as unknown as CareerStepModel[])];

              const uniqueCareerSteps = allSelectedCareerSteps.filter(
                (value, index, arr) => arr.findIndex((v) => v.id === value.id) === index,
              );

              return uniqueCareerSteps;
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
    <PageLayout<CareerStep> module={careerStepModule}>
      <PageLayout.Panel>
        <Panel.Header hasSearch hasNew={false} dontNavigate ExtraAction={GetSelectedRows} />

        <Panel.ListView
          dontNavigate
          hasUpdate={false}
          module={careerStepModule}
          tableScroll={{ y: 640, x: 1300 }}
        />
      </PageLayout.Panel>
    </PageLayout>
  );
}
