import BaseRequest from '../../libs/BaseRequest';
import {
	GET,
	POST,
	PUT,
	DELETE
} from '../../config/httpMethodConf';
import {
	projectApiServiceLocation
} from '../../libs/ApiServiceLocation';
import {
	APPLICATION_CONTRACT_GET,
	APPLICATION_CONTRACT_ADD,
	APPLICATION_CONTRACT_EDIT
} from '../../config/apiFeatureConf';
import {
	jsonApiGetUrl
} from '../../libs/helper';

export default class ApplicationContractRequestJsonApi extends BaseRequest {
	constructor(feature, originData) {
		const host = projectApiServiceLocation();
		super(host, feature, originData);
		this.dataType = 'contracts';
	}

	get() {
		let BaseUrl = '/contracts';

		let idList = this.originData.idList ? this.originData.idList : '';

		let filters = this.originData.filters ? this.originData.filters : '';

		let pages = this.originData.pages ? this.originData.pages : '';

		let sort = this.originData.sort ? this.originData.sort : '';

		this.url = jsonApiGetUrl(BaseUrl, idList, { filters, pages, sort });
		this.method = GET;
	}

	add() {
		let url = '/contracts'

		this.url = url

		this.method = POST

		this.setSuccessCode(201)

		let attributes = {
			time: this.originData.time,
			address: this.originData.address,
			price: this.originData.price,
			attachments: this.originData.attachments,
			isOnlinePay: this.originData.isOnlinePay,
			applicationId: this.originData.applicationId
		}

		this.buildData(attributes)
	}


	edit() {

		const url = '/contracts/' + this.originData.id

		this.url = url;

		this.method = PUT;

		let attributes = {
			time: this.originData.time,
			address: this.originData.address,
			price: this.originData.price,
			attachments: this.originData.attachments,
			isOnlinePay: this.originData.isOnlinePay,
		};

		this.buildData(attributes);

	}

	buildFeature() {
		switch (this.feature) {
			case APPLICATION_CONTRACT_GET:
				this.get();
				break;
			case APPLICATION_CONTRACT_ADD:
				this.add();
				break;
			case APPLICATION_CONTRACT_EDIT:
				this.edit();
				break;
			default:
				throw new Error('Invalid feature method');
		}
	}
}