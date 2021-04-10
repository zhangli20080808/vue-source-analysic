(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  /**
   * 处理响应式数据
   */
  function observe(data) {
    console.log(data, 'data');
  }

  function initState(vm) {
    // vm.$options
    // 针对不同的情况做 不同的初始化操作
    let options = vm.$options;

    if (options.props) ;

    if (options.methods) ;

    if (options.data) {
      initData(vm);
    }

    if (options.computed) ;

    if (options.watch) ;
  }

  function initData(vm) {
    let data = vm.$options.data; // data 有可能是函数 有可能是对象

    data = typeof data === 'function' ? data.call(vm) : data;
    observe(data);
  }

  /**
   * 针对当前需要初始化的操作做一些初始化
   * 将我们的Vue传入 执行初始化操作
   * Vue 是一个什么框架 不是mvvm框架，只是参考了其思想而已，非说是，那不严格
   * mvvm 的特点 - 数据变化视图会更新，视图变化会影响数据 
   * mvvm有个条件，就是不能跳过数据去更新视图，但是vue中不遵循，比如 $ref 可以直接操作dom
   * 
   */
  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      // 对实例拓展属性
      const vm = this;
      vm.$options = options; // vue 核心特性 响应式原理
      // 初始化状态 (将数据做一个初始化的拦截，当数据发生变更时，更新视图)
      // vue组件中有很多状态，比如 data props watch computed 都和数据相关 

      initState(vm);
    };
  }

  /**
   * 针对构造函数的原型拓展方法
   * es6的类的写法 是一个整体 不利于我们书写原型属性
   * 采用构造函数的形式 可以将对原型的拓展分散到不同的文件中
   *
   * 将各种方法整个成插件解耦出去，写成一个个插件对原型进行拓展
   */

  function Vue(options) {
    this._init(options); // 入口方法 做初始化使用

  }

  initMixin(Vue);

  return Vue;

})));
//# sourceMappingURL=vue.js.map
