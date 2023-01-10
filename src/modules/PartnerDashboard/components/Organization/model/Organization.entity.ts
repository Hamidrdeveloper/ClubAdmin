import { ChartData } from '../../TotalCustomers.tsx/model/TotalSales.entity';

export interface OrganizationModel {
  all_partners: number;
  active_partners: number;
  deactive_partners: number;
  points: number;
  bfu: number;
  all_partner_data: ChartData[];
  active_partner_data: ChartData[];
  point_data: ChartData[];
  bfu_data: ChartData[];
}
