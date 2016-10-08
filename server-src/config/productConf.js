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