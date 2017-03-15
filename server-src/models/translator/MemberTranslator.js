import Translator from '../../libs/Translator';
import MemberJsonApiBodyReader from '../reader/MemberJsonApiBodyReader';

export default class MemberTranslator extends Translator {
	constructor() {
		super();
	}

	readData(data) {
		const bodyReader = new MemberJsonApiBodyReader(data);

		const id = bodyReader.value('id');
		const cellPhone = bodyReader.value('cellPhone');
		const nickName = bodyReader.value('nickName');
		const userName = bodyReader.value('userName');
		const avatar = bodyReader.value('avatar');
		const status = bodyReader.value('status');
		const createTime = bodyReader.value('createTime');
		const updateTime = bodyReader.value('updateTime');
		const statusTime = bodyReader.value('statusTime');
		const openId = bodyReader.value('openId');
		const unionId = bodyReader.value('unionId');
		const source = bodyReader.value('source')

		return {
			id,
			cellPhone,
			nickName,
			userName,
			avatar,
			status,
			createTime,
			updateTime,
			statusTime,
			openId,
			unionId,
			source
		};
	}
}