export function proxy(vm, data, key) {
  // vm.a
  Object.defineProperty(vm, key, {
    get() {
      return vm[data][key]; //vm._data.a
    },
    set(newValue) {
      vm[data][key] = newValue;
    },
  });
}

export function defineProperty(target, key, value) {
  Object.defineProperty(target, key, {
    enumerable: false, // 表示不能被循环出来
    configurable: false,
    value,
  });
}
