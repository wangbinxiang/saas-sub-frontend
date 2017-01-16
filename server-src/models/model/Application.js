import { timestampToDate } from '../../libs/helper';

export default class Application{
	constructor({
		id,
		realName,
		contactPhone,
		identifyCardNumber,
		companyName,
		companyAddress,
		information,
        priceIndex,
        updateTime,
        createTime,
        statusTime,
        status,
        userId,
        projectId,
        contractId
	}) {
		this.id                 = id;
		this.realName           = realName;
		this.contactPhone       = contactPhone;
		this.identifyCardNumber = identifyCardNumber;
		this.companyName        = companyName;
		this.companyAddress     = companyAddress;
		this.information        = information;
		this.priceIndex         = priceIndex;
		this.updateTime         = updateTime;
		this.createTime         = createTime;
		this.createTimeDate = createTime;
		this.statusTime         = statusTime;
		this.status             = status;
		this.userId             = userId;
		this.projectId          = projectId;
		this.contractId         = contractId;
	}

	get createTimeDate() {
		return this._createTimeDate;
	}

	set createTimeDate(createTime) {
		this._createTimeDate = timestampToDate(createTime);
	}
}