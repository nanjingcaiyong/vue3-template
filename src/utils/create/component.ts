import { App, defineComponent, ComponentOptions } from 'vue';
export function createComponent (name: string) {
  const componentName = 'shopify-' + name;
  return {
    componentName,
    create: function (_component: ComponentOptions) {
      _component.baseName = name;
      _component.name = componentName;
      _component.install = (vue: App) => {
        vue.component(_component.name as string, _component);
        _component?.children?.length &&
          _component.children.forEach((item: any) => {
            vue.component(item.name as string, item);
          });
      };
      return defineComponent(_component);
    } as typeof defineComponent,
    createPage: function (_component: ComponentOptions) {
      _component.baseName = name;
      _component.name = 'page-' + name;
      return defineComponent(_component);
    } as typeof defineComponent
  };
}
