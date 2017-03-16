import request from './request';
import { uploadFile } from './qiniu';
import config from 'config';

/**
 * 将url地址文件上传到七牛
 * 
 * @export
 * @param {string} url 
 * @returns 
 */
export async function qiniuUpload(url) {
    const fileBuffer = await request(url);
    const bucket = config.get('qiniu.bucket.subImg.name');
    const uploadResult = await uploadFile(fileBuffer, bucket);
    return uploadResult;
}
