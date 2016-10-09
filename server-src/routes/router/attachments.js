import Router from 'koa-router';
import multer from 'koa-multer';
import { storage } from '../../libs/helper';
import { upload } from '../../controllers/attachments';
import { requiresLogin } from '../../middlewares/authorization';

const router = Router();

//需要登陆
router.use(requiresLogin);


router.prefix('/attachments');

router.post('/', multer({ storage: storage }).any(), upload);

export default router;