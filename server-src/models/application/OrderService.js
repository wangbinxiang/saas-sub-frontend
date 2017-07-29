import ProductAdapter from '../adapter/ProductAdapter'
import Product from '../model/Product'
import OrderAdapter from '../adapter/OrderAdapter'
import Order from '../model/Order'
import ProductSnapshotAdapter from '../adapter/ProductSnapshotAdapter'
import ProductSnapshot from '../model/ProductSnapshot'
import ProductTypeAdapter from '../adapter/ProductTypeAdapter'
import ProductType from '../model/ProductType'
import ContractAdapter from '../adapter/ContractAdapter'
import Contract from '../model/Contract'
import ContractSnapshotAdapter from '../adapter/ContractSnapshotAdapter'
import ContractSnapshot from '../model/ContractSnapshot'
import AccountAdapter from '../adapter/AccountAdapter'
import Account from '../model/Account'
import CartTableAdapter from '../adapter/CartTableAdapter'
import CartTable from '../model/CartTable'
import PurchaseProductAdapter from '../adapter/PurchaseProductAdapter'
import PurchaseProduct from '../model/PurchaseProduct'
import {
  checkResourcesOwner,
  checkOther
} from '../../libs/helper'
import lodash from 'lodash'
import {
  // ORDER_PAY_TYPE_NORMAL,
  ORDER_PAY_TYPE_THIRD,
  ORDER_PAY_TYPE_OFFLINE,
  // ORDER_PAY_TYPE_NAME_LIST
  ORDER_PRODUCT_CATEGORY_COMMON,
  ORDER_PRODUCT_CATEGORY_PURCHASE
} from '../../config/orderConf'
import {
  PRODUCT_PROXY_SOURCE_PRUCHASE_PRODUCT
} from '../../config/productProxyConf'

export default class OrderService {
  constructor () {
    this.productAdapter = new ProductAdapter()
    this.orderAdapter = new OrderAdapter()
  }

  /**
   * 显示添加定单页面
   *
   * @param {any} productId 商品id
   * @param {any} priceOrder 商品价格序号
   * @param {any} productNum 商品数量
   * @param {any} shopId 商品id
   * @param {any} userId 下单用户id
   * @param {any} source 商品source
   * @returns
   *
   * @memberof OrderService
   */
  async showAddOrder (productId, priceOrder, productNum, shopId, userId, source) {
    let product
    if (source && parseInt(source) === PRODUCT_PROXY_SOURCE_PRUCHASE_PRODUCT) {
      const include = ['referenceProduct']
      const fields = {
        'commonProducts': 'id,name,logo,prices,status'
      }
      const purchaseProductAdapter = new PurchaseProductAdapter()
      product = await purchaseProductAdapter.get({
        idList: productId,
        include,
        fields
      }, PurchaseProduct)
      if (product === null || !product.isOnSale() || !checkResourcesOwner(product, 'userId', shopId)) {
        return null
      }
    } else {
      const include = ['prices']
      product = await this.productAdapter.get({
        idList: productId,
        include
      }, Product)
      if (product === null || !product.isOnSale() || (!checkOther(productId, shopId) && !checkResourcesOwner(product, 'userId', shopId))) {
        return null
      }
    }
    // 获取产品信息

    // 获取用户信息
    const accountAdapter = new AccountAdapter()
    const account = await accountAdapter.get({
      idList: userId
    }, Account)

    // 获取分类信息
    //
    // 获取合同信息
    const productTypeAdapter = new ProductTypeAdapter()
    const productType = await productTypeAdapter.get({
      'idList': product.productTypeId
    }, ProductType)

    let contract = null

    if (productType !== null && productType.contractId > 0) {
      // 获取合同信息
      const contractAdapter = new ContractAdapter()
      contract = await contractAdapter.get({
        idList: productType.contractId
      }, Contract)
    }

    // 获取价格信息
    let priceInfo = product.prices[priceOrder]

    // 获取总价格
    let totalPrice = priceInfo.price * productNum

    return {
      product,
      priceInfo,
      totalPrice,
      contract,
      account
    }
  }

