/**
 * 检查在微信端
 * @author wangbinxiang
 * @date   2016-11-19T13:50:28+0800
 * @param  {[type]}                 ctx [description]
 * @return {[type]}                     [description]
 */
export function inWehcat(ctx) {
	if (ctx.state.__IN_WECHAT__ === true) {
		return true;
	}
	return false;
}

/**
 * 检查不在微信端
 * @author wangbinxiang
 * @date   2016-11-19T13:53:41+0800
 * @param  {[type]}                 ctx [description]
 * @return {[type]}                     [description]
 */
export function notInWechat(ctx) {
	if (ctx.state.__IN_WECHAT__ === false) {
		return true;
	}
	return false;
}


export function isWeixinBrowser(userAgent){
  return /micromessenger/.test(userAgent.toLowerCase());
}

