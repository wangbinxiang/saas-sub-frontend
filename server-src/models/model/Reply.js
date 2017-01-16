import { timestampToDate } from '../../libs/helper';

export default class Reply{
	constructor({
		id,
		source,
		content,
        updateTime,
        createTime,
        statusTime,
        status,
        userId,
        applicationId
	}) {
		this.id             = id;
		this.source         = source;
		this.content        = content;
		this.updateTime     = updateTime;
		this.createTime     = createTime;
		this.createTimeDate = createTime;
		this.statusTime     = statusTime;
		this.status         = status;
		this.userId         = userId;
		this.applicationId  = applicationId;
	}

	get createTimeDate() {
		return this._createTimeDate;
	}

	set createTimeDate(createTime) {
		this._createTimeDate = timestampToDate(createTime);
	}
}