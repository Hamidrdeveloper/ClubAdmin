import { AuthContext } from '@src/core';
import { Button, Popconfirm, message } from 'antd';
import Title from 'antd/lib/typography/Title';
import React, { ReactElement, useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { UseQueryResult, useMutation } from 'react-query';

import { CompetitionTextModel } from './model/headerTexts.entity';
import { cancelParticipationService } from './model/service/cancelParticipation.service';

interface props extends CompetitionTextModel {
  refetchFn: UseQueryResult['refetch'];
}
const GreetingCard = ({
  id,
  title,
  refetchFn,
  description,
  is_participant: isParticipating,
}: props): ReactElement => {
  const { t } = useTranslation();
  const { mutate, isLoading } = useMutation(cancelParticipationService);
  const { loggedInUserRole } = useContext(AuthContext);

  const cancelParticipation = useCallback(() => {
    const onSuccess = () => {
      message.success(
        isParticipating
          ? t('Competition.YouNoLongerParticipatingInThisCompetition')
          : t('Competition.YouAreNowParticipatingInThisCompetition'),
      );

      refetchFn();
    };

    mutate({ competitionId: id, hasAcceptedConditions: true }, { onSuccess });
  }, []);

  return (
    <div style={{ textAlign: 'center' }}>
      {loggedInUserRole === 'partner' && (
        <Popconfirm
          placement={'top'}
          disabled={!isParticipating}
          cancelText={t('Global.No')}
          onConfirm={() => cancelParticipation()}
          okText={
            isParticipating ? t('Competition.YesCancelMyParticipation') : t('Competition.YesParticipate')
          }
          title={
            isParticipating
              ? t('Competition.YouMustAcceptTermsAndConditionsToCancel')
              : t('Competition.YouMustAcceptTermsAndConditionsToParticipate')
          }
        >
          <Button loading={isLoading} disabled={!isParticipating}>
            {isParticipating ? t('Competition.CancelParticipation') : t('Competition.Participate')}
          </Button>
        </Popconfirm>
      )}

      <Title level={4} style={{ textAlign: 'left' }}>
        {title}
      </Title>
      <p style={{ color: '#8c8c8c', textAlign: 'left' }} dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
};

export default GreetingCard;
