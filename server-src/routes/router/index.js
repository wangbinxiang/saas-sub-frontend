import Router from 'koa-router';
import index, { category, orders, detail, cart, orderConfirm, order } from '../../controllers/index';

const router = Router()

router.get('/', async (ctx, next) => {
    console.log(111)
    await next()
    console.log(789)
}, async (ctx, next) => {
    console.log(456)
    await next()
    console.log(101112)
},  index);


router.get('/category', category);
router.get('/detail', detail);
router.get('/orderConfirm', orderConfirm);
router.get('/orders', orders);
router.get('/order', order);

export default router
