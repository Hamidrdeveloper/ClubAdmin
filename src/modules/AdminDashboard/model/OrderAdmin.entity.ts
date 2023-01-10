export type OrderAdminDashboard = Record<string, OrderAdminDashboardData>;

type OrderAdminDashboardData = {
  total_price: number;
  total_payment: number;
  quantity: number;
  currency:{
    symbol : string;
  }
};
