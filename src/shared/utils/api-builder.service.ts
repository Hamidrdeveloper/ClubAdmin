/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
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
// 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/ban-types

// 👇️ ts-ignore ignores any ts errors on the next line
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { message } from 'antd';
import axios, { AxiosRequestHeaders, AxiosResponse, CancelToken } from 'axios';

import { PaginationRequest, ResponseContext } from '../models';
import { Env } from '@src/core';
import i18n from '@src/core/i18n/config';

type ORDER_TYPE = 'ASC' | 'DESC';
interface GetAllArgs {
  extra?: string;
  cancelToken?: CancelToken;
  pagination?: PaginationRequest;
  params?: Record<string, unknown>;
  orderBy?: Record<string, ORDER_TYPE>;
}

interface CustomRequest<T> {
  body?: T;
  params?: T;
  url: string;
  method: string;
}

export class ApiBuilder<Type> {
  public entity: string;
  public title?: string;
  public value?: object;
  constructor(entity: string, title?: string,value?: object) {
    this.title = title;
    this.entity = entity;
    this.value = value;
  }

  public async request<SubType, ValueType = unknown>({
    url,
    body,
    params,
    method,
  }: CustomRequest<ValueType | SubType>): Promise<SubType> {
    try {
      method = method.toLocaleLowerCase();
      let response: AxiosResponse<{ data: SubType }>;
      if (method === 'get') response = await axios[method](`${url}`, { params });
      else response = await axios[method](`${url}`, body);

      return response.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }
  public async formData<SubType, ValueType = unknown>() {
    try {
     
      const config = {
        headers:{
          Authorization: "value1"
        }
      };
      const response: AxiosResponse<{ data: SubType }> = await axios.get('/shipping-profiles')

      return response.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }
  public async bulkDelete<T>(values: Type | T, url: string): Promise<Type> {
    try {
      url = this.entity + url;
      const response: AxiosResponse<{ data: Type }> = await axios.post(`${url}`, { ids: values });

      message.success(i18n.t('Global.DeletedSuccessfully', { title: this.title }));
      return response.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }
  public  axiosRequestMiddleware(config: AxiosRequestHeaders) {
    const language = i18n.language;
    const isPanel = window.location?.pathname?.includes('/admin');
 
    
   config.baseURL = Env.BASE_URL;
 

    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIxMiIsImV4cCI6MTY5OTE4NjQwMiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDoxMjEwMCJ9.9oDLgyhtxPk28-xuFI0F8MBqcW_gJ7Zy5BMLp8YPWyY`;
    }
    return config;

  }

  public async getAll({
    extra,
    cancelToken,
    params = {},
    orderBy = {},
    pagination = {},
  }: GetAllArgs): Promise<any> {
    try {
    
      const formdata = new FormData();
    
      if(this.value){
        Object.entries(this.value).forEach(([key, value]) => {
          formdata.append(key, value);
    
        });
      }
      const user :any= localStorage.getItem('userId')
      console.log(JSON.parse(user).id);
      
      formdata.append("clubId",JSON.parse(user).clubId);
      formdata.append("adminId", JSON.parse(user).id);
      const url = extra ? this.entity + extra : this.entity;
      const response: AxiosResponse<ResponseContext<Type[]>> = await axios.post(url,formdata);
      // @ts-ignore
      console.log(response.data.data?.dataContent);
     // @ts-ignore
      const data = {data:response.data.data?.dataContent,meta:{}}
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  public async getSingle({ extra, cancelToken, params = {} }: GetAllArgs): Promise<Type> {
    try {
      const url = extra ? this.entity + extra : this.entity;
      const response: AxiosResponse<ResponseContext<Type>> = await axios.get(url, {
        cancelToken,
        params: { ...params },
      });

      return response.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  public async getOne(id: number, customUrl: string | undefined = undefined): Promise<Type> {
    try {
      let finalUrl: string;
      // Removes queryStrings from entity URL (if there is any)
      const cleanUrl = this.entity.replace(/\?\w*=\d*/, '');
      finalUrl = `${cleanUrl}/${id}`;

      // valid customUrl: /supplier/1/contactGroups/$1
      // Invalid customUrl: dwd09i)@#I/\dwad/$1
      if (customUrl) {
        // [\w\d\/]+\/\$1
        if (/[\w\d\/]+\/\$1/.test(customUrl)) finalUrl = customUrl.replace('$1', String(id));
        else throw new Error('Invalid Get One Custom URL');
      }

      const response: AxiosResponse<{ data: Type }> = await axios.get(finalUrl);

      return response.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  public async createOne<T>(values: Type | T): Promise<Type> {
    try {
      const axiosApiInstance = axios.create();
      axiosApiInstance.interceptors.request.use(this.axiosRequestMiddleware);
      console.log('=================values===================');
      console.log(values);
      console.log('================values====================');

      const formData = new FormData();
      if(values?.translate){
      Object.entries(values.translate).forEach(([key, value]) => {
        if(key=="file_patch"){
          formData.append("file",value);
        }else{
          formData.append(key, value);
        }
  
      });
    }else{
      Object.entries(values).forEach(([key, value]) => {
        if(key=="file"){
          formData.append("file",value);
        }else{
          formData.append(key, value);
        }
  
      });
    }
    const user = localStorage.getItem('userId')
    console.log(JSON.parse(user).id);
    
    formData.append("clubId",JSON.parse(user).id);
    formData.append("adminId", JSON.parse(user).id);
      const response: AxiosResponse<{ data: Type }> = await axios.post(this.entity, formData);
      if(response.data?.data?.state==0){
        message.error(response.data?.message);
        try {
          throw new Error(e);
        } catch (e) {
          throw new Error(e);
        }
      }

      message.success(i18n.t('Global.CreatedSuccessfully', { title: this.title }));
      return response.data?.data?.dataContent;
     
    } catch (e) {
      throw new Error(e);
    }
  }

  public async updateOne<T>(id: string, values: Partial<Type> | Partial<T>): Promise<Type> {
 
      try {
        const axiosApiInstance = axios.create();
        axiosApiInstance.interceptors.request.use(this.axiosRequestMiddleware);
        console.log('=================values===================');
        console.log(values);
        console.log('================values====================');
  
        const formData = new FormData();
        if(values?.translate){
        Object.entries(values.translate).forEach(([key, value]) => {
          if(key=="file_patch"){
            formData.append("file",value);
          }else{
            if(key=="id"){
              
              formData.append(id, value);

            }else{
              formData.append(key, value);

            }
          }
    
        });
      }else{
        Object.entries(values).forEach(([key, value]) => {
          if(key=="file"){
            formData.append("file",value);
          }else{
            formData.append(key, value);
          }
    
        });
      }
        const response: AxiosResponse<{ data: Type }> = await axios.post(this.entity, formData);
        if(response.data?.data?.state==0){
          message.error(response.data?.message);
          try {
            throw new Error(e);
          } catch (e) {
            throw new Error(e);
          }
        }
      message.success(i18n.t('Global.UpdatedSuccessfully', { title: this.title }));
      return response.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  
  // FIXME: This method was a quick fix, consider changing the Behavior from backend
  public async updateDefault(id: number, url: string): Promise<Type> {
    try {
      const response: AxiosResponse<{ data: Type }> = await axios.put(`${this.entity}/${url}`, {
        id,
      });

      message.success(i18n.t('Global.UpdatedSuccessfully', { title: this.title }));
      return response.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }

  public async updateProperty<T>(url: string, values: Partial<Type> | Partial<T>): Promise<Type> {
    try {
      const response: AxiosResponse<{ data: Type }> = await axios.put(url, values);

      message.success(i18n.t('Global.UpdatedSuccessfully', { title: this.title }));
      return response.data.data;
    } catch (e) {
      throw new Error(e);
    }
  }
}
