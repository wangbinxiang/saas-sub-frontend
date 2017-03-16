import qiniu from 'qiniu';
import config from 'config';

qiniu.conf.ACCESS_KEY = config.get('qiniu.accessKey');
qiniu.conf.SECRET_KEY = config.get('qiniu.secretKey');


//构建上传策略函数
function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket + (key? ':' + key: ''));
  return putPolicy.token();
}

/**
 * 上传文件到七牛
 * 
 * @export
 * @param {path or buffer} localFile 文件地址或者文件buffer
 * @param {string} bucket 
 * @returns 
 */
export function uploadFile(localFile, bucket) {
    var extra = new qiniu.io.PutExtra();
    return new Promise((resolve, reject) => {
        qiniu.io.putWithoutKey(uptoken(bucket), localFile, extra, function(err, ret) {
            if(!err) {
                // 上传成功， 处理返回值
                console.log(ret.hash, ret.key, ret.persistentId);  
                resolve({ hash: ret.hash, key: ret.key });
            } else {
                // 上传失败， 处理返回代码
                console.log(err);
                reject(err);
            }
        });
    });
}