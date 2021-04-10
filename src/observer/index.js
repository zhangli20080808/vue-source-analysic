/**
 * 处理响应式数据
 * 针对观测的对象 我们创建一个观测类去观测我们的data，因为有可能是观测对象 数组 其他的一些方法，将
 * 这些东西耦合在一起，做成一个功能
 */

import { arrayMethods } from './array';

class Observer {
  constructor(value) {
    // 使用 defineProperty 重新定义属性

    // 判断一个对象有没有被观测过，看他与没有ob属性
    // 不可枚举的好处 就是我们 walk循环的时候是不能取到这个属性的
    Object.defineProperty(value, '__ob__', {
      enumerable: false, // 表示不能被循环出来
      configurable: false,
      value: this,
    });

    // 我们希望 调用 push pop shift unshift sort reserve slice 的时候再通知数组 再去调原有的方法
    // 函数劫持、切片编程 先去调自己的方法，如果自己方法没有，会找原型上的方法，如果自己有，再调原有的方法(切片、高阶函数)
    if (Array.isArray(value)) {
      value.__proto__ = arrayMethods;
      // 观测数组中的对象类型，对象变化也要做一些事情
      this.observeArray(value);
    } else {
      this.walk(value);
    }
  }
  walk(data) {
    let keys = Object.keys(data);
    keys.forEach((key) => {
      defineRective(data, key, data[key]); // vue.util.defineRective
    });
  }

  //对数组每一项执行响应化
  observeArray(items) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  }
}

function defineRective(data, key, value) {
  observe(value); // 如果值是对象类型，深度观测
  Object.defineProperty(data, key, {
    get() {
      console.log('get 取值', data, key, value);
      return value;
    },
    set(newValue) {
      console.log('set 设置值', data, key, value);
      if (newValue === value) return;
      // 如果用户将值改为对象 继续监控
      observe(newValue);
      value = newValue;
    },
  });
}

export function observe(data) {
  // 观测对象
  if (typeof data !== 'object' || data == null) {
    return data;
  }
  // 因为最开始我们对所有的数据都进行了观测，且挂载了自定义属性 __ob__，防止数据被重复观测
  if (data.__ob__) {
    return data;
  }
  return new Observer(data);
}
