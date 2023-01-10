import i18n from '@src/core/i18n/config';
import { Loader } from '@src/shared/components';
import useModal from '@src/shared/hooks/useModal';
import { Button } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { useAtom } from 'jotai';
import React, { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';

import { selectedDateRangeAtom } from '../../pages/PartnerDashboard';
import InfoLegend from '../InfoLegend';
import { PartnerBirthdayModel } from './model/PartnerBirthday.entity';
import PartnerBirthdayList from './PartnerBirthdayList';

const PartnersBirthdays = ({ id }: { id: number }): ReactElement => {
  const [data, setData] = useState<PartnerBirthdayModel>();
  const [isLoading, setLoading] = useState(true);
  const [selectedDateRange] = useAtom(selectedDateRangeAtom);

  const BirthdayList = useMemo(() => {
    if (!data) return <></>;

    return <PartnerBirthdayList idList={data.birthdays_this_month_id} />;
  }, [data]);

  const { setVisible: setModalVisible, Modal } = useModal({ content: BirthdayList });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`partner-dashboard/${id}/partners-birthdays`, { params: selectedDateRange })
      .then((resp: AxiosResponse<{ data: PartnerBirthdayModel }>) => {
        const data = resp.data.data;

        setData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [selectedDateRange]);

  const toggleModalVisibility = useCallback(() => {
    return setModalVisible((isVisible) => !isVisible);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <InfoLegend
            amt={data?.birthdays_this_month ?? ''}
            text={i18n.t('Dashboards.Partner.BirthdaysThisMonth')}
            link={
              data?.birthdays_this_month_id.length === 0 ? (
                <span>0</span>
              ) : (
                <Button onClick={toggleModalVisibility}>Show List</Button>
              )
            }
          />

          {data?.birthdays_this_month_id?.length !== 0 && Modal}
        </>
      )}
    </>
  );
};

export default PartnersBirthdays;
