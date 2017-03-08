import Router from 'koa-router';
import {index, category, orders, detail, cart, orderConfirm, order } from '../../controllers/index';
import MemberService from '../../models/application/MemberService';
import navigation from '../../middlewares/navigation';
import { inWechatRequiresLogin } from '../../middlewares/authorization';


const router = Router()

// 需要登陆
router.use(inWechatRequiresLogin);


router.get('/', navigation, index);


export default router
