import { CopyOutlined } from '@ant-design/icons';
import { AuthContext } from '@src/core';
import i18n from '@src/core/i18n/config';
import CompetitionModule from '@src/modules/Competition/Competition.module';
import Fallback from '@src/modules/Competition/components/Fallback';
import { DateRenderer } from '@src/modules/Competition/components/TableComponents';
import LeveledUpMock from '@src/modules/Competition/mocks/competition/thoseWhoLeveledUp.json';
import { CompetitionModel } from '@src/modules/Competition/model/Competition.entity';
import { CompetitionDashboardModel } from '@src/modules/Competition/model/Dashboard.entity';
import { copyCompetition } from '@src/modules/Competition/service/competitionCalculation.service';
import { competitionAtom, competitionIdAtom } from '@src/modules/Competition/service/competitionStore';
import BoxContainer from '@src/modules/PartnerDashboard/components/BoxContainer';
import PieChart from '@src/modules/PartnerDashboard/components/Charts/PieChart';
import SimpleBarChart from '@src/modules/PartnerDashboard/components/Charts/SimpleBarChart';
import SimpleHorizontalBarChart from '@src/modules/PartnerDashboard/components/Charts/SimpleHorizontalBarChart';
import { ChartData } from '@src/modules/PartnerDashboard/components/TotalCustomers.tsx/model/TotalSales.entity';
import { Loader } from '@src/shared/components';
import { Button, Col, Descriptions, Row, Tooltip, Typography, message, notification } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useAtom } from 'jotai';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Sector } from 'recharts';
const OverviewTab = (): ReactElement => {
  const { t } = useTranslation();
  const [compId] = useAtom(competitionIdAtom);
  const navigate = useNavigate();
  const { loggedInUserRole } = useContext(AuthContext);
  if (!compId) return <Fallback title="Competition ID" />;

  return (
    <>
      {loggedInUserRole !== 'partner' && (
        <Row gutter={[32, 32]}>
          <Col xs={24} lg={24} xl={24}>
            <Tooltip className="action-btn" title={t('Competition.CopyCompetitionToolTip')}>
              <Button
                style={{ marginBottom: '15px', float: 'right' }}
                onClick={() => {
                  copyCompetition(compId)
                    .then((response) => {
                      message.success(t('Competition.CopyCompetitionMessage'));
                      navigate(`/admin/competition/manage/${response?.id}`);
                    })
                    .catch((error) => {
                      notification.error(error);
                    });
                }}
                shape="default"
                icon={<CopyOutlined />}
              />
            </Tooltip>
            <Typography.Text style={{ marginTop: '5px', marginRight: '10px', float: 'right' }} strong>
              {t('Competition.CopyCompetitionToolTip')}
            </Typography.Text>
          </Col>
        </Row>
      )}
      <Row gutter={[32, 32]}>
        <Col xs={24} lg={12} xl={6}>
          <BoxContainer title={t('Competition.General')} input={<Description compId={compId} />} hasBorder />
        </Col>
        <Col xs={24} lg={12} xl={6}>
          <BoxContainer
            title={t('Competition.Participate')}
            input={<Participate compId={compId} />}
            hasBorder
          />
        </Col>
        <Col xs={24} lg={24} xl={12}>
          <BoxContainer hasBorder input={<LeveledUp />} title={t('Competition.ThoseWhoHadLevelUp')} />
        </Col>

        {/* --------------------------- */}

        <Col span={24}>
          <BoxContainer
            hasBorder
            input={<AllParticipants />}
            title={t('Competition.AllContestParticipantsAccordingToTheRules')}
          />
        </Col>
      </Row>
    </>
  );
};

const { Item } = Descriptions;
const Description = ({ compId }: { compId: number }): ReactElement => {
  const { t } = useTranslation();

  const module = new CompetitionModule();

  const [, setCompetition] = useAtom(competitionAtom);
  const [data, setData] = useState({} as CompetitionModel);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    module.apiService
      .getOne(compId)
      .then((resp: CompetitionModel) => {
        setCompetition(resp);
        setLoading(false);
        setData(resp);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Descriptions bordered column={1}>
          <Item label={t('Competition.CompetitionId')}>{data.id}</Item>
          <Item label={t('Competition.CompetitionName')}>{data.title}</Item>
          <Item label={t('Competition.Start')}>
            {data.release_date ? DateRenderer(data.release_date) : '-'}
          </Item>
          <Item label={t('Competition.End')}>
            {data.available_until ? DateRenderer(data.available_until) : '-'}
          </Item>
          <Item label={t('Competition.CreationDate')}>
            {data.created_at ? DateRenderer(data.created_at) : '-'}
          </Item>
        </Descriptions>
      )}
    </>
  );
};

const Participate = ({ compId }: { compId: number }): ReactElement => {
  const [data, setData] = useState<CompetitionDashboardModel>();
  const [chartData, setChartData] = useState<ChartData[]>();

  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`competitions/${compId}/dashboard`)
      .then((resp: AxiosResponse<{ data: CompetitionDashboardModel }>) => {
        setLoading(false);

        const results = resp.data.data;
        const structuredData: ChartData[] = results.participants.map((participant) => ({
          name: participant.participant_type,
          amt: participant.number_of_participants,
        }));

        setChartData(structuredData);
        setData(results);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <PieChart
          data={chartData ?? []}
          renderer={renderActiveShape.bind(this, data)}
          colors={['#06D6A0', '#EF476F']}
        />
      )}
    </>
  );
};

const LeveledUp = (): ReactElement => {
  // TODO remove any
  const [data, setData] = useState<any>();
  const [isLoading] = useState(false);

  useEffect(() => {
    // setLoading(true);
    // axios
    //   .get(`TODO`)
    //   .then((resp: AxiosResponse<{ data: any }>) => {
    //     const data = resp.data.data;

    //     setChartData(data.chart_data);

    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });
    setData(LeveledUpMock.data);
  }, []);

  return <>{isLoading ? <Loader /> : <SimpleBarChart data={data ?? []} />}</>;
};

const AllParticipants = (): ReactElement => {
  // TODO remove any
  const [data, setData] = useState<any>();
  const [isLoading] = useState(false);

  useEffect(() => {
    // setLoading(true);
    // axios
    //   .get(`TODO`)
    //   .then((resp: AxiosResponse<{ data: any }>) => {
    //     const data = resp.data.data;

    //     setChartData(data.chart_data);

    //     setLoading(false);
    //   })
    //   .catch(() => {
    //     setLoading(false);
    //   });
    setData(LeveledUpMock.data);
  }, []);

  return <>{isLoading ? <Loader /> : <SimpleHorizontalBarChart data={data ?? []} />}</>;
};

const renderActiveShape = (data: CompetitionDashboardModel, props: any): ReactElement => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g>
      <text x={cx} y={cy - innerRadius / 3} textAnchor="middle" fill={'black'} style={{ fontSize: '1rem' }}>
        {i18n.t('Competition.Total')}
      </text>

      <text x={cx} y={cy + innerRadius / 3} textAnchor="middle" fill={'#989898'} style={{ fontSize: '1rem' }}>
        {data?.total_participants}
      </text>

      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

export default OverviewTab;
