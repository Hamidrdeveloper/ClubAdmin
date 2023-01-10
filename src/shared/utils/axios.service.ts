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
import Env from '@src/core/Configs/ConfigureEnv';
import i18n from '@src/core/i18n/config';
import { notification } from 'antd';
import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios';

const configAxios = () => {
  axios.interceptors.request.use(axiosRequestMiddleware);

  axios.interceptors.response.use(axiosResponseMiddleware, axiosErrorMiddleware);

  function axiosRequestMiddleware(config: AxiosRequestHeaders) {
    const language = i18n.language;
    const isPanel = window.location?.pathname?.includes('/admin');
   
   config.baseURL = Env.BASE_URL;
 

    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;

  }

  function axiosResponseMiddleware(response: AxiosResponse) {
    return response;
  }

  function axiosErrorMiddleware(error) {
    const isErrorResponseValid = !!error.response;

    if (isErrorResponseValid) {
      axios401ResponseErrorHandler(error);
      axios400ResponseErrorHandler(error);
      axios422ResponseErrorHandler(error);
      axios409ResponseErrorHandler(error);
      axios403ResponseErrorHandler(error);
    } else {
      axiosOtherResponseErrorHandler(error);
    }

    throw new Error(error);
  }
};

configAxios();

function addTokenToRequestHeaders(config) {
  const latestToken = localStorage.getItem('token');
  if (latestToken) {
    config.headers['Authorization'] = `Bearer ${latestToken}`;
  }
}

function axios401ResponseErrorHandler(error) {
  // const isResponseErrorStatus401 = error.response.status === 401;
  // const isLatestLocalStorageValid = !!localStorage.getItem('token');

  // if (isResponseErrorStatus401 && isLatestLocalStorageValid) {
  //   // localStorage.removeItem('token');

  //   notification.error({
  //     message: 'Session Timeout',
  //     description: 'Your Session Has Been Ended, Please Login Again.',
  //   });

  //   const evt = new CustomEvent('LogoutUser', { detail: 'Logout User Because Of Unauthorized Error' });
  //   window.dispatchEvent(evt);
  // }
}

function axios400ResponseErrorHandler(error) {
  const isError400 = error.response.status === 400;
  const isError404 = error.response.status === 404;

  if (isError404) {
    notification.error({
      message: 'Not Found',
      description: 'File Not Found',
    });
    return;
  }
  if (!isError400) return;

  const allErrors = error.response.data;

  for (const errKey in allErrors) {
    const errorMessage = allErrors[errKey].message;

    if (errorMessage) {
      notification.error({
        message: 'UnProcessable Error',
        description: allErrors[errKey].message,
        duration: 12,
      });
    } else {
      const errorMessage = allErrors[errKey];

      notification.error({ message: 'Bad Request', description: errorMessage, duration: 12 });
    }
  }
}

function axios422ResponseErrorHandler(error) {
  const isResponseErrorStatus422 = error.response.status === 422;

  if (isResponseErrorStatus422) {
    const errorsFromResponse = error.response.data;

    for (const key in errorsFromResponse) {
      const isErrorMessageValid = !!errorsFromResponse[key].message;

      if (isErrorMessageValid) {
        notification.error({
          message: 'UnProcessable Error',
          description: errorsFromResponse[key].message,
          duration: 12,
        });
      } else {
        errorsFromResponse[key].forEach((message) => {
          notification.error({ message: 'Validation Error', description: message, duration: 12 });
        });
      }
    }
  }
}

function axios403ResponseErrorHandler(error) {
  const isResponseErrorStatus403 = error.response.status === 403;

  if (isResponseErrorStatus403) {
    notification.error({
      message: error.response?.data?.message ? 'Error Occurred' : 'Permission Denied',
      description: error.response?.data?.message ?? 'You are not allowed to perform this action.',
      duration: 12,
    });
  }
}

function axios409ResponseErrorHandler(error) {
  const isResponseErrorStatus409 = error.response.status === 409;

  if (isResponseErrorStatus409) {
    notification.error({
      message: 'Validation Error',
      description: error.response.data.message,
      duration: 12,
    });
  }
}

function axiosOtherResponseErrorHandler(error) {
  const isRequestCanceledForNewRequest = !String(error.message).toLowerCase().includes('cancel');

  if (isRequestCanceledForNewRequest) {
    notification.error({
      message: `Network Error`,
      description: 'The request encountered an error, Check your internet connection and Try Again.',
    });
  }
}
