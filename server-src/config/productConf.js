//商品类型
/**
 * 旅游线路型商品
 * @type {Number}
 */
export const PRODUCT_CATEGORY_TOURIST = 1;
/**
 * 门票类型商品
 * @type {Number}
 */
export const PRODUCT_CATEGORY_TICKET = 2;
/**
 * 通用商品
 * @type {Number}
 */
export const PRODUCT_CATEGORY_COMMON = 3;

/**
 * 商品类型名称列表
 * @type {Object}
 */
export const PRODUCT_CATEGORY_LIST = {
	[PRODUCT_CATEGORY_TOURIST]: '旅游商品',
	[PRODUCT_CATEGORY_TICKET]: '门票商品',
	[PRODUCT_CATEGORY_COMMON]: '通用商品'
}

/**
 * 商品下架状态
 * @type {Number}
 */
export const PRODUCT_STATUS_IN_STOCK = 0;
/**
 * 商品上架状态
 * @type {Number}
 */
export const PRODUCT_STATUS_ON_SALE = 2;
/**
 * 商品删除状态
 * @type {Number}
 */
export const PRODUCT_STATUS_DELETE = -2;
/**
 * 商品永久删除状态
 * @type {Number}
 */
export const PRODUCT_STATUS_PERMANENTLY_DELETE = -4;

/**
 * 商品状态名称列表
 * @type {Object}
 */
export const PRODUCT_STATUS_LIST = {
	[PRODUCT_STATUS_IN_STOCK]: '下架',
	[PRODUCT_STATUS_ON_SALE]: '上架',
	[PRODUCT_STATUS_DELETE]: '删除',
	[PRODUCT_STATUS_PERMANENTLY_DELETE]: '永久删除'
}

/**
 * 商品搜索可见,默认为可见
 * @type {Number}
 */
export const PRODUCT_VISIBLE = 0

/**
 * 商品搜索不可见
 * @type {Number}
 */
export const PRODUCT_INVISIBLE = -2

/**
 * 商品列表显示状态名称列表
 * @type {Object}
 */
export const PRODUCT_VISIBLE_NAME_LIST = {
	[PRODUCT_VISIBLE]: '显示',
	[PRODUCT_INVISIBLE]: '隐藏'
}