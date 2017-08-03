import RequestAdapter from '../../libs/RequestAdapter'
import CategoryTranslator from '../translator/CategoryTranslator'
import CategoryRequestJsonApi from '../request/CategoryRequestJsonApi'
import {
    CATEGORY_GET,
    CATEGORY_ADD,
    CATEGORY_EDIT,
    CATEGORY_DEL
} from '../../config/apiFeatureConf'
import pageCLass from '../model/page'

/**
 * 产品分类适配器
 */
export default class CategoryAdapter extends RequestAdapter {
  constructor () {
    super()
    this.translator = new CategoryTranslator()
  }

  buildRequest (apiFeature, data) {
    this.requestObject = new CategoryRequestJsonApi(apiFeature, data)
  }

  get ({
        idList,
        filters,
        pages
    }, aCategoryClass) {
    this.buildRequest(CATEGORY_GET, {
      idList,
      filters,
      pages
    })

        // 如果idList是数组 则需要数组形式的结果
    this.needArrayResult(idList)

    this.translator.pageClass = pageCLass

    this.activeClass = aCategoryClass

    return this.request()
  }

  add ({
        userId,
        name
    }, aCategoryClass) {
    this.buildRequest(CATEGORY_ADD, {
      userId,
      name
    })

    this.activeClass = aCategoryClass

    return this.request()
  }

  edit ({
        id,
        name
    }, aCategoryClass) {
    this.buildRequest(CATEGORY_EDIT, {
      id,
      name
    })

    this.activeClass = aCategoryClass

    return this.request()
  }

  del ({
        id
    }, aCategoryClass) {
    this.buildRequest(CATEGORY_DEL, {
      id
    })

    this.activeClass = aCategoryClass

    return this.request()
  }
}
