import UserJsonApiBodyReader from '../reader/UserJsonApiBodyReader';
import Translator from '../../libs/Translator';

export default class UserTranslator extends Translator {
    constructor() {
        super();
    }

    // //翻译users信息
    // toObject(body, aUserClass) {

    //     const bodyReader = new UserJsonApiBodyReader(body);

    //     let id           = bodyReader.value('id');
    //     let cellPhone    = bodyReader.value('cellPhone');
    //     let nickName     = bodyReader.value('nickName');
    //     let userName     = bodyReader.value('userName');
    //     let userCategory = bodyReader.value('userCategory');
    //     let userType     = bodyReader.value('userType');
    //     let status       = bodyReader.value('status');
    //     let createTime   = bodyReader.value('createTime');
    //     let updateTime   = bodyReader.value('updateTime');
    //     let statusTime   = bodyReader.value('statusTime');


    //     return this.newObject(aUserClass, { id, cellPhone, nickName, userName, userCategory, userType, status, createTime, updateTime, statusTime });
    // }

    readData(data) {
        const bodyReader = new UserJsonApiBodyReader(data);

        let id           = bodyReader.value('id');
        let cellPhone    = bodyReader.value('cellPhone');
        let nickName     = bodyReader.value('nickName');
        let userName     = bodyReader.value('userName');
        let userCategory = bodyReader.value('userCategory');
        let userType     = bodyReader.value('userType');
        let status       = bodyReader.value('status');
        let createTime   = bodyReader.value('createTime');
        let updateTime   = bodyReader.value('updateTime');
        let statusTime   = bodyReader.value('statusTime');


        return { id, cellPhone, nickName, userName, userCategory, userType, status, createTime, updateTime, statusTime };
    }
}

