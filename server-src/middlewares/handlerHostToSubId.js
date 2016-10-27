import config from 'config';
import _ from 'lodash'
import ShopService from '../models/application/ShopService';
/**
 * 验证子站id
 * @author wangbinxiang
 * @date   2016-09-21T16:57:29+0800
 * @param  {[type]}                 ctx  [description]
 * @param  {Function}               next [description]
 * @return {[type]}                      [description]
 */
export async function handlerHostToSubId(ctx, next) {

    console.log(ctx.host);

    const hostMapping = config.get('hostMapping');
    console.log(hostMapping);
    console.log(hostMapping[ctx.host]);

    let subId;
    if (hostMapping && hostMapping[ctx.host]) {
        subId = hostMapping[ctx.host];
    } else {
        const hostSplit = ctx.host.split('.');
        subId = hostSplit[0];
    }

    // const hostSplit = ctx.request.host.split('.');
    // let subId = hostSplit[0];


    // hostSplit[0] = '10';
    if (isPositiveInteger(subId)) {
        //当前店铺id
        
        const shopService = new ShopService();
        let shop = await shopService.get(subId);

        if (shop.id === subId) {
            ctx._subId = subId;
            ctx._shop = shop;
        
            let logo = '/img/sa_logo.png';
            let contactPeoplePhone = shop.contactPeoplePhone? shop.contactPeoplePhone: '';
            let contactPeopleQQ = shop.contactPeopleQQ? shop.contactPeopleQQ: '';
            let copyright = shop.contactPeopleQQ? shop.copyright: '复泰科技电商湾';
            if (shop.logo) {
                //七牛host
                const imgHost = config.get('qiniu.bucket.subImg.url');
                logo = imgHost + shop.logo;
            }

            ctx.state.shopInfo = {
                logo,
                contactPeoplePhone,
                contactPeopleQQ,
                copyright
            }
            await next();
        } else {
            ctx.status = 404;
            await ctx.render('404');
        }
    } else {
        ctx.status = 404;
        await ctx.render('404');
    }
}

function isPositiveInteger(s){//是否为正整数
    var re = /^[1-9]+[0-9]*[0-9]*$/ ;
    return re.test(s)
}
