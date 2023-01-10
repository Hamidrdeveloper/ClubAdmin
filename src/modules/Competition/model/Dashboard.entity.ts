import { User } from '@src/modules/User';

interface ParticipantChartStructure {
  participant_type: 'active' | 'inactive';
  number_of_participants: number;
}

interface CompetitionDashboardPure {
  total_participants: number;
  participants: ParticipantChartStructure[];
}

export interface CompetitionDashboardModel extends CompetitionDashboardPure {
  topParticipants: User;
}
