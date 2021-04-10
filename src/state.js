import { observe } from './observer/index';
import { proxy } from './util';

export function initState(vm) {
  // vm.$options
  // 针对不同的情况做 不同的初始化操作

  let options = vm.$options;
  if (options.props) {
    initProps(vm);
  }
  if (options.methods) {
    initMethods(vm);
  }
  if (options.data) {
    initData(vm);
  }
  if (options.computed) {
    initComputed(vm);
  }
  if (options.watch) {
    initWatch(vm);
  }
}

function initProps(vm) {}
function initMethods(vm) {}

function initData(vm) {
  let data = vm.$options.data;
  // data 有可能是函数 有可能是对象 _data 代理当前函数的返回值
  vm._data = data = typeof data === 'function' ? data.call(vm) : data;
  // 属性代理
  for (let key in data) {
    // 我们取key值的时候，从vm._data中去取
    proxy(vm, '_data', key);
  }
  observe(data);
}
function initComputed(vm) {}
function initWatch(vm) {}
