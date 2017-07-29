import IndexService from '../models/application/IndexService'
import ProductService from '../models/application/ProductService'
import ArticlesService from '../models/application/ArticlesService'
import ProjectService from '../models/application/ProjectService'
import PurchaseProductService from '../models/application/PurchaseProductService'
import {
    PROJECT_STATUS_PUBLISH,
    PROJECT_CATEGORY_B2C
} from '../config/projectConf'
import {
    ARTICLE_STATUS_PUBLISH
} from '../config/articleConf'
import config from 'config'
import lodash from 'lodash'

import {
    SHOP_SLIDES_TYPE_PRODUCT,
    SHOP_SLIDES_TYPE_ARTICLE,
    SHOP_SLIDES_TYPE_PROJECT,
    SHOP_SLIDES_TYPE_PURCHASE
} from '../config/shopConf'

import {
    slideStyle,
    slideOneStyle,
    listStyle
} from '../tools/imgStyle'

import {
    decryptCartTable
} from '../tools/host'

export async function index (ctx, next) {
  const title = '首页 - ' + ctx._shop.title
  const imgHost = config.get('qiniu.bucket.subImg.url')

  const imgListStyle = listStyle(ctx)

    // 幻灯片
  let slidesData = []

  if (ctx._shop.slides && ctx._shop.slides.length) {
    const productIds = []
    const articleIds = []
    const projectIds = []
    const purchaseIds = []

    for (let val of ctx._shop.slides) {
      if (lodash.isString(val)) {
        productIds.push(val)
      } else if (val.id && val.slideType) {
        switch (parseInt(val.slideType)) {
          case SHOP_SLIDES_TYPE_PRODUCT:
            productIds.push(val.id)
            break
          case SHOP_SLIDES_TYPE_ARTICLE:
            articleIds.push(val.id)
            break
          case SHOP_SLIDES_TYPE_PROJECT:
            projectIds.push(val.id)
            break
          case SHOP_SLIDES_TYPE_PURCHASE:
            purchaseIds.push(val.id)
            break
        }
      }
    }
    if (productIds.length > 0) {
      const poductService = new ProductService()
      let products = await poductService.get(productIds, ctx._subId)
      if (products) {
        for (let i in products) {
          slidesData.push({
            slideType: SHOP_SLIDES_TYPE_PRODUCT,
            id: products[i].id,
            title: products[i].name,
            img: imgHost + products[i].logo,
            url: '/products/' + products[i].id,
            price: products[i].minPrice
          })
        }
      }
    }

    if (articleIds.length > 0) {
      const articlesService = new ArticlesService()
      const articles = await articlesService.get(articleIds)
      if (articles) {
        for (let i in articles) {
          slidesData.push({
            slideType: SHOP_SLIDES_TYPE_ARTICLE,
            id: articles[i].id,
            title: articles[i].title,
            img: imgHost + articles[i].logo,
            url: '/articles/' + articles[i].id
          })
        }
      }
    }

    if (projectIds.length > 0) {
      const projectService = new ProjectService()
      const projects = await projectService.get(projectIds)

      if (projects) {
        for (let i in projects) {
          slidesData.push({
            slideType: SHOP_SLIDES_TYPE_PROJECT,
            id: projects[i].id,
            title: projects[i].name,
            img: imgHost + projects[i].logo,
            url: '/projects/' + projects[i].id
          })
        }
      }
    }

    if (purchaseIds.length > 0) {
      const purchaseProductService = new PurchaseProductService()
      const purchases = await purchaseProductService.get(purchaseIds)
      if (purchases) {
        for (let i in purchases) {
          slidesData.push({
            slideType: SHOP_SLIDES_TYPE_PROJECT,
            id: purchases[i].id,
            title: purchases[i].name,
            img: imgHost + purchases[i].logo,
            url: '/products/' + purchases[i].id + '/1'
          })
        }
      }
    }
  }

  if (ctx.state.shopInfo.theme && ctx.state.shopInfo.theme === 'garden') {
        // 园林首页
    const pageJs = webpackIsomorphicTools.assets().javascript.index

    const indexService = new IndexService()

    const imgSlideOneStyle = slideOneStyle(ctx)

        // 页面数据
    const info = await indexService.garden(ctx._subId)

    const blocks = info.projects.concat(info.products)

    await ctx.render('garden/index', {
      title,
      pageJs,
      slidesData,
      info,
      blocks,
      imgHost,
      imgSlideOneStyle,
      imgListStyle,
      SHOP_SLIDES_TYPE_PRODUCT,
      SHOP_SLIDES_TYPE_ARTICLE,
      SHOP_SLIDES_TYPE_PROJECT
    })
  } else if (ctx.state.__IN_WECHAT__ && ctx.query.__cartTable__) {
    const cartTableId = decryptCartTable(ctx.query.__cartTable__)

    let isNext = false

    const number = ctx.query.number ? ctx.query.number : 1

    const size = ctx.query.size ? ctx.query.size : 50

    const indexService = new IndexService()

    const { page, products, productTypes, cartTable } = await indexService.diancan(cartTableId, number, size, ctx._subId)
    if (page && page.haveNext()) {
      isNext = true
    }

    if (ctx.accepts('html', 'text', 'json') === 'json') {
      ctx.body = {
        products,
        isNext
      }
    } else {
      const pageJs = webpackIsomorphicTools.assets().javascript.diancan

      await ctx.render('index/diancan', {
        title,
        products,
        productTypes,
        cartTable,
        isNext,
        number,
        pageJs,
        imgHost,
        imgListStyle
      })
    }
  } else {
    let isNext = false

        // if (ctx.isAuthenticated()) {
        //     console.log('isAuthenticated');
        //     console.log(ctx.state.user);
        //     // ctx.logout();
        // }

    const number = ctx.query.number ? ctx.query.number : 1

    const size = ctx.query.size ? ctx.query.size : 10

    const indexService = new IndexService()

        // const result = await indexService.index(number, size, ctx._subId);
    let { page, products } = await indexService.index(number, size, ctx._subId)
    if (page && page.haveNext()) {
      isNext = true
    }

        // // 获取当前是否有
    const other = config.get('productMapping')

    if (other[ctx._subId]) {
      const otherIds = lodash.sample(other[ctx._subId])
      const productService = new ProductService()
      const otherProducts = await productService.list(otherIds)
      if (otherProducts) {
        products = products ? lodash.concat(products, otherProducts) : otherProducts
      }
    }

        // 获取项目与定制
    let projects = null
    const projectService = new ProjectService()
    const projectsResult = await projectService.index({
      userId: ctx._subId,
      status: PROJECT_STATUS_PUBLISH,
      category: PROJECT_CATEGORY_B2C
    }, {
      number: 1,
      size: 10
    })
    if (projectsResult) {
      projects = projectsResult.projects
    }
        // 获取咨询
    let articles = null
    const articlesService = new ArticlesService()
    const articlesResult = await articlesService.index({
      userId: ctx._subId,
      status: ARTICLE_STATUS_PUBLISH
    }, {
      number: 1,
      size: 10
    })
    if (articlesResult) {
      articles = articlesResult.articles
    }

    if (ctx.accepts('html', 'text', 'json') === 'json') {
      ctx.body = {
        products,
        isNext
      }
    } else {
      const pageJs = webpackIsomorphicTools.assets().javascript.index

      const imgSlideStyle = slideStyle(ctx)

      await ctx.render('index/index', {
        title,
        slidesData,
        products,
        projects,
        articles,
        isNext,
        number,
        pageJs,
        imgHost,
        imgSlideStyle,
        imgListStyle,
        SHOP_SLIDES_TYPE_PRODUCT,
        SHOP_SLIDES_TYPE_ARTICLE,
        SHOP_SLIDES_TYPE_PROJECT
      })
    }
  }
}
