/**
 * 单例
 * @author wangbinxiang
 * @date   2016-09-03T01:41:40+0800
 * @param  {[type]}                 ) {             let instance;  return (newInstance) [description]
 * @return {[type]}                   [description]
 */
let __instance = (function () {
  let instance;
  return (newInstance) => {
    if (newInstance) instance = newInstance;
    return instance;
  }
}());

export default __instance;