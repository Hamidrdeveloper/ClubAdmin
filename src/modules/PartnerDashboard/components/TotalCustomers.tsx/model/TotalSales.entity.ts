export interface TotalSales {
  bfu: number;
  orders: number;
  points: number;
  total_sales: number;

  in_progress_bfu: number;
  in_progress_orders: number;
  in_progress_points: number;
  in_progress_total_sales: number;

  chart_data: TotalSalesChartData<ChartData[]>;
}

interface TotalSalesChartData<T> {
  bfu: T;
  orders: T;
  points: T;
  total_sales: T;
  points_unsafe: T;
}

export interface ChartData {
  name: string;
  amt: number | string;
}
