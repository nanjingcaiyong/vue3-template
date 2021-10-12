const prefixReg = /\.\w+/g;
const hostPrefix = window.location.host.replace(prefixReg, ''); 
const fileName = window.location.protocol === 'https:' ? hostPrefix : 'www';

const language = await import(`./${fileName}.config.json`);

export default language;