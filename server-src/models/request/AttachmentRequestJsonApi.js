import BaseRequest from '../../libs/BaseRequest';
import { attachmentApiServiceLocation } from '../../libs/ApiServiceLocation';
import { GET, SEND_FILE } from '../../config/httpMethodConf';
import { ATTACHMENT_UPLOAD, ATTACHMENT_GET, ATTACHMENT_GET_IMAGE } from '../../config/apiFeatureConf';


export default class AttachmentRequestJsonApi extends BaseRequest {
    constructor(feature, originData) {
        const host = attachmentApiServiceLocation();
        super(host, feature, originData);
    }

    upload() {
        let url = '/attachments';

        this.url = url;

        this.method = SEND_FILE;

        this.data = {
            name: 'file',
            path: this.originData.path
        }
    }

    get() {
        let url = '/files/';
        let ids = this.originData.idList? this.originData.idList.join(): '';

        if (ids) {
            url = url + ids;

            this.url = url;

            this.method = GET;
        } else {
            throw new Error('empty idList');
        }
    }

    getImage() {
        let url = '/images/';
        let width = Number.isInteger(this.originData.width)? this.originData.width: 0;
        let height = Number.isInteger(this.originData.height)? this.originData.height: 0;
        let ids = this.originData.idList? this.originData.idList.join(): '';

        if (width > 0 && height > 0 && ids) {
            url = url + width + '/' + height + '/' + ids
            this.url = url;

            this.method = GET;
        } else {
            throw new Error('error params');
        }
    }

    buildFeature() {
        switch(this.feature) {
            case ATTACHMENT_UPLOAD:
                this.upload();
                break;
            case ATTACHMENT_GET:
                this.get();
                break;
            case ATTACHMENT_GET_IMAGE:
                this.getImage();
                break;
            default:
                throw new Error('Invalid feature method');
        }
    }
}