/**
 * 处理响应式数据
 * 针对观测的对象 我们创建一个观测类去观测我们的data，因为有可能是观测对象 数组 其他的一些方法，将
 * 这些东西耦合在一起，做成一个功能
 */

class Observer {
  constructor(value) {
    // 使用 defineProperty 重新定义属性
    this.walk(value);
  }
  walk(data) {
    let keys = Object.keys(data);
    keys.forEach((key) => {
      defineRective(data, key, data[key]); // vue.util.defineRective
    });
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
  if (typeof data !== 'object' && data !== null) {
    return;
  }
  return new Observer(data);
}
