import Router from 'koa-router';
import { productType } from '../../controllers/channel';
import navigation from '../../middlewares/navigation';
import qrImage from 'qr-image';

const router = Router();

//路由前缀
router.prefix('/channel');





router.get('/qrcode', async (ctx, next) => {

	const img = qrImage.image('http://nga.178.com/', {size: 10, margin: 0});
	ctx.type = 'image/png';
    await new Promise(()=>{
    	img.pipe(ctx.res)
    	}
    );
});

router.get('/:id', navigation, productType);


export default router;