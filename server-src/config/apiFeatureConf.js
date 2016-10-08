export const USER_GET             = Symbol();
export const USER_LOGIN           = Symbol();
export const USER_SIGNUP          = Symbol();
export const USER_UPDATE_PASSWORD = Symbol();
export const USER_REST_PASSWORD   = Symbol();

export const INFORMATION_APPLY    = Symbol();
export const INFORMATION_GET      = Symbol();
export const INFORMATION_EDIT     = Symbol();
export const INFORMATION_DECLINE  = Symbol();
export const INFORMATION_APPROVE  = Symbol();



//附件功能

//上传文件
export const ATTACHMENT_UPLOAD    = Symbol();
//获取文件信息
export const ATTACHMENT_GET       = Symbol();
//获取图片地址
export const ATTACHMENT_GET_IMAGE = Symbol();


//用户注册手机验证码
export const SMS_REGISTER         = Symbol();
//找回密码手机验证码
export const SMS_REST_PASSWORD    = Symbol();


//产品分类列表
export const PRODUCT_TYPE_GET     = Symbol();
//添加产品分类
export const PRODUCT_TYPE_ADD     = Symbol();
//编辑产品分类
export const PRODUCT_TYPE_EDIT    = Symbol();
//删除产品分类
export const PRODUCT_TYPE_DEL     = Symbol();
//产品列表
export const PRODUCT_GET          = Symbol();
//添加产品
export const PRODUCT_ADD          = Symbol();
//编辑产品
export const PRODUCT_EDIT         = Symbol();
//删除产品
export const PRODUCT_DEL          = Symbol();
//添加产品价格
export const PRODUCT_PRICE_ADD    = Symbol();