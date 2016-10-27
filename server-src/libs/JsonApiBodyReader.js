import _ from 'lodash';

/**
 * json api body 读取数据类
 */
export default class JsonApiBodyReader {
    constructor(body) {
        this.data = body.attributes;
        this.data.id =  body.id;
        this.relationships(body.relationships);
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
    relationships(relationships) {
    	if (relationships) {

    		for(let relationship in relationships) {
                if (_.isArray(relationships[relationship].data) && relationships[relationship].data.length > 0) {
                    this.data[relationships[relationship].data[0].type] = []
                    for(let info of relationships[relationship].data) {
                        this.data[info.type].push(info.id);
                    }
                } else {
                    this.data[relationships[relationship].data.type] = relationships[relationship].data.id
                }
    		}
    	}
    }
}