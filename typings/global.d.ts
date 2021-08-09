// eslint-disable-next-line @typescript-eslint/no-unused-vars

import { AxiosRequestConfig } from 'axios';

declare global {
  interface Window { 
    ctag: (eventName: string, event: any ,params?: any) => void,
    gtag: (eventName: string, event: any ,params?: any) => void,
    showSignModal: () => void,
    showEditModal: () => void,
    PAGE_INFO: {
      name: string,
      id: string
    }
  }

  type API = {
    [key: string]: <T = any>(obj: any, resetConfig?: AxiosRequestConfig<any>) => Promise<T> & [Promise<T>, () => void]
  }

  type $t = {
    [key: string]: string
  }
}
declare module 'axios' {
  export interface AxiosInstance {
    [key: string]: any;
  }
}

export {};