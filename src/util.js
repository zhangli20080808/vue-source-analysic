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

export const unicodeLetters = 'a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD'