  async showMulitAddOrder (cartTableId, productsInfo, shopId) {
    const cartTableAdapter = new CartTableAdapter()
    const cartTable = await cartTableAdapter.get({
      idList: cartTableId
    }, CartTable)

    if (cartTable === null || !checkResourcesOwner(cartTable, 'shopId', shopId)) {
      return null
    }
    const productIds = []
    const productChoicePrices = {}
    const purchaseProductIds = []
    const purchaseProductChoicePrices = {}
    for (let productInfo of productsInfo) {
      //  采购商品
      if (parseInt(productInfo.source) === PRODUCT_PROXY_SOURCE_PRUCHASE_PRODUCT) {
        purchaseProductIds.push(productInfo.productId)
        purchaseProductChoicePrices[productInfo.productId] = productInfo.choicePrices
      } else {
        //  自有商品
        productIds.push(productInfo.productId)
        productChoicePrices[productInfo.productId] = productInfo.choicePrices
      }
    }
    // const productIds = lodash.keys(productsInfo)
    let products = []
    let totalPrice = 0
    if (productIds.length) {
      const include = ['prices']
      products = await this.productAdapter.get({
        idList: productIds,
        include
      }, Product)

      if (products === null || !checkResourcesOwner(products, 'userId', shopId, true)) {
        return null
      }
      for (let product of products) {
        if (productChoicePrices[product.id]) {
          for (let price of productChoicePrices[product.id]) {
            if (product.prices[price.index]) {
              product.prices[price.index].number = price.number
              totalPrice += product.prices[price.index].price * price.number
            }
          }
        }
      }
    }
    if (purchaseProductIds.length) {
      const include = ['referenceProduct']
      const fields = {
        'commonProducts': 'id,name,logo,prices,status'
      }
      const purchaseProductAdapter = new PurchaseProductAdapter()
      const purchaseProducts = await purchaseProductAdapter.get({
        idList: purchaseProductIds,
        include,
        fields
      }, PurchaseProduct)
      if (purchaseProducts === null || !checkResourcesOwner(purchaseProducts, 'userId', shopId, true)) {
        return null
      }
      for (let purchaseProduct of purchaseProducts) {
        if (purchaseProductChoicePrices[purchaseProduct.id]) {
          for (let price of purchaseProductChoicePrices[purchaseProduct.id]) {
            if (purchaseProduct.prices[price.index]) {
              purchaseProduct.prices[price.index].number = price.number
              totalPrice += purchaseProduct.prices[price.index].price * price.number
            }
          }
        }
        products.push(purchaseProduct)
      }
    }

    return {
      products,
      totalPrice,
      cartTable
    }
  }

  /**
   * 搜索订单
   * @author wangbinxiang
   * @date   2016-11-03T14:40:03+0800
   * @param  {[type]}                 filters [description]
   * @param  {[type]}                 pages   [description]
   * @return {[type]}                         [description]
   */
  async search (filters, pages) {
    const sort = '-id'
    let result = await this.orderAdapter.get({
      filters,
      pages,
      sort
    }, Order)

    if (result === null) {
      return null
    } else {
      return {
        page: result.page,
        orders: result.result
      }
    }
  }

