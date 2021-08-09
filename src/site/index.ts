import { createI18n } from 'vue-i18n';

const files = require.context('.', true, /(?<!index)\.ts/);
const siteInfo:{[key:string]: any} = files
  .keys().reduce((obj, modulePath) => {
    const moduleName = /[a-zA-Z]+/.exec(modulePath)?.[0] || '';
    return Object.assign({}, obj, { [moduleName]: files(modulePath)?.default });
  }, {});


/**
 * @description 获取站点名字
 * @returns 
 */
const getSiteName = () => {
  const prefixReg = /[\.]\w+/g;
  const hostPrefix = window.location.host.replace(prefixReg, ''); 
  return window.location.protocol === 'https:' ? hostPrefix : 'fr';
};

/**
 * @description 为站点信息添加多语言数据
 * @param siteName 站点名称
 * @returns 
 */
const appendLanguage = (siteName: string) => {
  const language = require(`@/language/${siteInfo?.[siteName]?.['lang']}.ts`);
  siteInfo[siteName] = Object.assign({}, siteInfo[siteName], language.default);
  return siteInfo;
};

export default () => {
  const siteName = getSiteName();

  return createI18n({
    locale: siteName,
    messages: appendLanguage(siteName)
  });
};