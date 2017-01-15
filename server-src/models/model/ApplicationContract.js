export default class ApplicationContract {
	constructor({
		id,
		time,
		address,
        price,
        isOnlinePay,
        attachments,
        updateTime,
        createTime
	}) {
		this.id          = id;
		this.time        = time;
		this.address     = address;
		this.price       = price;
		this.isOnlinePay = isOnlinePay;
		this.attachments = attachments;
		this.updateTime  = updateTime;
		this.createTime  = createTime;
	}
}