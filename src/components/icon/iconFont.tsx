import PropTypes from 'vue-types'
import { defineComponent } from 'vue'
import warn from '../utils/warn'
import './style'
import { getPrefixCls } from '../utils/config';

const customCache = new Set();

export interface Options {
  scriptUrl: string,
  extraCommonProps?: any
}
export function createFromIconfontCN (options: Options) {
  const { scriptUrl } = options;
  if (
    typeof document !== 'undefined' &&
    typeof window !== 'undefined' &&
    typeof document.createElement === 'function' &&
    scriptUrl.length &&
    !customCache.has(scriptUrl)
  ) {
    const script = document.createElement('script');
    script.setAttribute('src', scriptUrl);
    script.setAttribute('data-namespace', scriptUrl);
    customCache.add(scriptUrl);
    document.body.appendChild(script);
  }
  const Iconfont = defineComponent({
    props: {
      type: PropTypes.string,
      rotate: PropTypes.number
    },
    render() {
      const prefixCls = getPrefixCls('icon')
      const { type, rotate } = this.$props
      const svgStyle = rotate
        ? { msTransform: `rotate(${rotate}deg)`,transform: `rotate(${rotate}deg)` }
        : undefined;
      const innerSvgProps = {
        width: '1em', // 通过设置<i></i>的font-size影响<svg></svg>大小
        height: '1em',
        fill: 'currentColor',
        'aria-hidden': true,
        focusable: 'false',
        style: svgStyle,
      };
      const cls = {
        [`${prefixCls}`]: true,
        [`${prefixCls}-${type}`]: !!type,
      };

      const iProps = {
        class: cls,
        staticClass: '',
      };

      warn(
        Boolean(type), 
        'Icon',
        'Icon should have `type` prop'
      )
      let content = null;
      if (type) {
        content = <use xlinkHref={`#${type}` } />;
      }
      return (
        <i {...iProps}>
          <svg {...innerSvgProps}>{ content }</svg>
        </i>
      )
    },
  });
  return Iconfont
}