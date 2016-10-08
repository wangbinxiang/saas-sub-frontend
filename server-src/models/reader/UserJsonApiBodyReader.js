export default class UserJsonApiBodyReader {
    constructor(body) {
        this.data = body.attributes;
        this.data.id =  body.id;
    }

    value(key) {
        return this.data[key];
    }
}