type Method ='get'| 'delete'| 'post'| 'put'| 'cancelGet' | 'cancelPost'

declare interface ApiConfig {
  name: string,
  path: string,
  type: Method,
  moduleName?: string
}

declare module 'mini-css-extract-plugin';
declare const $API: API;