export default class Article {
	constructor({
		id = 0,
		title,
		content,
		status,
		updateTime,
		createTime,
		statusTime,
        userId,
        categoryId
	}) {
		this.id         = id;
		this.title      = title;
		this.content    = content;
		this.status     = status;
		this.updateTime = updateTime;
		this.createTime = createTime;
		this.statusTime = statusTime;
		this.userId     = userId;
		this.categoryId = categoryId;
	}
}