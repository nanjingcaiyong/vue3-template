// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AxiosInstance } from 'axios';
declare module 'axios' {
  export interface AxiosInstance {
    [key: string]: any;
  }
}