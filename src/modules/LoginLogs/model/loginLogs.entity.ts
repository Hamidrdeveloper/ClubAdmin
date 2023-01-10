export interface LoginLogs {
  id: number;
  user_agent: string;
  provider: string;
  firebase_token: string | null;
  ip: string;
  created_at: Date | string | null;
}
