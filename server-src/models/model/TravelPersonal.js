/**
 * 导游信息类
 */
export default class TravelPersonal {
    /**
     * 构造函数
     * @author wangbinxiang
     * @date   2016-09-14T12:40:42+0800
     * @param  {[type]}                 options.touristGuideCardId 导游证图片id
     * @return {[type]}                                            [description]
     */
    constructor({ touristGuideCardPhoto }) {
        this.touristGuideCardPhoto = touristGuideCardPhoto;
    }
}