  async detail (id, userId, shopId) {
    id = +id
    if (!lodash.isInteger(id) || id <= 0) {
      return null
    }
    let order = await this.orderAdapter.get({
      idList: id
    }, Order)

    if (order === null || !order.own(userId) || !order.belongShop(shopId)) {
      return null
    } else {
      // 获取用户信息
      const accountAdapter = new AccountAdapter()
      const account = await accountAdapter.get({
        idList: userId
      }, Account)

      let productSnapshot
      let purchaseProducts
      let contractSnapshot
      let snapshotIds = []
      let purchaseProductIds = []
      let contractSnapshotIds = []
      for (let product of order.products) {
        if (product.productCategory === ORDER_PRODUCT_CATEGORY_COMMON) {
          snapshotIds.push(product.snapshot)
        } else if (product.productCategory === ORDER_PRODUCT_CATEGORY_PURCHASE) {
          purchaseProductIds.push(product.product)
        }
        contractSnapshotIds.push(product.contractSnapshot)
      }
      snapshotIds = lodash.uniq(snapshotIds)
      purchaseProductIds = lodash.uniq(purchaseProductIds)
      contractSnapshotIds = lodash.uniq(contractSnapshotIds)

      // 获取商品快照
      if (snapshotIds.length) {
        const productSnapshotAdapter = new ProductSnapshotAdapter()
        const include = ['product', 'product.prices']
        productSnapshot = await productSnapshotAdapter.get({
          idList: snapshotIds,
          include
        }, ProductSnapshot)
      }

      if (purchaseProductIds.length) {
        const include = ['referenceProduct']
        const fields = {
          'commonProducts': 'id,name,logo,prices,status'
        }
        const purchaseProductAdapter = new PurchaseProductAdapter()
        purchaseProducts = await purchaseProductAdapter.get({
          idList: purchaseProductIds,
          include,
          fields
        }, PurchaseProduct)
      }

      // 获取合同快照
      if (contractSnapshotIds.length) {
        const contractSnapshotAdapter = new ContractSnapshotAdapter()
        contractSnapshot = await contractSnapshotAdapter.get({
          idList: contractSnapshotIds
        }, ContractSnapshot)
      }

      if (productSnapshot || purchaseProducts) {
        for (let key in order.products) {
          if (order.products[key].productCategory === ORDER_PRODUCT_CATEGORY_COMMON) {
            const snapshotKey = lodash.findIndex(productSnapshot, function (snapshot) {
              return snapshot.id === order.products[key].snapshot
            })
            order.products[key]['productSnapshot'] = productSnapshot[snapshotKey].product
            order.products[key]['url'] = '/products/' + productSnapshot[snapshotKey].product.id
          } else if (order.products[key].productCategory === ORDER_PRODUCT_CATEGORY_PURCHASE) {
            const purchaseProductKey = lodash.findIndex(purchaseProducts, function (purchaseProduct) {
              return parseInt(purchaseProduct.id) === order.products[key].product
            })
            order.products[key]['productSnapshot'] = purchaseProducts[purchaseProductKey]
            order.products[key]['url'] = '/products/' + purchaseProducts[purchaseProductKey].id + '/1'
          }

          const contractSnapshotKey = lodash.findIndex(contractSnapshot, function (o) {
            return o.id === order.products[key].contractSnapshot
          })
          if (contractSnapshotKey > -1) {
            order.products[key]['contractSnapshot'] = contractSnapshot[contractSnapshotKey]
          }
        }
      }
      return {
        order,
        account
      }
    }
  }

  async showThirdPay (id, userId, shopId) {
    let order = await this.orderAdapter.get({
      idList: id
    }, Order)

    if (order === null || !order.own(userId) || !order.belongShop(shopId)) {
      return null
    } else {
      // 获取用户信息
      const accountAdapter = new AccountAdapter()
      const account = await accountAdapter.get({
        idList: userId
      }, Account)

      return {
        order,
        account
      }
    }
  }

  async thirdPay (id, userId, shopId) {
    let order = await this.orderAdapter.get({
      idList: id
    }, Order)

    if (order === null || !order.own(userId) || !order.belongShop(shopId)) {
      return null
    } else {
      return await this.orderAdapter.pay({
        id,
        payType: ORDER_PAY_TYPE_THIRD
      }, Order)
    }
  }

  async offlinePay (id, payComment, userId, shopId) {
    let order = await this.orderAdapter.get({
      idList: id
    }, Order)

    if (order === null || !order.own(userId) || !order.belongShop(shopId)) {
      return null
    } else {
      return await this.orderAdapter.pay({
        id,
        payComment,
        payType: ORDER_PAY_TYPE_OFFLINE
      }, Order)
    }
  }

  async addOrder (userId, shopId, comment, productList, source) {
    let product

    if (source && parseInt(source) === PRODUCT_PROXY_SOURCE_PRUCHASE_PRODUCT) {
      const purchaseProductAdapter = new PurchaseProductAdapter()
      product = await purchaseProductAdapter.get({
        idList: productList[0].productId
      }, PurchaseProduct)
      if (product === null || !product.isOnSale() || !checkResourcesOwner(product, 'userId', shopId)) {
        return null
      }
      productList[0].productCategory = ORDER_PRODUCT_CATEGORY_PURCHASE
    } else {
      product = await this.productAdapter.get({
        idList: productList[0].productId
      }, Product)
      if (product === null || !product.isOnSale() || (!checkOther(productList[0].productId, shopId) && !checkResourcesOwner(product, 'userId', shopId))) {
        return null
      }

      productList[0].productCategory = ORDER_PRODUCT_CATEGORY_COMMON
    }
    const order = await this.orderAdapter.add({
      userId,
      shopId,
      comment,
      productList
    }, Order)

    return order
  }

