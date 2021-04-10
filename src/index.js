/**
 * 针对构造函数的原型拓展方法
 * es6的类的写法 是一个整体 不利于我们书写原型属性
 * 采用构造函数的形式 可以将对原型的拓展分散到不同的文件中
 *
 * 将各种方法整个成插件解耦出去，写成一个个插件对原型进行拓展
 */

import { initMixin } from './init';
function Vue(options) {
  this._init(options); // 入口方法 做初始化使用
}

initMixin(Vue);

export default Vue;
