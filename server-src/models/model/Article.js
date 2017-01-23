export default class Article {
	constructor({
		id = 0,
		title,
		logo,
		abstract,
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
		this.abstract   = abstract;
		this.content    = content;
		this.status     = status;
		this.updateTime = updateTime;
		this.createTime = createTime;
		this.statusTime = statusTime;
		this.userId     = userId;
		this.categoryId = categoryId;
	}
}