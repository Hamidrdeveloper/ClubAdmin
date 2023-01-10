import { AuthContext } from '@src/core';
import i18n from '@src/core/i18n/config';
import { Partner } from '@src/modules/Partner/model/partner.entity';
import PartnerModule from '@src/modules/Partner/Partner.module';
import { Loader } from '@src/shared/components';
import { Col, Row, message } from 'antd';
import { atom } from 'jotai';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import BoxContainer from '../components/BoxContainer';
import Commission from '../components/Commission';
import CustomersBirthdays from '../components/CustomersBirthdays';
import Fallback from '../components/Fallback';
import Generations from '../components/GenerationRow/GenerationsRowPage';
import Greetings from '../components/Greetings';
import GroupTurnover from '../components/GroupTurnover';
import PartnerDashHeader from '../components/Header';
import LatestCustomers from '../components/LatestCustomers';
import LatestTeamMembers from '../components/LatestTeamMembers';
import ManagersInMyDownLine from '../components/ManagersInMyDownLine';
import OwnCustomers from '../components/OwnCustomers';
import PartnersBirthdays from '../components/PartnersBirthdays';
import SelfRevenue from '../components/SelfRevenue';
import SeminarLadder from '../components/SeminarLadder';
import TotalCustomers from '../components/TotalCustomers.tsx';
import CustomerGoalsUpdate from '../components/TotalCustomers.tsx/CustomerGoalsUpdate';
import { PartnerDashboardGoalsData } from '../components/TotalCustomers.tsx/model/customerGoals.entity';
import PartnerModal from './Modal';

export type RangeDateProps = {
  from_date: string;
  to_date: string;
};
export const selectedDateRangeAtom = atom<RangeDateProps>({} as RangeDateProps);
export const partnerCurrencySymbolAtom = atom<string | undefined>(undefined);

export const SHOULD_HAVE_CURRENCY_SYMBOL_COLUMNS = [
  'total_sales',
  'in_progress_total_sales',
  'bfu',
  'in_progress_bfu',
];

const PartnerDashboard = (): ReactElement => {
  const { partnerId: partnerIdFromParam } = useParams();
  const { t } = useTranslation();

  const { profile } = useContext(AuthContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [customerGoalLoading, setCustomerGoalLoading] = useState(false);
  const [customerGoalData, setCustomerGoalData] = useState<PartnerDashboardGoalsData | undefined>(
    profile?.partner?._data?.dashboard ?? undefined,
  );
  const { apiService: partnerAPI } = new PartnerModule();

  const id = profile?.partner?.id ?? partnerIdFromParam;

  useEffect(() => {
    if (!modalVisible && customerGoalData) return;

    setCustomerGoalLoading(true);

    partnerAPI
      .getOne(id)
      .then((partner: Partner) => {
        setCustomerGoalLoading(false);
        setCustomerGoalData(partner?._data?.dashboard);
      })
      .catch(() => setCustomerGoalLoading(false));
  }, [modalVisible]);

  if (!id) {
    return <Fallback />;
  }

  return (
    <Row gutter={[32, 32]}>
      <Col span={24}>
        <BoxContainer input={<PartnerDashHeader />} />
      </Col>

      {/* ------- */}

      <Col span={24}>
        <BoxContainer input={<Greetings id={id} />} noRadius />
      </Col>

      {/* ------- */}

      <Col md={16} xs={24}>
        <BoxContainer
          foldable
          // NOTE: disabling settings icon and your goal reference line base on Hamed's Request
          noRadius
          infoLink="#"
          input={<TotalCustomers id={id} />}
          onSettingClick={() => setModalVisible(true)}
          title={t('Dashboards.Partner.TotalCustomerWithOwnMsg')}
        />

        <PartnerModal setModalVisible={setModalVisible} isModalVisible={modalVisible}>
          {customerGoalLoading ? (
            <Loader />
          ) : (
            <CustomerGoalsUpdate
              partnerId={id}
              onCallback={() => {
                message.success(i18n.t('PartnerDashboard.GoalsUpdatedSuccessfully'));
                setCustomerGoalData(undefined);
                setModalVisible(false);
              }}
              singleData={customerGoalData}
            />
          )}
        </PartnerModal>
      </Col>

      <Col md={8} xs={24}>
        <BoxContainer
          input={<OwnCustomers id={id} />}
          title={t('Dashboards.Partner.OwnCustomers')}
          infoLink="#"
          foldable
          noRadius
        />
      </Col>

      {/* ------- */}

      <Col md={8} xs={24}>
        <BoxContainer
          input={<LatestTeamMembers id={id} />}
          title={t('Dashboards.Partner.LatestTeamMembers')}
          foldable
          infoLink="#"
          noRadius
        />
      </Col>

      <Col md={8} xs={24}>
        <BoxContainer
          input={<LatestCustomers id={id} />}
          title={t('Dashboards.Partner.LatestCustomers')}
          infoLink="#"
          noRadius
          foldable
        />
      </Col>

      <Col md={8} xs={24}>
        <BoxContainer
          input={<Commission id={id} />}
          title={t('Dashboards.Partner.Commission')}
          foldable
          noRadius
          infoLink="#"
        />
      </Col>
      {/* ------- */}

      {/* Hide Career Level Change, 16 Mehr requested by Hamed */}
      {/* <Col span={24}>
        <BoxContainer
          input={<CareerLevelsChange id={id} />}
          title={t('Dashboards.Partner.CareerLevelsChange')}
          foldable
          infoLink="#"
          noRadius
        />
      </Col> */}

      {/* ------- */}
      <Col md={12} xs={24}>
        <BoxContainer
          input={<SelfRevenue id={id} />}
          title={t('Dashboards.Partner.SelfRevenue')}
          foldable
          noRadius
          infoLink="#"
        />
      </Col>

      <Col md={12} xs={24}>
        <BoxContainer
          input={<GroupTurnover id={id} />}
          title={t('Dashboards.Partner.GroupTurnOver')}
          foldable
          noRadius
          infoLink="#"
        />
      </Col>

      {/* ------- */}

      <Generations id={id} />

      {/* ------- */}

      {/* <Col md={12}>
        <BoxContainer
          input={<Organization id={id} />}
          title={t('Global.Organization')}
          foldable
          noRadius
          infoLink="#"
        />
      </Col> */}

      {/* ------- */}

      <Col md={6} xs={24}>
        <BoxContainer
          input={<SeminarLadder id={id} />}
          title={t('Dashboards.Partner.SeminarLadder')}
          foldable
          noRadius
          infoLink="#"
        />
      </Col>

      <Col md={6} xs={24}>
        <BoxContainer
          input={<ManagersInMyDownLine id={id} />}
          title={t('Dashboards.Partner.ManagersInDown')}
          foldable
          noRadius
          infoLink="#"
        />
      </Col>

      <Col md={6} xs={24}>
        <BoxContainer
          input={<CustomersBirthdays id={id} />}
          title={t('Dashboards.Partner.CustomersBirthdays')}
          foldable
          noRadius
          infoLink="#"
        />
      </Col>

      <Col md={6} xs={24}>
        <BoxContainer
          input={<PartnersBirthdays id={id} />}
          title={t('Dashboards.Partner.PartnersBirthdays')}
          foldable
          noRadius
          infoLink="#"
        />
      </Col>

      {/* ------- */}
    </Row>
  );
};

export default PartnerDashboard;
