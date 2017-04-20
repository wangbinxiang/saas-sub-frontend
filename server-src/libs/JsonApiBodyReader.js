import _ from 'lodash';

/**
 * json api body 读取数据类
 */
export default class JsonApiBodyReader {
    constructor(body, included) {
        this.data = body.attributes;
        this.data.id =  body.id;
        this.included = included;
        this.relationships(body.relationships, this.data);
     
    }

    value(key) {
        return this.data[key];
    }

    /**
     * 整理relationships数据
     * @author wangbinxiang
     * @date   2016-09-29T01:46:04+0800
     * @param  {[type]}                 relationships [description]
     * @return {[type]}                               [description]
     */
    relationships(relationships, data) {
        if (relationships) {
            for(let relationship in relationships) {
                if (_.isArray(relationships[relationship].data) && relationships[relationship].data.length > 0) {
                    //如果有relationship并且是数组
                    data[relationships[relationship].data[0].type] = []
                    for(let info of relationships[relationship].data) {
                        this.data[info.type].push(this.relationshipInfoFormIncluded(info.type, info.id));
                    }
                } else if(relationships[relationship].data && relationships[relationship].data.type) {
                    //如果有relationship 是单个数据
                    data[relationships[relationship].data.type] = this.relationshipInfoFormIncluded(relationships[relationship].data.type, relationships[relationship].data.id);
                }
            }
        }
    }


    relationshipInfoFormIncluded(type, id) {
        if (this.included) {
            for(let info of this.included) {
                if (info.type === type && info.id === id) {
                    info.attributes.id = id;
                    // console.log(info.relationships)
                    if(info.relationships) {
                        this.relationships(info.relationships, info.attributes)
                    }
                    return info.attributes;
                }
            }
            //included内没有数据的返回id
            return id;
        } else {
            return id;
        }
    }
}