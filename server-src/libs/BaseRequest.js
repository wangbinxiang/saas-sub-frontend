import RequestJsonApi from './RequestJsonApi';
import { GET, POST, PUT, DELETE, SEND_FILE } from '../config/httpMethodConf';

export default class BaseRequest {
    constructor(host, feature, originData) {
        this.host       = host;
        this.feature    = feature;
        this.originData = originData;
        this.successCode = 200;
        this.noContentCode = 204;
        this.paramsErrorCode = 404;
    }

    getSuccessCode() {
        return this.successCode;
    }

    setSuccessCode(successCode) {
        this.successCode = successCode;
    }

    getParamsErrorCode() {
        return this.paramsErrorCode;
    }

    setParamsErrorCode(paramsErrorCode) {
        this.paramsErrorCode = paramsErrorCode;
    }

    buildData(attributes) {
        this.data = {
            data: {
                type: this.dataType,
                attributes: attributes
            }
        };
    }

    buildFeature() {}

    buildRequest() {
        this.request = new RequestJsonApi(this.host, this.url, this.data);
    }

    

    request() {
        this.buildFeature();
        this.buildRequest();
        switch(this.method) {
            case GET:
                return this.request.get();
                break;
            case POST:
                return this.request.post();
                break;
            case PUT:
                return this.request.put();
                break;
            case DELETE:
                return this.request.del();
                break;
            case SEND_FILE:
                return this.request.sendFile();
                break;
            default:
                throw new Error('Invalid http method');
        }
    }

}