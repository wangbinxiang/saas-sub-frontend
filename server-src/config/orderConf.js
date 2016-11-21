export const ORDER_STATUS_WAIT_PAY = 0;

export const ORDER_STATUS_USER_CANCEL = -1;

export const ORDER_STATUS_SHOP_CANCEL = -2;

export const ORDER_STATUS_AUTO_CANCEL = -3;

export const ORDER_STATUS_PAY = 1;

export const ORDER_STATUS_WAIT_CONFIRM_PAY = 3;

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