import ProductAdapter from '../adapter/ProductAdapter'
import ProductTypeAdapter from '../adapter/ProductTypeAdapter'
import Product from '../model/Product'
import ProductType from '../model/ProductType'
import ArticleAdapter from '../adapter/ArticleAdapter'
import Article from '../model/Article'
import CategoryAdapter from '../adapter/CategoryAdapter'
import Category from '../model/Category'
import ProjectAdapter from '../adapter/ProjectAdapter'
import Project from '../model/Project'
import CartTableAdapter from '../adapter/CartTableAdapter'
import CartTable from '../model/CartTable'
import ProductProxyAdapter from '../adapter/ProductProxyAdapter'
import ProductProxy from '../model/ProductProxy'

import {
  checkResourcesOwner
} from '../../libs/helper'
import _ from 'lodash'
import config from 'config'
import {
  ARTICLE_STATUS_PUBLISH
} from '../../config/articleConf'
import {
  PRODUCT_STATUS_ON_SALE,
  PRODUCT_VISIBLE
} from '../../config/productConf'
import {
  PRODUCT_PROXY_STATUS_ON_SALE,
  PRODUCT_PROXY_VISIBLE
} from '../../config/productProxyConf'
import {
  PROJECT_STATUS_PUBLISH,
  PROJECT_CATEGORY_B2C
} from '../../config/projectConf'

export default class IndexService {
  constructor () {
    this.productAdapter = new ProductAdapter()
  }

  async index (number, size, userId) {
    // 分页，产品列表，分类列表(导航使用)
    let page, products

    const pages = {
      number,
      size
    }

    const filters = {
      userId,
      status: PRODUCT_PROXY_STATUS_ON_SALE,
      visible: PRODUCT_PROXY_VISIBLE
    }

    const sort = '-id'

    // const productsResult = await this.productAdapter.get({
    //   filters,
    //   pages,
    //   sort
    // }, Product)

    const include = [
      'product',
      'product.referenceProduct',
      'product.distributionProduct'
    ]

    const fields = {
      'commonProducts': 'id,name,logo,prices,minPrice,maxPrice,status,visible'
    }

    const productProxyAdapter = new ProductProxyAdapter()
    const productProxyResult = await productProxyAdapter.get({
      pages,
      filters,
      include,
      fields,
      sort
    }, ProductProxy)

    if (productProxyResult !== null) {
      // 没有获取数据 直接返回空
      page = productProxyResult.page
      products = productProxyResult.result
    }

    // 返回 分页 和 Products 数据
    return {
      page,
      products
    }
  }

  /**
   * 点餐页面
   *
   * @param {any} number
   * @param {any} size
   * @param {any} userId
   *
   * @memberOf IndexService
   */
  async diancan (cartTableId, number, size, shopId) {
    const cartTableAdapter = new CartTableAdapter()
    const cartTable = await cartTableAdapter.get({
      idList: cartTableId
    }, CartTable)

    if (cartTable === null || !checkResourcesOwner(cartTable, 'shopId', shopId)) {
      return null
    }

    let page, products

    const pages = {
      number,
      size
    }

    const filters = {
      userId: shopId,
      status: PRODUCT_STATUS_ON_SALE,
      visible: PRODUCT_VISIBLE
    }

    const sort = '-id'

    const include = [
      'product',
      'product.referenceProduct',
      'product.distributionProduct'
    ]

    const fields = {
      'commonProducts': 'id,name,logo,prices,feature,minPrice,maxPrice,status,visible'
    }

    // const productsResult = await this.productAdapter.get({
    //   filters,
    //   pages,
    //   sort,
    //   include
    // }, Product)

    // if (productsResult !== null) {
    //   // 没有获取数据 直接返回空
    //   page = productsResult.page
    //   products = productsResult.result
    // }

    const productProxyAdapter = new ProductProxyAdapter()
    const productProxyResult = await productProxyAdapter.get({
      pages,
      filters,
      include,
      fields,
      sort
    }, ProductProxy)

    if (productProxyResult !== null) {
      // 没有获取数据 直接返回空
      page = productProxyResult.page
      products = productProxyResult.result
    }

    // 返回 分页 和 Products 数据
    return {
      page,
      products,
      cartTable
    }
  }

