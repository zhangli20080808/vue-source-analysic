(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? factory(exports)
    : typeof define === 'function' && define.amd
    ? define(['exports'], factory)
    : ((global =
        typeof globalThis !== 'undefined' ? globalThis : global || self),
      factory((global.Vue = {})));
})(this, function (exports) {
  'use strict';

  const fn = () => {
    // 会将fn 挂载到 Vue.fn
  };

  exports.fn = fn;

  Object.defineProperty(exports, '__esModule', { value: true });
});
//# sourceMappingURL=vue.js.map
