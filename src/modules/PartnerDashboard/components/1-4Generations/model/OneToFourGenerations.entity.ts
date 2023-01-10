import { ChartData } from '../../TotalCustomers.tsx/model/TotalSales.entity';

export interface OneToFourGenerationsModel {
  bfu: number | string;
  all_partners: number;
  points: number | string;
  active_partners: number;
  inactive_partners: number;

  all_partner_data: ChartData[];
  active_partner_data: ChartData[];
  point_data: ChartData[];
  bfu_data: ChartData[];

  in_progress_bfu: number | string;
  in_progress_bfu_data: ChartData[];

  in_progress_points: number | string;
  in_progress_point_data: ChartData[];

  points_unsafe: number;
  point_unsafe_data: ChartData[];
}
