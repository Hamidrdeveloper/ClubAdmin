import { ChartData } from '../../TotalCustomers.tsx/model/TotalSales.entity';

export interface OwnCustomerModel {
  number_of_customers: number;
  orders: number;
  points: number;
  bfu: number;
  bill_amounts: number;
  chart_data: ChartData[];
}