  async mulitAddOrder (userId, shopId, comment, cartTableId, productsInfo) {
    // 检查桌位信息
    const cartTableAdapter = new CartTableAdapter()
    const cartTable = await cartTableAdapter.get({
      idList: cartTableId
    }, CartTable)

    if (cartTable === null || !checkResourcesOwner(cartTable, 'shopId', shopId)) {
      return null
    }
    const systemComment = cartTable.name

    const productIds = []
    const productChoicePrices = {}
    const purchaseProductIds = []
    const purchaseProductChoicePrices = {}
    for (let productInfo of productsInfo) {
      //  采购商品
      if (parseInt(productInfo.source) === PRODUCT_PROXY_SOURCE_PRUCHASE_PRODUCT) {
        purchaseProductIds.push(productInfo.productId)
        purchaseProductChoicePrices[productInfo.productId] = productInfo.choicePrices
      } else {
        //  自有商品
        productIds.push(productInfo.productId)
        productChoicePrices[productInfo.productId] = productInfo.choicePrices
      }
    }
    const productList = []

    if (productIds.length) {
      const include = ['prices']
      const products = await this.productAdapter.get({
        idList: productIds,
        include
      }, Product)

      if (products === null || !checkResourcesOwner(products, 'userId', shopId, true)) {
        return null
      }
      for (let product of products) {
        if (productChoicePrices[product.id]) {
          for (let price of productChoicePrices[product.id]) {
            if (product.prices[price.index]) {
              // product.prices[price.index].number = price.number
              // totalPrice += product.prices[price.index].price * price.number
              productList.push({
                productId: product.id,
                number: price.number,
                priceIndex: price.index,
                productCategory: ORDER_PRODUCT_CATEGORY_COMMON
              })
            }
          }
        }
      }
    }

    if (purchaseProductIds.length) {
      const include = ['referenceProduct']
      const fields = {
        'commonProducts': 'id,name,logo,prices,status'
      }
      const purchaseProductAdapter = new PurchaseProductAdapter()
      const purchaseProducts = await purchaseProductAdapter.get({
        idList: purchaseProductIds,
        include,
        fields
      }, PurchaseProduct)
      if (purchaseProducts === null || !checkResourcesOwner(purchaseProducts, 'userId', shopId, true)) {
        return null
      }
      for (let purchaseProduct of purchaseProducts) {
        if (purchaseProductChoicePrices[purchaseProduct.id]) {
          for (let price of purchaseProductChoicePrices[purchaseProduct.id]) {
            if (purchaseProduct.prices[price.index]) {
              productList.push({
                productId: purchaseProduct.id,
                number: price.number,
                priceIndex: price.index,
                productCategory: ORDER_PRODUCT_CATEGORY_PURCHASE
              })
            }
          }
        }
      }
    }

    if (productList.length) {
      const order = await this.orderAdapter.add({
        userId,
        shopId,
        comment,
        productList,
        systemComment
      }, Order)
      return order
    } else {
      return null
    }

    // const productIds = lodash.keys(productsInfo)
    // if (productIds) {
    //   const include = ['prices']
    //   let products = await this.productAdapter.get({
    //     idList: productIds,
    //     include
    //   }, Product)

    //   if (products === null) {
    //     return null
    //   } else {
    //     const systemComment = cartTable.name
    //     let totalPrice = 0

    //     for (let product of products) {
    //       if (productsInfo[product.id]) {
    //         for (let price of productsInfo[product.id]) {
    //           if (lodash.isEmpty(product.prices[price.index])) {
    //             return null
    //           }
    //           productList.push({
    //             productId: product.id,
    //             number: price.number,
    //             priceIndex: price.index
    //           })
    //         }
    //       } else {
    //         return null
    //       }
    //     }

    //     return await this.orderAdapter.add({
    //       userId,
    //       shopId,
    //       comment,
    //       productList,
    //       systemComment
    //     }, Order)
    //   }
    // }
  }

  async pay (id) {
    return await this.orderAdapter.pay({
      id
    }, Order)
  }

  async confirmPay (id) {
    return await this.orderAdapter.confirmPay({
      id
    }, Order)
  }
}
