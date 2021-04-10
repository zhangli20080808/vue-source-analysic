(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  /**
   * 重写数组的方法
   * 函数劫持，为了更新我们的视图
   */
  let oldArrayPropertyMethods = Array.prototype; // 继承一份原有方法 arrayMethods.__proto__ = oldArrayPropertyMethods

  let arrayMethods = Object.create(oldArrayPropertyMethods);
  const methods = ['push', 'pop', 'shift', 'unshift']; // 重新定数组原型

  methods.forEach(methodName => {
    arrayMethods[methodName] = function (...args) {
      // this就是
      console.log('数组方法被调用,视图需要更新了'); // let result = oldArrayPropertyMethods[methodName].call(this, ...args);

      oldArrayPropertyMethods[methodName].apply(this, args);
      let inserted;
      let ob = this.__ob__;

      switch (methodName) {
        case 'push': // arr.push({a:1},{b:2})

        case 'unshift':
          // 这两个方法都是追加 追加的类型可能是对象类型，应该被再次进行劫持
          inserted = args;

        case 'splice':
          // vue.$set 原理
          inserted = args.splice(2); // arr.splice(0,1,{a:1})

          break;
      }

      if (inserted) ob.observeArray(inserted); // 给新增的数组值也要进行观测

      return result;
    };
  });

  function proxy(vm, data, key) {
    // vm.a
    Object.defineProperty(vm, key, {
      get() {
        return vm[data][key]; //vm._data.a
      },

      set(newValue) {
        vm[data][key] = newValue;
      }

    });
  }
  function defineProperty(target, key, value) {
    Object.defineProperty(target, key, {
      enumerable: false,
      // 表示不能被循环出来
      configurable: false,
      value
    });
  }

  /**
   * 处理响应式数据
   * 针对观测的对象 我们创建一个观测类去观测我们的data，因为有可能是观测对象 数组 其他的一些方法，将
   * 这些东西耦合在一起，做成一个功能
   */

  class Observer {
    constructor(value) {
      // 使用 defineProperty 重新定义属性
      // 判断一个对象有没有被观测过，看他与没有ob属性
      // 不可枚举的好处 就是我们 walk循环的时候是不能取到这个属性的
      defineProperty(value, '__ob__'); // 我们希望 调用 push pop shift unshift sort reserve slice 的时候再通知数组 再去调原有的方法
      // 函数劫持、切片编程 先去调自己的方法，如果自己方法没有，会找原型上的方法，如果自己有，再调原有的方法(切片、高阶函数)

      if (Array.isArray(value)) {
        value.__proto__ = arrayMethods; // 观测数组中的对象类型，对象变化也要做一些事情

        this.observeArray(value);
      } else {
        this.walk(value);
      }
    }

    walk(data) {
      let keys = Object.keys(data);
      keys.forEach(key => {
        defineReactive(data, key, data[key]); // vue.util.defineReactive
      });
    } //对数组每一项执行响应化


    observeArray(items) {
      for (let i = 0, l = items.length; i < l; i++) {
        observe(items[i]);
      }
    }

  }

  function defineReactive(data, key, value) {
    observe(value); // 如果值是对象类型，深度观测

    Object.defineProperty(data, key, {
      get() {
        console.log('get 取值', data, key, value);
        return value;
      },

      set(newValue) {
        console.log('set 设置值', data, key, value);
        if (newValue === value) return; // 如果用户将值改为对象 继续监控

        observe(newValue);
        value = newValue;
      }

    });
  }

  function observe(data) {
    // 观测对象
    if (typeof data !== 'object' || data == null) {
      return data;
    } // 因为最开始我们对所有的数据都进行了观测，且挂载了自定义属性 __ob__，防止数据被重复观测


    if (data.__ob__) {
      return data;
    }

    return new Observer(data);
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
    let data = vm.$options.data; // data 有可能是函数 有可能是对象 _data 代理当前函数的返回值

    vm._data = data = typeof data === 'function' ? data.call(vm) : data; // 属性代理

    for (let key in data) {
      // 我们取key值的时候，从vm._data中去取
      proxy(vm, '_data', key);
    }

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
