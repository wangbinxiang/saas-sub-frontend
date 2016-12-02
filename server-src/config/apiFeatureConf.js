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

export const MEMBER_GET           = Symbol();
//获取产品快照信息
export const PRODUCT_SNAPSHOT_GET = Symbol();


//用户注册
export const MEMBER_SIGNUP        = Symbol();
//用户登陆
export const MEMBER_LOGIN         = Symbol();


export const ORDER_ADD            = Symbol();
export const ORDER_PAY            = Symbol();
export const ORDER_CONFIRMPAY     = Symbol();
export const ORDER_GET            = Symbol();



export const SHOP_GET             = Symbol();

export const SHOP_SAVE_BASE_INFO  = Symbol();

export const SHOP_SAVE_ABOUT_INFO = Symbol();

export const SHOP_SAVE_NAVIGATION = Symbol();

export const SHOP_SAVE_SLIDES     = Symbol();


//文章分类列表
export const CATEGORY_GET         = Symbol();
//添加文章分类
export const CATEGORY_ADD         = Symbol();
//编辑文章分类
export const CATEGORY_EDIT        = Symbol();
//删除文章分类
export const CATEGORY_DEL         = Symbol();


//文章分类
export const ARTICLE_GET          = Symbol();
//添加文章
export const ARTICLE_ADD          = Symbol();
//编辑文章
export const ARTICLE_EDIT         = Symbol();
//删除文章
export const ARTICLE_DEL          = Symbol();
//草稿文章
export const ARTICLE_REVERT       = Symbol();
//发布文章
export const ARTICLE_PUBLISH      = Symbol();

