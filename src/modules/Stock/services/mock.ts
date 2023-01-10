import { message } from 'antd';

export const dummyReq = (): Promise<any> => {
  console.count('DUMMY REQUESTED');

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello THEREEEE');
      message.success('Waiting for backend api');
    }, 1500);
  });
};
