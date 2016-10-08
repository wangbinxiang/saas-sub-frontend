export default class User {
    constructor({ id = 0, cellPhone = '', nickName = '', userName = '', userCategory = '', userType = '', status = '', createTime = '', updateTime = '', statusTime = ''  }) {
        this.id           = id;
        this.cellPhone    = cellPhone;
        this.nickName     = nickName;
        this.userName     = userName;
        this.userCategory = userCategory;
        this.userType     = userType;
        this.status       = status;
        this.createTime   = createTime;
        this.updateTime   = updateTime;
        this.statusTime   = statusTime;
    }
}
