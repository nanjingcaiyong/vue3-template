import { App } from 'vue';
import { ErrorTypeEnum } from '@/enums/exceptionEnum';

/**
 * get comp name
 * @param vm
 */
function formatComponentName (vm: any) {
  if (vm.$root === vm) {
    return {
      name: 'root',
      path: 'root',
    };
  }

  const options = vm.$options as any;
  if (!options) {
    return {
      name: 'anonymous',
      path: 'anonymous',
    };
  }
  const name = options.name || options._componentTag;
  return {
    name: name,
    path: options.__file,
  };
}

/**
 * Handling error stack information
 * @param error
 */
function processStackMsg (error: Error) {
  if (!error.stack) {
    return '';
  }
  let stack = error.stack
    .replace(/\n/gi, '') // Remove line breaks to save the size of the transmitted content
    .replace(/\bat\b/gi, '@') // At in chrome, @ in ff
    .split('@') // Split information with @
    .slice(0, 9) // The maximum stack length (Error.stackTraceLimit = 10), so only take the first 10
    .map((v) => v.replace(/^\s*|\s*$/g, '')) // Remove extra spaces
    .join('~') // Manually add separators for later display
    .replace(/\?[^:]+/gi, ''); // Remove redundant parameters of js file links (?x=1 and the like)
  const msg = error.toString();
  if (stack.indexOf(msg) < 0) {
    stack = msg + '@' + stack;
  }
  return stack;
}

/**
 * Configure Vue error handling function
 */

function vueErrorHandler (err: Error, vm: any, info: string) {

  const { name, path } = formatComponentName(vm);
  console.log({
    type: ErrorTypeEnum.VUE,
    name,
    file: path,
    message: err.message,
    stack: processStackMsg(err),
    detail: info,
    url: window.location.href,
  });
}

/**
 * Configure script error handling function
 */
export function scriptErrorHandler (
  event: Event | string,
  source?: string,
  lineno?: number,
  colno?: number,
  error?: Error,
) {
  if (event === 'Script error.' && !source) {
    return false;
  }
  const errorInfo: Partial<ErrorLogInfo> = {};
  colno = colno || (window.event && (window.event as any).errorCharacter) || 0;
  errorInfo.message = event as string;
  if (error?.stack) {
    errorInfo.stack = error.stack;
  } else {
    errorInfo.stack = '';
  }
  const name = source ? source.substr(source.lastIndexOf('/') + 1) : 'script';
  console.log({
    type: ErrorTypeEnum.SCRIPT,
    name: name,
    file: source as string,
    detail: 'lineno' + lineno,
    url: window.location.href,
    ...(errorInfo as Pick<ErrorLogInfo, 'message' | 'stack'>),
  });
  return true;
}

export function setupErrorHandle (app: App): void {
  app.config.errorHandler = vueErrorHandler;
  window.onerror = scriptErrorHandler;
}