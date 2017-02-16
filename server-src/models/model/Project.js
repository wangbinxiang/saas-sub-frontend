import {
	PROJECT_STATUS_PUBLISH
} from '../../config/projectConf';

export default class Project{
	constructor({
		id,
		name,
		category,
		projectType,
		feature,
		logo,
		minPrice,
		maxPrice,
        description,
        attachments,
        slides,
        prices,
        applyCount,
        updateTime,
        createTime,
        statusTime,
        status,
        userId
	}) {
		this.id          = id;
		this.name        = name;
		this.category    = category;
		this.projectType = projectType;
		this.feature     = feature;
		this.logo        = logo;
		this.minPrice    = minPrice;
		this.maxPrice    = maxPrice;
		this.description = description;
		this.attachments = attachments;
		this.slides      = slides;
		this.prices      = prices;
		this.applyCount  = applyCount;
		this.updateTime  = updateTime;
		this.createTime  = createTime;
		this.statusTime  = statusTime;
		this.status      = status;
		this.userId     = userId;
	}


	/**
	 * 是否已发布
	 * @author wangbinxiang
	 * @date   2017-01-15T16:05:37+0800
	 * @return {Boolean}                [description]
	 */
	isPublish() {
		if (this.status == PROJECT_STATUS_PUBLISH) {
			return true
		}
		return false
	}
}