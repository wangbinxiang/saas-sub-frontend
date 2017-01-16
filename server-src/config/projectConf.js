
/**
 * 项目默认状态
 * @type {Number}
 */
export const PROJECT_STATUS_NORMAL = 0;
/**
 * 项目发布状态
 * @type {Number}
 */
export const PROJECT_STATUS_PUBLISH = 2
/**
 * 项目删除状态
 * @type {Number}
 */
export const PROJECT_STATUS_DELETE = -2;

/**
 * [PROJECT_STATUS_NAMES 项目状态名称列表]
 * @type {Object}
 */
export const PROJECT_STATUS_NAMES = {
	[PROJECT_STATUS_NORMAL]: '撤销',
	[PROJECT_STATUS_PUBLISH]: '发布',
	[PROJECT_STATUS_DELETE]: '删除'
}

/**
 * B2B类型项目
 * @type {int}
 */
export const PROJECT_CATEGORY_B2B = 1;

/**
 * B2C类型项目
 * @type {int}
 */
export const PROJECT_CATEGORY_B2C = 2;

/**
 * [PROJECT_CATEGORY_NAMES 项目类型名称]
 * @type {Object}
 */
export const PROJECT_CATEGORY_NAMES = {
	[PROJECT_CATEGORY_B2B]: 'B2B类型项目',
	[PROJECT_CATEGORY_B2C]: 'B2C类型项目'
}