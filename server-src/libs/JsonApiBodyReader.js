import _ from 'lodash'

/**
 * json api body 读取数据类
 */
export default class JsonApiBodyReader {
  constructor (body, included) {
    this.data = body.attributes
    this.data.id = body.id
    this.included = included
    this.relationships(body.relationships, this.data)
  }

  value (key) {
    return this.data[key]
  }

  /**
   * 整理relationships数据
   * @author wangbinxiang
   * @date   2016-09-29T01:46:04+0800
   * @param  {[type]}                 relationships [description]
   * @return {[type]}                               [description]
   */
  relationships (relationships, data) {
    if (relationships) {
      for (let relationship in relationships) {
        this.relationshipToData(relationship, relationships[relationship], data)
      }
    }
  }

  relationshipToData (key, value, data) {
    if (_.isArray(value.data) && value.data.length > 0) {
        // 如果有relationship并且是数组
      data[value.data[0].type] = []
      for (let info of value.data) {
          //  数据存储改为 relationship
        data[info.type].push(this.relationshipInfoFormIncluded(info.type, info.id))
      }
    } else if (value.data && value.data.type) {
        // 如果有relationship 是单个数据
      data[value.data.type] = this.relationshipInfoFormIncluded(value.data.type, value.data.id)
    }
  }

  relationshipInfoFormIncluded (type, id) {
    if (this.included) {
      for (let info of this.included) {
        if (info.type === type && info.id === id) {
          info.attributes.id = id
          if (info.relationships) {
            this.relationships(info.relationships, info.attributes)
          }
          return info.attributes
        }
      }
      // included内没有数据的返回id
      return id
    } else {
      return id
    }
  }
}
