import JsonApiBodyReader from '../../libs/JsonApiBodyReader';

export default class OrderJsonApiBodyReader extends JsonApiBodyReader {
    constructor(...args) {
        super(...args);
        console.log(args);
    }
}