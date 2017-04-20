export default class CartTable {
	constructor ({
		id = 0,
		name,
        shopId,
		updateTime,
		createTime,
		statusTime,
        status
		
	}) {
		this.id         = id;
		this.name       = name;
        this.shopId     = shopId;
		this.updateTime = updateTime;
		this.createTime = createTime;
		this.statusTime = statusTime;
        this.status     = status;
	}
}