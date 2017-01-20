
/**
 * 文章分类
 */
export default class Category {
	constructor ({
		id = 0,
		name,
		status,
		updateTime,
		createTime,
		statusTime,
		userId
	}) {
		this.id         = id;
		this.name       = name;
		this.status     = status;
		this.updateTime = updateTime;
		this.createTime = createTime;
		this.statusTime = statusTime;
		this.userId     = parseInt(userId);
	}
}