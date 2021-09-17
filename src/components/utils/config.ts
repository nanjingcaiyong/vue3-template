export function getPrefixCls (suffixCls?: string, customizePrefixCls?: string) {
  const prefixCls = 'shopify';
  if (customizePrefixCls) return customizePrefixCls;
  return suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls;
}