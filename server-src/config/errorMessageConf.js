/**
 * 地址数量已达最大，不能继续添加
 */
export const DELIVERY_INFORMATION_ERROR_MAX_COUNT = Symbol('DELIVERY_INFORMATION_ERROR_MAX_COUNT')

export const ERROR_MESSAGE_LIST = {
  [DELIVERY_INFORMATION_ERROR_MAX_COUNT]: {
    statusCode: 403,
    message: '地址数量不能超过10条'
  }
}
