export const USER_GET = Symbol('USER_GET')
export const USER_LOGIN = Symbol('USER_LOGIN')
export const USER_SIGNUP = Symbol('USER_SIGNUP')
export const USER_UPDATE_PASSWORD = Symbol('USER_UPDATE_PASSWORD')
export const USER_REST_PASSWORD = Symbol('USER_REST_PASSWORD')

export const INFORMATION_APPLY = Symbol('INFORMATION_APPLY')
export const INFORMATION_GET = Symbol('INFORMATION_GET')
export const INFORMATION_EDIT = Symbol('INFORMATION_EDIT')
export const INFORMATION_DECLINE = Symbol('INFORMATION_DECLINE')
export const INFORMATION_APPROVE = Symbol('INFORMATION_APPROVE')

// 附件功能

// 上传文件
export const ATTACHMENT_UPLOAD = Symbol('ATTACHMENT_UPLOAD')
// 获取文件信息
export const ATTACHMENT_GET = Symbol('ATTACHMENT_GET')
// 获取图片地址
export const ATTACHMENT_GET_IMAGE = Symbol('ATTACHMENT_GET_IMAGE')

// 用户注册手机验证码
export const SMS_REGISTER = Symbol('SMS_REGISTER')
// 找回密码手机验证码
export const SMS_REST_PASSWORD = Symbol('SMS_REST_PASSWORD')

// 产品分类列表
export const PRODUCT_TYPE_GET = Symbol('PRODUCT_TYPE_GET')
// 添加产品分类
export const PRODUCT_TYPE_ADD = Symbol('PRODUCT_TYPE_ADD')
// 编辑产品分类
export const PRODUCT_TYPE_EDIT = Symbol('PRODUCT_TYPE_EDIT')
// 删除产品分类
export const PRODUCT_TYPE_DEL = Symbol('PRODUCT_TYPE_DEL')
// 产品列表
export const PRODUCT_GET = Symbol('PRODUCT_GET')
// 添加产品
export const PRODUCT_ADD = Symbol('PRODUCT_ADD')
// 编辑产品
export const PRODUCT_EDIT = Symbol('PRODUCT_EDIT')
// 删除产品
export const PRODUCT_DEL = Symbol('PRODUCT_DEL')
// 添加产品价格
export const PRODUCT_PRICE_ADD = Symbol('PRODUCT_PRICE_ADD')

// 获取产品快照信息
export const PRODUCT_SNAPSHOT_GET = Symbol('PRODUCT_SNAPSHOT_GET')

// 商品代理数据信息
export const PRODUCT_PROXY_GET = Symbol('PRODUCT_PROXY_GET')

export const MEMBER_GET = Symbol('MEMBER_GET')
// 用户注册
export const MEMBER_SIGNUP = Symbol('MEMBER_SIGNUP')
// 第三方网站用户注册
export const MEMBER_SOURCE_SIGNUP = Symbol('MEMBER_SOURCE_SIGNUP')
// 用户登陆
export const MEMBER_LOGIN = Symbol('MEMBER_LOGIN')
// 第三方网站用户登陆
export const MEMBER_SOURCE_LOGIN = Symbol('MEMBER_SOURCE_LOGIN')
// 获取用户父关系
export const MEMBER_PARENT = Symbol('MEMBER_PARENT')
// 获取用户子关系
export const MEMBER_CHILDREN = Symbol('MEMBER_CHILDREN')
// 更新头像
export const MEMBER_UPDATE_AVATAR = Symbol('MEMBER_UPDATE_AVATAR')

export const MEMBER_BIND_PARENT = Symbol('MEMBER_BIND_PARENT')

// 获取用户账户余额
export const ACCOUNT_GET = Symbol('ACCOUNT_GET')

export const ORDER_ADD = Symbol('ORDER_ADD')
export const ORDER_PAY = Symbol('ORDER_PAY')
export const ORDER_CONFIRMPAY = Symbol('ORDER_CONFIRMPAY')
export const ORDER_GET = Symbol('ORDER_GET')

export const SHOP_GET = Symbol('SHOP_GET')

export const SHOP_SAVE_BASE_INFO = Symbol('SHOP_SAVE_BASE_INFO')

export const SHOP_SAVE_ABOUT_INFO = Symbol('SHOP_SAVE_ABOUT_INFO')

export const SHOP_SAVE_NAVIGATION = Symbol('SHOP_SAVE_NAVIGATION')

export const SHOP_SAVE_SLIDES = Symbol('SHOP_SAVE_SLIDES')

// 文章分类列表
export const CATEGORY_GET = Symbol('CATEGORY_GET')
// 添加文章分类
export const CATEGORY_ADD = Symbol('CATEGORY_ADD')
// 编辑文章分类
export const CATEGORY_EDIT = Symbol('CATEGORY_EDIT')
// 删除文章分类
export const CATEGORY_DEL = Symbol('CATEGORY_DEL')

// 文章分类
export const ARTICLE_GET = Symbol('ARTICLE_GET')
// 添加文章
export const ARTICLE_ADD = Symbol('ARTICLE_ADD')
// 编辑文章
export const ARTICLE_EDIT = Symbol('ARTICLE_EDIT')
// 删除文章
export const ARTICLE_DEL = Symbol('ARTICLE_DEL')
// 草稿文章
export const ARTICLE_REVERT = Symbol('ARTICLE_REVERT')
// 发布文章
export const ARTICLE_PUBLISH = Symbol('ARTICLE_PUBLISH')

// 获取合同
export const CONTRACT_GET = Symbol('CONTRACT_GET')

// 获取合同快照
export const CONTRACT_SNAPSHOT_GET = Symbol('CONTRACT_SNAPSHOT_GET')

// 项目
export const PROJECT_GET = Symbol('PROJECT_GET')

export const PROJECT_ADD = Symbol('PROJECT_ADD')

export const PROJECT_EDIT = Symbol('PROJECT_EDIT')

export const PROJECT_PRICE_ADD = Symbol('PROJECT_PRICE_ADD')

export const PROJECT_DEL = Symbol('PROJECT_DEL')

export const PROJECT_PUBLISH = Symbol('PROJECT_PUBLISH')

export const PROJECT_REVERT = Symbol('PROJECT_REVERT')

// 项目类型
export const PROJECT_TYPE_GET = Symbol('PROJECT_TYPE_GET')

export const PROJECT_TYPE_ADD = Symbol('PROJECT_TYPE_ADD')

export const PROJECT_TYPE_EDIT = Symbol('PROJECT_TYPE_EDIT')

export const PROJECT_TYPE_DEL = Symbol('PROJECT_TYPE_DEL')

// 项目申请
export const APPLICATION_GET = Symbol('APPLICATION_GET')

export const APPLICATION_ADD = Symbol('APPLICATION_ADD')

export const APPLICATION_FINISH = Symbol('APPLICATION_FINISH')

export const APPLICATION_APPROVE = Symbol('APPLICATION_APPROVE')

export const APPLICATION_DECLINE = Symbol('APPLICATION_DECLINE')

export const APPLICATION_REPLY = Symbol('APPLICATION_REPLY')

export const APPLICATION_REPLY_GET = Symbol('APPLICATION_REPLY_GET')
// 获取申请合同
export const APPLICATION_CONTRACT_GET = Symbol('APPLICATION_CONTRACT_GET')
// 添加申请合同
export const APPLICATION_CONTRACT_ADD = Symbol('APPLICATION_CONTRACT_ADD')
// 编辑申请合同
export const APPLICATION_CONTRACT_EDIT = Symbol('APPLICATION_CONTRACT_EDIT')
