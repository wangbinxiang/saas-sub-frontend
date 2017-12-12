var Etcd = require('node-etcd')
var jsonfile = require('jsonfile')

// 配置docker内网数据j接口
if (process.env.ETCD_ENV) {
  var etcdHost = ''
  if (process.env.NODE_ENV === 'development') {
    etcdHost = 'http://121.199.18.127:2379'
  } else {
    etcdHost = 'http://etcd.etcd-ha:2379'
  }
  var etcdAttachment
  var etcdProduct
  var etcdShop
  var etcdMemcacheHost
  var etcdHostMapping
  var etcdOrder
  var etcdMember
  var etcdCms
  var etcdProject

  var etcdQiniuAccessKey
  var etcdQiniuSecretKey
  var etcdQiniuBucketSubImgUrl
  var etcdQiniuBucketSubImgName
  var etcdQiniuBucketSubImgUploadUrl

  // 七牛access_key
  var qiniuAccessKey
  // 七牛secret_key
  var qiniuSecretKey
  // 七牛子站图片访问地址
  var qiniuBucketSubImgUrl
  // 七牛子站图片bucket名称
  var qiniuBucketSubImgName
  // 子站图片上传七牛地址
  var qiniuBucketSubImgUploadUrl

  // hub站地址(沙箱和正式的区分)
  var hostHub = ''

  if (process.env.ETCD_ENV === 'production') {
    hostHub = 'hub.hitongxue.net'

    etcdAttachment = '/saas/production/services/attachment/url'
    etcdProduct = '/saas/production/services/product/url'
    etcdShop = '/saas/production/services/shop/url'
    etcdMemcacheHost = '/saas/production/frontend/memcached/host'
    etcdHostMapping = '/saas/production/frontend/hostMapping'
    etcdOrder = '/saas/production/services/order/url'
    etcdMember = '/saas/production/services/member/url'
    etcdCms = '/saas/production/services/cms/url'
    etcdProject = '/saas/production/services/project/url'

    etcdQiniuAccessKey = '/saas/production/qiniu/accesskey'
    etcdQiniuSecretKey = '/saas/production/qiniu/secretkey'
    etcdQiniuBucketSubImgUrl = '/saas/production/qiniu/bucket/subImg/url'
    etcdQiniuBucketSubImgName = '/saas/production/qiniu/bucket/subImg/name'
    etcdQiniuBucketSubImgUploadUrl = '/saas/production/qiniu/bucket/subImg/uploadUrl'
  } else if (process.env.ETCD_ENV === 'sandbox') {
    hostHub = 'hub.dianshangwan.com'

    etcdAttachment = '/saas/sandbox/services/attachment/url'
    etcdProduct = '/saas/sandbox/services/product/url'
    etcdShop = '/saas/sandbox/services/shop/url'
    etcdMemcacheHost = '/saas/sandbox/frontend/memcached/host'
    etcdHostMapping = '/saas/sandbox/frontend/hostMapping'
    etcdOrder = '/saas/sandbox/services/order/url'
    etcdMember = '/saas/sandbox/services/member/url'
    etcdCms = '/saas/sandbox/services/cms/url'
    etcdProject = '/saas/sandbox/services/project/url'
  }

  var etcd = new Etcd(etcdHost)

  var attachmentUrl = etcd.getSync(etcdAttachment)
  var productUrl = etcd.getSync(etcdProduct)
  var shopUrl = etcd.getSync(etcdShop)
  var memcacheHost = etcd.getSync(etcdMemcacheHost)
  var hostMapping = etcd.getSync(etcdHostMapping)
  var orderUrl = etcd.getSync(etcdOrder)
  var memberUrl = etcd.getSync(etcdMember)
  var cmsUrl = etcd.getSync(etcdCms)
  var projectUrl = etcd.getSync(etcdProject)

  memberUrl = memberUrl.body.node.value
  orderUrl = orderUrl.body.node.value
  attachmentUrl = attachmentUrl.body.node.value
  productUrl = productUrl.body.node.value
  shopUrl = shopUrl.body.node.value
  memcacheHost = memcacheHost.body.node.value
  hostMapping = JSON.parse(hostMapping.body.node.value)
  cmsUrl = cmsUrl.body.node.value
  projectUrl = projectUrl.body.node.value

  if (process.env.ETCD_ENV === 'production') {
    qiniuAccessKey = etcd.getSync(etcdQiniuAccessKey)
    qiniuSecretKey = etcd.getSync(etcdQiniuSecretKey)
    qiniuBucketSubImgUrl = etcd.getSync(etcdQiniuBucketSubImgUrl)
    qiniuBucketSubImgName = etcd.getSync(etcdQiniuBucketSubImgName)
    qiniuBucketSubImgUploadUrl = etcd.getSync(etcdQiniuBucketSubImgUploadUrl)

    console.log(qiniuBucketSubImgName)
    qiniuAccessKey = qiniuAccessKey.body.node.value
    qiniuSecretKey = qiniuSecretKey.body.node.value
    qiniuBucketSubImgUrl = qiniuBucketSubImgUrl.body.node.value
    qiniuBucketSubImgName = qiniuBucketSubImgName.body.node.value
    qiniuBucketSubImgUploadUrl = qiniuBucketSubImgUploadUrl.body.node.value
  } else if (process.env.ETCD_ENV === 'sandbox') {
    qiniuAccessKey = '4i-VhpjaUerpYaw5_j8JlIyTjGYwxeUDMe5k2qP3'
    qiniuSecretKey = 'Ax2usNh4f5Vt1xCOyJP0nltDNR-xk2zE58TWftK7'
    qiniuBucketSubImgUrl = 'http://oew2ozpi2.bkt.clouddn.com/'
    qiniuBucketSubImgName = 'image'
    qiniuBucketSubImgUploadUrl = 'http://up-z1.qiniu.com'
  }

  var file = './config/production.json'
  var obj = {
    'hostMapping': hostMapping,
    'apiServiceLocation': {
      'attachment': attachmentUrl,
      'product': productUrl,
      'shop': shopUrl,
      'order': orderUrl,
      'member': memberUrl,
      'cms': cmsUrl,
      'project': projectUrl
    },
    'memcache': {
      'host': memcacheHost,
      'port': 11211
    },
    'theme': {
      '10002': '',
      '10022': '',
      '10026': 'garden',
      '10027': 'garden',
      '10034': 'blue',
      '10039': 'red'
    },
    'layout': {
      '10002': '',
      '10022': '',
      '10026': {
        'navigation': [{
          'name': '产业资讯',
          'type': 'cms'
        },
        {
          'name': '项目招标',
          'type': 'project',
          'id': 1
        },
        {
          'name': 'PPP项目合作',
          'type': 'project',
          'id': 2
        },
        {
          'name': '产业金融',
          'type': 'project',
          'id': 3
        },
        {
          'name': '苗木交易',
          'type': 'product',
          'id': 1
        },
        {
          'name': '服务配套',
          'type': 'product',
          'id': 2
        }
        ],
        'article': {
          'name': '产业资讯',
          'idList': [
            5, 7, 8
          ]
        },
        'product': {
          '1': {
            'name': '苗木交易',
            'typeIds': '43,44,45,46,47,48,49,50'
          },
          '2': {
            'name': '服务配套',
            'typeIds': '51,52,53,54,55,56'
          }
        },
        'project': {
          '1': {
            'name': '项目招标',
            'typeIds': '1'
          },
          '2': {
            'name': 'PPP项目合作',
            'typeIds': '2'
          },
          '3': {
            'name': '产业金融',
            'typeIds': '3'
          }
        }
      },
      '10027': {
        'navigation': [{
          'name': '产业资讯',
          'type': 'cms'
        },
        {
          'name': '项目合作',
          'type': 'project',
          'id': 1
        },
        {
          'name': '项目孵化',
          'type': 'project',
          'id': 2
        },
        {
          'name': '合伙人招募',
          'type': 'project',
          'id': 3
        },
        {
          'name': '运营服务',
          'type': 'product',
          'id': 1
        },
        {
          'name': '增值服务',
          'type': 'product',
          'id': 2
        }
        ],
        'article': {
          'name': '产业资讯',
          'idList': [
            9, 10
          ]
        },
        'product': {
          '1': {
            'name': '运营服务',
            'typeIds': '57'
          },
          '2': {
            'name': '增值服务',
            'typeIds': '58'
          }
        },
        'project': {
          '1': {
            'name': '项目合作',
            'typeIds': '7'
          },
          '2': {
            'name': '项目孵化',
            'typeIds': '8'
          },
          '3': {
            'name': '合伙人招募',
            'typeIds': '9'
          }
        }
      },
      '10034': {
        'navigation': [{
          'name': '公司简介',
          'type': 'categories',
          'id': '28'
        },
        {
          'name': '新闻资讯',
          'type': 'articleChannel',
          'id': '0'
        },
        {
          'name': '精品项目',
          'type': 'categories',
          'id': '31'
        },
        {
          'name': '项目合作',
          'type': 'projectChannel',
          'id': '0'
        },
        {
          'name': '采购合作',
          'type': 'projectChannel',
          'id': '1'
        },
        {
          'name': '联系我们',
          'type': 'categories',
          'id': '32'
        }
        ],
        'articleChannel': {
          '0': {
            'name': '新闻资讯',
            'id': '29,30'
          }
        },
        'projectChannel': {
          '0': {
            'name': '项目合作',
            'id': '14,15,16'
          },
          '1': {
            'name': '采购合作',
            'id': '17,18,19,20'
          }
        }
      }
    },
    'qiniu': {
      'accessKey': qiniuAccessKey,
      'secretKey': qiniuSecretKey,
      'bucket': {
        'subImg': {
          'uploadUrl': qiniuBucketSubImgUploadUrl,
          'name': qiniuBucketSubImgName,
          'url': qiniuBucketSubImgUrl,
          'style': {
            'productList': '-productList',
            'productWaterFall': '-productWaterFall'
          }
        }
      }
    },
    'host': {
      'hub': hostHub
    }
  }
  console.log(obj)
  // etcd配置写入production.json
  jsonfile.writeFileSync(file, obj)
}
