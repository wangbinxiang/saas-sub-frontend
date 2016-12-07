export default class Contract {
	constructor({
		id,
		title,
		content,
		status,
		updateTime,
		createTime,
		statusTime,
        userId,
        category,
        contractId
	}) {
		this.id              = id;
		this.title           = title;
		this.content         = content;
		this.status          = status;
		this.updateTime      = updateTime;
		this.createTime      = createTime;
		this.statusTime      = statusTime;
		this.userId          = userId;
		this.category        = category;
		this.contractId      = contractId;
	}
}