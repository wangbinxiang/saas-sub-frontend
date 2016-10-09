import Router from 'koa-router';
import index, { category, orders, detail, cart, orderConfirm, order } from '../../controllers/index';

const router = Router()

router.get('/', index);


router.get('/category', category);
router.get('/detail', detail);
router.get('/orderConfirm', orderConfirm);
router.get('/orders', orders);
router.get('/order', order);

export default router
