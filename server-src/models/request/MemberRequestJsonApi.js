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
    MEMBER_GET,
	MEMBER_SIGNUP,
	MEMBER_LOGIN
} from '../../config/apiFeatureConf';

export default class MemberRequestJsonApi extends BaseRequest {
	constructor(feature, originData) {
		const host = memberApiServiceLocation();
		super(host, feature, originData);
		this.dataType = 'users';
	}

    get() {
        const baseUrl = '/users';

        const idList = this.originData.idList ? this.originData.idList : '';

        const filters = this.originData.filters ? this.originData.filters : '';

        const pages = this.originData.pages ? this.originData.pages : '';

        this.url = jsonApiGetUrl(baseUrl, idList, { filters, pages });

        this.method = GET;
    }

	signup() {
        let url = '/users';
        this.url = url;

        this.method = POST;

        this.setSuccessCode(201);
        this.setParamsErrorCode(409);

        let attributes = {
            shopId: this.originData.shopId,
            openId: this.originData.openId, 
            nickName: this.originData.nickName,
            parentId: this.originData.parentId,
            unionId: this.originData.unionId
        };

        this.buildData(attributes);
    }

    login() {
        let url = '/users/signIn';
        this.url = url;

        this.method = POST;

        let attributes = {
            unionId: this.originData.unionId
        };

        this.buildData(attributes);
    }


    buildFeature() {
        switch(this.feature) {
            case MEMBER_GET:
                this.get();
                break;
            case MEMBER_LOGIN:
                this.login();
                break;
            case MEMBER_SIGNUP:
                this.signup();
                break;
            default:
                throw new Error('Invalid feature method');
        }
    }

}