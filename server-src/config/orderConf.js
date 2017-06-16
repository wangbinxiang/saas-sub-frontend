export const ORDER_STATUS_WAIT_PAY = 0

export const ORDER_STATUS_USER_CANCEL = -1

export const ORDER_STATUS_SHOP_CANCEL = -2

export const ORDER_STATUS_AUTO_CANCEL = -3

export const ORDER_STATUS_PAY = 1

export const ORDER_STATUS_WAIT_CONFIRM_PAY = 3

export const ORDER_STATUS_SUCESS = 5

export const ORDER_STATUS_NAME_LIST = {
  [ORDER_STATUS_WAIT_PAY]: '等待付款',
  [ORDER_STATUS_USER_CANCEL]: '买家取消',
  [ORDER_STATUS_SHOP_CANCEL]: '卖家取消',
  [ORDER_STATUS_AUTO_CANCEL]: '自动取消',
  [ORDER_STATUS_PAY]: '已付款',
  [ORDER_STATUS_WAIT_CONFIRM_PAY]: '等待确认付款',
  [ORDER_STATUS_SUCESS]: '交易成功'
}

export const ORDER_PAY_TYPE_NORMAL = 1// 微信支付

export const ORDER_PAY_TYPE_OFFLINE = 2// 线下支付

export const ORDER_PAY_TYPE_THIRD = 3// 第三方支付

export const ORDER_PAY_TYPE_NAME_LIST = {
  [ORDER_PAY_TYPE_NORMAL]: '微信支付',
  [ORDER_PAY_TYPE_OFFLINE]: '线下支付',
  [ORDER_PAY_TYPE_THIRD]: '海米支付'
}

/**
 *  定单通用商品类型
 */
export const ORDER_PRODUCT_CATEGORY_COMMON = 3
/**
 *  定单采购商品类型
 */
export const ORDER_PRODUCT_CATEGORY_PURCHASE = 4
