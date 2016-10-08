/**
 * 地接社类
 */
export default class TravelOperator {
    /**
     * 构造函数
     * @author wangbinxiang
     * @date   2016-09-14T12:37:32+0800
     * @param  {[type]}                 options.authorizePicId       授权书图片id
     * @param  {[type]}                 options.registrationPicId    备案登记证明图片id
     * @param  {[type]}                 options.businessLicensePicId 营业执照图片id
     * @return {[type]}                                              [description]
     */
    constructor({ authorizePhoto, registrationPhoto, businessLicensePhoto }) {
        this.authorizePhoto       = authorizePhoto;
        this.registrationPhoto    = registrationPhoto;
        this.businessLicensePhoto = businessLicensePhoto;
    }
}