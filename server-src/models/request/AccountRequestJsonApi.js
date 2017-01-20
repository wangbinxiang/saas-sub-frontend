import BaseRequest from '../../libs/BaseRequest';
import {
	GET,
	POST,
	PUT,
	DELETE
} from '../../config/httpMethodConf';
import {
	memberApiServiceLocation
} from '../../libs/ApiServiceLocation';
import {
	jsonApiGetUrl
} from '../../libs/helper';
import {
    ACCOUNT_GET
} from '../../config/apiFeatureConf';


export default class AccountRequestJsonApi extends BaseRequest {
	constructor(feature, originData) {
		const host = memberApiServiceLocation();
		super(host, feature, originData);
		this.dataType = 'users';
	}

    get() {
        const baseUrl = '/accounts';

        const idList = this.originData.idList ? this.originData.idList : '';

        const filters = this.originData.filters ? this.originData.filters : '';

        const pages = this.originData.pages ? this.originData.pages : '';

        this.url = jsonApiGetUrl(baseUrl, idList, { filters, pages });

        this.method = GET;
    }


    buildFeature() {
        switch(this.feature) {
            case ACCOUNT_GET:
                this.get();
                break;
            default:
                throw new Error('Invalid feature method');
        }
    }

}