import Attachment from '../model/Attachment.js';
import AttachmentAdapter from '../adapter/AttachmentAdapter';

export default class AttachmentsService {
    constructor() {
        this.attachmentAdapter = new AttachmentAdapter();
    }

    /**
     * 上传图片到后端
     * @author wangbinxiang
     * @date   2016-09-13T10:50:10+0800
     * @param  {[type]}                 path 文件本地地址
     * @return {[type]}                      文件类
     */
    upload(path) {
        return this.attachmentAdapter.upload(path, Attachment);
    }

    //获取
    get(idList) {
        return this.attachmentAdapter.get(idList, Attachment);
    }


    getImage(idList, width, height) {
        return this.attachmentAdapter.getImage(idList, width, height, Attachment);
    }
}