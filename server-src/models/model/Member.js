export default class Member {
    constructor({
        id = 0,
        cellPhone = '',
        nickName = '',
        userName = '',
        avatar = '',
        status = '',
        createTime = '',
        updateTime = '',
        statusTime = '',
        openId = '',
        unionId = '',
        source
    }) {
        this.id = id;
        this.cellPhone = cellPhone;
        this.nickName = nickName;
        this.userName = userName;
        this.avatar = avatar;
        this.status = status;
        this.createTime = createTime;
        this.updateTime = updateTime;
        this.statusTime = statusTime;
        this.openId = openId;
        this.unionId = unionId;
        this.source = source
    }

    //判断用户没有头像
    noAvatar() {
        return this.avatar === ''; 
    }


}