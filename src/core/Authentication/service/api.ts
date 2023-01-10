/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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
import { LegalCondition } from '@src/modules/LegalCondition';
import axios, { AxiosResponse } from 'axios';

import {
  Login,
  LoginForm,
  RegisterForm,
  TwoFactorVerificationFormCtx,
  User,
  UserLoginResponse,
} from '../model';
export async function loginUser(values: LoginForm): Promise<Login> {
  try {
    const dataFake = {
      username: "s.zarea@solutions-apps.de ",
      password: "12345678"
    }
    const formData = new FormData();
    formData.append("mail",values.username);
    formData.append("password",values.password);

    const response: AxiosResponse<{ data: Login }> = await axios.post('/SignIn', formData);
   
    const data = response.data.data.dataContent;
    
    if(data?.token){
      localStorage.setItem('token', data?.token)
      localStorage.setItem('userId',JSON.stringify(data))

    }else{
      localStorage.setItem('token',"Null")

    }
  
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
}


export async function loginUserClub(values: LoginForm) {
  try {
    
const data = new FormData();
data.append('mail', 'rekabi.maryam@gmail.com');
data.append('password', 'abcdefg');

const config = {
  method: 'post',
  url: '/ClubAdmin/SignIn',
  data : data
};

const response: AxiosResponse<{ data: Login }> = await axios(config)
console.log(response.data.data);

  return response.data.data;

  } catch (e) {
    throw new Error(e);
  }
}
export async function loginPartner(values: LoginForm): Promise<Login> {
  try {
    

    const response: AxiosResponse<{ data: Login }> = await axios.put('/ClubAdmin/SignIn', values);

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function verifyTwoFactorCode(values: TwoFactorVerificationFormCtx): Promise<UserLoginResponse> {
  try {
    const response: AxiosResponse<{ data: UserLoginResponse }> = await axios.post(
      'two-factor/verify',
      values,
    );

    localStorage.removeItem('token_key');

    const data = response.data.data;
    localStorage.setItem('token', data.token);

    return data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function loginSupplier(values: LoginForm): Promise<Login> {
  try {
    const response: AxiosResponse<{ data: Login }> = await axios.post('/login-supplier', values);

    localStorage.setItem('token', response.data.data.token);
    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await axios.get('/logout');
  } catch (e) {
    throw new Error(e);
  }
}

export async function registerUser(values: RegisterForm): Promise<Login> {
  try {
    const response: AxiosResponse<{ data: Login }> = await axios.post('/register', values);

    localStorage.setItem('token', response.data.data.token);
    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function getUserProfile(): Promise<User> {
  try {
    const response: AxiosResponse<{ data: User }> = await axios.get('/users/profile');
    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function sendResetPasswordEmail(values: { email: string }): Promise<Login> {
  try {
    const response: AxiosResponse<{ data: Login }> = await axios.post('/reset-password', values);

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function getUnAssignedLegals(token: string): Promise<Record<string, number[]>> {
  try {
    const response: AxiosResponse<{ data: Record<string, number[]> }> = await axios.get(
      '/users/unassigned-own-legals',
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function assignUserLegals(
  token: string,
  values: Record<string, number[]>,
): Promise<Record<string, number[]>> {
  try {
    const response: AxiosResponse<{ data: Record<string, number[]> }> = await axios.post(
      '/users/assign-legals',
      values,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
}

export async function getLegalInfoViaTitle(title: string, token: string): Promise<LegalCondition> {
  try {
    const response: AxiosResponse<{ data: LegalCondition }> = await axios.get(`legals/${title}`, {
      headers: { Authrozation: `Bearer ${token}` },
    });

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
}
