import i18n from '@src/core/i18n/config';
import { Loader, PageLayout } from '@src/shared/components';
import ModalHeader from '@src/shared/components/PageLayout/GenericModal/ModalHeader/ModalHeader';
import { UpsertWrapper } from '@src/shared/styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import CalendarCategoryModule from '../CalendarCategory.module';
import CalendarCategoryUpsert from '../containers/CalendarCategoryUpsert';
import { CalendarCategory } from '../model/calendar.entity';
import moduleInfo from '../ModuleInfo.json';

const CalendarCategoryUpsertPage = (): ReactElement => {
  const navigate = useNavigate();
  const { category_id: id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [singleData, setSingleData] = useState({} as CalendarCategory);

  const calendarCategoryModule = new CalendarCategoryModule();
  const title = calendarCategoryModule.title[0];
  const moduleUrl = `${moduleInfo.Route.replace('*', '')}`;

  const routes = [
    ...calendarCategoryModule.breadcrumbItems,
    {
      path: '',
      breadcrumbName: id ? `${i18n.t('Global.Update')} ${title} - ${id}` : `${i18n.t('Global.New')} ${title}`,
    },
  ];

  useEffect(() => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    calendarCategoryModule.apiService
      .getOne(+id)
      .then((data) => {
        setSingleData(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const goBack = () => {
    navigate(-1);
  };

  return (
    <PageLayout<CalendarCategory> module={calendarCategoryModule}>
      <PageLayout.Breadcrumb routes={routes} />

      <PageLayout.Panel>
        <UpsertWrapper>
          <div className="header">
            <ModalHeader onClose={() => navigate(`/admin${moduleUrl}category`)} items={routes} />
          </div>
          {isLoading ? <Loader /> : <CalendarCategoryUpsert singleData={singleData} onCallback={goBack} />}
        </UpsertWrapper>
      </PageLayout.Panel>
    </PageLayout>
  );
};

export default CalendarCategoryUpsertPage;
