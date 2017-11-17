// let MyPlugin = {}
//
// MyPlugin.install = function (Vue, options) {
//     // 1. 添加全局方法或属性
//     const log = console.log.bind(console)
//     console.log(log)
//     Vue.log = log
//     // 2. 添加全局资源
//     // Vue.directive('my-directive', {
//     //   bind (el, binding, vnode, oldVnode) {
//     //     // 逻辑...
//     //   },
//     //   ...
//     // })
//     // 3. 注入组件
//     Vue.mixin({
//         log: log
//     })
//     // // 4. 添加实例方法
//     // Vue.prototype.$myMethod = function (methodOptions) {
//     //   // 逻辑...
//     // }
// }
//

const log = console.log.bind(console)
module.exports = {
    log:log,
}
