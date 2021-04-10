## 基础依赖

1. 安装
   npm i rollup rollup-plugin-babel @babel/core @babel/preset-env rollup-plugin-serve -D
2. 配置命令
   rollup -c -w

## options Api

通过一个选项进行配置,根据对象不同的属性实现不同的功能

```js
new Vue({
  el: '#app',
  data() {
    return { a: 1 };
  },
});
```
