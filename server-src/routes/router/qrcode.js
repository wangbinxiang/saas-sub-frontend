import Router from 'koa-router';
import qrImage from 'qr-image';

const router = Router();

//路由前缀
router.prefix('/qrcode');



router.get('/relationship', async (ctx, next) => {

	//需要productId
	const productId = ctx.query.productId;

	const url = 'http://' + ctx.host + '/wechat/auth/relationship?parentId=' + ctx.state.user + '&redirectTo=/products/' + productId;
	const img = qrImage.image(url, {size: 6, margin: 0});
	ctx.type = 'image/png';
    await new Promise(()=>{
    	img.pipe(ctx.res)
    	}
    );
});

export default router;