/**
 * 针对当前需要初始化的操作做一些初始化
 * 将我们的Vue传入 执行初始化操作
 * Vue 是一个什么框架 不是mvvm框架，只是参考了其思想而已，非说是，那不严格
 * mvvm 的特点 - 数据变化视图会更新，视图变化会影响数据
 * mvvm有个条件，就是不能跳过数据去更新视图，但是vue中不遵循，比如 $ref 可以直接操作dom
 *
 */

import { initState } from './state';
import { complieToFunctions } from './compiler/index';

export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    // 对实例拓展属性
    const vm = this;
    vm.$options = options;
    // vue 核心特性 响应式原理
    // 初始化状态 (将数据做一个初始化的拦截，当数据发生变更时，更新视图)
    // vue组件中有很多状态，比如 data props watch computed 都和数据相关
    initState(vm);
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };

  /**
   * 根据渲染操作处理对应情况
   * 1. 默认会先找 render 方法
   * 2. 默认没有传入 render 方法，会查找 template
   * 3. 都没有，找当前 el 指定的内容，来进行渲染
   * @param {*} el
   */
  Vue.prototype.$mount = function (el) {
    const vm = this;
    const options = vm.$options;
    el = document.querySelector(el);
    if (!options.render) {
      let template = options.template;
      if (!template && el) {
        // 外部模板 outHtml 带上id的div
        template = el.outHtml;
      }
      // 将template转换为render函数，需要实现这个编译函数
      const render = complieToFunctions(template);
      options.render = render;
    }
    console.log(options.render); // 最终渲染时，都使用这个render
  };
}
