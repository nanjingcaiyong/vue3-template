import { useIntersectionObserver } from '@vueuse/core';
import { Plugin, App } from 'vue';
// import defaultImg from '@/assets/images/200.png'; //默认加载图片

const defineDirective = (app: App) => {
  app.directive('lazy', {
    mounted (el, binding) {
      // el:指令绑定的dom元素
      // binding: value  指令绑定的表达式的值
      // 懒加载的逻辑：监听当前的img dom对象是否进入到视口区域  如果进入 就把图片的地址交给img 的src属性
      // 一旦src有了值就会自动发送http请求 获取图片资源
      const { stop } = useIntersectionObserver(
        el,
        ([{ isIntersecting }]) => {
          // isIntersecting: 当前监听的元素是否成功进入到视口区域如果进来了就是true 否则就是false
          // 有了一个判断是否进入视口区域的条件 如果为true就发送请求
          if (isIntersecting) {
            // 如果图片地址是错误的，无法加载图片，显示占位图(默认图)
            // el.onerror = () => {
            //   el.src = defaultImg;
            // };
            el.src = binding.value;
            stop();
          }
          // 监听处理不是只进行一次的 每次进入移出视口都会再次执行回调
        },
        // 优化： 0 元素刚进入可视区触发，1 表示元素完整进入可视区才触发。0 - 1 数值越大代表 要求进入的面积越大才能触发回调函数
        { threshold: 0 }
      );
    }
  });
}; 
const plugin:Plugin = {
  install (app): void {
    defineDirective(app);
  }
};

export default plugin;