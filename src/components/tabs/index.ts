import { App } from 'vue';
import Tabs from './tabs';
import TabPane from './tab-pane';
import './style';

Tabs.install = function (app: App) {
  app.component(Tabs.name, Tabs);
  app.component(TabPane.name, TabPane);
  return app;
};

export { Tabs, TabPane };