export default class Article {
	constructor({
		id = 0,
		title,
		logo,
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
		this.logo       = logo;
		this.content    = content;
		this.status     = status;
		this.updateTime = updateTime;
		this.createTime = createTime;
		this.statusTime = statusTime;
		this.userId     = userId;
		this.categoryId = categoryId;
	}
}