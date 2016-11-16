import Router from 'koa-router';
import index, { category, orders, detail, cart, orderConfirm, order } from '../../controllers/index';
import MemberService from '../../models/application/MemberService';
import navigation from '../../middlewares/navigation';


const router = Router()

router.get('/', navigation, index);


router.get('/category', category);
router.get('/detail', detail);
router.get('/orderConfirm', orderConfirm);
router.get('/orders', orders);
router.get('/order', order);

// router.get('/member', async(ctx, next) => {
// 	let openid = 'oB42-wQn9urflXjc_XS_Oghyo-v9';
// 	let nickName = '波风皆人';

// 	const memberService = new MemberService();

//     let member = await memberService.wechatLogin(openid, nickName, ctx._subId);


//     ctx.body = {member};

// });



export default router
