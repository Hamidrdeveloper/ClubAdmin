export interface CustomExportModel {
  company_id: number | null;
  data: { order_user_id: number; order_status_id: number };
  id: number;
  partner_id: number | null;
  slug: string;
  subdomain_id: number | null;
}
