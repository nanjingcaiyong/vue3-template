// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ComponentCustomProperties, DefineComponent } from 'vue';
declare module '*.vue' {
  const component: DefineComponent<any, any, any>;
  export default component;
}


declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $api: API;
  }
}