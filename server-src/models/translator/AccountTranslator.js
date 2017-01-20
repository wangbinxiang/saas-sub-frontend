import Translator from '../../libs/Translator';
import AccountJsonApiBodyReader from '../reader/AccountJsonApiBodyReader';

export default class AccountTranslator extends Translator {
	constructor() {
		super();
	}

	readData(data) {
		const bodyReader = new AccountJsonApiBodyReader(data);

		const id = bodyReader.value('id');
		const balance = bodyReader.value('balance');
		const blocked = bodyReader.value('blocked');
		const source = bodyReader.value('source');


		return {
			id,
			balance,
			blocked,
			source
		};
	}
}