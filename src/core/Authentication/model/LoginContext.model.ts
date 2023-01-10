import { LoginForm, TwoFactorVerificationFormCtx, User, onLoginResponse } from './Auth.model';
import { RegisterForm } from '.';

export interface IAuthContext {
  role: string;
  profile: User;
  token: string;
  tempToken: string;
  tokenKey: string;
  legals?: string[];
  isPending: boolean;
  permissions?: string[];
  loggedInUserRole: string;
  isAuthenticated: () => boolean;
  onLogout: () => Promise<void>;
  onAssignLegals: () => Promise<boolean>;
  onRegister: (data: RegisterForm) => Promise<User | null>;
  onLogin: (data: LoginForm) => Promise<onLoginResponse | null>;
  onLoginPartner: (loginForm: LoginForm) => Promise<onLoginResponse>;

  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  isForgotPasswordOpen: boolean;
  setLoginOpen: (toggle: boolean) => void;
  setRegisterOpen: (toggle: boolean) => void;
  setForgotPasswordOpen: (toggle: boolean) => void;
  onTwoFactorVerification: (values: TwoFactorVerificationFormCtx) => Promise<onLoginResponse | null>;
}
