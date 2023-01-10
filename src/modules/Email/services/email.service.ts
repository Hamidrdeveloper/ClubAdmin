import i18n from '@src/core/i18n/config';
import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';

import {
  Automatic,
  EmailDocumentType,
  EmailTemplateVariables,
  EmailTemplates,
  EmailTemplatesPure,
  InfoService,
  InfoServiceContext,
  LoginDetail,
  LoginDetailContext,
  NewsLetter,
  NewsLetterContext,
  Signature,
  SignatureContext,
} from '../model/email.entity';

const automaticEntity = 'notice';
export const getAutomatics = async (): Promise<Automatic[]> => {
  try {
    type Res = AxiosResponse<{ data: Automatic[] }>;
    const response: Res = await axios.get(`/${automaticEntity}`);

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};
export const updateAutomatics = async ({
  id,
  notice_template_id,
}: {
  id: number;
  notice_template_id: number;
}): Promise<Automatic> => {
  try {
    type Res = AxiosResponse<{ data: Automatic }>;
    const response: Res = await axios.put(`/${automaticEntity}/${id}`, { notice_template_id });

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Email.Field.Automatics') }));
    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};

const loginDetailEntity = 'settings/email-authorization';
export const getLoginDetail = async (): Promise<LoginDetailContext> => {
  try {
    type Res = AxiosResponse<{ data: LoginDetailContext }>;
    const response: Res = await axios.get(`/${loginDetailEntity}`);

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};
export const updateLoginDetail = async (values: Partial<LoginDetail>): Promise<LoginDetail> => {
  try {
    type Res = AxiosResponse<{ data: LoginDetail }>;
    const response: Res = await axios.post(`/settings`, values);

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Email.Field.LoginDetail') }));
    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};

const newsLetterEntity = 'settings';
export const getNewsLetter = async (): Promise<NewsLetterContext> => {
  try {
    type Res = AxiosResponse<{ data: NewsLetterContext }>;
    const response: Res = await axios.get(`/settings/newsletter-authorization`);

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};
export const updateNewsLetter = async (values: Partial<NewsLetter>): Promise<NewsLetter> => {
  try {
    type Res = AxiosResponse<{ data: NewsLetter }>;
    const response: Res = await axios.post(`/${newsLetterEntity}`, values);

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Email.Field.NewsLetter') }));
    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};

const infoServiceEntity = 'settings/bcc-setting';
export const getInfoService = async (): Promise<InfoServiceContext> => {
  try {
    type Res = AxiosResponse<{ data: InfoServiceContext }>;
    const response: Res = await axios.get(`/${infoServiceEntity}`);

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};
export const updateInfoService = async (values: Partial<InfoService>): Promise<InfoService> => {
  try {
    type Res = AxiosResponse<{ data: InfoService }>;
    const response: Res = await axios.post(`settings`, values);

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Email.Field.InfoService') }));
    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};

const signatureEntity = 'settings/mail-signatures';
export const getSignature = async (): Promise<SignatureContext> => {
  try {
    type Res = AxiosResponse<{ data: SignatureContext }>;
    const response: Res = await axios.get(`/${signatureEntity}`);

    return response.data.data[0];
  } catch (e) {
    throw new Error(e);
  }
};

export const updateSignature = async (values: Partial<Signature>): Promise<Signature> => {
  try {
    type Res = AxiosResponse<{ data: Signature }>;
    const response: Res = await axios.post(`/settings`, values);

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Email.Field.Signature') }));
    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};

const templateEntity = '/notice-template';
export const getTemplate = async (params?: Record<string, string | number>): Promise<EmailTemplates[]> => {
  try {
    type Res = AxiosResponse<{ data: EmailTemplates[] }>;
    const response: Res = await axios.get(`${templateEntity}`, { params });

    const returnData: EmailTemplates[] = response.data.data.map((temp) => ({
      ...temp,
      data: temp.data,
    }));
    return returnData;
  } catch (e) {
    throw new Error(e);
  }
};

export const getOneTemplate = async (id: number): Promise<EmailTemplates> => {
  try {
    type Res = AxiosResponse<EmailTemplates>;
    const response: Res = await axios.get(`${templateEntity}/${id}`);

    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

const documentTypeEnityt = '/document-types';
export const getDocumentTypes = async (): Promise<EmailDocumentType[]> => {
  try {
    type Res = AxiosResponse<{ data: EmailDocumentType[] }>;
    const response: Res = await axios.get(`${documentTypeEnityt}`, { params: { per_page: 100 } });

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};

const variablesEntity = '/templates/variables';
export const getTemplateVariables = async (): Promise<EmailTemplateVariables[]> => {
  try {
    type Res = AxiosResponse<{ data: EmailTemplateVariables[] }>;
    const response: Res = await axios.get(`${variablesEntity}`);

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const updateTemplate = async (
  id: number,
  values: Partial<EmailTemplatesPure>,
): Promise<EmailTemplates> => {
  try {
    type Res = AxiosResponse<{ data: EmailTemplates }>;
    const response: Res = await axios.put(`${templateEntity}/${id}`, values);
    message.success(i18n.t('Global.UpdatedSuccessfully', { title: i18n.t('Email.Field.Template') }));

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const createTemplate = async (values: Partial<EmailTemplatesPure>): Promise<EmailTemplates> => {
  try {
    type Res = AxiosResponse<{ data: EmailTemplates }>;
    const response: Res = await axios.post(`${templateEntity}`, values);
    message.success(i18n.t('Global.CreatedSuccessfully', { title: i18n.t('Email.Field.Template') }));

    return response.data.data;
  } catch (e) {
    throw new Error(e);
  }
};
