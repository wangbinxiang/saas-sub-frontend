export default class ProductType {
	constructor ({
		id = 0,
		name,
		category,
		updateTime,
		createTime,
		statusTime,
		status,
		userId
	}) {
		this.id         = parseInt(id);
		this.name       = name;
		this.category   = category;
		this.updateTime = updateTime;
		this.createTime = createTime;
		this.statusTime = statusTime;
		this.status     = status;
		this.userId     = parseInt(userId);
	}
}