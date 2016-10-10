import JsonApiBodyReader from '../../libs/JsonApiBodyReader';

export default class OrderJsonApiBodyReader extends JsonApiBodyReader {
    constructor(...args) {
    	console.log(args);
        super(...args);
    }
}