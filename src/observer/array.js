/**
 * 重写数组的方法
 * 函数劫持，为了更新我们的视图
 */
let oldArrayPropertyMethods = Array.prototype;

// 继承一份原有方法 arrayMethods.__proto__ = oldArrayPropertyMethods
export let arrayMethods = Object.create(oldArrayPropertyMethods);

const methods = ['push', 'pop', 'shift', 'unshift'];
// 重新定数组原型
methods.forEach((methodName) => {
  arrayMethods[methodName] = function (...args) {
    // this就是
    console.log('数组方法被调用,视图需要更新了');
    // let result = oldArrayPropertyMethods[methodName].call(this, ...args);
    oldArrayPropertyMethods[methodName].apply(this, args);
    let inserted;
    let ob = this.__ob__;
    switch (methodName) {
      case 'push': // arr.push({a:1},{b:2})
      case 'unshift': // 这两个方法都是追加 追加的类型可能是对象类型，应该被再次进行劫持
        inserted = args;
      case 'splice': // vue.$set 原理
        inserted = args.splice(2); // arr.splice(0,1,{a:1})
        break;
      default:
        break;
    }
    if (inserted) ob.observeArray(inserted); // 给新增的数组值也要进行观测
    return result;
  };
});
