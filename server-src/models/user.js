//jsonapi请求对象
import RequestJsonApi from '../libs/requestJsonApi';

class User {
    constructor() {
        this.request = new RequestJsonApi('https://api.github.com');
    }

    get() {
        return this.request.get('/');
    }

    
}

export default User;