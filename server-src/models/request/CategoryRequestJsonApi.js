import BaseRequest from '../../libs/BaseRequest'
import {
    GET,
    POST,
    PUT,
    DELETE
} from '../../config/httpMethodConf'
import {
    CATEGORY_GET,
    CATEGORY_ADD,
    CATEGORY_EDIT,
    CATEGORY_DEL
} from '../../config/apiFeatureConf'
import {
    cmsApiServiceLocation
} from '../../libs/ApiServiceLocation'
import {
    jsonApiGetUrl
} from '../../libs/helper'

export default class CategoryRequestJsonApi extends BaseRequest {
  constructor (feature, originData) {
    const host = cmsApiServiceLocation()
    super(host, feature, originData)
    this.dataType = 'categories'
  }

  get () {
    let BaseUrl = '/categories'

    let idList = this.originData.idList ? this.originData.idList : ''

    let filters = this.originData.filters ? this.originData.filters : ''

    let pages = this.originData.pages ? this.originData.pages : ''

    this.url = jsonApiGetUrl(BaseUrl, idList, {
      filters,
      pages
    })

    this.method = GET
  }

    /**
     *  添加
     *
     *   "attributes"=>array("name"=>"商品分类名称",
     *                        "userId"=>"所属用户",
     *                         "category"=>"商品类型(见配置文件)"
     *                       )
     */
  add () {
    let url = '/categories'

    this.url = url

    this.method = POST

    this.setSuccessCode(201)

    let attributes = {
      name: this.originData.name,
      userId: this.originData.userId
    }

    this.buildData(attributes)
  }

    /**
     *  编辑产品分类请求
     * "attributes"=>array("name"=>"商品分类名称",
     *                          "category"=>"商品类型"
     *                          )
     * @author wangbinxiang
     * @date   2016-09-20T16:37:01+0800
     * @return {[type]}                 [description]
     */
  edit () {
    let url = '/categories/'
    let id = this.originData.id

    this.url = url + id
    this.method = PUT

    let attributes = {
      name: this.originData.name
    }

    this.buildData(attributes)
  }

    /**
     * 删除分类请求
     * @author wangbinxiang
     * @date   2016-09-20T16:54:42+0800
     * @return {[type]}                 [description]
     */
  delete () {
    let url = '/categories/'
    let id = this.originData.id

    this.url = url + id
    this.method = DELETE
  }

  buildFeature () {
    switch (this.feature) {
      case CATEGORY_GET:
        this.get()
        break
      case CATEGORY_ADD:
        this.add()
        break
      case CATEGORY_EDIT:
        this.edit()
        break
      case CATEGORY_DEL:
        this.delete()
        break
      default:
        throw new Error('Invalid feature method')
    }
  }
}
