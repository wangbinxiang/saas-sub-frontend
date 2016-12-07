import Translator from '../../libs/Translator';
import ContractSnapshotJsonApiBodyReader from '../reader/ContractSnapshotJsonApiBodyReader';
import Contract from '../model/Contract'

export default class ContractSnapshotTranslator extends Translator {
    constructor() {
        super();
    }

    readData(data, included) {
        const bodyReader = new ContractSnapshotJsonApiBodyReader(data, included);

        let id = bodyReader.value('id');

        let contracts = bodyReader.value('contracts');

        let contract = new Contract(contracts);
        // let price = bodyReader.value('price');
        // let payType = bodyReader.value('payType');
        // let category = bodyReader.value('category');
        // let payTime = bodyReader.value('payTime');
        // let comment = bodyReader.value('comment');
        // let freight = bodyReader.value('freight');
        // let users = bodyReader.value('users');
        // let shops = bodyReader.value('shops');
        // let orderProducts = bodyReader.value('orderProducts');
        // let updateTime = bodyReader.value('updateTime');
        // let createTime = bodyReader.value('createTime');
        // let statusTime = bodyReader.value('statusTime');
        // let status = bodyReader.value('status');

        return {
            id,
            contract
        };
    }
}