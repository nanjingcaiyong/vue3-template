// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosInstance } from 'axios';

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
}
declare module 'axios' {
  export interface AxiosInstance {
    [key: string]: any;
  }
}


export {};