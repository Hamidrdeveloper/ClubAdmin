import { StepProps, Steps, notification } from 'antd';
import React, { ReactElement, ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import CompetitionUpsert from '../containers/CompetitionUpsert';
import RewardsUpsert from '../containers/RewardsUpsert';
import RulesUpsert from '../containers/RulesUpsert';
import { CompetitionModel } from '../model/Competition.entity';
import { RewardModel } from '../model/Reward.entity';
import { RuleModel } from '../model/Rule.entity';

const { Step } = Steps;

interface myStepProps extends StepProps {
  content: ReactNode;
}

type statusType = ('wait' | 'process' | 'finish' | 'error')[];

const NewCompetitionPage = (): ReactElement => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [competition, setCompetition] = useState<CompetitionModel>();
  const [ruleData, setRuleData] = useState<RuleModel>();
  const [rewardData, setRewardDate] = useState<RewardModel>();

  const [stepsStatus, setStepsStatus] = useState<statusType>(['wait', 'wait', 'wait']);

  const goNext = () => setCurrent((curr) => curr + 1);
  const goPrev = () => setCurrent((curr) => curr - 1);
  const markComplete = () => {
    // TODO: move this to a reusable function
    setStepsStatus((statuses) => {
      const newArray = [...statuses];
      newArray[current] = 'finish';
      return newArray;
    });
  };
  const setError = () => {
    setStepsStatus((statuses) => {
      const newArray = [...statuses];
      newArray[current] = 'error';
      return newArray;
    });
  };

  const onCompetitionSuccess = (values: CompetitionModel) => {
    setCompetition(values);
    markComplete();
    goNext();
    notification.info({
      message: t('Competition.CareerStepsAchieve'),
      description: t('Competition.SendNullValueToLetAllCareerSteps'),
    });
  };

  const onRuleSuccess = (data: RuleModel) => {
    setRuleData(data);
    markComplete();
    goNext();
  };

  const onRewardSuccess = (data: RewardModel) => {
    markComplete();
    setRewardDate(data);
    if (competition) {
      // navigate to competition edit page
      navigate('manage/' + competition?.id);
    }
  };

  const steps: myStepProps[] = [
    {
      title: t('Competition.General'),
      content: (
        <CompetitionUpsert singleData={competition} onCallback={onCompetitionSuccess} onError={setError} />
      ),
    },
    {
      title: t('Competition.Rule.Title', { count: 2 }),
      content: (
        <RulesUpsert
          onError={setError}
          singleData={ruleData}
          onSecondaryClick={goPrev}
          onCallback={onRuleSuccess}
          competitionId={competition?.id}
        />
      ),
    },
    {
      title: t('Competition.Reward.Title', { count: 2 }),
      content: (
        <RewardsUpsert
          onError={setError}
          singleData={rewardData}
          onSecondaryClick={goPrev}
          onCallback={onRewardSuccess}
          competitionId={competition?.id}
        />
      ),
    },
  ];
  return (
    <MainContainer>
      <Steps current={current}>
        {steps.map((item, index) => (
          <Step key={index} {...item} status={stepsStatus[index]} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
    </MainContainer>
  );
};

export default NewCompetitionPage;

const MainContainer = styled.div`
  .steps-content {
    padding: 18px;
  }
`;
