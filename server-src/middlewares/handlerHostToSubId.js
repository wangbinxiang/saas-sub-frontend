import config from 'config';
import _ from 'lodash'

/**
 * 验证子站id
 * @author wangbinxiang
 * @date   2016-09-21T16:57:29+0800
 * @param  {[type]}                 ctx  [description]
 * @param  {Function}               next [description]
 * @return {[type]}                      [description]
 */
export async function handlerHostToSubId(ctx, next) {
    const hostSplit = ctx.request.host.split('.');
    const subIdList = config.get('subIdList');
    let subId = parseInt(hostSplit[0]);
    // hostSplit[0] = '10';
    if (isPositiveInteger(subId) && _.indexOf(subIdList, hostSplit[0]) >= 0) {
        //当前店铺id
        ctx._subId = subId;
        await next();
    } else {
        console.log('站点id错误');
        ctx.status = 404
        await ctx.render('404')
    }
}

function isPositiveInteger(s){//是否为正整数
    var re = /^[1-9]+[0-9]*[0-9]*$/ ;
    return re.test(s)
}
