var Etcd = require("node-etcd");
var jsonfile = require('jsonfile');

//配置docker内网数据j接口
if (process.env.ETCD_ENV) {
    var etcdHost = 'http://etcd.etcd-ha:2379'; //'http://120.25.168.230:2379'; //
    var etcdAttachment;
    var etcdProduct;
    var etcdMemcacheHost;
    var etcdSubIdList;
    if (process.env.ETCD_ENV === 'production') {
        etcdAttachment   = '/saas/production/services/attachment/url';
        etcdProduct      = '/saas/production/services/product/url';
        etcdMemcacheHost = '/saas/production/frontend/memcached/host';
        etcdSubIdList    = '/saas/production/frontend/subIdList';
    } else if (process.env.ETCD_ENV === 'sandbox') {
        etcdAttachment   = '/saas/sandbox/services/attachment/url';
        etcdProduct      = '/saas/sandbox/services/product/url';
        etcdMemcacheHost = '/saas/sandbox/frontend/memcached/host';
        etcdSubIdList    = '/saas/sandbox/frontend/subIdList';
    }
    
    var etcd = new Etcd(etcdHost);
    
    var attachmentUrl = etcd.getSync(etcdAttachment);
    var productUrl    = etcd.getSync(etcdProduct);
    var memcacheHost  = etcd.getSync(etcdMemcacheHost);
    var subIdList     = etcd.getSync(etcdSubIdList);

    attachmentUrl = attachmentUrl.body.node.value;
    productUrl    = productUrl.body.node.value;
    memcacheHost  = memcacheHost.body.node.value;
    subIdList     = subIdList.body.node.value.split(',');

    var file = './config/production.json'
    var obj = {
        "apiServiceLocation": {
          "attachment": attachmentUrl,
          "product": productUrl
        },
        "memcache": {
          "host": memcacheHost,
          "port": 11211
        },
        "subIdList": subIdList
    };
    console.log(obj);
    //etcd配置写入production.json
    jsonfile.writeFileSync(file, obj)      
}
