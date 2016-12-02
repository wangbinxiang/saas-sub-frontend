//文章状态
/**
 * 旅游线路型商品
 * @type {Number}
 */
export const ARTICLE_STATUS_PUBLISH = 2;
/**
 * 门票类型商品
 * @type {Number}
 */
export const ARTICLE_STATUS_NORMAL = 0;
/**
 * 通用商品
 * @type {Number}
 */
export const ARTICLE_STATUS_DELETE = -2;

/**
 * 商品类型名称列表
 * @type {Object}
 */
export const ARTICLE_STATUS_LIST = {
	[ARTICLE_STATUS_PUBLISH]: '发布',
	[ARTICLE_STATUS_NORMAL]: '退稿',
	[ARTICLE_STATUS_DELETE]: '删除'
}