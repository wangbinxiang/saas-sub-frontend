import Translator from '../../libs/Translator';
import MemberJsonApiBodyReader from '../reader/MemberJsonApiBodyReader';

export default class MemberTranslator extends Translator {
    constructor() {
        super();
    }

    readData(data) {
        const bodyReader = new MemberJsonApiBodyReader(data);

		let id         = bodyReader.value('id');
		let cellPhone  = bodyReader.value('cellPhone');
		let nickName   = bodyReader.value('nickName');
		let userName   = bodyReader.value('userName');
		let status     = bodyReader.value('status');
		let createTime = bodyReader.value('createTime');
		let updateTime = bodyReader.value('updateTime');
		let statusTime = bodyReader.value('statusTime');
		let openId     = bodyReader.value('openId');

        return { id, cellPhone, nickName, userName, status, createTime, updateTime, statusTime, openId };
    }
}