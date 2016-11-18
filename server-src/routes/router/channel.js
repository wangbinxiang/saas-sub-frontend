import Router from 'koa-router';
import { productType } from '../../controllers/channel';
import navigation from '../../middlewares/navigation';
import qrImage from 'qr-image';

const router = Router();

//路由前缀
router.prefix('/channel');





router.get('/qrcode', async (ctx, next) => {

	//需要productId
	const productId = ctx.query.productId;

	const url = 'http://' + ctx.host + '/wechat/auth/relationship?redirectTo=/products/' + productId;
	const img = qrImage.image(url, {size: 10, margin: 0});
	ctx.type = 'image/png';
    await new Promise(()=>{
    	img.pipe(ctx.res)
    	}
    );
});

router.get('/:id', navigation, productType);


export default router;