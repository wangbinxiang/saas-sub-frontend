import Router from 'koa-router';
import index from '../../controllers/index';

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

export default router
