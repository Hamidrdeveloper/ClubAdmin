import { Col } from 'antd';
import { useAtom } from 'jotai';
import React, { ReactElement, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import { selectedDateRangeAtom } from '../../pages/PartnerDashboard';
import OneToFourGenerations from '../1-4Generations';
import BoxContainer from '../BoxContainer';
import SingleGeneration from './GenerationCard';
import { AllGenerationsDataModel, GenerationModel } from './model/generation.entity';
import { getGenerationsData } from './service/getGenerationData.service';

type generationListType = {
  key: string;
  title: string;
  infoLink?: string;
  data?: GenerationModel;
};

const Generations = ({ id }: { id: number }): ReactElement => {
  const { t } = useTranslation();

  const [selectedDateRange] = useAtom(selectedDateRangeAtom);

  const { data, isLoading, isSuccess } = useQuery<AllGenerationsDataModel>(
    ['gen-data', selectedDateRange],
    getGenerationsData.bind(null, id, { ...selectedDateRange }),
  );

  const generationList: generationListType[] = useMemo(() => {
    const finalValues: generationListType[] = [
      {
        key: '1',
        data: data?.G1,
        title: t('Dashboards.Partner.Generation1'),
      },
      {
        key: '2',
        data: data?.G2,
        title: t('Dashboards.Partner.Generation2'),
      },
      {
        key: '3',
        data: data?.G3,
        title: t('Dashboards.Partner.Generation3'),
      },
      {
        key: '4',
        data: data?.G4,
        title: t('Dashboards.Partner.Generation4'),
      },
    ];

    return finalValues;
  }, [data, isSuccess]);

  return (
    <>
      {generationList.map((gen) => (
        <Col md={6} xs={24} key={gen.key}>
          <BoxContainer
            noRadius
            foldable
            title={gen.title}
            infoLink={gen.infoLink}
            input={<SingleGeneration isLoading={isLoading} data={gen?.data} />}
          />
        </Col>
      ))}

      <Col span={24}>
        <BoxContainer
          input={<OneToFourGenerations data={data?.['G1-4']} isLoading={isLoading} />}
          title={t('Dashboards.Partner.Generation1To4')}
          foldable
          noRadius
          infoLink="#"
        />
      </Col>
    </>
  );
};

export default Generations;
