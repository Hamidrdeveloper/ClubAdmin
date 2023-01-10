/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheckimport i18n from '@src/core/i18n/config';
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import i18n from '@src/core/i18n/config';
import { Loader } from '@src/shared/components';
import React, { ReactElement, createContext, useEffect, useMemo, useState } from 'react';

import {
  IAuthContext,
  Login,
  LoginForm,
  RegisterForm,
  TwoFactorVerificationFormCtx,
  User,
  UserRole,
  onLoginResponse,
} from '../model';
import {
  assignUserLegals,
  getUnAssignedLegals,
  getUserProfile,
  loginPartner,
  loginSupplier,
  loginUser,
  logoutUser,
  registerUser,
  verifyTwoFactorCode,
} from './api';


export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export default function AuthProvider({ children }: { children: ReactElement }): ReactElement {
  const [legals, setLegals] = useState<string[]>();
  const [tempToken, setTempToken] = useState<string>('');
  const [tempUser, setTempUser] = useState<User>({} as User);
  const [legalsData, setLegalsData] = useState<Record<string, number[]>>({} as Record<string, number[]>);
 
  const isSupplierLogin = useMemo(() => location.pathname.includes('supplier'), [location]);

  const [role, setRole] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [tokenKey, setTokenKey] = useState<string>('');
  const [profile, setProfile] = useState<User>({} as User);
  const [permissions, setPermissions] = useState<string[]>();
  const [isPending, setPending] = useState<boolean>(true);
  const [loggedInUserRole, setLoggedInUserRole] = useState<string>('');

  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);

  useEffect(() => {
    // on on every profile update (login, logout, register)
    if (localStorage.getItem('token')?.length === 0) return;

    // Instead of computing roles from profile everywhere, we will compute it once here.
    
  }, []);

  useEffect(() => {

    if (localStorage.getItem('token_key')) {
      // TODO Show 2fa
    }
    
    if (localStorage.getItem('token')) {
      setPending(false);
          // handlePermissions("user");
          setToken(localStorage.getItem('token') as string);
    
      // handleProfile()
      //   .then((user) => {
      //     setPending(false);
      //     handlePermissions(user.roles);
      //     setToken(localStorage.getItem('token') as string);
      //   })
      //   .catch(() => {
      //     setPending(false);
      //     setProfile({} as User);
      //     // localStorage.removeItem('token');
      //   });
    } else {
      setPending(false);
    }
  }, []);

  const isAuthenticated = () =>{
     const token =localStorage.getItem('token')+"";
     if(token.length>15){
      return true;
     }else{
      return false;
    }
     
    
    };
  const isAuthenticatedLogin = () => localStorage.getItem('tokenLogin') !== null;

  const onLogin = async (values: LoginForm): Promise<onLoginResponse> => {
    try {
      const loginData: any = await loginUser(values);

      // IF it has token_key => the logged in user has two factor auth enabled.
     
      setLoginOpen(true)
      // const legals = await getUnAssignedLegals(token);

      // if (!Array.isArray(legals)) {
      //   setTempUser(user);
      //   setTempToken(token);
      //   setLegalsData(legals);
      //   setLegals(Object.keys(legals));
      //   return { status: 304 };
      // } else {
      //   setUserLoginDataFromResponse(token, user);
        return loginData;
      // }
    } catch (e) {
      throw new Error();
    }
  };

  const onLoginPartner = async (values: LoginForm): Promise<onLoginResponse> => {
    try {
      const loginData: Login = await loginPartner(values);
      const { user, token: userToken, token_key } = loginData;

      if (token_key) {
        setTokenKey(token_key);
        return { status: 302 };
      }

      // const legals = await getUnAssignedLegals(userToken);

      // if (!Array.isArray(legals)) {
      //   setTempUser(user);
      //   setLegalsData(legals);
      //   setTempToken(userToken);
      //   setLegals(Object.keys(legals));
      //   return { status: 304 };
      // } else {
      //   localStorage.setItem('token', userToken);
      //   setUserLoginDataFromResponse(userToken, user);
      //   return { status: 200 };
      // }
    } catch (e) {
      throw new Error();
    }
  };

  const onAssignLegals = async (): Promise<boolean> => {
    try {
      const legals = await assignUserLegals(tempToken, legalsData);

      if (legals) {
        setLegals([]);
        setTempToken('');
        setLegalsData({});
        setTempUser({} as User);
        localStorage.setItem('token', tempToken);
        setUserLoginDataFromResponse(tempToken, tempUser);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      throw new Error();
    }
  };

  function setUserLoginDataFromResponse(token: string, user: User) {
    if (!user.language)
      user.language = {
        id: -1,
        locale: i18n.language,
        is_active: true,
        is_default: true,
        is_ltr: false,
        title: '',
        translate: [],
      };

    setToken(token);
    setProfile(user);
    handlePermissions(user.roles);
  }

  const onTwoFactorVerification = async (values: TwoFactorVerificationFormCtx): Promise<onLoginResponse> => {
    try {
      const data = await verifyTwoFactorCode(values);
      // const legals = await getUnAssignedLegals(token);

      // if (!Array.isArray(legals)) {
      //   setTokenKey('');
      //   setTempUser(data.user);
      //   setTempToken(data.token);
      //   setLegalsData(legals);
      //   setLegals(Object.keys(legals));
      //   return { status: 304 };
      // } else {
      //   setTokenKey('');
      //   setUserLoginDataFromResponse(data.token, data.user);
      // }

      return { status: 200 };
    } catch (e) {
      throw new Error(e);
    }
  };

  const onRegister = async (values: RegisterForm): Promise<User | null> => {
    try {
      const { user, token }: Login = await registerUser(values);

      if (!user.language)
        user.language = {
          id: -1,
          locale: i18n.language,
          is_active: true,
          is_default: true,
          is_ltr: false,
          title: '',
          translate: [],
        };

      setToken(token);
      setProfile(user);
      handlePermissions(user.roles);
      return user;
    } catch {
      return null;
    }
  };

  const onLogout = async () => {
    setPending(false);
        setProfile({} as User);
        localStorage.removeItem('token');
        localStorage.removeItem('tokenLogin');
  };

  const handleProfile = async (): Promise<User> => {
    const user = {}

    // if (!user.language)
      user.language = {
        id: -1,
        locale: i18n.language,
        is_active: true,
        is_default: true,
        is_ltr: false,
        title: '',
        translate: [],
      };

    try {
      setProfile(user);
      return user;
    } catch (e) {
      throw new Error(e);
    }
  };

  const handlePermissions = (roles: UserRole[]) => {
    setRole(roles[0].slug);
    setPermissions(
      roles.map((role) => role.permissions.map((perm) => perm.title)).reduce((a, b) => [...a, ...b], []),
    );
  };

  return isPending ? (
    <Loader isFullPage />
  ) : (
    <AuthContext.Provider
      value={{
        role,
        token,
        legals,
        profile,
        tempToken,
        onLogin,
        onLogout,
        tokenKey,
        onRegister,
        isPending,
        onAssignLegals,
        onLoginPartner,
        isAuthenticated,
        permissions,
        isLoginOpen,
        isRegisterOpen,
        isForgotPasswordOpen,
        setLoginOpen,
        setRegisterOpen,
        loggedInUserRole,
        setForgotPasswordOpen,
        onTwoFactorVerification,
        isAuthenticatedLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
