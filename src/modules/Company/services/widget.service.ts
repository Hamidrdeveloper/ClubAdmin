import i18n from '@src/core/i18n/config';
import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';

import {
  LogoContext,
  ThemeContext,
  TitleContext,
  Widget,
  WidgetFile,
} from '../../Widget/model/widget.entity';

export const getWidgetBySlug = async (slugName: string): Promise<Widget> => {
  try {
    const response: AxiosResponse<Widget> = await axios.get(`/widgets/${slugName}`);

    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const createWidget = async (values: Partial<Widget>): Promise<Widget> => {
  try {
    const response: AxiosResponse<Widget> = await axios.post(`/widgets`, values);

    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const updateWidget = async (id: number, values: Partial<Widget>): Promise<Widget> => {
  try {
    const response: AxiosResponse<Widget> = await axios.put(`/widgets/${id}`, values);

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: 'Widget' }));
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const createWidgetFile = async (values: Partial<WidgetFile>): Promise<WidgetFile> => {
  try {
    const response: AxiosResponse<WidgetFile> = await axios.post(`widget-files`, values);

    message.success(i18n.t('Global.CreatedSuccessfully', { title: 'Slide' }));
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const updateWidgetFile = async (id: number, values: Partial<WidgetFile>): Promise<WidgetFile> => {
  try {
    const response: AxiosResponse<WidgetFile> = await axios.put(`widget-files/${id}`, values);

    message.success(i18n.t('Global.UpdatedSuccessfully', { title: 'Slide' }));
    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteSingleFile = async (id: number): Promise<WidgetFile> => {
  try {
    const response: AxiosResponse<WidgetFile> = await axios.delete(`widget-files/${id}`);

    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const getAppTheme = async (): Promise<ThemeContext> => {
  try {
    const response: AxiosResponse<ThemeContext> = await axios.get(`settings/theme`);

    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const updateAppTheme = async (values: ThemeContext): Promise<ThemeContext> => {
  try {
    const response: AxiosResponse<ThemeContext> = await axios.put(`settings/theme`, values);

    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const updateAppLogo = async (values: Partial<LogoContext>, slug: string): Promise<LogoContext> => {
  try {
    const response: AxiosResponse<LogoContext> = await axios.put(`settings/${slug}`, values);

    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const updateAppTitle = async (values: Partial<TitleContext>): Promise<TitleContext> => {
  try {
    const response: AxiosResponse<TitleContext> = await axios.put(`settings/website-title`, values);

    return response.data;
  } catch (e) {
    throw new Error(e);
  }
};