  async get (id) {
    let product = await this.productAdapter.get({
      idList: id
    }, Product)
    if (product === null) {
      return product
    } else {
      let productTypeId = product.productTypeId

      if (productTypeId) {
        const productTypeAdapter = new ProductTypeAdapter()
        let productType = await productTypeAdapter.get({
          'idList': productTypeId
        }, ProductType)

        if (productType !== null) {
          product.productType = productType
        }
      }
      // 获取产品分类

      // 获取图片地址
      //
      // slides 图片

      let attachmentIdList = []
      attachmentIdList = _.concat(attachmentIdList, product.slideIds)

      // description图片

      if (product.description) {
        for (let des of product.description) {
          if (des.type === 'image' && des.value && des.value.id && parseInt(des.value.id) > 0) {
            attachmentIdList.push(parseInt(des.value.id))
          }
        }
      }

      // if (attachmentIdList) {
      //   attachmentIdList = _.uniq(attachmentIdList)

      //   const attachmentAdapter = new AttachmentAdapter()
      //   let attachments = await attachmentAdapter.get(attachmentIdList, Attachment)

      //   if (attachments !== null) {
      //     // 设置logo图片
      //     if (attachments[product.logoId]) {
      //       product.logo = attachments[product.logoId]
      //     }

      //     // 设置幻灯片图片
      //     if (product.slideIds) {
      //       for (let slideId of product.slideIds) {
      //         product.slides[slideId] = attachments[slideId]
      //       }
      //     }

      //     if (product.description) {
      //       for (let i in product.description) {
      //         if (product.description[i].type === 'image' && product.description[i].value && product.description[i].value.id && parseInt(product.description[i].value.id) > 0) {
      //           product.description[i].value = attachments[product.description[i].value.id]
      //         }
      //       }
      //     }
      //   }
      // }
      return product
    }
  }

  // 园林首页
  async garden (userId) {
    const layout = config.get('layout')

    const shopLayout = layout[userId]

    const sort = '-id'

    let articles, categories, products, projects

    // 资讯信息，获取cms信息, 获取cms分类前8个，还需要一个cms频道页
    const pages = {
      number: 1,
      size: 11
    }

    const filters = {
      userId,
      status: ARTICLE_STATUS_PUBLISH
    }
    const articleAdapter = new ArticleAdapter()
    const articleResult = await articleAdapter.get({
      filters,
      pages,
      sort
    }, Article)
    if (articleResult !== null) {
      // 没有获取数据 直接返回空
      articles = articleResult.result
    }

    const categoryPages = {
      number: 1,
      size: 8
    }

    const categoryFilters = {
      userId: userId,
      status: 0
    }

    const categoryAdapter = new CategoryAdapter()
    const categoriesResult = await categoryAdapter.get({
      filters: categoryFilters,
      pages: categoryPages
    }, Category)

    if (categoriesResult !== null) {
      // 没有获取数据 直接返回空
      categories = categoriesResult.result
    }

    // 苗木交易, 获取苗木交易分类的产品数据,前6个
    if (shopLayout['product']) {
      products = []
      for (let i in shopLayout['product']) {
        const pages = {
          number: 1,
          size: 6
        }

        const filters = {
          productType: shopLayout['product'][i]['typeIds'],
          status: PRODUCT_STATUS_ON_SALE,
          visible: PRODUCT_VISIBLE
        }

        const productsResult = await this.productAdapter.get({
          filters,
          pages,
          sort
        }, Product)

        if (productsResult !== null) {
          products.push({
            'id': i,
            'name': shopLayout['product'][i]['name'],
            'type': 'product',
            'value': productsResult.result
          })
        }
      }
    }

    // 行业服务, 获取行业服务分类的产品数据，前6个
    // 项目招标, 获取项目招标分类的招标数据，前6个
    if (shopLayout['project']) {
      projects = []
      for (let i in shopLayout['project']) {
        const pages = {
          number: 1,
          size: 6
        }

        const filters = {
          projectType: shopLayout['project'][i]['typeIds'],
          status: PROJECT_STATUS_PUBLISH,
          category: PROJECT_CATEGORY_B2C
        }

        const projectAdapter = new ProjectAdapter()
        const projectResult = await projectAdapter.get({
          filters,
          pages,
          sort
        }, Project)

        if (projectResult !== null) {
          projects.push({
            'id': i,
            'name': shopLayout['project'][i]['name'],
            'type': 'project',
            'value': projectResult.result
          })
        }
      }
    }

    return {
      articles,
      categories,
      products,
      projects
    }
  }
}
