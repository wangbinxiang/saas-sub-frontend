import Router from 'koa-router';
import multer from 'koa-multer';
import { token } from '../../controllers/attachments';
import { requiresLogin } from '../../middlewares/authorization';

const router = Router();

//需要登陆
router.use(requiresLogin);

router.prefix('/attachments');

router.get('/token', token);

export default router;