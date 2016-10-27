var Etcd = require("node-etcd");
var jsonfile = require('jsonfile');

//配置docker内网数据j接口
if (process.env.ETCD_ENV) {
    // var etcdHost = 'http://etcd.etcd-ha:2379'; //'http://120.25.168.230:2379'; //
    var etcdHost = 'http://121.199.48.91:2379'; //
    var etcdAttachment;
    var etcdProduct;
    var etcdShop;
    var etcdMemcacheHost;
    var etcdHostMapping;

    var etcdQiniuAccessKey;
    var etcdQiniuSecretKey;
    var etcdQiniuBucketSubImgUrl;
    var etcdQiniuBucketSubImgName;

    //七牛access_key
    var qiniuAccessKey;
    //七牛secret_key
    var qiniuSecretKey;
    //七牛子站图片访问地址
    var qiniuBucketSubImgUrl;
    //七牛子站图片bucket名称
    var qiniuBucketSubImgName;

    if (process.env.ETCD_ENV === 'production') {
        etcdAttachment = '/saas/production/services/attachment/url';
        etcdProduct = '/saas/production/services/product/url';
        etcdShop = '/saas/production/services/shop/url';
        etcdMemcacheHost = '/saas/production/frontend/memcached/host';
        etcdHostMapping = '/saas/production/frontend/hostMapping';

        etcdQiniuAccessKey = '/saas/production/qiniu/accesskey';
        etcdQiniuSecretKey = '/saas/production/qiniu/secretkey';
        etcdQiniuBucketSubImgUrl = '/saas/production/qiniu/bucket/subImg/url';
        etcdQiniuBucketSubImgName = '/saas/production/qiniu/bucket/subImg/name';

    } else if (process.env.ETCD_ENV === 'sandbox') {
        etcdAttachment = '/saas/sandbox/services/attachment/url';
        etcdProduct = '/saas/sandbox/services/product/url';
        etcdShop = '/saas/sandbox/services/shop/url';
        etcdMemcacheHost = '/saas/sandbox/frontend/memcached/host';
        etcdHostMapping = '/saas/sandbox/frontend/hostMapping';
    }

    var etcd = new Etcd(etcdHost);

    var attachmentUrl = etcd.getSync(etcdAttachment);
    var productUrl = etcd.getSync(etcdProduct);
    var shopUrl = etcd.getSync(etcdShop);
    var memcacheHost = etcd.getSync(etcdMemcacheHost);
    var hostMapping = etcd.getSync(etcdHostMapping);

    

    attachmentUrl = attachmentUrl.body.node.value;
    productUrl = productUrl.body.node.value;
    shopUrl = shopUrl.body.node.value;
    memcacheHost = memcacheHost.body.node.value;
    hostMapping = JSON.parse(hostMapping.body.node.value);


    if (process.env.ETCD_ENV === 'production') {
        qiniuAccessKey = etcd.getSync(etcdQiniuAccessKey);
        qiniuSecretKey = etcd.getSync(etcdQiniuSecretKey);
        qiniuBucketSubImgUrl = etcd.getSync(etcdQiniuBucketSubImgUrl);
        qiniuBucketSubImgName = etcd.getSync(etcdQiniuBucketSubImgName);

        console.log(qiniuBucketSubImgName);
        qiniuAccessKey = qiniuAccessKey.body.node.value;
        qiniuSecretKey = qiniuSecretKey.body.node.value;
        qiniuBucketSubImgUrl = qiniuBucketSubImgUrl.body.node.value;
        qiniuBucketSubImgName = qiniuBucketSubImgName.body.node.value;


    } else if (process.env.ETCD_ENV === 'sandbox') {
        qiniuAccessKey = "4i-VhpjaUerpYaw5_j8JlIyTjGYwxeUDMe5k2qP3";
        qiniuSecretKey = "Ax2usNh4f5Vt1xCOyJP0nltDNR-xk2zE58TWftK7";
        qiniuBucketSubImgUrl = "http://oew2ozpi2.bkt.clouddn.com/";
        qiniuBucketSubImgName = "image";
    }

    

    var file = './config/production.json';
    var obj = {
        "hostMapping": hostMapping,
        "apiServiceLocation": {
            "attachment": attachmentUrl,
            "product": productUrl,
            "shop": shopUrl
        },
        "memcache": {
            "host": memcacheHost,
            "port": 11211
        },
        "qiniu": {
            "accessKey": qiniuAccessKey,
            "secretKey": qiniuSecretKey,
            "bucket": {
                "subImg": {
                    "name": qiniuBucketSubImgName,
                    "url": qiniuBucketSubImgUrl,
                    "style": {
                        "productList": "-productList",
                        "productWaterFall": "-productWaterFall"
                    }
                }
            }
        }
    };
    console.log(obj);
    //etcd配置写入production.json
    jsonfile.writeFileSync(file, obj)
}