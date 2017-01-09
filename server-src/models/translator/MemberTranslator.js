import Translator from '../../libs/Translator';
import MemberJsonApiBodyReader from '../reader/MemberJsonApiBodyReader';

export default class MemberTranslator extends Translator {
	constructor() {
		super();
	}

	readData(data) {
		const bodyReader = new MemberJsonApiBodyReader(data);
		console.log(bodyReader.data)
		const id = bodyReader.value('id');
		const cellPhone = bodyReader.value('cellPhone');
		const nickName = bodyReader.value('nickName');
		const userName = bodyReader.value('userName');
		const status = bodyReader.value('status');
		const createTime = bodyReader.value('createTime');
		const updateTime = bodyReader.value('updateTime');
		const statusTime = bodyReader.value('statusTime');
		const openId = bodyReader.value('openId');
		const unionId = bodyReader.value('unionId');

		return {
			id,
			cellPhone,
			nickName,
			userName,
			status,
			createTime,
			updateTime,
			statusTime,
			openId,
			unionId
		};
	}
}