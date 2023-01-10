import { OneToFourGenerationsModel } from '../../1-4Generations/model/OneToFourGenerations.entity';
import { ChartData } from '../../TotalCustomers.tsx/model/TotalSales.entity';

export type AllGenerationsDataModel = Record<'G1' | 'G2' | 'G3' | 'G4', GenerationModel> & {
  'G1-4': OneToFourGenerationsModel;
};

export interface GenerationModel {
  bfu: number;
  points: number;
  all_partners: number;
  points_unsafe: number;
  chart_data: ChartData[];
  active_partners: number;
  in_progress_bfu: number;
  inactive_partners: number;
  in_progress_points: number;
}
