import _ from 'lodash';
import fs from 'fs';
import AttachmentService from '../models/application/AttachmentService';
import { attachmentPicTypeList } from '../config/attachmentConf';


export async function upload(ctx, next) {
    const limitSize = 4194304;
    if (ctx.req.files) {
        const attachmentService = new AttachmentService();
        let attachmentList = [];
        let attachment = null;
        for(var file of ctx.req.files) {
            if (file.size <= limitSize && _.indexOf(attachmentPicTypeList, file.mimetype) !== -1) {
                attachment = await attachmentService.upload(file.path);
                attachmentList.push(attachment);
            };
            fs.unlink(file.path, (err) => {
                if (err) {
                    throw err;
                }
            });

        }

        ctx.body = { status: 'ok' , attachmentList: attachmentList};
    } else {
    	ctx.status = 400;
        ctx.body = { message: '没有文件' };
    }
}