export interface DblChartData {
  name: string;
  returns: number;
  points: number;
}

export interface CareerLevelChangeModel {
  own_sponsored: {
    number_of_qualifications: number;
    number_of_returns: number;
    point: number;
    chart_data: DblChartData[];
  };
  '2-4_level': {
    number_of_qualifications: number;
    number_of_returns: number;
    point: number;
    chart_data: DblChartData[];
  };
}
