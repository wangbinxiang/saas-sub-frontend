export default class ProjectType{
	constructor({
		id,
		name,
		category,
        updateTime,
        createTime,
        statusTime,
        status,
        userId
	}) {
		this.id          = id;
		this.name        = name;
		this.category    = category;
		this.updateTime  = updateTime;
		this.createTime  = createTime;
		this.statusTime  = statusTime;
		this.status      = status;
		this.userId     = userId;
	}
}