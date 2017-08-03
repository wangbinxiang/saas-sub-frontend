// import _ from 'lodash';
// import fs from 'fs';
// import AttachmentService from '../models/application/AttachmentService';
// import { attachmentPicTypeList } from '../config/attachmentConf';
import qiniu from 'qiniu'
import uuid from 'uuid'
import config from 'config'

// export async function upload(ctx, next) {
//     const limitSize = 4194304;
//     if (ctx.req.files) {
//         const attachmentService = new AttachmentService();
//         let attachmentList = [];
//         let attachment = null;
//         for(var file of ctx.req.files) {
//             if (file.size <= limitSize && _.indexOf(attachmentPicTypeList, file.mimetype) !== -1) {
//                 attachment = await attachmentService.upload(file.path);
//                 attachmentList.push(attachment);
//             };
//             fs.unlink(file.path, (err) => {
//                 if (err) {
//                     throw err;
//                 }
//             });

//         }

//         ctx.body = { status: 'ok' , attachmentList: attachmentList};
//     } else {
//         ctx.status = 400;
//         ctx.body = { message: '没有文件' };
//     }
// }

export async function token (ctx, next) {
  qiniu.conf.ACCESS_KEY = config.get('qiniu.accessKey')
  qiniu.conf.SECRET_KEY = config.get('qiniu.secretKey')

  let bucket = config.get('qiniu.bucket.subImg.name')

  let key = ctx._subId + '-' + (ctx.query.key ? ctx.query.key : uuid.v4())

    // 生成上传 Token
  let token = uptoken(bucket, key)

  ctx.body = {
    token,
    key
  }
}

function uptoken (bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket + ':' + key)
    // putPolicy.callbackUrl = 'http://requestb.in/vweey4vw';
    // putPolicy.callbackBody = 'fsize=$(fsize)&key=$(key)&hash=$(hash)&fname=$(fname)&ext=$(ext)&uid=123';
  return putPolicy.token()
}
