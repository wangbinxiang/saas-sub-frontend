
export const APPLICATION_STATUS_NORMAL = 0;


export const APPLICATION_STATUS_DECLINE = 2;


export const APPLICATION_STATUS_APPROVE = 4;

export const APPLICATION_STATUS_PAID = 6;


export const APPLICATION_STATUS_NAMES = {
	[APPLICATION_STATUS_NORMAL]: '磋商中',
	[APPLICATION_STATUS_DECLINE]: '取消',
	[APPLICATION_STATUS_APPROVE]: '同意',
	[APPLICATION_STATUS_PAID]: '确认支付',
}

/**
 * 主办方
 * @type {Number}
 */
export const APPLICATION_ROLL_HOST = 1;

/**
 * 申请方
 * @type {Number}
 */
export const APPLICATION_ROLL_APPLICANT = 2;

/**
 * 游客
 * @type {Number}
 */
export const APPLICATION_ROLL_GUEST = 3;

export const APPLICATION_ROLL_NAMES = {
	[APPLICATION_ROLL_HOST]: '项目方',
	[APPLICATION_ROLL_APPLICANT]: '申请方',
	[APPLICATION_ROLL_GUEST]: '游客',
}

/**
 * 回复来源申请方
 * @type {Number}
 */
export const REPLY_SOURCE_APPLICATION = 0

/**
 * 回复来源项目方
 * @type {Number}
 */
export const REPLY_SOURCE_PROJECT = 2