import { warning } from './warning'

export default (valid: boolean, component: string, message = '') => {
  warning(valid, `[SHOPIFY-UI: ${component}]: ${message}`)
}