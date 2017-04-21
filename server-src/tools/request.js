import request from 'request';
import BufferHelper from 'bufferhelper';
import Promise from 'bluebird';
import fs from 'fs';

/**
 * 过去url的数据，返回buffer
 * 
 * @export
 * @param {any} url 
 * @returns buffer
 */
export default async function(url) {
    const bufferHelper = new BufferHelper();
    const httpStream = request({
        method: 'GET',
        url: url
    });

    const writeStream = fs.createWriteStream('/dev/null');

    let totalLength = 0;

    httpStream.pipe(writeStream);

    httpStream.on('response', (response) => {
        // console.log('response headers is: ', response.headers);
    });

    httpStream.on('data', (chunk) => {
        totalLength += chunk.length;
        bufferHelper.concat(chunk);
        // console.log('recevied data size: ' + totalLength + 'KB');
    });


    // 下载完成


    await new Promise((resolve, reject) => {
        writeStream.on('close', () => {
            // console.log('download finished');
            resolve(null);
            //调用uploadFile上传
            
            
        });
    });

    return bufferHelper.toBuffer();
}