import { SuperSelect } from '@src/shared/components';
import { SuperSelectProps } from '@src/shared/components/SuperSelect';
import React from 'react';

import { RuleTypeModel } from '../model/RulesType.entity';
import { CompetitionRuleTypeModule } from '../Rule.module';

const AsyncRuleTypeSelect: React.FC<Partial<SuperSelectProps<RuleTypeModel>>> = (props) => {
  return (
    <SuperSelect
      hasNew={false}
      searchParam="search"
      module={new CompetitionRuleTypeModule()}
      optionSelector={{ label: 'title', value: 'id' }}
      {...props}
    />
  );
};

export default AsyncRuleTypeSelect;
