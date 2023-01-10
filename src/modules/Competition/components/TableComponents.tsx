import { CopyOutlined } from '@ant-design/icons';
import { User as UserAuthenticationModel } from '@src/core/Authentication/model';
import i18n from '@src/core/i18n/config';
import { cancelParticipationService } from '@src/modules/PartnerDashboard/components/Greetings/model/service/cancelParticipation.service';
import { Variation } from '@src/modules/Product/VariationList/model/variationList.entity';
import { User } from '@src/modules/User';
import { usePageLayout } from '@src/shared/components';
import { generateUserManageLinkBaseOnRole, intlDate } from '@src/shared/utils/engine.service';
import { Button, Popconfirm, Tag, Tooltip, message, notification } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';
import { useAtom } from 'jotai';
import React, { FC, ReactElement, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

import { CompetitionModel } from '../model/Competition.entity';
import { TopParticipantModel } from '../model/TopParticipant.entity';
import { CompetitionUserResultModel } from '../model/userResult.entity';
import calculateCompetition, {
  copyCompetition,
  redeemCompetitionRewards,
} from '../service/competitionCalculation.service';
import { competitionIdAtom } from '../service/competitionStore';

export const DateRenderer: React.FC<string> = (date) => {
  return (
    <span>
      {date ? intlDate(new Date((date as unknown as string).split(' ')[0].replace(/'-'/g, '/'))) : '-'}
    </span>
  );
};

export const DescriptionRenderer = (data: string): ReactElement => {
  return (
    <>
      {typeof data === 'string' ? (
        <Paragraph ellipsis={data.length > 50 ? { suffix: 'more', symbol: '...', tooltip: data } : false}>
          <strong dangerouslySetInnerHTML={{ __html: data }} />
        </Paragraph>
      ) : (
        <span>
          <strong>-</strong>
        </span>
      )}
    </>
  );
};

export const PV_Renderer = (data: Variation[]): ReactElement => {
  return (
    <span>
      {data.map((tag) => (
        <Tag color={'geekblue'} key={tag.id}>
          {tag.name}
        </Tag>
      ))}
    </span>
  );
};

export const CalculateBtnRenderer: FC<void> = (_, allData: CompetitionModel): ReactElement => {
  const { isLoading, mutate } = useMutation(calculateCompetition);

  const onCalculateBtnClickHandler = () => {
    mutate(allData.id, {
      onSuccess: (msg) => {
        message.success(msg);
      },
    });
  };

  return (
    <Button
      type="dashed"
      loading={isLoading}
      onClick={onCalculateBtnClickHandler}
      disabled={allData?.status === 'results_completed'}
    >
      {i18n.t('Competition.Calculate')}
    </Button>
  );
};

export const RedeemRewardBtnRenderer: FC<void> = (_: void, allData: CompetitionModel): ReactElement => {
  const { isLoading, mutate } = useMutation(redeemCompetitionRewards);

  const onRedeemBtnClickHandler = useCallback(() => {
    mutate(allData.id, {
      onSuccess: (data) => {
        message.success(data);
      },
    });
  }, []);

  return (
    <Button
      loading={isLoading}
      onClick={onRedeemBtnClickHandler}
      disabled={allData?.status !== 'results_completed'}
    >
      {i18n.t('Competition.RedeemRewards')}
    </Button>
  );
};

export const CopyCompetitionBtnRenderer = (_: void, allData: CompetitionModel): ReactElement => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Tooltip className="action-btn" title={t('Competition.CopyCompetitionToolTip')}>
      <Button
        onClick={() => {
          copyCompetition(allData.id)
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
  );
};

export const NavigateToUserRenderer: FC<User> = (user, data: TopParticipantModel) => {
  const userRole = user.roles.map((role) => role.slug)[0];

  const manageLink = generateUserManageLinkBaseOnRole({
    role: userRole,
    profile: user as unknown as UserAuthenticationModel,
  });

  return <Link to={manageLink}>{user ? user?.person?.full_name : data.user_id}</Link>;
};

export const CancelParticipationRenderer: FC<void> = (_, allData: CompetitionModel) => {
  const { t } = useTranslation();
  const { mutateAsync, isLoading } = useMutation(cancelParticipationService);
  const { setRequestUpdate } = usePageLayout();

  const { is_participant: isParticipating, must_accept_terms: mustAcceptTerm } = allData;

  const cancelParticipation = useCallback((hasAcceptedTerms = false) => {
    const onSuccess = () => {
      setRequestUpdate(true);

      // isParticipating => wasParticipating
      message.success(
        isParticipating
          ? t('Competition.YouNoLongerParticipatingInThisCompetition')
          : t('Competition.YouAreNowParticipatingInThisCompetition'),
      );
    };

    mutateAsync({ competitionId: allData.id, hasAcceptedConditions: hasAcceptedTerms }, { onSuccess });
  }, []);

  return mustAcceptTerm ? (
    <Popconfirm
      placement={'top'}
      cancelText={t('Global.No')}
      disabled={!isParticipating}
      onConfirm={() => cancelParticipation(true)}
      okText={isParticipating ? t('Competition.YesCancelMyParticipation') : t('Competition.YesParticipate')}
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
  ) : (
    <Button onClick={() => cancelParticipation()} loading={isLoading} disabled={!isParticipating}>
      {isParticipating ? t('Competition.CancelParticipation') : t('Competition.Participate')}
    </Button>
  );
};

export const NavigateToUserResult: FC<void> = (_, allData: CompetitionUserResultModel) => {
  const [competitionId] = useAtom(competitionIdAtom);
  const userId = allData.user_id;

  return (
    <Link to={`/admin/competition/${competitionId}/users/${userId}`}>
      <span>{userId}</span>
    </Link>
  );
};
