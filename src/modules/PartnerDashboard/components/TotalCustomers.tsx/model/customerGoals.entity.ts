export interface PartnerDashboardGoalsData {
  bfu_goal: number;
  target_cash: number;
  orders_goal: number;
  points_goal: number;
  total_sales_goal: number;
}

export interface CustomerGoalsFormCtx {
  data: {
    dashboard: PartnerDashboardGoalsData;
  };
}
