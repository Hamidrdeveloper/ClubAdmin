import { CareerStep } from '@src/modules/CareerStep';
import { Moment } from 'moment';

interface SpecialConditionCareerStepPure {
  id: number;
  points: number;
  to: string | Date;
  from: string | Date;
}

export interface SpecialConditionCareerStepModel extends SpecialConditionCareerStepPure {
  careerStep: CareerStep;
  // we are using from_to_dates for managing date range in its form
  from_to_date_range: [Moment, Moment];
}

export interface SpecialConditionCareerStepFormCtx extends SpecialConditionCareerStepPure {
  career_step_id: number;
}
