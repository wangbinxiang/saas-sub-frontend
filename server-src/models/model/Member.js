export default class Member {
	constructor({ id = 0, cellPhone = '', nickName = '', userName = '', userType = '', status = '', createTime = '', updateTime = '', statusTime = '', openId = ''  }) {
        this.id           = id;
        this.cellPhone    = cellPhone;
        this.nickName     = nickName;
        this.userName     = userName;
        this.userType     = userType;
        this.status       = status;
        this.createTime   = createTime;
        this.updateTime   = updateTime;
        this.statusTime   = statusTime;
        this.openId       = openId;
    }
}