# 1.rollup 环境配置

1. 安装
   npm i rollup rollup-plugin-babel @babel/core @babel/preset-env rollup-plugin-serve -D
2. 配置命令
   rollup -c -w

## options Api

通过一个选项进行配置,根据对象不同的属性实现不同的功能

# 2.vue 的初始化流程

1. 创建构造函数，拓展原型方法
   针对不同的情况做 不同的初始化操作，比如初始化 props,methods,data,computed,watch

## initMixin

## initState

# 3.vue 对象类型的拦截

1. Observer 类的实现，对每一个数据都增加一个观测的实例 **ob**
2. 响应式的实现 observe defineReactive

# 4.vue 中数组的方法的拦截

1. 如果是数组，重写数组方法，并且劫持观测数组中的每一个对象 observer->array.js
2. 调用数组方法，如果是新增的结果，也需要观测，新增数据 需要实现 observeArray 方法，给当前的 value 定义 **ob** 属性，通过它拿到 Observer 的实例，调用 observeArray 方法，再进行一次监控

# 5.vue 实现属性代理

为了方便取值，将 vm.\_\_data.arr 的取值方式转变为 vm.arr 的方式
